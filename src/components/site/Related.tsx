import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ServiceLink } from '../../data/related';
import { GlassCard, Section } from './Enterprise';

const SectionHeading = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="mb-10">
    <p className="text-xs font-bold uppercase tracking-[0.24em] text-visly-cyan">{eyebrow}</p>
    <h2 className="mt-3 text-3xl font-bold text-[#d7e3f9] md:text-4xl">{title}</h2>
  </div>
);

export const RelatedServices = ({ services, title = 'Services we bring', className = '' }: { services: ServiceLink[]; title?: string; className?: string }) => {
  if (services.length === 0) return null;
  return (
    <Section className={className}>
      <SectionHeading eyebrow="Capabilities" title={title} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link key={service.id} to={service.href} className="group block">
              <GlassCard className="h-full p-7 transition group-hover:border-visly-cyan/40">
                <Icon className="mb-5 h-8 w-8 text-[#adc6ff]" />
                <h3 className="text-xl font-bold text-[#d7e3f9]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#c2c6d6]">{service.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#adc6ff] group-hover:text-white">
                  Learn more <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </Section>
  );
};
