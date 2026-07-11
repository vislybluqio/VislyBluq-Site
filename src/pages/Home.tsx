import { ArrowRight, Brain, Database, MonitorDot, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTASection, Eyebrow, GlassCard, MetricStrip, PrimaryLink, SecondaryLink, Section, pageMax, pagePad } from '../components/site/Enterprise';
import { services } from '../data/services';
import StoryVideoCard from '../components/StoryVideoCard';

const metrics = [
  { value: '5+', label: 'Builds & prototypes' },
  { value: '10+', label: 'Strategy sessions' },
  { value: '24h', label: 'Typical first response' },
  { value: '3', label: 'Core delivery tracks' },
];

const capabilities = [Brain, Terminal, Database];

const Home = () => {
  return (
    <div className="overflow-hidden">
      <section className={`${pagePad} relative min-h-[86vh] pt-32 lg:pt-40`}>
        <div className="absolute left-1/2 top-24 -z-10 h-[680px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,126,247,0.2),transparent_62%)]" />
        <div className={`${pageMax} grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center`}>
          <div>
            <Eyebrow>Next-gen tech consulting</Eyebrow>
            <h1 className="max-w-5xl text-5xl font-extrabold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
              We <span className="italic text-visly-blue">consult</span>, design and build world-class digital products.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68">
              Transforming enterprise challenges into high-performance engineering through strategy, scalable roadmaps, custom application development, and practical AI integration.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <PrimaryLink to="/contact">Launch your project</PrimaryLink>
              <SecondaryLink to="/case-studies">View our work</SecondaryLink>
            </div>
          </div>

          <div className="relative animate-[slideInRight_0.9s_ease-out_both] lg:pl-6">
            <StoryVideoCard />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <GlassCard className="p-8 md:col-span-4">
            <MonitorDot className="mb-6 h-10 w-10 text-visly-cyan" />
            <h3 className="text-2xl font-bold text-white">AI Workflow Core</h3>
            <p className="mt-4 text-sm leading-6 text-white/62">
              Custom LLM and automation systems for complex operating environments.
            </p>
          </GlassCard>
          <GlassCard className="p-8 md:col-span-4">
            <ShieldCheck className="mb-6 h-10 w-10 text-visly-cyan" />
            <h3 className="text-2xl font-bold text-white">Data Integrity</h3>
            <p className="mt-4 text-sm leading-6 text-white/62">
              Clean, verified, and actionable data streams for high-stakes decision making.
            </p>
          </GlassCard>
          <GlassCard className="p-8 md:col-span-4">
            <Sparkles className="mb-6 h-10 w-10 text-visly-cyan" />
            <h3 className="text-2xl font-bold text-white">Product Velocity</h3>
            <p className="mt-4 text-sm leading-6 text-white/62">
              Roadmaps, prototypes, and production systems built as one continuous path.
            </p>
          </GlassCard>
        </div>
      </Section>

      <section className="border-y border-white/5 bg-visly-surface/50 px-6 py-20 sm:px-8 lg:px-16">
        <div className={pageMax}>
          <p className="mb-12 text-center text-xs font-bold uppercase tracking-[0.32em] text-visly-cyan/60">
            Building with focused founders and growing teams
          </p>
          <div className="mb-16 flex flex-wrap items-center justify-center gap-8 text-2xl font-black italic text-white/35 md:gap-14 md:text-4xl">
            <span>STARTUPS</span><span>SMES</span><span>FOUNDERS</span><span>TEAMS</span><span>PARTNERS</span>
          </div>
          <MetricStrip metrics={metrics} />
        </div>
      </section>

      <Section>
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-visly-cyan">Capabilities</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              End-to-end technical excellence for ambitious founders.
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

      <Section className="bg-visly-surface/35">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">The word on the street.</h2>
          <p className="mt-4 text-white/60">Hear from founders and teams we have helped scale.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            ['VislyBluq helped us redefine our entire technical architecture. Their AI workflow insight saved months of development time.', 'Sarah J. Miller', 'CTO, QuantumVentures'],
            ['From design to cloud deployment, their team felt like an extension of our core engineering group.', 'Marcus Thorne', 'Founder, Aether Logic'],
          ].map(([quote, name, title]) => (
            <GlassCard key={name} className="p-8 md:p-10">
              <p className="text-xl font-medium italic leading-8 text-white">"{quote}"</p>
              <div className="mt-8">
                <div className="font-bold text-white">{name}</div>
                <div className="text-sm text-white/50">{title}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <CTASection />
    </div>
  );
};

export default Home;
