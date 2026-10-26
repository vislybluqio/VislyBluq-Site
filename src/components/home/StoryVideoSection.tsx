import { useState } from 'react';
import { Play } from 'lucide-react';
import {
  hasStoryVideo,
  VISLYBLUQ_STORY_LABEL,
  VISLYBLUQ_STORY_POINTS,
  VISLYBLUQ_STORY_SUBTITLE,
  VISLYBLUQ_STORY_YOUTUBE_ID,
} from '../../config/siteVideo';
import { revealDelay, useInView } from '../../hooks/useInView';
import { ContentTodo, Section } from '../site/Enterprise';

const frameClass =
  'absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(119,216,255,0.28),transparent_35%),linear-gradient(135deg,#071423_0%,#10265c_55%,#071423_100%)]';

/**
 * Company video, loaded only when the visitor presses play so the page doesn't pull in YouTube up front.
 * Until a video ID is set, the frame shows "Video coming soon" instead of a play button.
 */
const StoryVideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>();
  const videoId = hasStoryVideo ? VISLYBLUQ_STORY_YOUTUBE_ID.trim() : '';

  return (
    <Section className="bg-visly-light text-visly-navy">
      <div ref={ref} className={`reveal grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center ${inView ? 'is-visible' : ''}`}>
        <div className="reveal-item">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-visly-blue">{VISLYBLUQ_STORY_LABEL}</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-visly-navy md:text-5xl">{VISLYBLUQ_STORY_SUBTITLE}.</h2>
          <ol className="mt-8 space-y-5">
            {VISLYBLUQ_STORY_POINTS.map((point, index) => (
              <li key={point} className="flex gap-4">
                <span className="text-sm font-bold text-visly-blue">0{index + 1}</span>
                <span className="text-base leading-7 text-visly-navy/75">{point}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="reveal-item" style={revealDelay(1)}>
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-visly-navy shadow-[0_30px_70px_rgba(11,22,51,0.28)]">
            {isPlaying && videoId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title="VislyBluq company video"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : videoId ? (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className={`group ${frameClass} focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-visly-cyan`}
                aria-label={`${VISLYBLUQ_STORY_LABEL}: play video`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-60"
                  loading="lazy"
                />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-visly-navy shadow-xl transition group-hover:scale-105 motion-reduce:transition-none sm:h-20 sm:w-20">
                  <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden />
                </span>
              </button>
            ) : (
              // No video yet: a non-interactive frame, so nobody presses a play button that does nothing.
              <div className={`${frameClass} flex-col gap-4`}>
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/80 sm:h-20 sm:w-20">
                  <Play className="ml-1 h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">Video coming soon</p>
                <ContentTodo note="video ID in src/config/siteVideo.ts" className="absolute bottom-4 left-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default StoryVideoSection;
