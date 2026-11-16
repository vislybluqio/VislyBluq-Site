import { testimonials } from '../../data/testimonials';
import { Label, Section } from './Enterprise';

const Testimonials = ({ className = '' }: { className?: string }) => {
  if (testimonials.length === 0) return null;

  return (
    <Section className={className}>
      <Label className="mb-12">Clients</Label>
      <div className="grid gap-16 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={`${t.name}-${t.company}`}>
            <blockquote className="font-serif text-3xl italic leading-[1.25]">“{t.quote}”</blockquote>
            <figcaption className="mt-8 text-sm">
              <span className="font-medium">{t.name}</span>
              <span className="text-body-muted"> · {t.role}, {t.company}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;
