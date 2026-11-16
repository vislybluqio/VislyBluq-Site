import { Link, useParams } from 'react-router-dom';
import type { MetaArgs } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { CTASection, Label, PageIntro, Section } from '../components/site/Enterprise';
import { getServicePillar } from '../data/enterpriseServices';
import { pageMeta } from '../config/seo';

export const meta = ({ params }: MetaArgs) => {
  const service = getServicePillar(params.serviceId ?? '');
  return service
    ? pageMeta({ title: service.title, description: service.summary, path: `/services/${service.id}` })
    : [{ title: 'Service not found | VislyBluq' }, { name: 'robots', content: 'noindex' }];
};

const ServiceDetail = () => {
  const { serviceId = '' } = useParams();
  const service = getServicePillar(serviceId);

  if (!service) {
    return (
      <Section className="pt-40">
        <h1 className="text-4xl font-normal tracking-display">Service not found.</h1>
        <Link to="/services" className="mt-6 inline-flex text-sm font-medium text-brand">Back to services →</Link>
      </Section>
    );
  }

  return (
    <div>
      <PageIntro label="Services" title={service.title} description={service.summary}>
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink-text">
          <ArrowLeft className="h-4 w-4" aria-hidden /> All services
        </Link>
      </PageIntro>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <div>
            <h2 className="text-3xl font-normal leading-[1.15] tracking-display sm:text-4xl">{service.detailTitle}</h2>
            <div className="mt-8 space-y-6">
              {service.detail.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-8 text-body-muted">{paragraph}</p>
              ))}
            </div>
            <p className="mt-10 font-mono text-xs text-body-faint">{service.tags.join(' · ')}</p>
          </div>

          <div className="space-y-12">
            <div>
              <Label className="mb-5">What you get</Label>
              <ul className="border-t border-paper-line">
                {service.outcomes.map((item) => (
                  <li key={item} className="border-b border-paper-line py-4 text-base">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <Label className="mb-5">How it runs</Label>
              <ol className="border-t border-paper-line">
                {service.process.map((item, index) => (
                  <li key={item} className="flex gap-5 border-b border-paper-line py-4 text-base">
                    <span className="font-mono text-xs leading-6 text-body-faint">0{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>

      <CTASection title={<>Interested in {service.title}?</>} description="Tell us what you’re trying to achieve and we’ll recommend a practical approach." contactHref={`/contact?service=${service.id}`} />
    </div>
  );
};

export default ServiceDetail;
