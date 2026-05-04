import React from 'react';
import { Database, Brain, BarChart3, Cloud, ArrowRight, Sparkles, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'digital-product-development',
      icon: <Layout className="h-16 w-16 text-white" />,
      title: "Web & Mobile App Development",
      description: "We build high-performance, scalable web and mobile applications that deliver exceptional user experiences.",
      features: [
        "Custom Web Applications (React, Next.js)",
        "Mobile App Development (iOS, Android)",
        "Progressive Web Apps (PWA)",
        "API Development & Integration",
        "UI/UX Design & Prototyping"
      ],
      benefits: "Engage your customers with beautiful, fast, and reliable digital products built on modern technology stacks.",
      color: "from-visly-blue to-visly-cyan",
      number: "01."
    },
    {
      id: 'data-strategy',
      icon: <Database className="h-16 w-16 text-white" />,
      title: "Data Strategy & Architecture",
      description: "We help you define a clear data roadmap, aligning technology with your business goals to drive scalable growth.",
      features: [
        "Data maturity assessment",
        "Enterprise data architecture",
        "Data governance frameworks",
        "Technology roadmapping",
        "Digital transformation strategy"
      ],
      benefits: "Build a solid foundation for your digital future, ensuring every tech investment delivers real ROI.",
      color: "from-visly-navy to-visly-blue",
      number: "02."
    },
    {
      id: 'ml-ai',
      icon: <Brain className="h-16 w-16 text-white" />,
      title: "Machine Learning & AI",
      description: "Deploy intelligent AI systems that automate processes, predict outcomes, and create new competitive advantages.",
      features: [
        "Custom LLM integration",
        "Predictive analytics models",
        "Computer vision systems",
        "NLP & Chatbot development",
        "AI model deployment & MLOps"
      ],
      benefits: "Move beyond hype to practical AI applications that solve real business problems and enhance efficiency.",
      color: "from-visly-teal to-emerald-400",
      number: "03."
    },
    {
      id: 'business-intelligence',
      icon: <BarChart3 className="h-16 w-16 text-white" />,
      title: "Business Intelligence",
      description: "Turn raw data into visual narratives that empower your team to make faster, smarter decisions.",
      features: [
        "Interactive dashboard design",
        "Real-time KPI monitoring",
        "Self-service BI setup",
        "Data storytelling",
        "Automated reporting"
      ],
      benefits: "Democratize data across your organization, enabling every team to act on insights, not just instincts.",
      color: "from-yellow-500 to-orange-400",
      number: "04."
    },
    {
      id: 'data-engineering',
      icon: <Cloud className="h-16 w-16 text-white" />,
      title: "Data Engineering",
      description: "Build robust, scalable data pipelines and warehouses that ensure your data is accurate, accessible, and secure.",
      features: [
        "ETL/ELT pipeline development",
        "Data warehouse modernization",
        "Real-time data streaming",
        "Data quality automation",
        "Legacy data migration"
      ],
      benefits: "Eliminate data silos and ensure your critical information flows seamlessly where it's needed most.",
      color: "from-purple-600 to-pink-500",
      number: "05."
    }
  ];

  return (
    <div className="pt-20 overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative bg-visly-dark py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-visly-cyan rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-visly-blue rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-visly-navy rounded-full opacity-5"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-visly-blue/10 text-visly-cyan px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-visly-blue/20">
              <Sparkles className="h-4 w-4" />
              <span>COMPREHENSIVE TECH SOLUTIONS</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              OUR
              <span className="block bg-gradient-to-r from-visly-blue to-visly-cyan bg-clip-text text-transparent">
                SERVICES
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              From strategic consulting to hands-on engineering, we deliver end-to-end technology services that transform your business operations.
            </p>

            {/* Quick Navigation Cards */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {services.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all group text-center"
                >
                  <div className="mb-3 transform group-hover:scale-110 transition-transform">
                    {React.cloneElement(service.icon as React.ReactElement, { className: "h-8 w-8 text-visly-cyan mx-auto" })}
                  </div>
                  <span className="text-white text-xs font-bold uppercase tracking-wider block">
                    {service.title.split(' ').slice(0, 2).join(' ')}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-32">
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="mb-8">
                      <div className="text-6xl font-black text-gray-100 mb-4 select-none">
                        {service.number}
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black text-visly-dark mb-6 leading-tight">
                        {service.title}
                      </h2>
                      <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
                        {service.description}
                      </p>
                      <div className="bg-visly-gray rounded-2xl p-6 mb-8 border-l-4 border-visly-blue">
                        <p className="text-visly-navy font-semibold text-lg italic">
                          "{service.benefits}"
                        </p>
                      </div>
                      <Link to="/contact" className="bg-visly-navy text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-visly-blue transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-lg">
                        Get Started
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </Link>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className={`bg-gradient-to-br ${service.color} rounded-3xl p-8 relative overflow-hidden shadow-2xl group cursor-default`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>

                      <div className="relative z-10">
                        <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>

                        <h3 className="text-2xl font-black text-white mb-6 border-b border-white/20 pb-4">
                          Key Capabilities
                        </h3>

                        <ul className="space-y-4">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                              <span className="text-white font-semibold text-lg">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-visly-gray relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-visly-dark mb-6">
              OUR PROCESS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              We follow a proven development methodology to ensure successful project delivery
              and maximum return on investment.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understand your requirements, technical constraints, and business objectives.",
                color: "from-visly-navy to-visly-blue"
              },
              {
                step: "02",
                title: "Strategy",
                description: "Design the technical architecture and strategic roadmap for success.",
                color: "from-visly-blue to-visly-cyan"
              },
              {
                step: "03",
                title: "Execution",
                description: "Build and implement solutions using agile best practices.",
                color: "from-visly-teal to-emerald-400"
              },
              {
                step: "04",
                title: "Growth",
                description: "Launch, optimize, and scale your solution for long-term value.",
                color: "from-yellow-500 to-orange-400"
              }
            ].map((phase, index) => (
              <div key={index} className="text-center group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
                <div className={`w-20 h-20 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-300 shadow-md`}>
                  <span className="text-white font-black text-xl">{phase.step}</span>
                </div>
                <h3 className="text-2xl font-black text-visly-dark mb-4">
                  {phase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-visly-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-visly-blue rounded-full opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-visly-teal rounded-full opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Build
            <span className="block bg-gradient-to-r from-visly-cyan to-visly-teal bg-clip-text text-transparent">
              Something Amazing?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-medium">
            Let's discuss how our data, AI, and coding expertise can transform your business.
            Schedule a free consultation to explore your options.
          </p>
          <Link to="/contact" className="bg-white text-visly-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-visly-cyan hover:text-white transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-xl">
            Schedule Consultation
            <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;