import { ChevronDown, Handshake, LayoutDashboard, LockKeyhole, Terminal } from 'lucide-react';
import { CTASection, GlassCard, PageIntro, Section } from '../components/site/Enterprise';

const groups = [
  ['General Operations', [['What is the VislyBluq engagement lifecycle?', 'Our engagement typically begins with a 4-week Technical Discovery phase, followed by Strategy Calibration and a tiered implementation roadmap. We prioritize incremental value delivery through our proprietary VislyBluq Agile Framework, ensuring enterprise goals are met with precision and speed.'], ['How do you handle cross-platform integration?', 'We utilize industry-standard API abstractions and middleware solutions to bridge legacy infrastructure with modern cloud-native ecosystems. Our engineers specialize in low-latency data synchronicity across heterogeneous environments.']]],
  ['Technical Excellence', [['What stack do you recommend for high-scale enterprise applications?', 'While we remain technology-agnostic, our Gold Standard involves a micro-frontend architecture powered by Next.js, backed by Rust or Go-based microservices, and orchestrated via Kubernetes on multi-cloud environments.'], ['Do you provide ongoing technical debt remediation?', 'Absolutely. Technical debt management is integrated into our Managed Evolution service, where we continuously refactor and optimize performance bottlenecks as your platform scales.']]],
  ['Security & Compliance', [['How is data privacy handled during the consulting phase?', 'All VislyBluq consultants operate within high-security VPCs. We employ zero-trust access protocols and strict data masking for all sandbox environments. Compliance with SOC2, GDPR, and HIPAA is non-negotiable.']]],
];

const FaqPage = () => (
  <div>
    <PageIntro eyebrow="Support Intelligence" title={<>Frequently Asked Questions.</>} description="Comprehensive insights into our enterprise consulting methodology, technical safeguards, and strategic partnership models." />
    <Section className="pt-0"><div className="mb-10 flex flex-wrap gap-3">{[['General', LayoutDashboard], ['Technical', Terminal], ['Security', LockKeyhole], ['Partnership', Handshake]].map(([label, Icon])=><GlassCard key={label as string} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm"><Icon className="h-4 w-4 text-[#adc6ff]"/>{label as string}</GlassCard>)}</div><div className="mx-auto max-w-4xl space-y-8">{groups.map(([group, items])=><div key={group as string}><h2 className="mb-4 text-2xl font-bold text-[#d7e3f9]">{group as string}</h2><div className="space-y-4">{(items as string[][]).map(([q,a])=><GlassCard key={q} className="p-6"><div className="flex items-start justify-between gap-4"><h3 className="text-lg font-bold text-[#d7e3f9]">{q}</h3><ChevronDown className="h-5 w-5 text-[#adc6ff]"/></div><p className="mt-4 text-sm leading-7 text-[#c2c6d6]">{a}</p></GlassCard>)}</div></div>)}</div></Section>
    <CTASection title="Still have questions?" description="Can't find the answer you're looking for? Reach out to our executive support team for a tailored deep-dive into our services." />
  </div>
);

export default FaqPage;

