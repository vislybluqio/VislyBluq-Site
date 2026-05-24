import { useState } from 'react';
import { Play } from 'lucide-react';
import VideoModal from './VideoModal';
import {
  VISLYBLUQ_STORY_LABEL,
  VISLYBLUQ_STORY_SUBTITLE,
} from '../config/siteVideo';

const StoryVideoCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="group relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-visly-blue/20 ring-1 ring-white/20 transition-transform duration-300 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-visly-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-visly-dark text-left"
        aria-label={`${VISLYBLUQ_STORY_LABEL} — open video`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-visly-navy via-visly-blue to-visly-cyan" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-4 right-4 h-20 w-20 rounded-full bg-visly-cyan/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full bg-white/10 blur-xl pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6">
          <div className="relative mb-3 sm:mb-4">
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-60 group-hover:opacity-90 scale-100" />
            <span className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/95 text-visly-navy shadow-lg group-hover:scale-105 transition-transform">
              <Play className="h-7 w-7 ml-1 fill-current" aria-hidden />
            </span>
          </div>
          <p className="text-white font-semibold text-sm sm:text-base text-center px-2">
            {VISLYBLUQ_STORY_LABEL}
          </p>
          <p className="text-white/80 text-xs sm:text-sm mt-1 text-center px-3">
            {VISLYBLUQ_STORY_SUBTITLE}
          </p>
        </div>
      </button>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default StoryVideoCard;
