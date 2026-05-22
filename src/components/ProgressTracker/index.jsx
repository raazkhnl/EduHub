import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * ProgressTracker — LocalStorage-backed syllabus / module checklist.
 *
 * Persists per-document checklists across reloads with no backend. Read state
 * is scoped by an explicit `storageKey` (the doc author picks a stable slug),
 * so renaming/moving a file does NOT silently reset a student's progress —
 * we let the author migrate keys consciously.
 *
 * Usage:
 *   <ProgressTracker
 *     storageKey="msncs/i-i/cryptography/syllabus"
 *     title="Cryptography & Data Security — syllabus"
 *     items={[
 *       { id: 'ch1',  label: 'Ch 1 — Introduction to Cryptography' },
 *       { id: 'ch2',  label: 'Ch 2 — Symmetric & Asymmetric Cryptography' },
 *       { id: 'ch3',  label: 'Ch 3 — Hash Functions' },
 *       { id: 'ch4',  label: 'Ch 4 — Key Management & PKI' },
 *       { id: 'ch5',  label: 'Ch 5 — Data Security' },
 *       { id: 'ch6',  label: 'Ch 6 — Cybersecurity & Privacy' },
 *       { id: 'ch7',  label: 'Ch 7 — Emerging Trends' },
 *     ]}
 *   />
 */
export default function ProgressTracker(props) {
  // Hydration-safe: only render on the client (touches localStorage).
  return (
    <BrowserOnly fallback={<TrackerSkeleton title={props.title} items={props.items} />}>
      {() => <TrackerImpl {...props} />}
    </BrowserOnly>
  );
}

function TrackerImpl({ storageKey, title, items = [], showResetButton = true }) {
  const key = `ah:progress:${storageKey}`;
  const initial = React.useMemo(() => loadSet(key), [key]);
  const [done, setDone] = React.useState(initial);
  const [sparkleOn, setSparkleOn] = React.useState(false);

  // Seed `wasFull` from the *initial* state so revisiting an already-completed
  // checklist does NOT spuriously fire the sparkle. The sparkle should only
  // celebrate a user-driven transition during this session.
  const wasFullRef = React.useRef(items.length > 0 && initial.size === items.length);

  React.useEffect(() => {
    saveSet(key, done);
  }, [key, done]);

  React.useEffect(() => {
    if (items.length === 0) return undefined;
    const isFull = done.size === items.length;
    const transitioned = isFull && !wasFullRef.current;
    wasFullRef.current = isFull;
    if (!transitioned) return undefined;

    // Respect reduced motion.
    const m =
      typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (m && m.matches) return undefined;

    setSparkleOn(true);
    const t = setTimeout(() => setSparkleOn(false), 1400);
    return () => clearTimeout(t);
  }, [done, items.length]);

  const toggle = (id) => {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const reset = () => setDone(new Set());

  const pct = items.length === 0 ? 0 : Math.round((done.size / items.length) * 100);
  const isFull = items.length > 0 && done.size === items.length;

  return (
    <section
      className={`${styles.tracker} ${isFull ? styles.trackerFull : ''}`}
      aria-labelledby={`pt-${slugOf(storageKey)}`}
    >
      {sparkleOn && <Sparkle />}
      <header className={styles.head}>
        <h3 id={`pt-${slugOf(storageKey)}`} className={styles.title}>
          {title || 'Progress'}
          {isFull && <span className={styles.fullBadge}>Complete</span>}
        </h3>
        <div className={styles.stats}>
          <span className={styles.count}>
            {done.size}/{items.length}
          </span>
          <span className={styles.pct} aria-hidden="true">
            · {pct}%
          </span>
        </div>
      </header>

      <div
        className={styles.bar}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.barFill} style={{ width: `${pct}%` }} />
      </div>

      <ul className={styles.list}>
        {items.map((it) => {
          const checked = done.has(it.id);
          return (
            <li key={it.id} className={clsx(styles.item, checked && styles.itemDone)}>
              <label className={styles.label}>
                <input
                  type="checkbox"
                  className={styles.check}
                  checked={checked}
                  onChange={() => toggle(it.id)}
                  aria-label={it.label}
                />
                <span className={styles.text}>{it.label}</span>
                {it.hours != null && <span className={styles.hours}>{it.hours} hrs</span>}
              </label>
            </li>
          );
        })}
      </ul>

      {showResetButton && done.size > 0 && (
        <button type="button" onClick={reset} className={styles.reset}>
          Reset progress
        </button>
      )}
    </section>
  );
}

function TrackerSkeleton({ title, items = [] }) {
  return (
    <section className={styles.tracker} aria-busy="true">
      <header className={styles.head}>
        <h3 className={styles.title}>{title || 'Progress'}</h3>
        <div className={styles.stats}>
          <span className={styles.count}>0/{items.length}</span>
        </div>
      </header>
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: 0 }} />
      </div>
    </section>
  );
}

const loadSet = (key) => {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
};
const saveSet = (key, set) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(Array.from(set)));
  } catch {}
};
const slugOf = (s) =>
  String(s)
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase();

// Sparkle — tiny, tasteful celebration on completion. Six dots fan out and fade.
function Sparkle() {
  const dots = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div className={styles.sparkleWrap} aria-hidden="true">
      {dots.map((i) => {
        const angle = (i / dots.length) * Math.PI * 2;
        const x = Math.cos(angle) * 60;
        const y = Math.sin(angle) * 60;
        return (
          <span
            key={i}
            className={styles.spark}
            style={{ '--dx': `${x}px`, '--dy': `${y}px`, '--delay': `${i * 18}ms` }}
          />
        );
      })}
    </div>
  );
}
