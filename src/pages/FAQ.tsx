import { CTASection, PageIntro, Reveal, Section } from '../components/site/Enterprise';
import { pageMeta } from '../config/seo';

export const meta = () => pageMeta({ title: 'FAQ', description: 'Answers to common questions about working with VislyBluq.', path: '/faq' });

// Answers stick to what the rest of the site states. Add specifics (timelines, compliance) only once they're confirmed.
const faqs = [
  ['How does a project start?', 'With a conversation about what you’re trying to achieve. We then run a short discovery to understand your systems, users and constraints, and come back with a recommended scope, approach and timeline.'],
  ['Can you advise without building?', 'Yes. Some clients want a technology review, a roadmap or part-time technical leadership. Others want us to design and build the product. Many start with advice and move to a build once the plan is clear.'],
  ['What technology do you use?', 'We choose per project. Our web work is usually React and Next.js, and we work across AWS, Azure and Google Cloud. We recommend the simplest setup that meets your reliability and growth needs.'],
  ['Can you improve or take over an existing system?', 'Yes. We start by reviewing the current application, data and hosting, then recommend a phased path that keeps your business running while we rebuild only what needs it.'],
  ['Do you support products after launch?', 'Yes. We offer ongoing improvements, monitoring and refactoring after launch, and we document everything so your own team can take over if you prefer.'],
  ['How do you handle our data?', 'We only access the systems and data the work requires. Security and compliance requirements are agreed at the start of each engagement.'],
  ['Where are you based?', 'Our office is in Ketu, Lagos. We work mostly online, so location rarely limits who we work with.'],
  ['How quickly will you reply?', 'Usually within one working day. For anything urgent, call or message us on WhatsApp.'],
];

const FaqPage = () => (
  <div>
    <PageIntro title="Questions we’re often asked." description="If yours isn’t here, ask us directly. We’re happy to talk it through." />
    <Section>
      <dl className="border-t border-paper-line">
        {faqs.map(([question, answer], index) => (
          <Reveal key={question} delay={(index % 4) * 60} className="grid gap-3 border-b border-paper-line py-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <dt className="text-xl font-normal tracking-[-0.015em]">{question}</dt>
            <dd className="max-w-prose text-base leading-7 text-body-muted">{answer}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>
    <CTASection title="Still have a question?" description="Send us a message and we’ll get back to you, usually within one working day." />
  </div>
);

export default FaqPage;
