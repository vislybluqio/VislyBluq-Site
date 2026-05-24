import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { VISLYBLUQ_STORY_YOUTUBE_ID } from '../config/siteVideo';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      <div className="relative z-10 w-full max-w-4xl">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 sm:-right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
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
          <div className="aspect-video w-full rounded-2xl bg-visly-navy border border-white/10 flex flex-col items-center justify-center p-8 text-center shadow-2xl">
            <h2 id="video-modal-title" className="text-xl font-semibold text-white mb-2">
              Video coming soon
            </h2>
            <p className="text-gray-300 text-sm max-w-md">
              Our story video is on the way. Check back soon to hear directly from the VislyBluq team.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
