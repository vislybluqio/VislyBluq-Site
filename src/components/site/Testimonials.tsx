import { testimonials } from '../../data/testimonials';
import { GlassCard, Section } from './Enterprise';

const Testimonials = ({ className = '' }: { className?: string }) => {
  if (testimonials.length === 0) return null;

  return (
    <Section className={className}>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">What clients say.</h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <GlassCard key={`${t.name}-${t.company}`} className="p-8 md:p-10">
            <p className="text-xl font-medium italic leading-8 text-white">"{t.quote}"</p>
            <div className="mt-8">
              <div className="font-bold text-white">{t.name}</div>
              <div className="text-sm text-white/50">{t.role}, {t.company}</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;
