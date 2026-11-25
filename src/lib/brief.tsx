import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { services } from '../data/services';

/**
 * "Your brief" — a shortlist of services the visitor collects while browsing.
 * Stored on this device only (localStorage); never sent anywhere until the visitor
 * chooses to send it via WhatsApp, email or the contact form.
 */
interface BriefState {
  items: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  add: (slug: string) => void;
  addMany: (slugs: string[]) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  /** Increments whenever something is added — used for the header "bump" animation and toast. */
  pulse: number;
  lastAdded: string | null;
}

const BriefContext = createContext<BriefState | null>(null);
const KEY = 'bfouru.brief.v1';
const valid = new Set(services.map((s) => s.slug));

export function BriefProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const loaded = useRef(false);

  // Load after hydration so server and client markup match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const saved = parsed.filter((s): s is string => typeof s === 'string' && valid.has(s));
          // Merge (don't overwrite): a page may already have added items before this effect ran,
          // e.g. /contact?service=… adds its service during the child's mount effect.
          setItems((prev) => [...saved, ...prev.filter((s) => !saved.includes(s))]);
        }
      }
    } catch {
      /* storage unavailable (private mode etc.) — brief simply won't persist */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const bump = (slug: string | null) => {
    setPulse((p) => p + 1);
    setLastAdded(slug);
  };

  const add = useCallback((slug: string) => {
    if (!valid.has(slug)) return;
    setItems((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
    bump(slug);
  }, []);

  const addMany = useCallback((slugs: string[]) => {
    setItems((prev) => {
      const next = [...prev];
      slugs.forEach((s) => valid.has(s) && !next.includes(s) && next.push(s));
      return next;
    });
    bump(null);
  }, []);

  const remove = useCallback((slug: string) => setItems((prev) => prev.filter((s) => s !== slug)), []);

  const toggle = useCallback(
    (slug: string) => {
      if (items.includes(slug)) remove(slug);
      else add(slug);
    },
    [items, add, remove],
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<BriefState>(
    () => ({
      items,
      has: (slug) => items.includes(slug),
      toggle,
      add,
      addMany,
      remove,
      clear,
      open,
      setOpen,
      pulse,
      lastAdded,
    }),
    [items, toggle, add, addMany, remove, clear, open, pulse, lastAdded],
  );

  return <BriefContext.Provider value={value}>{children}</BriefContext.Provider>;
}

export function useBrief() {
  const ctx = useContext(BriefContext);
  if (!ctx) throw new Error('useBrief must be used inside <BriefProvider>');
  return ctx;
}
