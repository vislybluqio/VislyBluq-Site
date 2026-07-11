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
        className="group relative min-h-[440px] w-full overflow-hidden rounded-[2rem] border border-visly-cyan/25 bg-[#071423] text-left shadow-2xl shadow-visly-blue/25 ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:border-visly-cyan/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-visly-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-visly-dark"
        aria-label={`${VISLYBLUQ_STORY_LABEL} — open video`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(119,216,255,0.28),transparent_28%),linear-gradient(135deg,#071423_0%,#10265c_52%,#071423_100%)]" />
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

        <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-9">
          <div className="relative mb-6">
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-60 group-hover:opacity-90 scale-100" />
            <span className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/95 text-visly-navy shadow-lg group-hover:scale-105 transition-transform">
              <Play className="h-7 w-7 ml-1 fill-current" aria-hidden />
            </span>
          </div>
          <p className="text-3xl font-black leading-tight text-white sm:text-4xl">
            {VISLYBLUQ_STORY_LABEL}
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
            {VISLYBLUQ_STORY_SUBTITLE}
          </p>
        </div>
      </button>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default StoryVideoCard;
