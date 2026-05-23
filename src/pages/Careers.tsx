import { Briefcase, ArrowRight, MapPin, Clock, Code } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Careers = () => {
  const positions = [
    {
      title: 'Senior Full Stack Engineer',
      type: 'Full-time',
      location: 'Remote',
      team: 'Engineering',
      description:
        'Lead development of enterprise-grade web applications (React/Node.js) for our clients.',
      tags: ['React', 'Node.js', 'TypeScript', 'AWS'],
    },
    {
      title: 'Data Engineer',
      type: 'Full-time',
      location: 'Remote',
      team: 'Data',
      description:
        'Build scalable ETL pipelines and data warehouses using modern cloud technologies.',
      tags: ['Python', 'SQL', 'Airflow', 'Snowflake'],
    },
    {
      title: 'UI/UX Designer',
      type: 'Contract / Full-time',
      location: 'Remote',
      team: 'Design',
      description:
        'Create intuitive, beautiful interfaces for web and mobile projects.',
      tags: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems'],
    },
  ];

  const culture = [
    { icon: Code, title: 'Modern stack', desc: 'Latest tools and frameworks.' },
    { icon: MapPin, title: 'Remote-first', desc: 'Work from where you thrive.' },
    { icon: Briefcase, title: 'Growth budget', desc: 'Courses, books, and conferences.' },
  ];

  return (
    <div className="pt-16 bg-white">
      <PageHero
        eyebrow="Join the team"
        title={
          <>
            Build the future <span className="text-visly-cyan">with VislyBluq</span>
          </>
        }
        subtitle="Work on challenging projects that make a real difference."
      />

      <Section bg="white" className="!py-12 border-b border-gray-100">
        <div className="grid md:grid-cols-3 gap-6">
          {culture.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-10 h-10 bg-visly-gray rounded-lg flex items-center justify-center mx-auto mb-3">
                <item.icon className="h-5 w-5 text-visly-blue" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-600 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-visly-dark mb-2">Open positions</h2>
          <p className="text-sm text-gray-600">
            Don&apos;t see a fit?{' '}
            <a href="mailto:vislybluq5@gmail.com" className="text-visly-blue font-medium hover:underline">
              Email us anyway
            </a>
            .
          </p>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {positions.map((job) => (
            <Card key={job.title} hover>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold uppercase text-visly-blue bg-blue-50 px-2 py-0.5 rounded">
                      {job.team}
                    </span>
                    <span className="flex items-center text-gray-500 text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center text-gray-500 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-visly-dark mb-2">{job.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  to={`/apply?job=${encodeURIComponent(job.title)}`}
                  size="sm"
                  className="shrink-0 self-start md:self-center"
                >
                  Apply
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Careers;
