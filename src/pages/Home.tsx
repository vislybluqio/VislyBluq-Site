import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  Target,
  BookOpen,
  Layers,
  CheckCircle,
  Smartphone,
  Globe,
  ChevronRight,
  Quote,
  Lightbulb,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import StoryVideoCard from '../components/StoryVideoCard';

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        'VislyBluq transformed our outdated internal tools into a sleek, modern web platform. The efficiency gains were immediate.',
      author: 'Jessica Williams',
      role: 'Chief Operations Officer',
      image:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      quote:
        "Their data/AI strategy not only cleaned up our reporting but gave us financial predictive insights we didn't know were possible.",
      author: 'Mark Davis',
      role: 'Strategic Founder',
      image:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      quote:
        'We needed a mobile app launched in 3 months. VislyBluq delivered it in 2.5 months, with 500ms latency, user satisfying, bug-free and beautiful.',
      author: 'Sarah Chen',
      role: 'Principal Product Lead',
      image:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const values = [
    {
      icon: <Zap className="h-6 w-6 text-visly-teal" />,
      title: 'Excellence in Execution',
      description:
        'We deliver faster, better, and with precision that sets a new standard.',
    },
    {
      icon: <Shield className="h-6 w-6 text-visly-blue" />,
      title: 'Integrity & Transparency',
      description: 'Honest communication and rock-solid reliability in every interaction.',
    },
    {
      icon: <Users className="h-6 w-6 text-visly-cyan" />,
      title: 'Client-focused Problem Solving',
      description: 'Solutions tailored to solve real problems, not hypothetical ones.',
    },
    {
      icon: <BookOpen className="h-6 w-6 text-amber-500" />,
      title: 'Continuous Learning',
      description: 'The latest technologies and strategies, applied with purpose.',
    },
  ];

  const goals = [
    { title: 'Build Credibility', desc: 'A trustworthy tech brand.', icon: <Globe className="h-5 w-5" /> },
    { title: 'Deliver Value', desc: 'Measurable impact for every client.', icon: <CheckCircle className="h-5 w-5" /> },
    { title: 'Sustainable Growth', desc: 'Long-term partnerships that last.', icon: <TrendingUpIcon className="h-5 w-5" /> },
    { title: 'Expertise-Driven', desc: 'Real solutions. Real results.', icon: <Layers className="h-5 w-5" /> },
  ];

  const trustedLogos = ['NovaTech', 'DataFlow', 'ScaleUp', 'CloudNine', 'InsightLab'];

  return (
    <div className="pt-16 bg-white">
      {/* Hero */}
      <section className="relative bg-visly-dark py-16 lg:py-24 overflow-x-clip">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-visly-navy/50 transform -skew-x-12 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-visly-blue/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] gap-10 lg:gap-8 items-center">
            <div className="min-w-0 max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 text-balance">
                We consult, design & build{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-visly-blue to-visly-cyan">
                  world-class digital products
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl">
                VislyBluq is your partner for expert technology consultation and hands-on delivery —
                from strategy and roadmaps to websites, mobile apps, AI powered, and intelligent data systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button to="/contact?service=technology-consulting">Book a Consultation</Button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-base border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  Start Your Project
                </Link>
              </div>
            </div>
            <div className="w-full max-w-[360px] mx-auto lg:mx-0 lg:justify-self-end shrink-0">
              <StoryVideoCard />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-8 border-b border-gray-100 bg-visly-gray/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
            Trusted by innovative companies
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {trustedLogos.map((name) => (
              <span key={name} className="text-sm font-semibold text-gray-400">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative">
            <div className="aspect-[4/3] max-h-[420px] rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-visly-blue mb-4">
              <Target className="h-4 w-4" />
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-visly-dark mb-4 leading-tight">
              Designing experiences.{' '}
              <span className="text-visly-blue">Engineering growth.</span>
            </h2>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              We combine strategic consultation with expert execution — helping startups and SMEs
              make the right technology choices, then building what matters.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-visly-dark mb-1">Technology Consulting</h3>
                  <p className="text-sm text-gray-600">
                    Discovery, roadmaps, audits, and advisory — with or without a build engagement.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-visly-navy flex items-center justify-center shrink-0">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-visly-dark mb-1">App & Web Development</h3>
                  <p className="text-sm text-gray-600">
                    Responsive websites and mobile apps built with modern frameworks.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-visly-teal flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-visly-dark mb-1">Data & AI Strategy</h3>
                  <p className="text-sm text-gray-600">
                    Intelligent systems that turn information into actionable insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section bg="dark">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">What our clients say</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/10 text-center">
            <Quote className="h-8 w-8 text-visly-cyan mx-auto mb-4 opacity-60" />
            <p className="text-lg md:text-xl text-white leading-relaxed italic min-h-[4rem] flex items-center justify-center">
              &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
            </p>
            <div className="mt-6 flex flex-col items-center">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].author}
                className="w-12 h-12 rounded-full border-2 border-visly-blue mb-2 object-cover"
                loading="lazy"
              />
              <p className="font-semibold text-white text-sm">{testimonials[currentTestimonial].author}</p>
              <p className="text-visly-cyan text-xs">{testimonials[currentTestimonial].role}</p>
            </div>
            <div className="flex justify-center mt-5 gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentTestimonial(idx)}
                  aria-label={`Testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentTestimonial ? 'w-6 bg-visly-cyan' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section bg="gray">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-visly-dark mb-3">Our core values</h2>
          <p className="text-base text-gray-600">
            The principles behind every decision, line of code, and partnership.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} hover>
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-base font-semibold text-visly-dark mb-2">{value.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Strategic goals */}
      <Section bg="navy" className="!bg-visly-navy">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Strategic goals & vision
            </h2>
            <p className="text-base text-gray-300 mb-6 leading-relaxed">
              Our framework evolves as VislyBluq grows while maintaining clarity, credibility, and
              strategic focus. We build with a vision of how users will truly love and experience the product.
            </p>
            <Link
              to="/about#vision"
              className="inline-flex items-center gap-2 text-visly-cyan font-medium text-sm hover:text-white"
            >
              Read more about our vision
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10"
              >
                <div className="mb-3 text-visly-cyan">{goal.icon}</div>
                <h3 className="font-semibold text-white text-sm mb-1">{goal.title}</h3>
                <p className="text-gray-400 text-xs">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-visly-dark mb-4">
            Need consultation, a build, or both?
          </h2>
          <p className="text-base text-gray-600 mb-8">
            Book a free consultation or tell us about your project — we&apos;ll recommend the right
            path forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button to="/contact?service=technology-consulting">Book a Consultation</Button>
            <Button to="/contact" variant="secondary">
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
