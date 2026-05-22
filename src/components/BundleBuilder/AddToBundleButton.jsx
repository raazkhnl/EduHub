import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import { useBundle } from './store';
import styles from './AddToBundleButton.module.css';

/**
 * AddToBundleButton — small inline toggle that adds the current page (by
 * pathname) to the user's Bundle selection. Use it inside any MDX file:
 *
 *   import AddToBundleButton from '@site/src/components/BundleBuilder/AddToBundleButton';
 *   <AddToBundleButton />
 *
 * It is also exposed as the unqualified <AddToBundleButton /> via MDXComponents.
 */
export default function AddToBundleButton({ slug, label, className }) {
  return (
    <BrowserOnly fallback={null}>
      {() => <Impl slug={slug} label={label} className={className} />}
    </BrowserOnly>
  );
}

function Impl({ slug, label = 'Add to bundle', className }) {
  const { siteConfig } = useDocusaurusContext();
  const enabled = siteConfig?.customFields?.features?.bundleBuilder !== false;
  const location = useLocation();
  const targetSlug = slug || location.pathname;
  const { has, toggle } = useBundle();
  const active = has(targetSlug);

  if (!enabled) return null;

  return (
    <button
      type="button"
      onClick={() => toggle(targetSlug)}
      className={clsx(styles.btn, active && styles.btnActive, className)}
      aria-pressed={active}
      title={active ? 'Remove from bundle' : 'Add this page to your bundle'}
    >
      {active ? <IconCheck /> : <IconPlus />}
      <span className={styles.label}>{active ? 'In bundle' : label}</span>
    </button>
  );
}

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);
