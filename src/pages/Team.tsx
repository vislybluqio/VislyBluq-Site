import { CTASection, PageIntro, Reveal, Section } from '../components/site/Enterprise';
import { leaders } from '../data/team';
import { pageMeta } from '../config/seo';

export const meta = () => pageMeta({ title: 'Team', description: 'Meet the leadership team guiding VislyBluq.', path: '/team' });

const Team = () => (
  <div>
    <PageIntro
      title="The people behind VislyBluq."
      description="Our leadership team, supported by a wider group of engineers, data specialists, designers and delivery partners brought in as each project needs."
    />
    <Section>
      <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {leaders.map((member, index) => (
          <Reveal as="li" key={member.name} delay={(index % 3) * 100} className="group">
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-xl object-cover object-top grayscale transition duration-500 group-hover:grayscale-0"
            />
            <h2 className="mt-6 text-xl font-medium tracking-[-0.01em]">{member.name}</h2>
            <p className="mt-1 text-sm leading-6 text-body-muted">{member.role}</p>
            <div className="mt-4 flex gap-5 text-sm">
              <a href={`mailto:${member.email}`} className="text-body underline decoration-paper-line underline-offset-4 hover:decoration-body">Email</a>
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-body underline decoration-paper-line underline-offset-4 hover:decoration-body">LinkedIn</a>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
    <CTASection title="Work with the team." description="Tell us what you’re building and we’ll bring in the right mix of strategy, engineering, data and AI." />
  </div>
);

export default Team;
