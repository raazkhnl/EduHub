import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

/**
 * ScrollProgress — a 2px bar pinned just below the navbar that fills as the
 * reader scrolls a doc page. Hidden on the homepage and on `/bundle`.
 *
 * Uses requestAnimationFrame to avoid jank on long pages.
 */
export default function ScrollProgress() {
  return <BrowserOnly fallback={null}>{() => <Impl />}</BrowserOnly>;
}

function Impl() {
  const { siteConfig } = useDocusaurusContext();
  const enabled = siteConfig?.customFields?.features?.scrollProgress !== false;
  const location = useLocation();
  const ref = React.useRef(null);

  // Hide on home + on pages that are themselves panels (bundle).
  const visible = enabled && location.pathname !== '/' && !location.pathname.startsWith('/bundle');

  React.useEffect(() => {
    if (!visible) return undefined;
    let raf = 0;
    const update = () => {
      const docEl = document.documentElement;
      const scrolled = docEl.scrollTop || document.body.scrollTop;
      const height   = (docEl.scrollHeight - docEl.clientHeight) || 1;
      const pct = Math.min(100, Math.max(0, (scrolled / height) * 100));
      if (ref.current) ref.current.style.transform = `scaleX(${pct / 100})`;
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [visible, location.pathname]);

  if (!visible) return null;
  return <div className={styles.bar} aria-hidden="true"><div ref={ref} className={styles.fill}/></div>;
}
