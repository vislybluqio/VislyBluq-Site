import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { featuredProjectIds } from '../../data/projects';
import { projectsByIds } from '../../data/related';
import { ContentTodo, Section } from '../site/Enterprise';
import { revealDelay, useInView } from '../../hooks/useInView';

const SelectedWork = () => {
  const featured = projectsByIds(featuredProjectIds);
  const [ref, inView] = useInView<HTMLDivElement>();
  if (featured.length === 0) return null;

  return (
    <Section>
      <div ref={ref} className={`reveal ${inView ? 'is-visible' : ''}`}>
        <div className="reveal-item mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-visly-cyan">Selected work</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">Recent projects.</h2>
          </div>
          <Link to="/case-studies" className="inline-flex items-center gap-2 font-bold text-visly-cyan hover:text-white">
            All case studies <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        {/* Scroll-snap row on mobile, three-column grid from md up. */}
        <ul className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {featured.map((project, index) => (
            <li key={project.id} className="reveal-item w-[85%] shrink-0 snap-start sm:w-[60%] md:w-auto" style={revealDelay(index + 1)}>
              <Link to={`/projects/${project.id}`} className="group flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#071423]">
                  {project.image ? (
                    <img src={project.image} alt={`${project.title} screenshot`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-end bg-[radial-gradient(circle_at_25%_20%,rgba(119,216,255,0.22),transparent_45%),linear-gradient(135deg,#10265c_0%,#071423_100%)] p-5">
                      {/* TODO(content): real screenshot for this project (projects.ts `image`). */}
                      <ContentTodo note="screenshot" />
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
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default SelectedWork;
