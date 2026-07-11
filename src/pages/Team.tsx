import { Linkedin, Mail } from 'lucide-react';
import { GlassCard, PageIntro, PrimaryLink, Section } from '../components/site/Enterprise';
import solomonPhoto from '../images/1725732793686.jpeg';
import kingsleyPhoto from '../images/WhatsApp Image 2026-05-24 at 17.59.11.jpeg';
import ibrahimPhoto from '../images/WhatsApp Image 2026-05-24 at 17.58.54.jpeg';
import mosesPhoto from '../images/WhatsApp Image 2026-05-24 at 18.16.37moses.jpeg';
import funmiPhoto from '../images/funmi.jpeg';

const leaders = [
  { name: 'Odelola Solomon O.', role: 'General Managing Director, Co-founder & Head of Engineering', image: solomonPhoto, email: 'solomon@vislybluq.com', linkedin: 'https://www.linkedin.com/company/vislybluq' },
  { name: 'Ibekwe Kingsley', role: 'CEO, Co-founder & Senior Software Engineer', image: kingsleyPhoto, email: 'kingsley@vislybluq.com', linkedin: 'https://www.linkedin.com/company/vislybluq' },
  { name: 'Oluwatifunmilayo Ude', role: 'Co-founder and Head of AI and Data Engineering', image: funmiPhoto, email: 'hello@vislybluq.com', linkedin: 'https://www.linkedin.com/company/vislybluq' },
  { name: 'Ibrahim Modupe', role: 'Product and Operations Lead', image: ibrahimPhoto, email: 'modupe@vislybluq.com', linkedin: 'https://www.linkedin.com/company/vislybluq' },
  { name: 'Festus Moses', role: 'Head of Legal & Corporate Affairs', image: mosesPhoto, email: 'moses@vislybluq.com', linkedin: 'https://www.linkedin.com/company/vislybluq' },
];

const Team = () => (
  <div>
    <PageIntro eyebrow="Leadership" title={<>The People Behind VislyBluq.</>} description="Meet the leadership team guiding VislyBluq. Behind them is a wider bench of software engineers, AI/data engineers, product specialists, and delivery partners who support projects as needed." />
    <Section className="pt-0">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {leaders.map((member) => <GlassCard key={member.name} className="overflow-hidden p-0"><div className="bg-[radial-gradient(circle_at_30%_20%,rgba(173,198,255,0.24),transparent_35%),linear-gradient(135deg,rgba(42,53,70,0.8),rgba(3,15,30,0.8))] p-5"><img src={member.image} alt={member.name} className="h-80 w-full rounded-2xl border border-white/10 object-cover object-top shadow-2xl" loading="lazy" /></div><div className="p-6"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#77d8ff]">{member.role}</p><h2 className="mt-3 text-2xl font-bold text-[#d7e3f9]">{member.name}</h2><div className="mt-6 flex gap-3"><a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-[#adc6ff] hover:bg-white/5"><Mail className="h-4 w-4" />Email</a><a href={member.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-[#adc6ff] hover:bg-white/5"><Linkedin className="h-4 w-4" />LinkedIn</a></div></div></GlassCard>)}
      </div>
    </Section>
    <Section className="pt-0"><GlassCard className="p-10 text-center"><h2 className="text-5xl font-bold text-[#d7e3f9]">Work with the team.</h2><p className="mx-auto mt-5 max-w-2xl text-[#c2c6d6]">Tell us what you are trying to build and we will connect the right mix of strategy, engineering, data, and AI support.</p><div className="mt-8"><PrimaryLink to="/contact">Start a Conversation</PrimaryLink></div></GlassCard></Section>
  </div>
);

export default Team;



