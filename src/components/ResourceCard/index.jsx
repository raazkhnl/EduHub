import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

/**
 * ResourceCard — the workhorse of the document page.
 *
 * Renders a downloadable / viewable academic asset (PDF, slides, lab manual,
 * past paper, dataset, code archive) with the same shape regardless of source.
 * One mental model for the reader: title, what it is, how big, how to open it.
 *
 * Usage:
 *   <ResourceCard
 *     title="Cryptography — 2079 Past Paper"
 *     file="/files/ioe/msncs/i-i/cryptography/past-papers/2079.pdf"
 *     type="pdf"
 *     tags={['PAST PAPER', '2079']}
 *     size="412 KB"
 *     pages={4}
 *     description="Question paper from the regular 2079 attempt — covers DES, RSA, PKI."
 *     inlineView
 *   />
 *
 * Props:
 *   title       string  required   Display title.
 *   file        string  required   URL or site-relative path to the asset.
 *   type        enum    optional   pdf|doc|slide|code|dataset|image|link|video  (default: 'link')
 *   tags        string[]optional   Small uppercase badges, e.g. ['LAB','2080'].
 *   description string  optional   One-line explainer below the title.
 *   size        string  optional   Human-readable size, e.g. "1.2 MB".
 *   pages       number  optional   PDF/slide page count.
 *   author      string  optional   Original author / source.
 *   updated     string  optional   ISO date (YYYY-MM-DD).
 *   inlineView  bool    optional   Show "View" button that opens in <iframe>.
 *   downloadAs  string  optional   Suggested download filename.
 *   className   string  optional   Extra class on the root.
 */
export default function ResourceCard({
  title,
  file,
  type = 'link',
  tags = [],
  description,
  size,
  pages,
  author,
  updated,
  inlineView = false,
  downloadAs,
  className,
}) {
  const href = useBaseUrl(file);
  const [open, setOpen] = React.useState(false);
  const Icon = TYPE_ICON[type] || TYPE_ICON.link;
  const typeLabel = TYPE_LABEL[type] || 'File';

  return (
    <figure className={clsx(styles.card, className)} data-type={type}>
      <div className={styles.body}>
        <div className={styles.iconWrap} aria-hidden="true"><Icon /></div>

        <div className={styles.text}>
          <div className={styles.headRow}>
            <h3 className={styles.title}>{title}</h3>
            {tags.length > 0 && (
              <ul className={styles.tags}>
                {tags.map((t) => (
                  <li key={t} className={styles.tag}>{t}</li>
                ))}
              </ul>
            )}
          </div>

          {description && <p className={styles.desc}>{description}</p>}

          <dl className={styles.meta}>
            <div><dt>Type</dt><dd>{typeLabel}</dd></div>
            {size    && <div><dt>Size</dt><dd>{size}</dd></div>}
            {pages   && <div><dt>Pages</dt><dd>{pages}</dd></div>}
            {author  && <div><dt>Author</dt><dd>{author}</dd></div>}
            {updated && <div><dt>Updated</dt><dd><time dateTime={updated}>{updated}</time></dd></div>}
          </dl>

          <div className={styles.actions}>
            {inlineView && (
              <button
                type="button"
                className={clsx(styles.btn, styles.btnGhost)}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={`rc-preview-${slug(title)}`}
              >
                {open ? 'Hide preview' : 'Inline view'}
              </button>
            )}
            {/* For `download`, React renders the literal value as the
                filename hint. `download` (no value) → use original name;
                `download="foo.pdf"` → suggest "foo.pdf"; `download={true}`
                would incorrectly serialise to "true". */}
            <a
              className={clsx(styles.btn, styles.btnPrimary)}
              href={href}
              {...(downloadAs ? { download: downloadAs } : { download: '' })}
              rel="noopener noreferrer"
            >
              Download
            </a>
            <a
              className={clsx(styles.btn, styles.btnGhost)}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in new tab ↗
            </a>
          </div>
        </div>
      </div>

      {inlineView && open && (
        <div className={styles.preview} id={`rc-preview-${slug(title)}`}>
          <iframe src={href} title={`Preview — ${title}`} loading="lazy" />
        </div>
      )}
    </figure>
  );
}

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const TYPE_LABEL = {
  pdf: 'PDF document',
  doc: 'Word document',
  slide: 'Slide deck',
  code: 'Code archive',
  dataset: 'Dataset',
  image: 'Image',
  video: 'Video',
  link: 'External resource',
};

// SVG icons — inline, currentColor, no external font.
const TYPE_ICON = {
  pdf: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <path d="M14 2v6h6"/>
      <text x="6" y="18" fontSize="6" fill="currentColor" stroke="none" fontFamily="monospace" fontWeight="700">PDF</text>
    </svg>
  ),
  doc: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <path d="M14 2v6h6"/>
      <path d="M8 13h8M8 17h5"/>
    </svg>
  ),
  slide: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="18" height="13" rx="2"/>
      <path d="M8 20h8M12 17v3"/>
    </svg>
  ),
  code: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
    </svg>
  ),
  dataset: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/>
    </svg>
  ),
  image: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <circle cx="9" cy="10" r="2"/>
      <path d="M21 16l-5-5-9 9"/>
    </svg>
  ),
  video: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="6" width="14" height="12" rx="2"/>
      <path d="M17 10l5-3v10l-5-3z"/>
    </svg>
  ),
  link: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 6"/>
      <path d="M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 18"/>
    </svg>
  ),
};
