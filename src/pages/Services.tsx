import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { services, ServiceIcon } from '../data/services';

const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description: 'Understand your requirements, technical constraints, and business objectives.',
    color: 'from-visly-navy to-visly-blue',
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'Design the technical architecture and strategic roadmap for success.',
    color: 'from-visly-blue to-visly-cyan',
  },
  {
    step: '03',
    title: 'Execution',
    description: 'Build and implement solutions using agile best practices.',
    color: 'from-visly-teal to-emerald-400',
  },
  {
    step: '04',
    title: 'Growth',
    description: 'Launch, optimize, and scale your solution for long-term value.',
    color: 'from-amber-500 to-orange-400',
  },
];

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [activeId, setActiveId] = useState(services[0].id);

  useEffect(() => {
    const fromQuery = searchParams.get('service');
    const fromHash = location.hash.replace('#', '');
    const id = fromQuery || fromHash;
    if (id && services.some((s) => s.id === id)) {
      setActiveId(id);
    }
  }, [searchParams, location.hash]);

  const activeService = services.find((s) => s.id === activeId) ?? services[0];

  const selectService = (id: string) => {
    setActiveId(id);
    setSearchParams({ service: id }, { replace: true });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className="pt-16 bg-white">
      <PageHero
        eyebrow="Comprehensive tech solutions"
        title={
          <>
            Our <span className="text-visly-cyan">Services</span>
          </>
        }
        subtitle="We consult on strategy and architecture, then build when you're ready — end-to-end technology services that transform your business."
      />

      {/* Tabbed services */}
      <Section bg="white" className="!pt-8">
        {/* Mobile chips */}
        <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max pb-2">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => selectService(service.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeId === service.id
                    ? 'bg-visly-navy text-white'
                    : 'bg-visly-gray text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ServiceIcon service={service} className="h-4 w-4 shrink-0" />
                {service.shortTitle}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-20 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 px-3">
                Select a service
              </p>
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => selectService(service.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors border-l-4 ${
                    activeId === service.id
                      ? 'border-visly-blue bg-visly-gray/80'
                      : 'border-transparent hover:bg-visly-gray'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        activeId === service.id ? 'bg-visly-navy text-white' : 'bg-white text-visly-blue'
                      }`}
                    >
                      <ServiceIcon service={service} className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-visly-dark text-sm leading-snug">{service.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{service.teaser}</p>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </aside>

          {/* Detail panel */}
          <div>
            <Card className="!p-0 overflow-hidden">
              <div className={`bg-gradient-to-br ${activeService.color} px-6 py-5 flex items-center gap-4`}>
                <div className="p-3 bg-white/20 rounded-xl">
                  <ServiceIcon service={activeService} className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                    Service {activeService.number}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white">{activeService.title}</h2>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                  {activeService.description}
                </p>

                <blockquote className="border-l-4 border-visly-blue bg-visly-gray rounded-r-xl px-4 py-3 mb-8">
                  <p className="text-visly-navy text-sm font-medium italic">{activeService.benefits}</p>
                </blockquote>

                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
                  Key capabilities
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                  {activeService.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-visly-blue shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button to={`/contact?service=${activeService.id}`}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Quick overview cards */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => selectService(service.id)}
                  className={`p-3 rounded-xl text-center text-xs font-medium transition-colors border ${
                    activeId === service.id
                      ? 'border-visly-blue bg-visly-blue/5 text-visly-navy'
                      : 'border-gray-100 bg-white hover:border-gray-200 text-gray-600'
                  }`}
                >
                  <ServiceIcon
                    service={service}
                    className={`h-4 w-4 mx-auto mb-1.5 ${
                      activeId === service.id ? 'text-visly-blue' : 'text-gray-400'
                    }`}
                  />
                  {service.shortTitle}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section bg="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-visly-dark mb-3">Our Process</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            A proven methodology for successful delivery and maximum return on investment.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((phase) => (
            <Card key={phase.step} hover>
              <div
                className={`w-10 h-10 bg-gradient-to-br ${phase.color} rounded-full flex items-center justify-center mb-4`}
              >
                <span className="text-white text-xs font-bold">{phase.step}</span>
              </div>
              <h3 className="text-lg font-semibold text-visly-dark mb-2">{phase.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{phase.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-visly-dark relative overflow-hidden">
        <Container className="relative z-10 text-center">
          <Sparkles className="h-8 w-8 text-visly-cyan mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule a consultation and explore how our expertise can transform your business.
          </p>
          <Button to="/contact" variant="white">
            Schedule Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default Services;
