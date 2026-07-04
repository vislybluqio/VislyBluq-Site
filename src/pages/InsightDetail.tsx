import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { GlassCard, PageIntro, Section } from '../components/site/Enterprise';
import { getInsight } from '../data/insights';

const InsightDetail = () => {
  const { slug = '' } = useParams();
  const article = getInsight(slug);

  if (!article) {
    return <Section className="pt-32"><GlassCard className="p-10 text-center"><h1 className="text-3xl font-bold">Insight not found</h1><Link to="/insights" className="mt-5 inline-flex text-[#adc6ff]">Back to insights</Link></GlassCard></Section>;
  }

  return (
    <div>
      <PageIntro eyebrow={article.category} title={<>{article.title}</>} description={article.summary}>
        <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-bold text-[#adc6ff] hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to insights</Link>
      </PageIntro>
      <Section className="pt-0"><div className="grid gap-8 lg:grid-cols-[1fr_320px]"><GlassCard className="p-8 md:p-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#77d8ff]">{article.readTime}</p><div className="mt-8 space-y-6">{article.body.map((paragraph)=><p key={paragraph} className="text-base leading-8 text-[#c2c6d6]">{paragraph}</p>)}</div></GlassCard><GlassCard className="h-fit p-7"><h2 className="text-xl font-bold">Key takeaways</h2><div className="mt-5 space-y-4">{article.takeaways.map((item)=><p key={item} className="flex gap-3 text-sm text-[#c2c6d6]"><CheckCircle className="h-5 w-5 text-[#77d8ff]" />{item}</p>)}</div></GlassCard></div></Section>
    </div>
  );
};

export default InsightDetail;
