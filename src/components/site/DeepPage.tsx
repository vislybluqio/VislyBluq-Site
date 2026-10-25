import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FocusPageConfig } from '../../config/focus';
import { insightsForServiceIds, projectsForServiceIds, serviceLinksForIds } from '../../data/related';
import { services } from '../../data/services';
import { CTASection, ContentTodo, Eyebrow, GlassCard, PrimaryLink, Section, pageMax, pagePad } from './Enterprise';
import { RelatedInsights, RelatedProjects } from './Related';

const isDev = import.meta.env.DEV;

/**
 * Long-form topic page: hero, stats, full-bleed band, problem/approach, capability accordion,
 * related work and insights, CTA. Sections whose content is still placeholder render with TODO
 * markers in dev and are hidden in production.
 */
const DeepPage = ({ page }: { page: FocusPageConfig }) => {
  const stats = page.stats.filter((stat) => stat.value && stat.label);
  const showStats = stats.length > 0 || isDev;
  const showBand = Boolean(page.bandImage) || isDev;
  const showProblem = Boolean(page.problem || page.approach) || isDev;
  const capabilities = serviceLinksForIds(page.serviceIds);

  return (
    <div className="overflow-hidden">
      <section className={`${pagePad} relative pt-32 pb-16 lg:pt-40 lg:pb-20`}>
        <div className="absolute right-0 top-20 -z-10 h-[460px] w-[460px] rounded-full bg-[#adc6ff]/10 blur-[100px]" />
        <div className={`${pageMax} max-w-5xl`}>
          <Eyebrow>Focus</Eyebrow>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] text-[#d7e3f9] sm:text-6xl lg:text-7xl">{page.title}</h1>
          {page.intro ? (
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#c2c6d6]">{page.intro}</p>
          ) : (
            <ContentTodo note="focus intro" className="mt-7" />
          )}
          <div className="mt-10">
            <PrimaryLink to={page.cta.to}>{page.cta.label}</PrimaryLink>
          </div>
        </div>
      </section>

      {showStats && (
        <section className={`${pagePad} border-y border-white/5 py-12`}>
          <dl className={`${pageMax} grid grid-cols-2 gap-8 md:grid-cols-4`}>
            {stats.length > 0
              ? stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse">
                    <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c2c6d6]">{stat.label}</dt>
                    <dd className="text-4xl font-bold text-[#adc6ff]">{stat.value}</dd>
                  </div>
                ))
              : page.stats.map((_, index) => (
                  <div key={index}>
                    <dt className="sr-only">Stat {index + 1}</dt>
                    <dd><ContentTodo note={`stat ${index + 1}`} /></dd>
                  </div>
                ))}
          </dl>
        </section>
      )}

      {showBand && (
        <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:h-96">
          {page.bandImage ? (
            <img src={page.bandImage} alt={page.bandImageAlt ?? ''} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_20%_30%,rgba(119,216,255,0.25),transparent_40%),linear-gradient(120deg,#10265c_0%,#071423_60%,#14244A_100%)]">
              <ContentTodo note="band image" />
            </div>
          )}
        </div>
      )}

      {showProblem && (
        <Section>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-visly-cyan">The problem</p>
              {page.problem ? <p className="mt-5 text-lg leading-8 text-[#d7e3f9]">{page.problem}</p> : <ContentTodo note="problem" className="mt-5" />}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-visly-cyan">How we approach it</p>
              {page.approach ? <p className="mt-5 text-lg leading-8 text-[#d7e3f9]">{page.approach}</p> : <ContentTodo note="approach" className="mt-5" />}
            </div>
          </div>
        </Section>
      )}

      {capabilities.length > 0 && (
        <Section className="bg-[#030f1e]/45">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-visly-cyan">Capabilities</p>
          <h2 className="mt-3 text-3xl font-bold text-[#d7e3f9] md:text-4xl">What we bring to this work</h2>
          <div className="mt-10 space-y-4">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              const features = services.find((service) => service.id === capability.id)?.features ?? [];
              return (
                <GlassCard key={capability.id} className="overflow-hidden">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-visly-cyan [&::-webkit-details-marker]:hidden">
                      <Icon className="h-6 w-6 shrink-0 text-[#adc6ff]" />
                      <span className="flex-1 text-lg font-bold text-[#d7e3f9] md:text-xl">{capability.title}</span>
                      <ChevronDown className="h-5 w-5 shrink-0 text-[#adc6ff] transition group-open:rotate-180 motion-reduce:transition-none" aria-hidden />
                    </summary>
                    <div className="px-6 pb-6 md:pl-16">
                      <p className="text-sm leading-7 text-[#c2c6d6]">{capability.summary}</p>
                      {features.length > 0 && (
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-sm text-white/82">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-visly-cyan" /> {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link to={capability.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#adc6ff] hover:text-white">
                        Go to service page <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </details>
                </GlassCard>
              );
            })}
          </div>
        </Section>
      )}

      <RelatedProjects projects={projectsForServiceIds(page.serviceIds)} />
      <RelatedInsights insights={insightsForServiceIds(page.serviceIds, 3)} className="bg-[#030f1e]/45" />
      <CTASection />
    </div>
  );
};

export default DeepPage;
