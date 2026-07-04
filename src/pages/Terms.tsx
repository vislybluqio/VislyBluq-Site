import type { ReactNode } from 'react';
import { CheckCircle, CloudCog, Download, ShieldCheck } from 'lucide-react';
import { GlassCard, PageIntro, PrimaryLink, Section } from '../components/site/Enterprise';

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
    <PageIntro eyebrow="Legal Framework" title={<>Terms of Service</>} description="Last updated: October 24, 2023. These terms govern your use of VislyBluq's enterprise technology consulting platforms and services.">
      <button onClick={downloadTermsPdf} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-bold text-[#d7e3f9]"><Download className="h-4 w-4" /> Download PDF</button>
    </PageIntro>
    <Section className="pt-0"><div className="grid gap-8 lg:grid-cols-[260px_1fr]"><aside><GlassCard className="sticky top-28 p-5"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#77d8ff]">Sections</p>{['1. Acceptance','2. Service Terms','3. Compliance','4. Intellectual Property','5. Limitation of Liability','6. Termination','7. Contact Support'].map(x=><p key={x} className="mt-3 text-sm text-[#c2c6d6]">{x}</p>)}<div className="mt-6 rounded-2xl bg-white/5 p-4"><p className="font-bold">Need a PDF version?</p><button onClick={downloadTermsPdf} className="mt-3 flex items-center gap-2 text-sm text-[#adc6ff]"><Download className="h-4 w-4" />Download PDF</button></div></GlassCard></aside><article className="space-y-6"><Legal title="01 Acceptance of Terms">By accessing or using the services provided by VislyBluq Enterprise Technology Consulting, you agree to be bound by these Terms of Service. If you do not agree to all terms, do not use our services.</Legal><GlassCard className="p-7"><h2 className="text-2xl font-bold">02 Service Provisioning</h2><div className="mt-5 grid gap-4 md:grid-cols-2"><Mini icon={<CloudCog />} title="Availability" text="We aim to keep public digital surfaces available and responsive, subject to maintenance, hosting providers, and agreed client terms."/><Mini icon={<ShieldCheck />} title="Account Security" text="Users are responsible for maintaining confidentiality of credentials and access granted to their organization."/></div></GlassCard><Legal title="03 Regulatory Compliance">Clients are responsible for ensuring that their use of technology solutions complies with laws and industry obligations applicable to their business and jurisdiction.</Legal><GlassCard className="p-7 border-[#adc6ff]/20"><p className="text-xl italic leading-8 text-[#d7e3f9]">We take data integrity and ethical engineering seriously, and we align implementation practices with the compliance needs agreed for each engagement.</p></GlassCard><GlassCard className="p-7"><h2 className="text-2xl font-bold">04 Intellectual Property</h2><p className="mt-4 text-sm leading-7 text-[#c2c6d6]">Ownership, licensing, deliverables, and reuse rights are defined in the relevant project agreement for each engagement.</p>{['Limited usage rights may be granted for internal business use.','Unauthorized redistribution or reverse engineering is prohibited unless explicitly agreed.'].map(x=><p key={x} className="mt-4 flex gap-3 text-sm text-[#c2c6d6]"><CheckCircle className="h-5 w-5 text-[#adc6ff]" />{x}</p>)}</GlassCard><Legal title="05 Limitation of Liability">To the maximum extent permitted by law, VislyBluq shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from website use or services.</Legal><GlassCard className="p-10 text-center"><h2 className="text-3xl font-bold">Have Questions?</h2><p className="mx-auto mt-4 max-w-2xl text-[#c2c6d6]">Our team can discuss specific enterprise requirements or clarifications regarding these terms.</p><div className="mt-8 flex justify-center gap-4"><PrimaryLink to="/contact">Contact Legal Team</PrimaryLink></div></GlassCard></article></div></Section>
  </div>
);
const Legal=({title,children}:{title:string;children:string})=><GlassCard className="p-7"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-4 text-sm leading-7 text-[#c2c6d6]">{children}</p></GlassCard>;
const Mini=({icon,title,text}:{icon: ReactNode;title:string;text:string})=><div className="rounded-2xl bg-white/5 p-4"><div className="mb-3 text-[#adc6ff]">{icon}</div><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm text-[#c2c6d6]">{text}</p></div>;
export default Terms;
