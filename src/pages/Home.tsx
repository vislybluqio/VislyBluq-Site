import type { CSSProperties } from 'react';
import { ArrowRight, Brain, Database, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTASection, ContentTodo, GlassCard, MetricStrip, PrimaryLink, SecondaryLink, Section, pageMax, pagePad } from '../components/site/Enterprise';
import Testimonials from '../components/site/Testimonials';
import SelectedWork from '../components/home/SelectedWork';
import StoryVideoSection from '../components/home/StoryVideoSection';
import HeroGlobe from '../components/home/HeroGlobe';
import LatestInsights from '../components/home/LatestInsights';
import { services } from '../data/services';
import { homeMetrics } from '../data/metrics';
import { industries } from '../data/industries';
import { revealDelay } from '../hooks/useInView';
import { BrandMark } from '../components/BrandLogo';

const capabilities = [Brain, Terminal, Database];

const Home = () => {
  return (
    <div className="overflow-x-clip">
      <section className={`hero-scroll-timeline ${pagePad} relative isolate pt-32 pb-16 lg:min-h-[80vh] lg:pt-48 lg:pb-24`}>
        <div className="absolute left-1/2 top-24 -z-10 h-[680px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,126,247,0.2),transparent_62%)]" />
        {/* Mobile and tablet: globe sits faintly behind the text. */}
        <div className="pointer-events-none absolute -right-36 top-20 -z-10 w-[440px] opacity-35 sm:-right-20 sm:w-[520px] lg:hidden">
          <HeroGlobe className="h-auto w-full" />
        </div>

        <div className={`${pageMax} grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center`}>
          <div className="hero-fade">
            <div className="hero-drift" style={{ '--drift': '140px' } as CSSProperties}>
              <h1 className="hero-enter max-w-5xl text-5xl font-extrabold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
                We <span className="italic text-visly-blue">consult</span>, design and build digital products.
              </h1>
            </div>
            <div className="hero-drift" style={{ '--drift': '90px' } as CSSProperties}>
              <p className="hero-enter mt-8 max-w-2xl text-lg leading-8 text-white/68" style={revealDelay(1, 140)}>
                Technology consulting, web and mobile apps, data engineering and practical AI, for startups and growing businesses.
              </p>
            </div>
            <div className="hero-drift" style={{ '--drift': '50px' } as CSSProperties}>
              <div className="hero-enter mt-10 flex flex-col gap-4 sm:flex-row" style={revealDelay(2, 140)}>
                <PrimaryLink to="/contact">Launch your project</PrimaryLink>
                <SecondaryLink to="/case-studies">View our work</SecondaryLink>
              </div>
            </div>
          </div>

          {/* Desktop: the V-Cube sits in front of the globe. */}
          <div className="relative hidden lg:block lg:pr-4 xl:pr-12">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[460px] -translate-x-1/2 -translate-y-1/2 xl:w-[520px]">
              <HeroGlobe className="h-auto w-full" />
            </div>
            <BrandMark className="hero-cube h-56 w-56 drop-shadow-[0_24px_60px_rgba(46,126,247,0.45)] xl:h-64 xl:w-64" />
          </div>
        </div>
      </section>

      <StoryVideoSection />

      <SelectedWork />

      <Section>
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-visly-cyan">Capabilities</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              From first roadmap to shipped product.
            </h2>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 font-bold text-visly-cyan hover:text-white">
            Explore all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.slice(0, 3).map((service, index) => {
            const Icon = capabilities[index];
            return (
              <GlassCard key={service.id} className="p-8 transition hover:border-visly-cyan/40">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-visly-cyan/10 text-visly-cyan">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/62">{service.description}</p>
                <ul className="mt-7 space-y-3">
                  {service.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/82">
                      <span className="h-1.5 w-1.5 rounded-full bg-visly-cyan" /> {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            );
          })}
        </div>
      </Section>

      <section className="border-y border-white/5 bg-visly-surface/50 px-6 py-20 sm:px-8 lg:px-16">
        <div className={pageMax}>
          <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.32em] text-visly-cyan/60">
            Industries we work in
          </p>
          <div className="mb-16 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-16">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                to={`/industries/${industry.id}`}
                className="group inline-flex items-center gap-3 text-center text-2xl font-bold text-white/80 transition hover:text-visly-cyan sm:text-3xl md:text-4xl"
              >
                {industry.title}
                <ArrowRight className="h-6 w-6 shrink-0 transition group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden />
              </Link>
            ))}
          </div>
          {/* TODO(content): confirm the metric values in src/data/metrics.ts */}
          <ContentTodo note="confirm metrics" className="mb-4" />
          <MetricStrip metrics={homeMetrics} />
        </div>
      </section>

      <Testimonials className="bg-visly-surface/35" />

      <LatestInsights />

      <CTASection />
    </div>
  );
};

export default Home;
