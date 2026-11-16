import { useEffect, useState } from 'react';

/** Renders a phrase with its closing full stop pulled slightly closer, to suit the italic typeface. */
const withTightStop = (phrase: string) =>
  phrase.endsWith('.') ? (
    <>
      {phrase.slice(0, -1)}
      <span className="-ml-[0.07em]">.</span>
    </>
  ) : (
    phrase
  );

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Cycles through a list of phrases with a slow crossfade. All phrases share one grid cell, so the
 * line keeps the width of the longest and nothing around it shifts. Screen readers and the
 * prerendered HTML get the first phrase only. Under reduced motion it stays on the first phrase.
 */
export const RotatingPhrase = ({ phrases, intervalMs = 3200 }: { phrases: string[]; intervalMs?: number }) => {
  const [active, setActive] = useState(0);
  // The other phrases are added only after the page loads, so the prerendered heading reads as one sentence.
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || phrases.length < 2) return;
    setRotating(true);
    const timer = window.setInterval(() => setActive((index) => (index + 1) % phrases.length), intervalMs);
    return () => window.clearInterval(timer);
  }, [phrases.length, intervalMs]);

  if (!rotating) return <>{withTightStop(phrases[0])}</>;

  return (
    <>
      <span className="sr-only">{phrases[0]}</span>
      <span aria-hidden className="inline-grid align-baseline">
        {phrases.map((phrase, index) => (
          <span
            key={phrase}
            // The outgoing phrase leaves quickly; the incoming one waits for it, so the two never overlap.
            className={`col-start-1 row-start-1 whitespace-nowrap transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
              index === active
                ? 'translate-y-0 opacity-100 blur-0 delay-300 duration-700'
                : index === (active - 1 + phrases.length) % phrases.length
                  ? '-translate-y-3 opacity-0 blur-[2px] duration-300'
                  : 'translate-y-3 opacity-0 blur-[2px] duration-300'
            }`}
          >
            {withTightStop(phrase)}
          </span>
        ))}
      </span>
    </>
  );
};

const lagosTime = () =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());

/**
 * Live local time at the Lagos office. Rendered only after the page loads, so the prerendered
 * HTML never shows a stale build-time clock.
 */
export const LagosClock = ({ className = '' }: { className?: string }) => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(lagosTime());
    const timer = window.setInterval(() => setTime(lagosTime()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className={className}>
      Lagos<span className="mx-2 opacity-50">·</span><time className="tabular-nums" aria-label={time ? `Local time in Lagos, ${time}` : undefined}>{time ?? '--:--'}</time> WAT
    </p>
  );
};
