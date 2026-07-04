import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle, Cloud, ChevronDown, Layers, Brain, Palette, ShieldCheck, Gauge } from 'lucide-react';
import { CTASection, GlassCard, PageIntro, PrimaryLink, Section } from '../components/site/Enterprise';
import { additionalServices, servicePillars } from '../data/enterpriseServices';
import { useState } from 'react';

const Services = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      <PageIntro
        eyebrow="Enterprise Solutions"
        title={<>Architecting the Digital <span className="text-[#adc6ff]">Frontier</span>.</>}
        description="We provide mission-critical technology consulting for growing teams, bridging the gap between business reliability and future innovation."
      >
        <PrimaryLink to="/contact">Book a Consultation</PrimaryLink>
      </PageIntro>

      <Section className="pt-0">
        <div className="mb-10 flex flex-wrap gap-3">
          {[[ 'Service Pillars', Sparkles], ['Intelligence & AI', Brain], ['Infrastructure', Cloud], ['Engineering', Layers], ['Security', ShieldCheck], ['Design', Palette]].map(([label, Icon]) => (
            <GlassCard key={label as string} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[#d7e3f9]"><Icon className="h-4 w-4 text-[#77d8ff]" />{label as string}</GlassCard>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {servicePillars.map((service) => {
            const Icon = service.icon;
            return (
              <GlassCard key={service.id} className="p-8 transition hover:border-[#adc6ff]/40">
                <div className="flex items-start gap-5"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#adc6ff]/10"><Icon className="h-7 w-7 text-[#adc6ff]" /></div><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#77d8ff]">High Impact</p><h2 className="mt-2 text-3xl font-bold text-[#d7e3f9]">{service.title}</h2></div></div>
                <p className="mt-6 text-sm leading-7 text-[#c2c6d6]">{service.summary}</p>
                <p className="mt-5 flex items-center gap-2 text-sm font-bold text-[#d7e3f9]"><CheckCircle className="h-4 w-4 text-[#77d8ff]" /> Business Value: {service.value}</p>
                <div className="mt-6 flex flex-wrap gap-2">{service.tags.map((tag) => <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#c2c6d6]">{tag}</span>)}</div>
                <Link to={`/services/${service.id}`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#adc6ff] hover:text-white">{service.action} <span>?</span></Link>
              </GlassCard>
            );
          })}
        </div>
        <button type="button" onClick={() => setShowMore((open) => !open)} className="mx-auto mt-10 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-[#d7e3f9]"><ChevronDown className={`h-4 w-4 transition ${showMore ? 'rotate-180' : ''}`} /> {showMore ? 'Hide additional services' : 'Show more services (8 remaining)'}</button>
        {showMore && (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map(([title, text]) => <GlassCard key={title} className="p-5"><h3 className="font-bold text-[#d7e3f9]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#c2c6d6]">{text}</p></GlassCard>)}
          </div>
        )}
      </Section>

      <Section className="bg-[#030f1e]/45">
        <div className="mb-12"><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#77d8ff]">The VislyBluq Advantage</p><h2 className="mt-4 max-w-3xl text-4xl font-bold text-[#d7e3f9]">Our methodology combines tactical execution with long-term strategic vision.</h2></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['Flexible Delivery', 'Engagements can run online-first or hybrid, based on client needs and project sensitivity.'],
            ['90-Day Value Targets', 'We aim to define measurable early wins within the first project phase when scope allows.'],
            ['Reusable Accelerators', 'Templates, architecture patterns, and delivery playbooks help us move faster without sacrificing quality.'],
            ['Maintainable Systems', 'We build for scale, handover, and long-term clarity rather than quick visual demos only.'],
          ].map(([title, text]) => <GlassCard key={title} className="p-7"><Gauge className="mb-5 h-8 w-8 text-[#adc6ff]" /><h3 className="text-2xl font-bold text-[#d7e3f9]">{title}</h3><p className="mt-4 text-sm leading-6 text-[#c2c6d6]">{text}</p></GlassCard>)}
        </div>
      </Section>

      <CTASection />
    </div>
  );
};

export default Services;
