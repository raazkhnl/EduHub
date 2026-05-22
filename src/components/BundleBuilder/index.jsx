// ============================================================================
// BundleBuilder — page-level UI for selecting chapters and exporting them as
// a single Markdown file, a ZIP archive, or a printable HTML view.
//
// Data source: `/_bundle/manifest.json` (emitted by plugins/bundle-manifest).
// Selection store: `./store` (sessionStorage-backed pub/sub).
// ============================================================================

import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import { useBundle, bundleStore } from './store';
import styles from './styles.module.css';

export default function BundleBuilder() {
  return <BrowserOnly fallback={<Skeleton />}>{() => <BundleBuilderClient />}</BrowserOnly>;
}

function Skeleton() {
  return (
    <div className={styles.shell}>
      <div className={styles.sk}>Loading manifest…</div>
    </div>
  );
}

function BundleBuilderClient() {
  const { siteConfig } = useDocusaurusContext();
  const enabled = siteConfig?.customFields?.features?.bundleBuilder !== false;
  const manifestUrl = useBaseUrl('/_bundle/manifest.json');

  const [manifest, setManifest] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const [filterTag, setFilterTag] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const [busyMsg, setBusyMsg] = React.useState('');

  const { selection, set, clear, toggle, count } = useBundle();

  // Fetch the manifest once on mount.
  React.useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    fetch(manifestUrl, { cache: 'no-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(`Manifest fetch failed (HTTP ${r.status})`);
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setManifest(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, manifestUrl]);

  // Index manifest into a tree { institution → program → level → subject → chapters[] }
  const tree = React.useMemo(() => (manifest ? buildTree(manifest.documents) : null), [manifest]);

  // Tag list for the chip filter row.
  const allTags = React.useMemo(() => {
    if (!manifest) return [];
    const counts = new Map();
    for (const d of manifest.documents)
      for (const t of d.tags || []) counts.set(t, (counts.get(t) || 0) + 1);
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);
  }, [manifest]);

  // Filtered list (search + tag).
  const docsFiltered = React.useMemo(() => {
    if (!manifest) return [];
    const q = query.trim().toLowerCase();
    return manifest.documents.filter((d) => {
      if (filterTag && !(d.tags || []).includes(filterTag)) return false;
      if (!q) return true;
      return (
        d.title?.toLowerCase().includes(q) ||
        d.slug?.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        (d.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [manifest, query, filterTag]);

  // Totals
  const stats = React.useMemo(() => {
    if (!manifest) return { totalWords: 0, totalMinutes: 0 };
    const chosen = manifest.documents.filter((d) => selection.includes(d.slug));
    return {
      totalWords: chosen.reduce((acc, d) => acc + (d.wordCount || 0), 0),
      totalMinutes: chosen.reduce((acc, d) => acc + (d.minutes || 0), 0),
    };
  }, [manifest, selection]);

  if (!enabled) {
    return (
      <div className={styles.shell}>
        <h1 className={styles.title}>Bundle Builder is disabled</h1>
        <p>
          This site has set <code>customFields.features.bundleBuilder = false</code>.
        </p>
      </div>
    );
  }
  if (error)
    return (
      <div className={styles.shell}>
        <p className={styles.err}>Could not load the bundle manifest: {error}</p>
      </div>
    );
  if (!manifest) return <Skeleton />;

  // ── Selection helpers ────────────────────────────────────────────────────
  const selectAll = () => set(docsFiltered.map((d) => d.slug));
  const selectFiltered = () =>
    set([...new Set([...selection, ...docsFiltered.map((d) => d.slug)])]);
  const invertSelection = () => {
    const all = manifest.documents.map((d) => d.slug);
    const cur = new Set(selection);
    set(all.filter((s) => !cur.has(s)));
  };

  // ── Exporters ────────────────────────────────────────────────────────────
  const chosenDocs = () =>
    selection.map((slug) => manifest.documents.find((d) => d.slug === slug)).filter(Boolean);

  const exportMarkdown = async () => {
    const docs = chosenDocs();
    if (docs.length === 0) return;
    setBusy(true);
    setBusyMsg('Stitching Markdown…');
    try {
      const md = buildCombinedMarkdown(docs);
      downloadBlob(
        new Blob([md], { type: 'text/markdown;charset=utf-8' }),
        `eduhub-bundle-${stamp()}.md`,
      );
    } finally {
      setBusy(false);
      setBusyMsg('');
    }
  };

  const exportZip = async () => {
    const docs = chosenDocs();
    if (docs.length === 0) return;
    setBusy(true);
    setBusyMsg('Building ZIP archive…');
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const root = zip.folder(`eduhub-bundle-${stamp()}`);
      root.file('README.md', buildBundleReadme(docs));
      root.file('TOC.md', buildTOC(docs));
      docs.forEach((d) => {
        const safe = safePath(d.path);
        root.file(safe, prependFrontmatter(d));
      });
      const blob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      });
      downloadBlob(blob, `eduhub-bundle-${stamp()}.zip`);
    } finally {
      setBusy(false);
      setBusyMsg('');
    }
  };

  const openPrintable = async () => {
    const docs = chosenDocs();
    if (docs.length === 0) return;
    setBusy(true);
    setBusyMsg('Rendering chapters…');
    try {
      // Dynamic-import the renderers to keep the main bundle slim. Both ship
      // as ESM; their default exports are the API surface.
      const [{ marked }, katexMod] = await Promise.all([import('marked'), import('katex')]);
      const katex = katexMod.default || katexMod;
      const html = buildPrintableHtml(docs, marked, katex);
      const w = window.open('', '_blank');
      if (!w) {
        alert(
          'Pop-up blocked. Allow pop-ups for eduhub.khanalrajesh.com.np to use printable view.',
        );
        return;
      }
      w.document.open();
      w.document.write(html);
      w.document.close();
    } finally {
      setBusy(false);
      setBusyMsg('');
    }
  };

  return (
    <div className={styles.shell}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Bundle Builder · v1</p>
        <h1 className={styles.title}>Pick what to take with you.</h1>
        <p className={styles.lede}>
          Combine any chapters across any curriculum into a single Markdown file, a tidy ZIP
          archive, or a printable view (use your browser's <em>Save as PDF</em>). Selection persists
          across pages until you close the tab.
        </p>
      </header>

      <section className={styles.toolbar}>
        <div className={styles.searchRow}>
          <input
            type="search"
            placeholder="Search by title, tag, slug…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search}
            aria-label="Filter the document list"
          />
          <span className={styles.meta}>
            {docsFiltered.length} of {manifest.count} match
          </span>
        </div>

        {allTags.length > 0 && (
          <div className={styles.tagRow} role="list" aria-label="Filter by tag">
            <button
              type="button"
              onClick={() => setFilterTag(null)}
              className={clsx(styles.chip, !filterTag && styles.chipOn)}
            >
              All
            </button>
            {allTags.map(([t, n]) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterTag(filterTag === t ? null : t)}
                className={clsx(styles.chip, filterTag === t && styles.chipOn)}
              >
                {t} <span className={styles.chipCount}>{n}</span>
              </button>
            ))}
          </div>
        )}

        <div className={styles.selectRow}>
          <button type="button" onClick={selectAll} className={styles.linkBtn}>
            Select all (filtered)
          </button>
          <span className={styles.sep}>·</span>
          <button type="button" onClick={selectFiltered} className={styles.linkBtn}>
            Add filtered to selection
          </button>
          <span className={styles.sep}>·</span>
          <button type="button" onClick={invertSelection} className={styles.linkBtn}>
            Invert
          </button>
          <span className={styles.sep}>·</span>
          <button type="button" onClick={clear} className={styles.linkBtn}>
            Clear
          </button>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.tree}>
          {tree && <Tree node={tree} depth={0} selection={selection} toggle={toggle} />}
          {docsFiltered.length === 0 && (
            <p className={styles.empty}>No documents match your filter.</p>
          )}
        </div>

        <aside className={styles.aside}>
          <div className={styles.summary}>
            <h3 className={styles.h3}>Your bundle</h3>
            <p className={styles.summaryStats}>
              <strong>{count}</strong> pages · <strong>{stats.totalWords.toLocaleString()}</strong>{' '}
              words · ~<strong>{stats.totalMinutes}</strong> min read
            </p>

            {count === 0 ? (
              <p className={styles.hint}>
                Start adding pages from the tree on the left, or use the{' '}
                <strong>Add to bundle</strong> chip on any chapter page.
              </p>
            ) : (
              <ul className={styles.chosenList}>
                {chosenDocs()
                  .slice(0, 8)
                  .map((d) => (
                    <li key={d.slug}>
                      <span title={d.slug}>{d.title}</span>
                      <button
                        type="button"
                        onClick={() => toggle(d.slug)}
                        className={styles.removeX}
                        aria-label={`Remove ${d.title}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                {count > 8 && <li className={styles.more}>and {count - 8} more…</li>}
              </ul>
            )}
          </div>

          <div className={styles.exports}>
            <h3 className={styles.h3}>Export</h3>
            <button
              type="button"
              onClick={exportMarkdown}
              disabled={count === 0 || busy}
              className={clsx(styles.btn, styles.btnPrimary)}
            >
              <span>↓ Combined Markdown</span>
              <em>One .md file with a TOC</em>
            </button>
            <button
              type="button"
              onClick={exportZip}
              disabled={count === 0 || busy}
              className={clsx(styles.btn, styles.btnGhost)}
            >
              <span>↓ ZIP archive</span>
              <em>Each chapter as its own .mdx + TOC</em>
            </button>
            <button
              type="button"
              onClick={openPrintable}
              disabled={count === 0 || busy}
              className={clsx(styles.btn, styles.btnGhost)}
            >
              <span>↗ Printable view</span>
              <em>
                Opens a print-styled page; use browser <code>Save as PDF</code>
              </em>
            </button>
            {busy && <p className={styles.busy}>{busyMsg || 'Working…'}</p>}
          </div>

          <div className={styles.notes}>
            <h4 className={styles.h4}>Notes</h4>
            <ul>
              <li>
                The Markdown export keeps original formatting; KaTeX <code>$…$</code> stays intact.
              </li>
              <li>
                Custom MDX components (<code>&lt;ResourceCard&gt;</code> etc.) are stripped to plain
                text in Markdown / ZIP — they render in <em>Printable view</em>.
              </li>
              <li>Selection is per browser-tab; close the tab and it clears.</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Tree rendering
// ────────────────────────────────────────────────────────────────────────────
function Tree({ node, depth, selection, toggle }) {
  const isLeaf = node.doc != null;
  const [open, setOpen] = React.useState(depth < 2);

  if (isLeaf) {
    const checked = selection.includes(node.doc.slug);
    return (
      <li className={clsx(styles.leaf, checked && styles.leafOn)}>
        <label>
          <input type="checkbox" checked={checked} onChange={() => toggle(node.doc.slug)} />
          <span className={styles.leafTitle}>{node.doc.title}</span>
          <span className={styles.leafMeta}>
            {node.doc.minutes} min · {node.doc.wordCount.toLocaleString()} w
          </span>
        </label>
      </li>
    );
  }

  const total = countLeaves(node);
  const selected = countSelected(node, selection);
  const allOn = total > 0 && selected === total;
  const someOn = selected > 0 && !allOn;

  // Batch all branch slugs into a single store.set() so listeners fire once,
  // not N times.
  const toggleBranch = () => {
    const slugs = collectSlugs(node);
    const cur = new Set(bundleStore.get());
    if (allOn) slugs.forEach((s) => cur.delete(s));
    else slugs.forEach((s) => cur.add(s));
    bundleStore.set(Array.from(cur));
  };

  return (
    <li className={clsx(styles.branch, depth === 0 && styles.branchTop)}>
      <div className={styles.branchHead}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={styles.disclose}
          aria-expanded={open}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            <path d="M2 1 L8 5 L2 9 Z" fill="currentColor" />
          </svg>
        </button>
        <label className={styles.branchLabel}>
          <input
            type="checkbox"
            checked={allOn}
            ref={(el) => {
              if (el) el.indeterminate = someOn;
            }}
            onChange={toggleBranch}
          />
          <span className={styles.branchTitle}>{prettifySegment(node.name)}</span>
          <span className={styles.branchCount}>
            {selected}/{total}
          </span>
        </label>
      </div>
      {open && node.children?.length > 0 && (
        <ul className={styles.list}>
          {node.children.map((c, i) => (
            <Tree
              key={c.name + i}
              node={c}
              depth={depth + 1}
              selection={selection}
              toggle={toggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Tree-building helpers
// ────────────────────────────────────────────────────────────────────────────
function buildTree(docs) {
  const root = { name: '__root__', children: [] };
  for (const doc of docs) {
    if (!doc.path) continue;
    const parts = doc.path.split('/');
    const fileName = parts[parts.length - 1];
    if (fileName.startsWith('_') || fileName.startsWith('.')) continue;
    let node = root;
    for (let i = 0; i < parts.length - 1; i++) {
      const seg = parts[i];
      let child = node.children.find((c) => c.name === seg);
      if (!child) {
        child = { name: seg, children: [] };
        node.children.push(child);
      }
      node = child;
    }
    node.children.push({ name: fileName, doc });
  }
  // Sort each level: branches before leaves; within type, alpha by (sidebarPosition || name).
  function sort(n) {
    if (!n.children) return;
    n.children.sort((a, b) => {
      const al = !!a.doc,
        bl = !!b.doc;
      if (al !== bl) return al ? 1 : -1;
      const ap = a.doc?.sidebarPosition ?? 999;
      const bp = b.doc?.sidebarPosition ?? 999;
      if (ap !== bp) return ap - bp;
      return a.name.localeCompare(b.name);
    });
    n.children.forEach(sort);
  }
  sort(root);
  // Wrap root with a virtual "All curricula" label so the tree renders one trunk.
  return { name: 'All curricula', children: root.children };
}

function countLeaves(node) {
  if (node.doc) return 1;
  return (node.children || []).reduce((acc, c) => acc + countLeaves(c), 0);
}
function countSelected(node, selection) {
  if (node.doc) return selection.includes(node.doc.slug) ? 1 : 0;
  return (node.children || []).reduce((acc, c) => acc + countSelected(c, selection), 0);
}
function collectSlugs(node, acc = []) {
  if (node.doc) acc.push(node.doc.slug);
  else (node.children || []).forEach((c) => collectSlugs(c, acc));
  return acc;
}

function prettifySegment(name) {
  const map = {
    ioe: 'IOE',
    ctevt: 'CTEVT',
    tu: 'TU',
    msncs: 'MSNCS',
    bct: 'BCT',
    bce: 'BCE',
    bex: 'BEX',
    bel: 'BEL',
  };
  if (map[name]) return map[name];
  return name
    .replace(/\.mdx?$/i, '')
    .replace(/-/g, ' ')
    .replace(/\byear (\d+) part (\d+)\b/i, 'Year $1 · Part $2')
    .replace(/\b(\w)/g, (m, c) => c.toUpperCase());
}

// ────────────────────────────────────────────────────────────────────────────
// Export helpers
// ────────────────────────────────────────────────────────────────────────────
function buildCombinedMarkdown(docs) {
  const head = [
    '# EduHub — Combined bundle',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Documents: ${docs.length}`,
    '',
    '## Table of contents',
    '',
    docs.map((d, i) => `${i + 1}. **${escMd(d.title)}** — ${d.slug}`).join('\n'),
    '',
    '---',
    '',
  ].join('\n');

  const body = docs
    .map((d, i) => {
      return [
        `\n\n<!-- ─── ${i + 1}. ${d.slug} ─────────────────────────────────────────── -->`,
        `# ${escMd(d.title)}`,
        d.description ? `> ${escMd(d.description)}` : '',
        `> Source: \`${d.slug}\` · ${d.minutes} min · ${d.wordCount} words`,
        '',
        stripMdxImports(d.markdown),
        '',
        '---',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return head + body + '\n';
}

function buildBundleReadme(docs) {
  return [
    '# EduHub — bundle',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Documents: ${docs.length}`,
    '',
    'This archive contains the chapters you selected from eduhub.khanalrajesh.com.np,',
    'organised by their original taxonomy. Each .mdx file retains its frontmatter.',
    '',
    '- `TOC.md` lists every file in this bundle with its slug.',
    '- Original site: https://eduhub.khanalrajesh.com.np',
    '- Source: https://github.com/raazkhnl/EduHub',
    '- Licence: CC BY 4.0 — attribute to "EduHub contributors".',
    '',
  ].join('\n');
}

function buildTOC(docs) {
  return [
    '# Table of contents',
    '',
    ...docs.map((d, i) => `${i + 1}. **${escMd(d.title)}** — \`${d.path}\``),
  ].join('\n');
}

function prependFrontmatter(d) {
  const fm = [
    '---',
    `title: "${escQ(d.title)}"`,
    d.description ? `description: "${escQ(d.description)}"` : '',
    `source: ${d.slug}`,
    `bundled_at: ${new Date().toISOString()}`,
    '---',
    '',
  ]
    .filter(Boolean)
    .join('\n');
  return fm + d.markdown;
}

function buildPrintableHtml(docs, marked, katex) {
  const esc = (s) =>
    String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

  // A4 print sheet sized for academic handouts. Aggressive page-break rules
  // keep tables, code blocks and figures from being sliced mid-row.
  const css = `
    @page { size: A4; margin: 20mm 18mm 22mm 18mm; }
    @page :first { margin-top: 26mm; }
    html, body { background: #fff; color: #1A1B1F; }
    body {
      font-family: 'Lora', Georgia, serif;
      font-size: 11pt;
      line-height: 1.55;
      max-width: 100%;
      margin: 0;
      padding: 0;
    }
    article { max-width: 100%; }

    /* Headings */
    h1, h2, h3, h4, h5, h6 { font-family: 'Lora', Georgia, serif; page-break-after: avoid; }
    h1 {
      font-size: 1.7rem;
      font-weight: 600;
      border-bottom: 1px solid #C7BFAE;
      padding-bottom: 0.35em;
      margin: 0 0 0.9em;
      /* Every chapter starts on a fresh A4 sheet. */
      page-break-before: always;
      break-before: page;
    }
    /* Cover + TOC h1s shouldn't push a new page before them. */
    .cover h1, .toc-only h1, article:first-of-type h1 { page-break-before: auto; break-before: auto; }
    h2 { font-size: 1.25rem; margin-top: 1.6em; border-bottom: 1px solid #E5DFD2; padding-bottom: 0.2em; }
    h3 { font-size: 1.08rem; margin-top: 1.4em; }
    h4 { font-size: 1rem; font-style: italic; color: #3F4147; }

    /* Paragraphs / prose */
    p { margin: 0 0 0.85em; orphans: 3; widows: 3; }
    strong { color: #1A1B1F; }
    em { font-style: italic; }

    /* Code */
    pre, code { font-family: 'JetBrains Mono', Menlo, monospace; font-size: 0.85em; }
    code { background: #F3EFE6; padding: 0.05em 0.35em; border-radius: 3px; }
    pre {
      background: #F3EFE6;
      padding: 0.8em 1em;
      border-radius: 6px;
      border: 1px solid #E5DFD2;
      white-space: pre-wrap;
      word-break: break-word;
      page-break-inside: avoid;
      break-inside: avoid;
      margin: 0.8em 0;
    }
    pre code { background: transparent; padding: 0; }

    /* Tables — full-width, hairline, no mid-row breaks */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
      font-size: 0.92em;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    th, td {
      border: 1px solid #C7BFAE;
      padding: 0.4em 0.6em;
      text-align: left;
      vertical-align: top;
    }
    th { background: #F3EFE6; font-family: 'Inter', sans-serif; font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.04em; }
    tr { page-break-inside: avoid; break-inside: avoid; }

    /* Blockquotes / definitions */
    blockquote {
      border-left: 3px solid #0F766E;
      padding: 0.1em 0 0.1em 1em;
      color: #3F4147;
      font-style: italic;
      margin: 0.8em 0;
      page-break-inside: avoid;
    }

    /* Lists */
    ul, ol { padding-left: 1.6em; margin: 0 0 0.8em; }
    li { margin: 0.15em 0; }
    li > p { margin: 0; }

    /* Links */
    a { color: #0F766E; text-decoration: none; }

    /* KaTeX (math) — keep on-paper readable, no horizontal overflow */
    .katex { font-size: 1em !important; }
    .katex-display {
      margin: 0.9em 0 !important;
      page-break-inside: avoid;
      break-inside: avoid;
      overflow: visible;
    }
    .katex-display > .katex { white-space: normal !important; }

    /* Images / figures — never slice */
    img, figure, svg { max-width: 100%; height: auto; page-break-inside: avoid; break-inside: avoid; }
    figure { margin: 0.8em 0; }

    /* Meta header on each article */
    .meta { color: #6B6D75; font-size: 0.85em; margin: -0.6em 0 1em; font-family: 'Inter', sans-serif; }

    /* Cover sheet */
    .cover { padding: 4em 0 2em; text-align: center; page-break-after: always; break-after: page; }
    .cover h1 { border: 0; font-size: 2.6rem; padding-bottom: 0; margin-bottom: 0.4em; }
    .cover small { color: #6B6D75; font-family: 'Inter', sans-serif; font-size: 0.9em; }

    /* TOC */
    .toc-only { page-break-after: always; break-after: page; }
    .toc-only h2 { border: 0; font-size: 1.4rem; margin-top: 0; }
    .toc-only ol { line-height: 1.9; }

    /* Print-only refinements */
    @media print {
      .no-print { display: none !important; }
      body { font-size: 10.5pt; }
      a { color: #1A1B1F; text-decoration: underline; }
      a[href^="http"]::after { content: ' (' attr(href) ')'; font-size: 0.75em; color: #6B6D75; }
      /* Don't print the leading slug for internal links. */
      a[href^="/"]::after { content: ''; }
    }
    .no-print button {
      font-family: 'Inter', sans-serif;
      padding: 0.55em 1.1em;
      background: #0F766E;
      color: #fff;
      border: 0;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
    }
  `;

  const renderOne = (d) => `
    <article>
      <h1>${esc(d.title)}</h1>
      <p class="meta">Source: <a href="${esc(d.slug)}">${esc(d.slug)}</a> · ${esc(String(d.minutes))} min · ${esc(d.wordCount.toLocaleString())} words</p>
      ${mdToHtmlRich(d.markdown, marked, katex)}
    </article>
  `;

  const body = docs.map(renderOne).join('');

  return `<!doctype html>
<html><head>
<meta charset="utf-8"/>
<title>EduHub — printable bundle</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossorigin="anonymous"/>
<style>${css}</style>
</head><body>
<div class="no-print" style="text-align:center;margin:1.5em 0;">
  <button onclick="window.print()">Print / Save as PDF (A4)</button>
</div>
<section class="cover">
  <h1>EduHub</h1>
  <p><em>Combined bundle of ${docs.length} chapter${docs.length === 1 ? '' : 's'}</em></p>
  <small>${esc(new Date().toLocaleString())} · eduhub.khanalrajesh.com.np</small>
</section>
<section class="toc-only">
  <h2>Table of contents</h2>
  <ol>
    ${docs.map((d) => `<li>${esc(d.title)} <small style="color:#6B6D75">— ${esc(d.slug)}</small></li>`).join('\n    ')}
  </ol>
</section>
${body}
</body></html>`;
}

// Full GFM markdown -> HTML for the printable view. Handles tables, fenced
// code, blockquotes, lists, links — and pre-extracts LaTeX math ($...$ /
// $$...$$) so it can be rendered by KaTeX before marked sees it (otherwise
// marked treats the dollar signs as literal text). Strips YAML frontmatter
// and MDX import/export lines.
function mdToHtmlRich(src, marked, katex) {
  // 1. Drop YAML frontmatter if present (Docusaurus exposes only the body
  //    through the manifest, but be defensive — older bundles may include it).
  src = src.replace(/^---\n[\s\S]*?\n---\n+/, '');

  // 2. Strip MDX-only lines that CommonMark can't render.
  src = stripMdxImports(src);

  // 3. Extract code blocks first so we don't math-touch their contents.
  const codeBlocks = [];
  src = src.replace(/```[\s\S]*?```/g, (block) => {
    codeBlocks.push(block);
    return `@@CODEBLOCK_${codeBlocks.length - 1}@@`;
  });

  // 4. Extract math blocks (display first, then inline) and render via KaTeX.
  const mathBlocks = [];
  const renderMath = (tex, displayMode) => {
    try {
      return katex.renderToString(tex, {
        displayMode,
        throwOnError: false,
        strict: false,
        output: 'html',
      });
    } catch {
      return `<code>${tex}</code>`;
    }
  };
  src = src.replace(/\$\$([\s\S]+?)\$\$/g, (_m, tex) => {
    mathBlocks.push(`<div class="katex-display">${renderMath(tex.trim(), true)}</div>`);
    return `@@MATHBLOCK_${mathBlocks.length - 1}@@`;
  });
  src = src.replace(/(?<!\\)\$([^\n$]+?)\$/g, (_m, tex) => {
    mathBlocks.push(renderMath(tex.trim(), false));
    return `@@MATHBLOCK_${mathBlocks.length - 1}@@`;
  });

  // 5. Restore code blocks before handing to marked, so it can syntax-handle
  //    them. (Math placeholders stay in for now — they're plain text so
  //    marked leaves them as-is in paragraphs.)
  src = src.replace(/@@CODEBLOCK_(\d+)@@/g, (_m, i) => codeBlocks[Number(i)]);

  // 6. Parse the markdown.
  const renderer = new marked.Renderer();
  // Open external links in new tabs without breaking internal ones.
  const origLink = renderer.link.bind(renderer);
  renderer.link = (href, title, text) => {
    const html = origLink(href, title, text);
    if (/^https?:/.test(href)) {
      return html.replace('<a ', '<a target="_blank" rel="noopener noreferrer" ');
    }
    return html;
  };

  marked.setOptions({
    gfm: true,
    breaks: false,
    headerIds: false,
    mangle: false,
    renderer,
  });

  let html = marked.parse(src);

  // 7. Re-insert the rendered math.
  html = html.replace(/@@MATHBLOCK_(\d+)@@/g, (_m, i) => mathBlocks[Number(i)] || '');

  return html;
}

// Strip `import …` and `export …` lines that MDX uses but plain MD can't render.
function stripMdxImports(s) {
  return s
    .split(/\r?\n/)
    .filter((l) => !/^\s*import\s+[^\n]+from\s+['"][^'"]+['"];?\s*$/.test(l))
    .filter((l) => !/^\s*export\s+/.test(l))
    .join('\n');
}

function escMd(s) {
  return String(s).replace(/[*_`[\]]/g, (c) => '\\' + c);
}
function escQ(s) {
  return String(s).replace(/"/g, '\\"');
}
function safePath(p) {
  return p.replace(/[^A-Za-z0-9_\-./]/g, '_');
}
function stamp() {
  const d = new Date();
  const z = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}${z(d.getUTCMonth() + 1)}${z(d.getUTCDate())}-${z(d.getUTCHours())}${z(d.getUTCMinutes())}`;
}
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
