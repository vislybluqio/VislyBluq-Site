import type { ComponentType } from 'react';
import { Sparkles, Eye, ChevronsDown, Brain, Rocket, FlaskConical, ShieldCheck, Network } from 'lucide-react';
import { Eyebrow, GlassCard, MetricStrip, PageIntro, PrimaryLink, SecondaryLink, Section } from '../components/site/Enterprise';

const timeline: Array<[string, string, ComponentType<{ className?: string }>, string]> = [
  ['2024', 'Expansion into Neural Edge Computing and autonomous infrastructure.', Network, 'Global Launch'],
  ['2022', 'Revolutionized distributed ledger technology for Fortune 500 fintech.', ShieldCheck, 'ShieldCheck Milestone'],
  ['2020', 'VislyBluq founding team completes first quantum-ready architecture.', FlaskConical, 'Genesis'],
];

const About = () => (
  <div>
    <PageIntro
      eyebrow="Global Engineering Lead"
      title={<>Building the Future.</>}
      description="At VislyBluq, we don't just build technology. We engineer the foundational intelligence that powers the world's most ambitious enterprise ecosystems."
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <PrimaryLink to="/services">Explore Our Expertise</PrimaryLink>
        <SecondaryLink to="/projects">View Portfolio</SecondaryLink>
      </div>
      <ChevronsDown className="mt-14 h-8 w-8 animate-bounce text-[#adc6ff]" />
    </PageIntro>

    <Section>
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-8 lg:p-10">
          <Eye className="mb-6 h-10 w-10 text-[#adc6ff]" />
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#77d8ff]">Our Vision</p>
          <h2 className="mt-4 text-3xl font-bold text-[#d7e3f9]">To be the invisible backbone of global digital transformation.</h2>
          <p className="mt-5 text-sm leading-7 text-[#c2c6d6]">We set new benchmarks for technical sophistication and ethical innovation in enterprise software. We envision a world where high-performance engineering serves human potential.</p>
          <ul className="mt-7 space-y-3 text-sm text-[#d7e3f9]"><li>Lead with technical excellence</li><li>Drive sustainable innovation</li><li>Foster global collaboration</li></ul>
        </GlassCard>
        <GlassCard className="p-8 lg:p-10">
          <Rocket className="mb-6 h-10 w-10 text-[#adc6ff]" />
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#77d8ff]">Our Mission</p>
          <h2 className="mt-4 text-3xl font-bold text-[#d7e3f9]">Bridge complex engineering and elegant business solutions.</h2>
          <p className="mt-5 text-sm leading-7 text-[#c2c6d6]">VislyBluq delivers elite technology consulting that empowers organizations to transcend traditional constraints through data-driven architectural mastery.</p>
          <div className="mt-7 grid grid-cols-2 gap-4"><GlassCard className="p-4"><p className="text-2xl font-bold text-[#adc6ff]">0.1ms</p><p className="text-xs text-[#c2c6d6]">Avg Latency</p></GlassCard><GlassCard className="p-4"><p className="text-2xl font-bold text-[#adc6ff]">99.99%</p><p className="text-xs text-[#c2c6d6]">Uptime Promise</p></GlassCard></div>
        </GlassCard>
      </div>
    </Section>

    <Section className="bg-[#030f1e]/45">
      <div className="mb-12"><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#77d8ff]">A Decade of Disruption</p><h2 className="mt-4 text-4xl font-bold text-[#d7e3f9]">Milestones in enterprise intelligence.</h2></div>
      <div className="space-y-5">
        {timeline.map(([year, text, Icon, label]) => (
          <GlassCard key={year as string} className="grid gap-6 p-6 md:grid-cols-[120px_1fr_220px] md:items-center">
            <div className="text-3xl font-black text-[#adc6ff]">{year}</div><p className="text-[#c2c6d6]">{text as string}</p><div className="flex items-center gap-3 text-[#d7e3f9]"><Icon className="h-5 w-5 text-[#77d8ff]" />{label as string}</div>
          </GlassCard>
        ))}
      </div>
    </Section>

    <Section>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div><Eyebrow>Human-Centric High Performance</Eyebrow><h2 className="text-5xl font-extrabold text-[#d7e3f9]">The Culture of Clarity.</h2><p className="mt-6 text-lg leading-8 text-[#c2c6d6]">We operate on extreme ownership and radical transparency. Our team consists of polymath engineers who crave complexity and deliver elegance.</p></div>
        <div className="grid gap-6 md:grid-cols-2"><GlassCard className="p-8"><Brain className="mb-5 h-9 w-9 text-[#adc6ff]" /><h3 className="text-2xl font-bold">Intellectual Curiosity</h3><p className="mt-3 text-sm text-[#c2c6d6]">A culture that rewards the Why as much as the How.</p></GlassCard><GlassCard className="p-8"><Sparkles className="mb-5 h-9 w-9 text-[#adc6ff]" /><h3 className="text-2xl font-bold">Eternal Iteration</h3><p className="mt-3 text-sm text-[#c2c6d6]">We believe perfection is a horizon, not a destination.</p></GlassCard></div>
      </div>
    </Section>

    <Section className="pt-0"><MetricStrip metrics={[{ value: '120+', label: 'Enterprise systems' }, { value: 'Top 1%', label: 'Engineering bar' }, { value: '0.1ms', label: 'Latency obsession' }, { value: 'Global', label: 'Collaboration' }]} /></Section>
  </div>
);

export default About;



