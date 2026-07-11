import { useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';
import { VISLYBLUQ_STORY_YOUTUBE_ID } from '../config/siteVideo';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const storyPoints = [
  'We help founders and growing businesses choose the right technology path before they build.',
  'We design websites, web apps, dashboards, portals, automation workflows, and AI-powered tools.',
  'Our work combines consultation, product thinking, engineering, data, and practical AI implementation.',
];

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasVideo = Boolean(VISLYBLUQ_STORY_YOUTUBE_ID.trim());

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const embedSrc = hasVideo
    ? `https://www.youtube-nocookie.com/embed/${VISLYBLUQ_STORY_YOUTUBE_ID.trim()}?autoplay=1&rel=0`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-label="Close video"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl animate-[slideInRight_0.45s_ease-out_both]">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 sm:-right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {embedSrc ? (
          <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
            <iframe
              src={embedSrc}
              title="VislyBluq story video"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-[#071423] shadow-2xl">
            <div className="relative flex h-full flex-col justify-between bg-[radial-gradient(circle_at_18%_20%,rgba(119,216,255,0.22),transparent_26%),linear-gradient(135deg,#071423,#10265c_55%,#071423)] p-6 text-white sm:p-8">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#77d8ff]">Company Story</p>
                  <h2 id="video-modal-title" className="mt-3 max-w-xl text-3xl font-black leading-tight sm:text-5xl">
                    Meet VislyBluq
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                    A short story-style preview of who we are and what we help businesses build.
                  </p>
                </div>
                <div className="hidden h-28 w-28 items-center justify-center rounded-full border border-[#77d8ff]/30 bg-[#77d8ff]/10 shadow-[0_0_40px_rgba(119,216,255,0.3)] sm:flex">
                  <Play className="ml-1 h-12 w-12 fill-current text-[#adc6ff]" />
                </div>
              </div>
              <div className="relative grid gap-3 md:grid-cols-3">
                {storyPoints.map((point, index) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
                    <p className="text-xs font-bold text-[#77d8ff]">0{index + 1}</p>
                    <p className="mt-2 text-sm leading-6 text-white/78">{point}</p>
                  </div>
                ))}
              </div>
              <div className="relative flex items-center gap-3 text-xs text-white/50">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#77d8ff]" />
                Presenter video slot ready. Add a YouTube ID in siteVideo.ts when the recorded company video is available.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
