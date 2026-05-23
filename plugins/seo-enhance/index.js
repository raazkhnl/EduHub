// ============================================================================
// plugins/seo-enhance
// ----------------------------------------------------------------------------
// Search-engine optimisation pass that runs at the very end of `docusaurus
// build`. It does two things the stock Docusaurus pipeline can't:
//
//  1. Inject per-page schema.org JSON-LD into every doc HTML file. Docusaurus
//     emits BreadcrumbList automatically, but Google strongly favours `Article`
//     / `LearningResource` for chapter content. We parse the rendered title and
//     description out of the SSR'd HTML so the data stays in sync with what
//     the page actually shows.
//
//  2. Rewrite sitemap.xml to add a `<lastmod>` element for every doc URL,
//     derived from the `last_update.date` frontmatter on disk. Search engines
//     use lastmod to prioritise recrawls, and the stock sitemap plugin omits
//     it when the showLastUpdateTime option is gated on CI.
//
// Designed to run after the classic preset + bundle-manifest. Safe no-op if
// the build dir is empty (e.g. during `docusaurus start`).
// ============================================================================

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const DEFAULT_OPTIONS = {
  docsDir: 'docs',
  // HTML directories whose pages should receive Article schema. Everything
  // under these prefixes is treated as a doc page; pages outside (e.g. /about,
  // /contribute) get WebPage schema only.
  docRoutes: ['ioe', 'ctevt', 'tu'],
};

