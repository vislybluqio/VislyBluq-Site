import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { X } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

const DELAY_MS = 5000;
const STORAGE_KEY = 'visly-newsletter-popup';
const SNOOZE_DAYS = 30;
// Pages where a pop-up would interrupt someone filling in a form or reading legal text.
const SKIP_PATHS = ['/contact', '/apply', '/privacy', '/terms'];

type Stored = { subscribed?: boolean; dismissedAt?: number };

const readStored = (): Stored => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Stored;
  } catch {
    return {};
  }
};

const writeStored = (value: Stored) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Private mode or blocked storage: the pop-up may show again next visit, which is acceptable.
  }
};

const shouldShow = () => {
  const { subscribed, dismissedAt } = readStored();
  if (subscribed) return false;
  return !dismissedAt || Date.now() - dismissedAt > SNOOZE_DAYS * 24 * 60 * 60 * 1000;
};

/**
 * Newsletter invitation that opens a few seconds into a visit. Shown at most once every 30 days
 * after it's closed, never again after subscribing, and not on form or legal pages.
 */
const NewsletterPopup = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const skipped = SKIP_PATHS.includes(pathname);

  useEffect(() => {
    if (!shouldShow()) return;
    const timer = window.setTimeout(() => setIsOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const visible = isOpen && !skipped;

  useEffect(() => {
    if (!visible) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.();
    };
  }, [visible]);

  const close = () => {
    setIsOpen(false);
    if (!readStored().subscribed) writeStored({ dismissedAt: Date.now() });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
      <button type="button" aria-label="Close newsletter sign-up" onClick={close} className="absolute inset-0 bg-[#030f1e]/70 backdrop-blur-sm" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-popup-title"
        tabIndex={-1}
        className="relative w-full max-w-lg animate-[popupIn_0.35s_cubic-bezier(0.16,1,0.3,1)_both] rounded-3xl border border-visly-cyan/15 bg-visly-surface p-6 shadow-2xl outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-visly-cyan">Technical signals</p>
        <h2 id="newsletter-popup-title" className="mt-3 pr-8 text-2xl font-bold text-white sm:text-3xl">Get our build notes.</h2>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Strategy, AI, architecture, and product engineering insights from the VislyBluq team.
        </p>
        <NewsletterSignup className="mt-6" onSubscribed={() => writeStored({ subscribed: true })} />
      </div>
    </div>
  );
};

export default NewsletterPopup;
