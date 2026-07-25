'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Tracks a media query with an SSR-safe initial value.
 * Returns `false` on the server and during hydration, then corrects on mount —
 * this avoids a hydration mismatch while still reacting to live changes.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/**
 * True when the user has asked the OS to reduce motion.
 * Components use this to skip decorative animation entirely rather than merely
 * shortening it — a fast animation is still motion.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export type ScrollState = {
  /** 'up' | 'down' — drives the auto-hiding navigation. */
  direction: 'up' | 'down';
  /** True once scrolled past the threshold, used to condense the nav. */
  scrolled: boolean;
  /** True while within the first viewport, used to hide the scroll cue. */
  atTop: boolean;
};

/**
 * Scroll direction and position, sampled inside rAF.
 *
 * The listener is passive and does no work of its own — it only flags a frame.
 * All reads happen once per animation frame, so fast scrolling cannot queue up
 * hundreds of synchronous layout reads.
 */
export function useScrollState(threshold = 12): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: 'up',
    scrolled: false,
    atTop: true,
  });
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;

      setState((prev) => {
        // Ignore sub-threshold jitter, and never hide the nav near the very top.
        const direction =
          Math.abs(delta) < threshold ? prev.direction : delta > 0 && y > 120 ? 'down' : 'up';
        const scrolled = y > 24;
        const atTop = y < 80;

        if (
          direction === prev.direction &&
          scrolled === prev.scrolled &&
          atTop === prev.atTop
        ) {
          return prev; // Bail out to avoid a pointless re-render.
        }
        return { direction, scrolled, atTop };
      });

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return state;
}

/**
 * Determines which section is currently in view.
 *
 * Uses one IntersectionObserver over all sections rather than a scroll handler
 * doing getBoundingClientRect per section per frame. The rootMargin biases the
 * "active" band toward the upper-middle of the viewport, which matches where a
 * reader's attention actually sits.
 */
export function useActiveSection(sectionIds: readonly string[], fallback = ''): string {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) return;

        // Whichever tracked section occupies the most of the band wins.
        let best = '';
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.4, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

/**
 * Locks body scroll while an overlay is open, compensating for the scrollbar width
 * so the page behind does not shift horizontally when it disappears.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [locked]);
}

/**
 * Copy-to-clipboard with a self-resetting "copied" flag.
 * Falls back silently if the Clipboard API is unavailable (insecure origins).
 */
export function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetAfter);
        return true;
      } catch {
        return false;
      }
    },
    [resetAfter],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return { copied, copy };
}

/** Registers a global hotkey. Ignores keystrokes originating inside form fields. */
export function useHotkey(
  key: string,
  handler: () => void,
  options: { meta?: boolean; enabled?: boolean } = {},
) {
  const { meta = false, enabled = true } = options;
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isFormField =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (isFormField && key !== 'Escape') return;
      if (event.key.toLowerCase() !== key.toLowerCase()) return;
      if (meta && !(event.metaKey || event.ctrlKey)) return;
      if (!meta && (event.metaKey || event.ctrlKey)) return;

      event.preventDefault();
      handlerRef.current();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, meta, enabled]);
}

/** True once the component has mounted on the client. Guards browser-only rendering. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
