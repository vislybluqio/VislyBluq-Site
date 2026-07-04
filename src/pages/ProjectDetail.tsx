import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { GlassCard, PageIntro, PrimaryLink, Section } from '../components/site/Enterprise';
import { getProject } from '../data/projects';

const ProjectVisual = ({ type }: { type: 'security' | 'cooperative' | 'platform' }) => {
  if (type === 'security') {
    return <div className="rounded-3xl border border-cyan-300/10 bg-[#071122] p-5"><div className="mb-4 flex items-center justify-between"><p className="font-bold text-white">Sentinel Fraud Engine</p><span className="text-xs text-emerald-300">System Online</span></div><div className="grid gap-3 md:grid-cols-4">{['1,375 Identities','708 Sessions','23 Threats','46ms Latency'].map((item)=><div key={item} className="rounded-xl bg-[#111b31] p-4 text-sm text-[#d7e3f9]">{item}</div>)}</div><div className="mt-4 grid gap-4 md:grid-cols-2"><div className="h-48 rounded-xl bg-[linear-gradient(180deg,rgba(119,216,255,0.14),transparent),repeating-linear-gradient(90deg,transparent,transparent_36px,rgba(255,255,255,.04)_37px),repeating-linear-gradient(0deg,transparent,transparent_36px,rgba(255,255,255,.04)_37px)]"/><div className="h-48 rounded-xl bg-[linear-gradient(90deg,#ef4444_20%,transparent_20%_25%,#ef4444_25%_45%,transparent_45%_50%,#ef4444_50%_70%,transparent_70%_75%,#ef4444_75%)] opacity-90"/></div></div>;
  }
  if (type === 'cooperative') {
    return <div className="overflow-hidden rounded-3xl bg-white text-[#0f172a]"><div className="bg-[#0f7a3a] p-8"><p className="text-sm font-bold text-yellow-300">Registered cooperative society platform</p><h3 className="mt-5 max-w-xl text-4xl font-black text-white">Welcome to Lighthill Cooperative Society</h3><p className="mt-4 max-w-md text-sm text-white">Empowering communities through collective savings, affordable loans, land investment, and cooperative purchasing.</p><button className="mt-6 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold">Become a Member</button></div><div className="grid grid-cols-4 gap-3 p-5 text-center text-xs"><b>1,240+<br/>Members</b><b>?84M+<br/>Savings</b><b>?120M+<br/>Loans</b><b>?45M+<br/>Land</b></div></div>;
  }
  return <div className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(173,198,255,0.28),transparent_30%),linear-gradient(135deg,#142030,#071423)] p-8"><div className="grid gap-4 md:grid-cols-3">{['Intake','Analysis','Action'].map((item)=><div key={item} className="rounded-2xl bg-white/5 p-6"><p className="text-xs text-[#77d8ff]">Module</p><h3 className="mt-2 text-2xl font-bold">{item}</h3><p className="mt-3 text-sm text-[#c2c6d6]">Operational workflow surface</p></div>)}</div></div>;
};

const ProjectDetail = () => {
  const { projectId = '' } = useParams();
  const project = getProject(projectId);

  if (!project) {
    return <Section className="pt-32"><GlassCard className="p-10 text-center"><h1 className="text-3xl font-bold">Project not found</h1><Link to="/projects" className="mt-5 inline-flex text-[#adc6ff]">Back to projects</Link></GlassCard></Section>;
  }

  return (
    <div>
      <PageIntro eyebrow={project.category} title={<>{project.title}</>} description={project.summary}>
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-[#adc6ff] hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to projects</Link>
      </PageIntro>
      <Section className="pt-0"><ProjectVisual type={project.type} /></Section>
      <Section className="pt-0"><div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]"><GlassCard className="p-8"><h2 className="text-3xl font-bold">Project overview</h2><div className="mt-6 space-y-5">{project.overview.map((item)=><p key={item} className="text-sm leading-7 text-[#c2c6d6]">{item}</p>)}</div><p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#77d8ff]">Stack {project.stack}</p></GlassCard><div className="space-y-6"><GlassCard className="p-7"><h3 className="text-xl font-bold">Highlights</h3><div className="mt-5 space-y-3">{project.highlights.map((item)=><p key={item} className="flex gap-3 text-sm text-[#c2c6d6]"><CheckCircle className="h-5 w-5 text-[#77d8ff]" />{item}</p>)}</div></GlassCard><GlassCard className="p-7"><h3 className="text-xl font-bold">What the build demonstrates</h3><div className="mt-5 space-y-3">{project.outcomes.map((item)=><p key={item} className="flex gap-3 text-sm text-[#c2c6d6]"><CheckCircle className="h-5 w-5 text-[#77d8ff]" />{item}</p>)}</div></GlassCard></div></div></Section>
      <Section className="pt-0"><GlassCard className="p-10 text-center"><h2 className="text-3xl font-bold">Need something with this level of clarity?</h2><p className="mx-auto mt-3 max-w-2xl text-[#c2c6d6]">We can help shape, design, and engineer a system around your own operational needs.</p><div className="mt-8"><PrimaryLink to="/contact">Discuss a similar build</PrimaryLink></div></GlassCard></Section>
    </div>
  );
};

export default ProjectDetail;