module.exports = function seoEnhancePlugin(context, opts = {}) {
  const options = { ...DEFAULT_OPTIONS, ...opts };
  const { siteConfig } = context;
  const siteUrl = String(siteConfig.url || '').replace(/\/$/, '');
  const baseUrl = String(siteConfig.baseUrl || '/');

  return {
    name: 'seo-enhance',

    async postBuild({ outDir, siteDir }) {
      // ── 1. Build a frontmatter index from disk ────────────────────────────
      // Map from absolute URL path (e.g. /ioe/msncs/.../ch01) → frontmatter.
      // We walk the docs folder once and index by the slug Docusaurus uses,
      // so each HTML file can look up its own metadata cheaply.
      const docsRoot = path.join(siteDir, options.docsDir);
      const frontmatterIndex = new Map();
      if (fs.existsSync(docsRoot)) {
        await indexDocs(docsRoot, docsRoot, frontmatterIndex);
      }

      // ── 2. Walk the build dir and inject Article JSON-LD ──────────────────
      let injected = 0;
      await walkHtml(outDir, outDir, async (absHtml) => {
        const relFromBuild = path.relative(outDir, absHtml).replace(/\\/g, '/');
        // Skip 404, search index page, and PWA assets.
        if (relFromBuild === '404.html' || relFromBuild.startsWith('assets/')) return;

        const route = '/' + relFromBuild.replace(/index\.html$/, '').replace(/\.html$/, '');
        const cleanRoute = route.replace(/\/$/, '') || '/';
        const url = siteUrl + (cleanRoute === '/' ? baseUrl : cleanRoute);

        const isDoc = options.docRoutes.some(
          (p) => cleanRoute === `/${p}` || cleanRoute.startsWith(`/${p}/`),
        );

        const html = await fsp.readFile(absHtml, 'utf8');

        // Avoid double-injection on rebuilds.
        if (html.includes('data-seo-enhance="1"')) return;

        const title = extractMeta(html, 'og:title') || extractTitle(html);
        let description = extractMeta(html, 'description') || extractMeta(html, 'og:description');
        if (!title) return;

        // The chapter notes use a default "Chapter N of <Subject> (<Code>)."
        // description in frontmatter, which is fine for cataloguing but reads
        // as boilerplate in Google's search snippet. When we see that pattern,
        // back-fill a richer description from the article's first paragraph
        // so the SERP entry actually previews the page's content.
        let htmlWithMeta = html;
        const isGeneric =
          !description || /^Chapter \d+ of |^Official syllabus for /i.test(description);
        if (isGeneric && isDoc) {
          const derived = extractFirstParagraph(html);
          if (derived && derived.length > 40) {
            const cleaned = truncate(derived, 160);
            description = cleaned;
            // Overwrite the rendered <meta name="description"> and the matching
            // OG tag so Google, Bing, Slack, Twitter all see the richer text.
            htmlWithMeta = rewriteMetaDescriptions(html, cleaned);
          }
        }

        // Look up frontmatter date by slug match. We try several keys because
        // the slug may differ from the on-disk path (e.g. /notes/ch01 vs the
        // file 01-intro-cryptography.md).
        const fm =
          frontmatterIndex.get(cleanRoute) ||
          frontmatterIndex.get(cleanRoute.replace(/\/$/, '')) ||
          null;

        const datePublished = fm?.date || null;
        const dateModified = fm?.lastUpdate || fm?.date || null;
        const keywords = mergeKeywords(fm, cleanRoute);

        const ldBlocks = [];

        if (isDoc) {
          // Chapter notes / syllabus / curriculum pages → LearningResource +
          // Article (multi-typed). Google reads both shapes, and
          // LearningResource is the schema designed for educational material.
          const article = {
            '@context': 'https://schema.org',
            '@type': ['Article', 'LearningResource'],
            headline: title,
            name: title,
            description: description || undefined,
            inLanguage: 'en',
            isAccessibleForFree: true,
            license: 'https://creativecommons.org/licenses/by/4.0/',
            learningResourceType: cleanRoute.includes('/syllabus') ? 'Syllabus' : 'LectureNotes',
            educationalLevel: cleanRoute.includes('/msncs')
              ? 'Postgraduate'
              : cleanRoute.includes('/ioe/')
                ? 'Undergraduate'
                : 'Diploma',
            keywords: keywords.length ? keywords.join(', ') : undefined,
            datePublished: datePublished || undefined,
            dateModified: dateModified || undefined,
            url,
            mainEntityOfPage: url,
            author: {
              '@type': 'Person',
              name: 'RaaZ Khanal',
              url: 'https://khanalrajesh.com.np',
            },
            publisher: {
              '@type': 'Organization',
              name: 'EduHub',
              url: siteUrl,
              logo: {
                '@type': 'ImageObject',
                url: siteUrl + '/img/social-card.png',
              },
            },
            image: siteUrl + '/img/social-card.png',
          };
          ldBlocks.push(article);
        }

        if (!ldBlocks.length) return;

        const scripts = ldBlocks
          .map(
            (obj) =>
              `<script type="application/ld+json" data-seo-enhance="1">${JSON.stringify(
                pruneUndefined(obj),
              )}</script>`,
          )
          .join('');

        const updated = htmlWithMeta.replace('</head>', `${scripts}</head>`);
        await fsp.writeFile(absHtml, updated, 'utf8');
        injected += 1;
      });
      console.log(`[seo-enhance] injected JSON-LD into ${injected} HTML page(s)`);

      // ── 3. Rewrite sitemap.xml with <lastmod> entries ─────────────────────
      const sitemapPath = path.join(outDir, 'sitemap.xml');
      if (fs.existsSync(sitemapPath)) {
        let xml = await fsp.readFile(sitemapPath, 'utf8');
        let touched = 0;
        // Match each <url>...<loc>URL</loc>...</url> block.
        xml = xml.replace(
          /<url>\s*<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/g,
          (whole, loc, inner) => {
            if (/<lastmod>/.test(whole)) return whole; // already has one
            const relativePath = loc.replace(siteUrl, '').replace(/\/$/, '') || '/';
            const fm = frontmatterIndex.get(relativePath);
            const stamp = fm?.lastUpdate || fm?.date;
            if (!stamp) return whole;
            touched += 1;
            return `<url><loc>${loc}</loc><lastmod>${stamp}</lastmod>${inner}</url>`;
          },
        );
        await fsp.writeFile(sitemapPath, xml, 'utf8');
        console.log(`[seo-enhance] added <lastmod> to ${touched} sitemap entr${touched === 1 ? 'y' : 'ies'}`);
      }
    },
  };
};

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

async function walkHtml(absDir, rootDir, fn) {
  const entries = await fsp.readdir(absDir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      await walkHtml(abs, rootDir, fn);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      await fn(abs);
    }
  }
}

async function indexDocs(absDir, rootDir, map) {
  const entries = await fsp.readdir(absDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
    const abs = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      await indexDocs(abs, rootDir, map);
      continue;
    }
    if (!/\.(md|mdx)$/i.test(entry.name)) continue;
    const raw = await fsp.readFile(abs, 'utf8');
    const { frontmatter } = parseFrontmatter(raw);
    const slug = frontmatter.slug;
    if (!slug) continue;
    map.set(slug, {
      date: frontmatter['last_update.date'] || null,
      lastUpdate: frontmatter['last_update.date'] || null,
      tags: parseTags(frontmatter.tags),
      keywords: parseTags(frontmatter.keywords),
      title: frontmatter.title || null,
    });
  }
}

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!m) return { frontmatter: {} };
  const head = m[1];
  const fm = {};
  let lastKey = null;
  let inLastUpdate = false;
  for (const line of head.split(/\r?\n/)) {
    if (!line.trim() || line.startsWith('#')) continue;
    // Track nested `last_update:` block so we capture its `date:` subkey.
    if (/^last_update\s*:/.test(line)) {
      inLastUpdate = true;
      lastKey = 'last_update';
      continue;
    }
    if (inLastUpdate && /^\s+/.test(line)) {
      const idx = line.indexOf(':');
      if (idx === -1) continue;
      const subkey = line.slice(0, idx).trim();
      const val = unquote(line.slice(idx + 1).trim());
      fm[`last_update.${subkey}`] = val;
      continue;
    }
    inLastUpdate = false;
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
  return { frontmatter: fm };
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
  const s = String(v).trim();
  if (s.startsWith('[') && s.endsWith(']')) {
    return s
      .slice(1, -1)
      .split(',')
      .map((x) => unquote(x.trim()))
      .filter(Boolean);
  }
  return s
    .split(',')
    .map((x) => unquote(x.trim()))
    .filter(Boolean);
}

