import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './404.module.css';

/**
 * Custom 404 — matches the site's Scholarly-Minimalist tone instead of the
 * generic Docusaurus default. Shown for any unmatched route at runtime and at
 * build time as `build/404.html` (which GitHub Pages serves on 404).
 */
export default function NotFound() {
  return (
    <Layout
      title="404 — page not found"
      description="The page you were looking for doesn't exist (or hasn't been written yet)."
    >
      <main className={styles.wrap}>
        <p className={styles.eyebrow}>HTTP 404 · Not found</p>
        <h1 className={styles.h1}>This chapter doesn't exist yet.</h1>
        <p className={styles.lede}>
          Either the URL is wrong, or this is content that hasn't been written. Most likely, it's
          the second — EduHub is curriculum-by-curriculum.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.btnPrimary}>
            Back to home
          </Link>
          <Link to="/contribute" className={styles.btnGhost}>
            How to add this content →
          </Link>
        </div>

        <section className={styles.suggest}>
          <h2 className={styles.h2}>Try one of these</h2>
          <ul className={styles.suggestList}>
            <li>
              <Link to="/ioe/msncs">IOE M.Sc. — Networks &amp; Cybersecurity</Link>
            </li>
            <li>
              <Link to="/ioe">IOE Bachelor programs (BCT, BCE, BEX, BEL)</Link>
            </li>
            <li>
              <Link to="/ctevt">CTEVT diploma programs</Link>
            </li>
            <li>
              <Link to="/bundle">Bundle Builder</Link>
            </li>
            <li>
              <Link to="/roadmap">Roadmap &amp; what's coming next</Link>
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
