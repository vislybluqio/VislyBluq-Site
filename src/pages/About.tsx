import { ArrowLink, ButtonLink, CTASection, PageIntro, Reveal, Section, SectionHeading } from '../components/site/Enterprise';
import { leaders } from '../data/team';
import { pageMeta } from '../config/seo';

export const meta = () => pageMeta({ title: 'About', description: 'VislyBluq is a Lagos-based technology consultancy that helps founders and growing businesses choose, design and build the right technology.', path: '/about' });

const principles = [
  ['Start with the problem', 'We choose technology after we understand the business, not before. Sometimes the right answer is to build less.'],
  ['Keep it simple', 'Not every product needs a complex platform. We recommend the simplest system that meets your reliability and growth needs.'],
  ['Build for handover', 'Clear code, documentation and training, so your team can own and extend what we build.'],
  ['Explain it plainly', 'Decisions are yours to make, so we explain options, costs and trade-offs without jargon.'],
];

const About = () => (
  <div>
    <PageIntro
      title="Technology advice from the people who build it."
      description="VislyBluq is a technology consultancy based in Lagos. We help founders and growing businesses choose the right technology, then design and build it with them."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink to="/services" variant="onDark">Our services</ButtonLink>
        <ButtonLink to="/team" variant="outlineDark" arrow={false}>Meet the team</ButtonLink>
      </div>
    </PageIntro>

    <Section>
      <Reveal className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div>
          <h2 className="text-3xl font-normal leading-[1.1] tracking-display sm:text-4xl">Consulting and engineering under one roof.</h2>
        </div>
        <div className="space-y-6 text-lg leading-8 text-body-muted">
          <p>
            Many businesses get advice from one firm and code from another, and something gets lost in between. We do both. The people who
            recommend an approach are the same people who design and build it.
          </p>
          <p>
            Our work covers technology strategy, web and mobile products, data engineering, cloud infrastructure and practical AI. We work
            mostly online, with an office in Ketu, Lagos.
          </p>
        </div>
      </Reveal>
    </Section>

    <Section tone="tint">
      <SectionHeading title="How we think about the work." />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line md:grid-cols-2">
        {principles.map(([title, text], index) => (
          <Reveal key={title} delay={index * 90} className="bg-paper p-8 transition-colors duration-300 hover:bg-paper-tint lg:p-12">
            <h3 className="text-xl font-medium tracking-[-0.01em]">{title}</h3>
            <p className="mt-3 max-w-md text-base leading-7 text-body-muted">{text}</p>
          </Reveal>
        ))}
      </div>
    </Section>

    <Section>
      <SectionHeading title="The people you’ll work with." action={<ArrowLink to="/team">Full team</ArrowLink>} />
      <ul className="grid gap-8 sm:grid-cols-3">
        {leaders.filter((leader) => leader.founder).map((leader, index) => (
          <Reveal as="li" key={leader.name} delay={index * 100}>
            <img src={leader.image} alt={leader.name} loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover object-top grayscale transition duration-500 hover:grayscale-0" />
            <p className="mt-5 text-lg font-medium">{leader.name}</p>
            <p className="mt-1 text-sm leading-6 text-body-muted">{leader.role}</p>
          </Reveal>
        ))}
      </ul>
    </Section>

    <CTASection />
  </div>
);

export default About;
