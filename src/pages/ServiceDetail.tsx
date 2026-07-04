import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { GlassCard, PageIntro, PrimaryLink, Section } from '../components/site/Enterprise';
import { getServicePillar } from '../data/enterpriseServices';

const ServiceDetail = () => {
  const { serviceId = '' } = useParams();
  const service = getServicePillar(serviceId);

  if (!service) {
    return (
      <Section className="pt-32">
        <GlassCard className="p-10 text-center">
          <h1 className="text-3xl font-bold">Service not found</h1>
          <Link to="/services" className="mt-5 inline-flex text-[#adc6ff]">Back to services</Link>
        </GlassCard>
      </Section>
    );
  }

  const Icon = service.icon;

  return (
    <div>
      <PageIntro eyebrow="Service Detail" title={<>{service.title}</>} description={service.summary}>
        <Link to="/services" className="inline-flex items-center gap-2 text-sm font-bold text-[#adc6ff] hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to services</Link>
      </PageIntro>
      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <GlassCard className="p-8">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#adc6ff]/10"><Icon className="h-8 w-8 text-[#adc6ff]" /></div>
            <h2 className="text-3xl font-bold text-[#d7e3f9]">{service.detailTitle}</h2>
            <div className="mt-6 space-y-5">
              {service.detail.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-[#c2c6d6]">{paragraph}</p>)}
            </div>
          </GlassCard>
          <div className="space-y-6">
            <GlassCard className="p-7"><h3 className="text-xl font-bold">Expected outputs</h3><div className="mt-5 space-y-3">{service.outcomes.map((item) => <p key={item} className="flex gap-3 text-sm text-[#c2c6d6]"><CheckCircle className="h-5 w-5 text-[#77d8ff]" />{item}</p>)}</div></GlassCard>
            <GlassCard className="p-7"><h3 className="text-xl font-bold">Engagement flow</h3><div className="mt-5 space-y-3">{service.process.map((item, index) => <p key={item} className="text-sm text-[#c2c6d6]"><span className="mr-3 font-bold text-[#adc6ff]">0{index + 1}</span>{item}</p>)}</div></GlassCard>
          </div>
        </div>
      </Section>
      <Section className="pt-0"><GlassCard className="p-10 text-center"><h2 className="text-3xl font-bold">Want this capability in your business?</h2><p className="mx-auto mt-3 max-w-2xl text-[#c2c6d6]">Tell us what you are trying to build and we will recommend the best technical path.</p><div className="mt-8"><PrimaryLink to={`/contact?service=${service.id}`}>Request a focused consultation</PrimaryLink></div></GlassCard></Section>
    </div>
  );
};

export default ServiceDetail;
