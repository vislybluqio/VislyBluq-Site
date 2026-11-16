import { Download } from 'lucide-react';
import { LegalBlock, PageIntro, Section } from '../components/site/Enterprise';
import { pageMeta } from '../config/seo';

export const meta = () => pageMeta({ title: 'Terms of Service', description: "The terms that govern use of VislyBluq's website and services.", path: '/terms' });

const termsPdfText = `VislyBluq Terms of Service\n\nLast updated: October 24, 2023\n\n1. Acceptance of Terms\nBy accessing or using VislyBluq services, you agree to these Terms of Service.\n\n2. Service Provisioning\nVislyBluq provides technology consulting, product engineering, data, AI, and related implementation services subject to agreed project terms.\n\n3. Regulatory Compliance\nClients are responsible for ensuring their use of technology solutions complies with applicable laws and industry requirements.\n\n4. Intellectual Property\nProject ownership, licenses, deliverables, and usage rights are defined in the relevant project agreement.\n\n5. Limitation of Liability\nTo the maximum extent permitted by law, VislyBluq is not liable for indirect or consequential damages.\n\n6. Contact\nFor questions, contact VislyBluq through the contact page.`;

const downloadTermsPdf = () => {
  const escaped = termsPdfText.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\n/g, ') Tj\nT* (');
  const stream = `BT /F1 12 Tf 50 780 Td (${escaped}) Tj ET`;
  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj',
    '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    `5 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  objects.forEach((object) => { offsets.push(pdf.length); pdf += `${object}\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => offset.toString().padStart(10, '0') + ' 00000 n ').join('\n')}\ntrailer << /Root 1 0 R /Size ${objects.length + 1} >>\nstartxref\n${xref}\n%%EOF`;
  const url = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'vislybluq-terms-of-service.pdf';
  link.click();
  URL.revokeObjectURL(url);
};

const Terms = () => (
  <div>
    <PageIntro label="Legal · Last updated October 24, 2023" title="Terms of Service" description="The terms that govern your use of VislyBluq’s website and services.">
      <button type="button" onClick={downloadTermsPdf} className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-line px-6 text-sm font-medium text-ink-text hover:border-white/40">
        <Download className="h-4 w-4" aria-hidden /> Download PDF
      </button>
    </PageIntro>
    <Section>
      <article className="mx-auto max-w-prose">
        <LegalBlock title="1. Acceptance of Terms"><p>By accessing or using the services provided by VislyBluq Enterprise Technology Consulting, you agree to be bound by these Terms of Service. If you do not agree to all terms, do not use our services.</p></LegalBlock>
        <LegalBlock title="2. Service Provisioning">
          <p><strong className="font-medium text-body">Availability:</strong> we aim to keep public digital surfaces available and responsive, subject to maintenance, hosting providers, and agreed client terms.</p>
          <p><strong className="font-medium text-body">Account security:</strong> users are responsible for maintaining confidentiality of credentials and access granted to their organization.</p>
        </LegalBlock>
        <LegalBlock title="3. Regulatory Compliance">
          <p>Clients are responsible for ensuring that their use of technology solutions complies with laws and industry obligations applicable to their business and jurisdiction.</p>
          <p>We take data integrity and ethical engineering seriously, and we align implementation practices with the compliance needs agreed for each engagement.</p>
        </LegalBlock>
        <LegalBlock title="4. Intellectual Property">
          <p>Ownership, licensing, deliverables, and reuse rights are defined in the relevant project agreement for each engagement.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Limited usage rights may be granted for internal business use.</li>
            <li>Unauthorized redistribution or reverse engineering is prohibited unless explicitly agreed.</li>
          </ul>
        </LegalBlock>
        <LegalBlock title="5. Limitation of Liability"><p>To the maximum extent permitted by law, VislyBluq shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from website use or services.</p></LegalBlock>
        <p className="mt-12 text-base text-body-muted">
          Questions about these terms? <a href="/contact" className="text-body underline underline-offset-4 hover:text-brand">Contact us</a>.
        </p>
      </article>
    </Section>
  </div>
);

export default Terms;
