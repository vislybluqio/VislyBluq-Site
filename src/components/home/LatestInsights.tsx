import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { insights } from '../../data/insights';
import { services } from '../../data/services';
import { GlassCard, Section } from '../site/Enterprise';

const tagLabel = (id: string) => services.find((service) => service.id === id)?.shortTitle ?? id;

const LatestInsights = () => {
  const latest = insights.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <Section>
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-visly-cyan">Latest insights</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">From our insights.</h2>
        </div>
        <Link to="/insights" className="inline-flex items-center gap-2 font-bold text-visly-cyan hover:text-white">
          All insights <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {latest.map((insight) => (
          <Link key={insight.slug} to={`/insights/${insight.slug}`} className="group block">
            <GlassCard className="flex h-full flex-col p-7 transition group-hover:border-visly-cyan/40">
              <div className="flex flex-wrap gap-2">
                {insight.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-visly-cyan/10 px-3 py-1 text-xs font-semibold text-visly-cyan">{tagLabel(tag)}</span>
                ))}
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{insight.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{insight.summary}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#adc6ff] group-hover:text-white">
                Read · {insight.readTime} <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </GlassCard>
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default LatestInsights;