function extractTitle(html) {
  const m = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
  return m ? decodeHtml(m[1].replace(/\s*\|\s*EduHub\s*$/, '')) : null;
}

function extractMeta(html, key) {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${escapeRegex(key)}["'][^>]+content=["']([^"']+)["']`,
    'i',
  );
  const m = re.exec(html);
  return m ? decodeHtml(m[1]) : null;
}

// Pull the first non-empty <p>...</p> from the article body. We scope to the
// `theme-doc-markdown` wrapper Docusaurus renders so we don't accidentally
// grab announcement-bar or sidebar text. Inline HTML inside the paragraph
// (links, emphasis, code spans) is flattened to text. Returns null if no
// suitable paragraph is found.
function extractFirstParagraph(html) {
  const scope = /<div[^>]+class="[^"]*theme-doc-markdown[^"]*"[^>]*>([\s\S]*?)<\/article>/i.exec(
    html,
  );
  const haystack = scope ? scope[1] : html;
  const paragraphs = haystack.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  for (const p of paragraphs) {
    const inner = p.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const text = decodeHtml(inner);
    if (text.length >= 40) return text;
  }
  return null;
}

// Truncate to <= n characters at a word boundary, ending with an ellipsis if
// we had to cut. Google truncates the snippet itself at ~155–160 chars, so we
// keep below that to leave a margin.
function truncate(s, n) {
  if (s.length <= n) return s;
  const slice = s.slice(0, n - 1);
  const lastSpace = slice.lastIndexOf(' ');
  return (lastSpace > 60 ? slice.slice(0, lastSpace) : slice).replace(/[.,;:!?\s]+$/, '') + '…';
}

// Replace the rendered <meta name="description"> and <meta property=
// "og:description"> content attributes with a richer value. We keep the rest
// of the tag (including React Helmet's `data-rh="true"`) intact so client-
// side rehydration doesn't churn the DOM.
function rewriteMetaDescriptions(html, value) {
  const safe = String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  return html
    .replace(
      /(<meta[^>]+name=["']description["'][^>]+content=)["'][^"']*["']/i,
      `$1"${safe}"`,
    )
    .replace(
      /(<meta[^>]+property=["']og:description["'][^>]+content=)["'][^"']*["']/i,
      `$1"${safe}"`,
    );
}

function decodeHtml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function pruneUndefined(obj) {
  if (Array.isArray(obj)) return obj.map(pruneUndefined);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v === undefined) continue;
      out[k] = pruneUndefined(v);
    }
    return out;
  }
  return obj;
}

function mergeKeywords(fm, route) {
  const base = new Set();
  // Frontmatter signals
  if (fm?.tags) fm.tags.forEach((t) => base.add(String(t)));
  if (fm?.keywords) fm.keywords.forEach((t) => base.add(String(t)));
  // Path-derived signals — convert URL segments into human-readable tokens so
  // crawlers can see "msncs", "cryptography" etc. as keywords on the page.
  for (const seg of route.split('/').filter(Boolean)) {
    if (/^ch\d+$/.test(seg) || seg === 'notes' || seg === 'syllabus') continue;
    base.add(seg.replace(/-/g, ' '));
  }
  // Domain-specific anchors that consistently improve match probability
  // for the exact searches the audience runs.
  if (route.startsWith('/ioe/msncs')) {
    base.add('MSNCS');
    base.add('IOE Pulchowk');
    base.add('M.Sc. Networks and Cybersecurity');
    base.add('Tribhuvan University');
  }
  if (route.startsWith('/ioe/')) {
    base.add('IOE');
    base.add('Pulchowk Campus');
  }
  if (route.startsWith('/ctevt')) base.add('CTEVT diploma');
  if (route.startsWith('/tu')) base.add('Tribhuvan University');
  return [...base];
}
