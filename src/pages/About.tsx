import { Users, BookOpen, Shield, Zap } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import teamPhoto1 from '../images/1725732793686.jpeg';
import teamPhoto2 from '../images/WhatsApp Image 2026-05-24 at 17.59.11.jpeg';
import teamPhoto3 from '../images/WhatsApp Image 2026-05-24 at 17.58.54.jpeg';
import teamPhoto4 from '../images/WhatsApp Image 2026-05-24 at 18.16.37moses.jpeg';

const About = () => {
  const team = [
    {
      name: 'Odelola Solomon O.',
      role: '*write title*',
      image: teamPhoto1,
      color: 'from-visly-blue to-visly-cyan',
    },
    {
      name: 'Ibekwe Kyngsley',
      role: '*write title*',
      image: teamPhoto2,
      color: 'from-visly-navy to-visly-blue',
    },
    {
      name: 'Ibrahim Modupe',
      role: '*write title*',
      image: teamPhoto3,
      color: 'from-amber-500 to-orange-400',
    },
    {
      name: 'Festus Moses',
      role: '*write title*',
      image: teamPhoto4,
      color: 'from-visly-teal to-emerald-400',
    },
    {
      name: 'Amara Okafor',
      role: '*write title*',
      image:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-purple-600 to-pink-500',
    },
    {
      name: 'Lisa Thompson',
      role: '*write title*',
      image:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'from-rose-500 to-orange-400',
    },
  ];

  const values = [
    { icon: Zap, title: 'Excellence in Execution', color: 'from-visly-blue to-visly-cyan' },
    { icon: Shield, title: 'Integrity & Transparency', color: 'from-visly-navy to-visly-blue' },
    { icon: Users, title: 'Client-focused Problem Solving', color: 'from-amber-500 to-orange-400' },
    { icon: BookOpen, title: 'Continuous Learning', color: 'from-visly-teal to-emerald-400' },
  ];

  return (
    <div className="pt-16 bg-white">
      <PageHero
        eyebrow="Meet the team"
        title={
          <>
            About <span className="text-visly-cyan">VislyBluq</span>
          </>
        }
        subtitle="EXpert Consultants and builders — strategists, Experienced backend and frontend engineers, AI experts, data experts who advise first and deliver when you're ready."
      />

      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div id="vision">
            <h2 className="text-3xl font-semibold text-visly-dark mb-6">
              Mission & <span className="text-visly-blue">Vision</span>
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-visly-blue uppercase tracking-wider mb-2">
                  The Mission
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  To provide expert technology consultation and high-quality product development that
                  help startups and SMEs make smart decisions, solve real problems, and scale sustainably.
                </p>
              </div>
              <div className="bg-visly-dark p-6 rounded-2xl border-l-4 border-visly-cyan">
                <h3 className="text-sm font-semibold text-visly-cyan uppercase tracking-wider mb-2">
                  The Vision
                </h3>
                <p className="text-sm text-white italic leading-relaxed">
                  To be the bedrock of digital transformation globally — where every product we build
                  is reliable, sustainable, and excellent.
                </p>
              </div>
            </div>
          </div>
          <Card className="bg-gradient-to-br from-visly-navy via-visly-blue to-visly-cyan !border-0 text-white">
            <h3 className="text-lg font-semibold text-white mb-2">Established excellence</h3>
            <p className="text-white/90 text-sm mb-6">
              Founded by experts who saw the need for accessible, enterprise-grade data solutions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">150+</p>
                <p className="text-xs text-white/80">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">50+</p>
                <p className="text-xs text-white/80">Clients</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-visly-dark mb-2">Our core values</h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Principles that guide everything we do.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className={`bg-gradient-to-br ${v.color} p-5 rounded-2xl text-white text-center`}
            >
              <v.icon className="h-8 w-8 mx-auto mb-3 opacity-90" />
              <h3 className="text-sm font-semibold">{v.title}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-visly-dark mb-2">Meet our team</h2>
          <p className="text-base text-gray-600">
            A focused team of six — consultants, engineers, and data experts working together for your success.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.name} hover className="!p-0 overflow-hidden">
              <div className={`bg-gradient-to-br ${member.color} p-4 md:p-5`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-[3/4] max-h-72 rounded-2xl object-cover object-top border-2 border-white shadow-sm"
                  loading="lazy"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold text-visly-dark text-base">{member.name}</h3>
                <p className="text-visly-blue text-sm font-medium mt-1 italic">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section bg="dark">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white mb-3">Our expertise</h2>
          <p className="text-base text-gray-300 mb-10 max-w-2xl mx-auto">
            Technical excellence combined with deep business understanding.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '10+', l: 'Years Experience' },
              { n: '25+', l: 'Industries Served' },
              { n: '100+', l: 'AI Models Deployed' },
            ].map((stat) => (
              <div key={stat.l}>
                <p className="text-3xl font-bold text-visly-cyan mb-1">{stat.n}</p>
                <p className="text-sm text-gray-400">{stat.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default About;
