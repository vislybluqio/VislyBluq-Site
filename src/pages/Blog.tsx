import { Link } from 'react-router-dom';
import { Activity, ArrowLeft, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { GlassCard, PageIntro, Section } from '../components/site/Enterprise';
import { insights } from '../data/insights';

const Blog = () => {
  const featured = insights[0];
  const reports = insights.slice(1);

  return (
    <div>
      <PageIntro eyebrow="Industry Intelligence" title={<>Intelligence Redefined.</>} description="Navigating the frontiers of artificial intelligence and enterprise transformation. Our research provides the technical clarity required for decisive leadership in an era of exponential change.">
        <div className="flex items-center gap-3 text-sm text-[#c2c6d6]"><Sparkles className="h-5 w-5 text-[#adc6ff]" />Technical notes updated directly on the site</div>
      </PageIntro>
      <Section className="pt-0">
        <GlassCard className="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#77d8ff]">Featured Insight · {featured.readTime}</p><h2 className="mt-5 text-4xl font-bold leading-tight text-[#d7e3f9]">{featured.title}</h2><p className="mt-5 text-sm leading-7 text-[#c2c6d6]">{featured.summary}</p><div className="mt-6 flex flex-wrap gap-2">{featured.takeaways.slice(0, 3).map(tag=><span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-[#c2c6d6]">{tag}</span>)}</div><div className="mt-8"><Link to={`/insights/${featured.slug}`} className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-br from-[#adc6ff] to-[#77d8ff] px-7 py-4 text-sm font-bold text-[#002e69]">Read full insight <ArrowRight className="h-4 w-4" /></Link></div></div>
          <div className="space-y-4"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#77d8ff]">Strategic Trajectories</p><p className="text-[#c2c6d6]">Signals and adoption patterns we use when advising teams on technology decisions.</p><GlassCard className="p-5"><div className="flex justify-between"><ArrowLeft/><ArrowRight/></div><p className="mt-5 text-sm text-[#c2c6d6]">Adoption Velocity</p><h3 className="text-2xl font-bold text-[#d7e3f9]">AI-assisted operations rising across SMEs</h3><p className="mt-2 text-xs text-[#c2c6d6]">Practical automation, not hype, is driving demand.</p></GlassCard><GlassCard className="p-5"><Activity className="mb-3 h-6 w-6 text-[#adc6ff]"/><h3 className="text-2xl font-bold">Efficiency</h3><p className="text-sm text-[#c2c6d6]">Infrastructure and workflow optimization remain major ROI areas.</p></GlassCard><GlassCard className="p-5"><Shield className="mb-3 h-6 w-6 text-[#adc6ff]"/><h3 className="text-2xl font-bold">Security</h3><p className="text-sm text-[#c2c6d6]">Access control and auditability are now board-level technology concerns.</p></GlassCard></div>
        </GlassCard>
      </Section>
      <Section className="bg-[#030f1e]/45"><div className="mb-10"><h2 className="text-4xl font-bold text-[#d7e3f9]">Deep-Dive Articles</h2><p className="mt-3 text-[#c2c6d6]">Read practical notes directly on the site as new information is added.</p></div><div className="mb-8 flex gap-3"><button className="rounded-full bg-[#adc6ff] px-4 py-2 text-sm font-bold text-[#002e69]">All Topics</button><button className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#c2c6d6]">AI</button><button className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#c2c6d6]">Data</button><button className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#c2c6d6]">Product</button></div><div className="grid gap-5 md:grid-cols-2">{reports.map((article)=><GlassCard key={article.slug} className="p-7"><span className="text-xs font-bold uppercase tracking-[0.2em] text-[#77d8ff]">{article.category}</span><h3 className="mt-4 text-2xl font-bold text-[#d7e3f9]">{article.title}</h3><p className="mt-3 text-sm leading-6 text-[#c2c6d6]">{article.summary}</p><Link to={`/insights/${article.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#adc6ff]">Read more <ArrowRight className="h-4 w-4" /></Link></GlassCard>)}</div></Section>
      <Section><GlassCard className="p-10 text-center"><h2 className="text-4xl font-bold text-[#d7e3f9]">Stay at the frontier.</h2><p className="mt-4 text-[#c2c6d6]">Get technical summaries and practical implementation notes from VislyBluq.</p><div className="mx-auto mt-8 flex max-w-xl gap-3"><input className="min-h-12 flex-1 rounded-xl border border-white/10 bg-[#030f1e] px-4 text-white" placeholder="Email address"/><button className="rounded-xl bg-[#adc6ff] px-6 font-bold text-[#002e69]">Subscribe</button></div></GlassCard></Section>
    </div>
  );
};

export default Blog;
