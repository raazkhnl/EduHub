import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

/**
 * KeyboardHelp — press "?" to toggle a modal listing keyboard shortcuts.
 * Mount once at layout root.
 *
 * Modal behaviour:
 *   - opens on `?` key
 *   - closes on `Esc` or backdrop click
 *   - moves focus to the close button on open, restores focus on close
 *   - traps Tab within the dialog while open
 */
export default function KeyboardHelp() {
  return <BrowserOnly fallback={null}>{() => <Impl />}</BrowserOnly>;
}

function Impl() {
  const { siteConfig } = useDocusaurusContext();
  const enabled = siteConfig?.customFields?.features?.keyboardHelp !== false;
  const [open, setOpen] = React.useState(false);
  const dialogRef = React.useRef(null);
  const closeBtnRef = React.useRef(null);
  const lastFocusedRef = React.useRef(null);

  // Global ?/Esc handler. We keep the listener mounted always (cheap) and read
  // `open` via a ref so we don't have to re-bind on every state change.
  const openRef = React.useRef(open);
  React.useEffect(() => {
    openRef.current = open;
  }, [open]);

  React.useEffect(() => {
    if (!enabled) return undefined;
    const onKey = (e) => {
      const tgt = e.target;
      const typing =
        tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.isContentEditable);
      if (typing) return;
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape' && openRef.current) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled]);

  // Focus management on open/close
  React.useEffect(() => {
    if (!open) return undefined;
    lastFocusedRef.current = document.activeElement;
    // Defer to next frame so the modal is in the DOM.
    const id = requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus();
      }
    };
  }, [open]);

  // Focus trap: keep Tab inside the dialog while open
  const onDialogKeyDown = (e) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const focusables = dialogRef.current.querySelectorAll(
      'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])',
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!enabled || !open) return null;

  return (
    <div className={styles.backdrop} onClick={() => setOpen(false)} role="presentation">
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="kbd-title"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onDialogKeyDown}
      >
        <div className={styles.head}>
          <h2 id="kbd-title" className={styles.title}>
            Keyboard shortcuts
          </h2>
          <button
            type="button"
            ref={closeBtnRef}
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Close keyboard shortcuts"
          >
            ×
          </button>
        </div>
        <dl className={styles.list}>
          <Row keys={['⌘', 'K']} altKeys={['Ctrl', 'K']} label="Open search" />
          <Row keys={['Shift', 'F']} label="Toggle Focus Mode" />
          <Row keys={['?']} label="Open this help" />
          <Row keys={['Esc']} label="Close Focus Mode / this help" />
        </dl>
        <p className={styles.foot}>
          Shortcuts ignore input fields. Press <kbd className={styles.kbd}>Esc</kbd> to close.
        </p>
      </div>
    </div>
  );
}

function Row({ keys, altKeys, label }) {
  return (
    <div className={styles.row}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.combo}>
        {keys.map((k, i) => (
          <kbd key={i} className={styles.kbd}>
            {k}
          </kbd>
        ))}
        {altKeys && <span className={styles.sep}>or</span>}
        {altKeys?.map((k, i) => (
          <kbd key={'a' + i} className={styles.kbd}>
            {k}
          </kbd>
        ))}
      </dd>
    </div>
  );
}
