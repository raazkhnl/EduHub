import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

/**
 * FocusMode — distraction-free reading toggle.
 *
 * Adds `.focus-mode` to <html>; CSS in custom.css hides the navbar, sidebar,
 * footer, pagination, announcement bar, and narrows the article column.
 *
 * Keyboard shortcut: ⇧ + F (Shift+F) toggles. Esc exits.
 * State persists across reloads in localStorage so a reading session survives
 * accidental refreshes.
 *
 * Mount once at the layout root (it renders a small floating button only when
 * the user is on a doc page).
 */
const STORAGE_KEY = 'ah:focus-mode';

export default function FocusMode() {
  return (
    <BrowserOnly>{() => <FocusModeImpl />}</BrowserOnly>
  );
}

function FocusModeImpl() {
  const [on, setOn] = React.useState(() => {
    try { return window.localStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
  });

  // Sync DOM + storage whenever state changes
  React.useEffect(() => {
    const root = document.documentElement;
    if (on) root.classList.add('focus-mode'); else root.classList.remove('focus-mode');
    try { window.localStorage.setItem(STORAGE_KEY, on ? '1' : '0'); } catch {}
  }, [on]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e) => {
      // Ignore typing inside inputs/textareas/contenteditable
      const tgt = e.target;
      const typing = tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.isContentEditable);
      if (typing) return;
      if (e.key === 'Escape' && on) setOn(false);
      if (e.shiftKey && (e.key === 'F' || e.key === 'f')) {
        e.preventDefault();
        setOn((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [on]);

  return (
    <button
      type="button"
      className={styles.fab}
      data-on={on ? 'true' : 'false'}
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      title={on ? 'Exit focus mode (Esc or Shift+F)' : 'Focus mode (Shift+F)'}
    >
      {on ? <IconExit /> : <IconEnter />}
      <span className={styles.label}>{on ? 'Exit focus' : 'Focus'}</span>
    </button>
  );
}

const IconEnter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h6M4 4v6M20 4h-6M20 4v6M4 20h6M4 20v-6M20 20h-6M20 20v-6"/>
  </svg>
);
const IconExit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 4H4v6M14 4h6v6M10 20H4v-6M14 20h6v-6"/>
  </svg>
);
