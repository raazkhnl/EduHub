// ============================================================================
// Bundle store
// ----------------------------------------------------------------------------
// A tiny pub/sub backed by sessionStorage so the "Add to bundle" button on any
// chapter page and the /bundle page share a single selection. We don't pull in
// Zustand or Redux — this is the only piece of cross-route state in the app.
// ============================================================================

const KEY = 'ah:bundle:selection';
const listeners = new Set();

const isBrowser = typeof window !== 'undefined';

function read() {
  if (!isBrowser) return [];
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

function write(arr) {
  if (!isBrowser) return;
  try { window.sessionStorage.setItem(KEY, JSON.stringify(arr)); } catch {}
  listeners.forEach((fn) => fn(arr));
}

export const bundleStore = {
  get: read,

  has(slug) {
    return read().includes(slug);
  },

  add(slug) {
    const cur = read();
    if (cur.includes(slug)) return cur;
    const next = [...cur, slug];
    write(next);
    return next;
  },

  remove(slug) {
    const next = read().filter((s) => s !== slug);
    write(next);
    return next;
  },

  toggle(slug) {
    return read().includes(slug) ? bundleStore.remove(slug) : bundleStore.add(slug);
  },

  set(arr) {
    write(Array.from(new Set(arr)));
  },

  clear() {
    write([]);
  },

  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

// React hook on top of the store. Returns [selection, helpers].
import { useEffect, useState, useCallback } from 'react';

export function useBundle() {
  const [sel, setSel] = useState(() => read());

  useEffect(() => {
    const unsub = bundleStore.subscribe(setSel);
    // Sync once on mount in case sessionStorage was touched while unmounted.
    setSel(read());
    return unsub;
  }, []);

  const add    = useCallback((slug) => bundleStore.add(slug), []);
  const remove = useCallback((slug) => bundleStore.remove(slug), []);
  const toggle = useCallback((slug) => bundleStore.toggle(slug), []);
  const set    = useCallback((arr)  => bundleStore.set(arr),    []);
  const clear  = useCallback(()     => bundleStore.clear(),     []);
  const has    = useCallback((slug) => sel.includes(slug),      [sel]);

  return { selection: sel, add, remove, toggle, set, clear, has, count: sel.length };
}
