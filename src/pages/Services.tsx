import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink, CTASection, PageIntro, Reveal, Section, SectionHeading } from '../components/site/Enterprise';
import { additionalServices, servicePillars } from '../data/enterpriseServices';
import { pageMeta } from '../config/seo';

export const meta = () => pageMeta({ title: 'Services', description: 'We help startups and growing businesses plan, design and build software, data systems and practical AI tools.', path: '/services' });

const workingStyle = [
  ['Online-first or hybrid', 'We work remotely by default and meet in person when the project needs it.'],
  ['Early, visible progress', 'We aim to show measurable results within the first phase of work.'],
  ['Proven patterns', 'Templates and architecture patterns let us move quickly without cutting corners.'],
  ['Built to maintain', 'We design for handover and long-term clarity, not just a good demo.'],
];

const Services = () => (
  <div>
    <PageIntro
      title="Strategy, engineering, data and AI."
      description="We help startups and growing businesses plan, design and build software, data systems and practical AI tools."
    >
      <ButtonLink to="/contact" variant="onDark">Discuss a project</ButtonLink>
    </PageIntro>

    <Section>
      <ul className="border-t border-paper-line">
        {servicePillars.map((service, index) => (
          <Reveal as="li" key={service.id} delay={index * 70} className="border-b border-paper-line">
            <Link to={`/services/${service.id}`} className="group grid gap-4 py-10 lg:grid-cols-[1fr_1.3fr_auto] lg:gap-12 lg:py-14">
              <h2 className="text-3xl font-normal tracking-[-0.025em] transition-all duration-300 group-hover:translate-x-2 group-hover:text-brand lg:text-4xl">{service.title}</h2>
              <div>
                <p className="max-w-prose text-base leading-7 text-body-muted">{service.summary}</p>
                <p className="mt-5 font-mono text-xs text-body-faint">{service.tags.join(' · ')}</p>
              </div>
              <ArrowUpRight className="hidden h-6 w-6 text-body-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand lg:block" aria-hidden />
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>

    <Section tone="tint">
      <SectionHeading title="We can also help with." />
      <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {additionalServices.map(([title, text], index) => (
          <Reveal key={title} delay={(index % 4) * 80} className="border-t border-paper-line pt-6">
            <dt className="text-base font-medium">{title}</dt>
            <dd className="mt-2 text-sm leading-6 text-body-muted">{text}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>

    <Section>
      <SectionHeading title="What working with us is like." />
      <dl className="grid border-t border-paper-line md:grid-cols-2">
        {workingStyle.map(([title, text], index) => (
          <Reveal key={title} delay={index * 80} className="grid gap-2 border-b border-paper-line py-8 md:odd:pr-12 md:even:border-l md:even:pl-12">
            <dt className="text-xl font-normal tracking-[-0.015em]">{title}</dt>
            <dd className="max-w-prose text-base leading-7 text-body-muted">{text}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>

    <CTASection />
  </div>
);

export default Services;
