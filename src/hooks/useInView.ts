import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

/**
 * Reports once when the element first scrolls into view, then stops observing.
 * Pair with the `.reveal` / `.reveal-item` classes in index.css, which skip the
 * animation entirely under prefers-reduced-motion.
 */
export const useInView = <T extends Element>({ rootMargin = '0px 0px -10% 0px', threshold = 0.15 } = {}) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return [ref, inView] as const;
};

/** Inline style for the nth `.reveal-item`, staggering its entry. */
export const revealDelay = (index: number, stepMs = 90) => ({ '--reveal-delay': `${index * stepMs}ms` }) as CSSProperties;
