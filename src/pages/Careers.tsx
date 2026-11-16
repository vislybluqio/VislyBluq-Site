import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ArrowLink, PageIntro, Reveal, Section, SectionHeading } from '../components/site/Enterprise';
import { pageMeta } from '../config/seo';

export const meta = () => pageMeta({ title: 'Careers', description: 'Open volunteer roles at VislyBluq in marketing, content, product, design, engineering and partnerships.', path: '/careers' });

const roles = [
  { title: 'Digital Marketer', location: 'Remote or Lagos', skills: ['Campaigns', 'Social media', 'Analytics'] },
  { title: 'SEO Content Writer', location: 'Remote', skills: ['SEO', 'Writing', 'Research'] },
  { title: 'Product Manager', location: 'Remote or hybrid', skills: ['Roadmaps', 'User stories', 'Coordination'] },
  { title: 'UI/UX Designer', location: 'Remote', skills: ['Figma', 'Prototyping', 'User flows'] },
  { title: 'Frontend Developer', location: 'Remote', skills: ['React', 'TypeScript', 'Tailwind'] },
  { title: 'Community & Partnerships Associate', location: 'Remote or Lagos', skills: ['Outreach', 'CRM', 'Partnerships'] },
];

const expectations = [
  ['Real work', 'Contribute to client projects and the company itself, not practice exercises.'],
  ['Close collaboration', 'Work directly with the founders, engineers and product team.'],
  ['A portfolio and references', 'Build experience you can show, with people who can vouch for it.'],
  ['First consideration', 'Strong contributors are considered first as paid roles open up.'],
];

const Careers = () => (
  <div>
    <PageIntro
      title="Help build VislyBluq."
      description="We’re an early-stage team, and we’re open about it: current openings are volunteer roles. They suit people who want real project experience and a say in how the company grows."
    />

    <Section>
      <SectionHeading title="Current openings." />
      <ul className="border-t border-paper-line">
        {roles.map((role, index) => (
          <Reveal as="li" key={role.title} delay={index * 60} className="border-b border-paper-line">
            <Link to={`/apply?job=${encodeURIComponent(role.title)}`} className="group grid gap-3 py-8 md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-center md:gap-8">
              <h3 className="text-2xl font-normal tracking-[-0.02em] transition-all duration-300 group-hover:translate-x-2 group-hover:text-brand">{role.title}</h3>
              <p className="text-sm text-body-muted">{role.location} · Volunteer</p>
              <p className="font-mono text-xs text-body-faint">{role.skills.join(' · ')}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-brand">
                Apply <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
      <p className="mt-10 text-base text-body-muted">
        Don’t see the right fit? <Link to="/apply" className="text-body underline underline-offset-4 hover:text-brand">Send a general application</Link>.
      </p>
    </Section>

    <Section tone="tint">
      <SectionHeading title="Honest about our stage, serious about the work." />
      <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {expectations.map(([title, text], index) => (
          <Reveal key={title} delay={index * 80} className="border-t border-body pt-6">
            <dt className="text-base font-medium">{title}</dt>
            <dd className="mt-2 text-sm leading-6 text-body-muted">{text}</dd>
          </Reveal>
        ))}
      </dl>
      <div className="mt-14">
        <ArrowLink to="/apply">Apply now</ArrowLink>
      </div>
    </Section>
  </div>
);

export default Careers;
