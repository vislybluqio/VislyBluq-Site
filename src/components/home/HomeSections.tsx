import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ArrowLink, CTASection, Reveal, Section, SectionHeading } from '../site/Enterprise';
import StoryVideoSection from './StoryVideoSection';
import { ScrollSteps } from './HomeMotion';
import { servicePillars } from '../../data/enterpriseServices';
import { industries } from '../../data/industries';
import { hasStoryVideo } from '../../config/siteVideo';

const steps: Array<[string, string]> = [
  ['Discover', 'We learn how your business works and where it’s stuck before recommending anything.'],
  ['Plan', 'A clear scope, architecture and timeline you can make decisions with.'],
  ['Build', 'Design and engineering in short cycles, with working software to review along the way.'],
  ['Hand over', 'Documentation, training and ongoing support, so your team can run what we built.'],
];

/** Everything on the home page below the hero. Shared by the home page and the design concept previews in /lab. */
const HomeSections = () => (
  <>
    {/* Services */}
    <Section>
      <SectionHeading
        title="What we do."
        intro="Six areas of work, from deciding what to build to keeping it running after launch."
        action={<ArrowLink to="/services">All services</ArrowLink>}
      />
      <ul className="border-t border-paper-line">
        {servicePillars.map((service, index) => (
          <Reveal as="li" key={service.id} delay={index * 70} className="border-b border-paper-line">
            <Link
              to={`/services/${service.id}`}
              className="group relative grid gap-3 py-8 transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-500 hover:after:scale-x-100 md:grid-cols-[1fr_1.3fr_auto] md:items-center md:gap-10 lg:py-10"
            >
              <h3 className="text-2xl font-normal tracking-[-0.02em] transition-all duration-300 group-hover:translate-x-2 group-hover:text-brand lg:text-3xl">{service.title}</h3>
              <p className="max-w-prose text-base leading-7 text-body-muted">{service.summary}</p>
              <ArrowUpRight className="hidden h-6 w-6 text-body-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand md:block" aria-hidden />
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>

    {/* Approach */}
    <Section tone="tint">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-3xl font-normal leading-[1.1] tracking-display sm:text-4xl lg:text-5xl">Advice first. Then we build it properly.</h2>
          <p className="mt-6 max-w-prose text-base leading-7 text-body-muted">
            Most projects go wrong before any code is written. We start by understanding the problem, then choose the simplest technology that solves it.
          </p>
        </Reveal>
        <ScrollSteps
          items={steps}
          className="border-t border-paper-line"
          itemClassName="grid grid-cols-[3rem_1fr] gap-4 border-b border-paper-line py-10 sm:grid-cols-[4rem_1fr]"
          renderItem={([title, text], index, active) => (
            <>
              <span className={`font-mono text-xs leading-9 transition-colors duration-500 ${active ? 'text-brand' : 'text-body-faint'}`}>0{index + 1}</span>
              <div>
                <h3 className="text-3xl font-normal tracking-[-0.02em]">{title}</h3>
                <p className="mt-3 max-w-prose text-base leading-7 text-body-muted">{text}</p>
              </div>
            </>
          )}
        />
      </div>
    </Section>

    {hasStoryVideo && <StoryVideoSection />}

    {/* Industries */}
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <Reveal>
          <h2 className="text-3xl font-normal leading-[1.1] tracking-display sm:text-4xl">Sectors we work in.</h2>
        </Reveal>
        <ul className="grid border-t border-paper-line sm:grid-cols-2">
          {industries.map((industry, index) => (
            <Reveal as="li" key={industry.id} delay={index * 60} className="border-b border-paper-line py-6 text-xl tracking-[-0.01em] sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
              {industry.title}
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>

    <CTASection />
  </>
);

export default HomeSections;
