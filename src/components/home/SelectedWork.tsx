import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { featuredProjectIds } from '../../data/projects';
import type { ProjectCaseStudy } from '../../data/projects';
import { projectsByIds } from '../../data/related';
import { ContentTodo, Section } from '../site/Enterprise';
import { revealDelay, useInView } from '../../hooks/useInView';

// The track holds two identical halves and slides by -50%, so the loop is seamless. Each half
// repeats the projects enough times to be wider than the container.
const COPIES_PER_HALF = 2;

const ProjectCard = ({ project, duplicate }: { project: ProjectCaseStudy; duplicate: boolean }) => (
  <li
    className={`w-[280px] shrink-0 pr-5 sm:w-[340px] sm:pr-6 lg:w-[380px] ${duplicate ? 'marquee-duplicate' : 'snap-start'}`}
    aria-hidden={duplicate || undefined}
  >
    <Link to={`/projects/${project.id}`} tabIndex={duplicate ? -1 : undefined} className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#071423]">
        {project.image ? (
          <img src={project.image} alt={`${project.title} screenshot`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-end bg-[radial-gradient(circle_at_25%_20%,rgba(119,216,255,0.22),transparent_45%),linear-gradient(135deg,#10265c_0%,#071423_100%)] p-5">
            {/* TODO(content): real screenshot for this project (projects.ts `image`). */}
            {!duplicate && <ContentTodo note="screenshot" />}
          </div>
        )}
      </div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#77d8ff]">{project.category}</p>
      <h3 className="mt-2 text-xl font-bold text-white group-hover:text-visly-cyan">{project.title}</h3>
      {project.outcomes[0] && <p className="mt-2 text-sm leading-6 text-white/62">{project.outcomes[0]}</p>}
      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-bold text-[#adc6ff] group-hover:text-white">
        View project <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </Link>
  </li>
);

const SelectedWork = () => {
  const featured = projectsByIds(featuredProjectIds);
  const [ref, inView] = useInView<HTMLDivElement>();
  const [paused, setPaused] = useState(false);
  if (featured.length === 0) return null;

  const loop = Array.from({ length: COPIES_PER_HALF * 2 }, () => featured).flat();

  return (
    <Section>
      <div ref={ref} className={`reveal ${inView ? 'is-visible' : ''}`}>
        <div className="reveal-item mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-visly-cyan">Selected work</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">Recent projects.</h2>
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="marquee-toggle inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-visly-cyan/50 hover:text-white"
              aria-label={paused ? 'Play project carousel' : 'Pause project carousel'}
            >
              {paused ? <Play className="ml-0.5 h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
            </button>
            <Link to="/case-studies" className="inline-flex items-center gap-2 font-bold text-visly-cyan hover:text-white">
              All case studies <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Slow continuous marquee; pauses on hover/focus or via the button. Static, swipeable row under reduced motion. */}
        <div
          className="marquee reveal-item -mx-6 overflow-hidden sm:-mx-8 md:mx-0 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
          data-paused={paused}
          style={revealDelay(1)}
        >
          <ul className="marquee-track flex w-max py-1">
            {loop.map((project, index) => (
              <ProjectCard key={`${project.id}-${index}`} project={project} duplicate={index >= featured.length} />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default SelectedWork;
