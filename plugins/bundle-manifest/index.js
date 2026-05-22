// ============================================================================
// plugins/bundle-manifest
// ----------------------------------------------------------------------------
// At build time, walks the docs/ tree and emits a single JSON manifest the
// Bundle Builder UI loads at runtime. The manifest holds: slug, title, raw
// markdown content (frontmatter stripped), word count, and the breadcrumbs
// needed to render a tree.
//
// The manifest is exposed as a static asset at  /_bundle/manifest.json  so
// the client can fetch it lazily — keeping it out of the initial JS bundle.
//
// Disable by setting  customFields.features.bundleBuilder = false  in
// docusaurus.config.js (the page will refuse to load the manifest).
// ============================================================================

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const DEFAULT_OPTIONS = {
  docsDir: 'docs',
  outDir: '_bundle',
  // Files starting with these prefixes are not chapters and are excluded.
  excludeFilePrefixes: ['_', '.'],
  // Only files with these extensions are indexed.
  includeExtensions: ['.md', '.mdx'],
};

module.exports = function bundleManifestPlugin(context, opts = {}) {
  const options = { ...DEFAULT_OPTIONS, ...opts };

  return {
    name: 'bundle-manifest',

    // Emit at the end of the build, into the build output (which Pages serves).
    async postBuild({ outDir, siteDir }) {
      const docsRoot = path.join(siteDir, options.docsDir);
      if (!fs.existsSync(docsRoot)) {
        console.warn(`[bundle-manifest] docs dir not found: ${docsRoot}`);
        return;
      }
      const docs = [];
      await walk(docsRoot, docsRoot, docs, options);
      docs.sort((a, b) => a.slug.localeCompare(b.slug));

      const outFolder = path.join(outDir, options.outDir);
      await fsp.mkdir(outFolder, { recursive: true });
      const out = {
        generatedAt: new Date().toISOString(),
        count: docs.length,
        documents: docs,
      };
      await fsp.writeFile(
        path.join(outFolder, 'manifest.json'),
        JSON.stringify(out, null, 2),
        'utf8',
      );
      console.log(
        `[bundle-manifest] wrote ${docs.length} documents → ${options.outDir}/manifest.json`,
      );
    },

    // Also expose during dev. We can't reach build outputs in dev mode, so we
    // copy the manifest into static/ before each dev server boot. To keep the
    // dev experience honest, we also run the walk in `loadContent` and write
    // the file into static/_bundle so /static serves it.
    async loadContent() {
      const docsRoot = path.join(context.siteDir, options.docsDir);
      if (!fs.existsSync(docsRoot)) return null;
      const docs = [];
      await walk(docsRoot, docsRoot, docs, options);
      docs.sort((a, b) => a.slug.localeCompare(b.slug));

      const devOut = path.join(context.siteDir, 'static', options.outDir);
      await fsp.mkdir(devOut, { recursive: true });
      await fsp.writeFile(
        path.join(devOut, 'manifest.json'),
        JSON.stringify(
          { generatedAt: new Date().toISOString(), count: docs.length, documents: docs },
          null,
          2,
        ),
        'utf8',
      );
      return { count: docs.length };
    },
  };
};

// ────────────────────────────────────────────────────────────────────────────
async function walk(absDir, rootDir, acc, opts) {
  const entries = await fsp.readdir(absDir, { withFileTypes: true });
  for (const entry of entries) {
    // Skip dot-anything and underscore-prefixed directories or files. This
    // keeps `_templates/`, `_drafts/`, `_syllabus-source.md` etc. out of the
    // public manifest — they exist for authors, not for end users.
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
    const abs = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      await walk(abs, rootDir, acc, opts);
      continue;
    }
    if (!opts.includeExtensions.includes(path.extname(entry.name))) continue;

    const relFromDocs = path.relative(rootDir, abs).replace(/\\/g, '/');
    const raw = await fsp.readFile(abs, 'utf8');
    const { frontmatter, body } = parseFrontmatter(raw);

    // Skip files that don't carry a chapter — index/landing pages still useful.
    const title =
      frontmatter.title || stripH1(body) || path.basename(entry.name, path.extname(entry.name));
    const slug = frontmatter.slug || '/' + relFromDocs.replace(/\.(md|mdx)$/i, '');
    const description = frontmatter.description || '';
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : parseTags(frontmatter.tags);
    const sidebarPosition = num(frontmatter.sidebar_position);

    const wordCount = body.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(wordCount / 220)); // ~220 wpm

    acc.push({
      path: relFromDocs,
      slug,
      title,
      description,
      tags,
      sidebarPosition,
      wordCount,
      minutes,
      breadcrumbs: relFromDocs.split('/').slice(0, -1),
      // Raw markdown body (frontmatter stripped). JSX/MDX components are kept
      // verbatim — the Bundle Builder warns if a chosen page contains MDX-only
      // components when exporting to plain Markdown.
      markdown: body,
    });
  }
}

// Minimal YAML-ish frontmatter parser: enough for our shape, no dependency.
function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!m) return { frontmatter: {}, body: raw };
  const head = m[1];
  const body = raw.slice(m[0].length);
  const fm = {};
  let lastKey = null;
  for (const line of head.split(/\r?\n/)) {
    if (!line.trim() || line.startsWith('#')) continue;
    // Indented continuation belongs to last key (we treat the whole subtree as a string).
    if (/^\s/.test(line) && lastKey) {
      fm[lastKey] = (fm[lastKey] ? fm[lastKey] + '\n' : '') + line.trim();
      continue;
    }
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    lastKey = key;
    fm[key] = unquote(val);
  }
  // Coerce tags `[a, b, c]` → ['a','b','c']
  if (typeof fm.tags === 'string' && fm.tags.startsWith('[') && fm.tags.endsWith(']')) {
    fm.tags = fm.tags
      .slice(1, -1)
      .split(',')
      .map((s) => unquote(s.trim()))
      .filter(Boolean);
  }
  return { frontmatter: fm, body };
}

function unquote(s) {
  if (!s) return s;
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}
function parseTags(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  return String(v)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
function stripH1(body) {
  const m = /^#\s+(.+)$/m.exec(body);
  return m ? m[1].trim() : '';
}
function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
