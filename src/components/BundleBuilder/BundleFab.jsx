import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useBundle } from './store';
import styles from './BundleFab.module.css';

/**
 * BundleFab — fixed floating pill in the bottom-right showing "{n} in bundle".
 * Hidden when the selection is empty or the feature is disabled.
 * Tucks above the Focus Mode FAB visually.
 */
export default function BundleFab() {
  return <BrowserOnly fallback={null}>{() => <Impl />}</BrowserOnly>;
}

function Impl() {
  const { siteConfig } = useDocusaurusContext();
  const enabled = siteConfig?.customFields?.features?.bundleBuilder !== false;
  const { count } = useBundle();

  if (!enabled || count === 0) return null;

  return (
    <Link
      to="/bundle"
      className={styles.fab}
      aria-label={`Open Bundle Builder — ${count} pages selected`}
      title="Open Bundle Builder"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
      </svg>
      <span>{count} in bundle</span>
    </Link>
  );
}
