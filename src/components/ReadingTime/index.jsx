import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

/**
 * ReadingTime — counts words inside the nearest `.theme-doc-markdown` article
 * and shows an estimate. Mount once near the top of any chapter via MDX:
 *
 *   <ReadingTime />
 *
 * Or rely on the auto-mount inside the swizzled DocItem footer.
 *
 * Words-per-minute: 220 (standard prose). Override with `wpm={…}` if needed.
 *
 * Recomputes whenever the URL changes (covers SPA navigation between docs).
 */
export default function ReadingTime({ wpm = 220, className }) {
  return (
    <BrowserOnly fallback={<span className={styles.skeleton}>· min read</span>}>
      {() => <Impl wpm={wpm} className={className} />}
    </BrowserOnly>
  );
}

function Impl({ wpm, className }) {
  const { siteConfig } = useDocusaurusContext();
  const enabled = siteConfig?.customFields?.features?.readingTime !== false;
  const location = useLocation();
  const [minutes, setMinutes] = React.useState(null);

  React.useEffect(() => {
    if (!enabled) { setMinutes(null); return undefined; }
    // Wait one frame so the new doc's article has rendered into the DOM.
    const id = requestAnimationFrame(() => {
      const root = document.querySelector('.theme-doc-markdown') || document.querySelector('article');
      if (!root) { setMinutes(null); return; }
      const text = root.innerText || root.textContent || '';
      const words = text.split(/\s+/).filter(Boolean).length;
      setMinutes(words === 0 ? null : Math.max(1, Math.round(words / wpm)));
    });
    return () => cancelAnimationFrame(id);
  }, [enabled, wpm, location.pathname]);

  if (!enabled || minutes == null) return null;
  return <span className={[styles.tag, className].filter(Boolean).join(' ')}>· ~{minutes} min read</span>;
}
