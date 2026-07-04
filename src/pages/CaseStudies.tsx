import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { GlassCard, PageIntro, PrimaryLink, Section } from '../components/site/Enterprise';
import { projects } from '../data/projects';

const ProjectVisual = ({ type }: { type: string }) => (
  <div className={`mb-7 h-64 overflow-hidden rounded-3xl border border-white/10 ${type === 'cooperative' ? 'bg-white' : 'bg-[#071122]'}`}>
    {type === 'security' && <div className="h-full p-5"><div className="grid grid-cols-4 gap-3">{['1,375','708','23','46ms'].map((x)=><div key={x} className="rounded-xl bg-[#111b31] p-4 text-xl font-bold text-white">{x}</div>)}</div><div className="mt-4 h-36 rounded-xl bg-[linear-gradient(180deg,rgba(119,216,255,.14),transparent),repeating-linear-gradient(90deg,transparent,transparent_38px,rgba(255,255,255,.05)_39px)]"/></div>}
    {type === 'cooperative' && <div className="h-full bg-[#0f7a3a] p-7"><h3 className="text-4xl font-black text-white">Lighthill Cooperative Society</h3><p className="mt-4 max-w-md text-sm text-white">Collective savings, loans, and member growth platform.</p><div className="mt-8 grid grid-cols-4 gap-3 text-center text-xs text-white"><b>1,240+</b><b>?84M+</b><b>?120M+</b><b>?45M+</b></div></div>}
    {type === 'platform' && <div className="h-full bg-[radial-gradient(circle_at_30%_20%,rgba(173,198,255,.25),transparent_30%),linear-gradient(135deg,#142030,#071423)] p-7"><div className="grid gap-4 md:grid-cols-3">{['Signals','Workflow','Reports'].map((x)=><div key={x} className="rounded-2xl bg-white/5 p-6"><h3 className="text-2xl font-bold">{x}</h3><p className="mt-3 text-sm text-[#c2c6d6]">System module</p></div>)}</div></div>}
  </div>
);

const CaseStudies = () => (
  <div>
    <PageIntro eyebrow="Selected Builds" title={<>Technology Work Presented with Clarity.</>} description="A curated look at product interfaces, operational systems, and platform patterns shaped by VislyBluq's design and engineering approach.">
      <p className="text-sm text-[#c2c6d6]">These case studies focus on the problem, product thinking, interface quality, and implementation direction.</p>
    </PageIntro>
    <Section>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4"><div className="flex flex-wrap gap-3">{['All Initiatives', 'Security', 'Financial Platforms', 'Analytics', 'AI Operations'].map((item) => <button key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#d7e3f9]">{item}</button>)}</div><button className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-[#c2c6d6]">Sort by: Featured <ChevronDown className="h-4 w-4" /></button></div>
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => <GlassCard key={project.id} className="p-8"><ProjectVisual type={project.type} /><span className="rounded-full bg-[#adc6ff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#adc6ff]">{project.category}</span><h2 className="mt-5 text-3xl font-bold text-[#d7e3f9]">{project.title}</h2><p className="mt-4 text-sm leading-6 text-[#c2c6d6]">{project.summary}</p><div className="mt-7 flex flex-wrap items-center justify-between gap-4"><p className="text-xs uppercase tracking-[0.2em] text-[#c2c6d6]">Stack {project.stack}</p><Link to={`/projects/${project.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#adc6ff]">Explore Project <ArrowRight className="h-4 w-4" /></Link></div></GlassCard>)}
      </div>
    </Section>
    <Section className="bg-[#030f1e]/45"><GlassCard className="p-10 text-center"><h2 className="text-4xl font-bold text-[#d7e3f9]">Have a complex problem?</h2><p className="mx-auto mt-4 max-w-2xl text-[#c2c6d6]">We can shape a clear product, data, AI, or operational system around your roadmap.</p><div className="mt-8"><PrimaryLink to="/contact">Initiate Consultation</PrimaryLink></div></GlassCard></Section>
  </div>
);

export default CaseStudies;
