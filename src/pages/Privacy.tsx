import { LegalBlock, PageIntro, Section } from '../components/site/Enterprise';
import { pageMeta } from '../config/seo';

export const meta = () => pageMeta({ title: 'Privacy Policy', description: 'How VislyBluq collects, uses and protects personal information.', path: '/privacy' });

// TODO(content): the wording below is unchanged from the previous design and still needs a review (see CONTENT_TODO.md).
const Privacy = () => (
  <div>
    <PageIntro label="Legal · Last updated November 14, 2024" title="Privacy Policy" description="How VislyBluq collects, uses and protects your information." />
    <Section>
      <article className="mx-auto max-w-prose">
        <LegalBlock title="1. Introduction">
          <p>VislyBluq Enterprise Technology Consulting operates this website and various enterprise consulting platforms. We value the privacy of our clients and partners above all else. This Privacy Policy describes our practices regarding collection, use, and disclosure of information you provide when you visit our website, use our software, or engage our consulting services.</p>
        </LegalBlock>
        <LegalBlock title="2. Data Collection">
          <p><strong className="font-medium text-body">Personal information:</strong> names, email addresses, job titles, and company affiliations submitted through contact forms or service registrations.</p>
          <p><strong className="font-medium text-body">Usage telemetry:</strong> IP addresses, browser types, interaction heatmaps, and session durations to improve platform performance.</p>
          <p>We do not collect sensitive biological, political, or religious data unless explicitly required for specific government-vetted projects and with separate, verified consent.</p>
        </LegalBlock>
        <LegalBlock title="3. Usage & Processing">
          <ul className="list-disc space-y-2 pl-5">
            <li>Service Delivery: enterprise consulting insights, project dashboards, and customized roadmaps.</li>
            <li>Advanced Personalization: AI-curated insights and case studies relevant to your industry.</li>
            <li>Security Auditing: monitoring fraudulent activity or unauthorized access attempts.</li>
          </ul>
        </LegalBlock>
        <LegalBlock title="4. Security Protocols">
          <ul className="list-disc space-y-2 pl-5">
            <li>Encryption: AES-256 at rest and TLS 1.3 in transit.</li>
            <li>Access Control: MFA and RBAC enforced across all layers.</li>
            <li>Compliance: SOC2 Type II and GDPR compliant infrastructure.</li>
          </ul>
        </LegalBlock>
        <LegalBlock title="5. Third-Party Access">
          <p>VislyBluq does not sell, rent, or trade your data. We may share information with trusted partners only for cloud infrastructure providers, our email newsletter provider (Mailchimp, for people who subscribe), privacy-focused analytics, or legal obligations and compliance enforcement.</p>
        </LegalBlock>
        <LegalBlock title="6. Your Rights">
          <ul className="list-disc space-y-2 pl-5">
            <li>Right to Access: request a copy of the personal data we hold about you.</li>
            <li>Right to Rectify: correct inaccurate or incomplete data.</li>
            <li>Right to Erasure: request deletion of your data from our systems.</li>
            <li>Data Portability: receive your data in a structured, machine-readable format.</li>
          </ul>
        </LegalBlock>
        <p className="mt-12 text-base text-body-muted">
          Questions about your data? <a href="/contact" className="text-body underline underline-offset-4 hover:text-brand">Contact us</a>.
        </p>
      </article>
    </Section>
  </div>
);

export default Privacy;
