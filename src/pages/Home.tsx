
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Users, Target, BookOpen, Layers, CheckCircle, Smartphone, Globe, Code, ChevronRight, Quote } from 'lucide-react';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "VislyBluq transformed our outdated internal tools into a sleek, modern web platform. The efficiency gains were immediate.",
      author: "Jessica Williams",
      role: "Chief Operations Officer",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      quote: "Their data strategy not only cleaned up our reporting but gave us predictive insights we didn't know were possible.",
      author: "Mark Davis",
      role: "Strategic Founder",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      quote: "We needed a mobile app launched in 3 months. VislyBluq delivered it in 2.5 months, bug-free and beautiful.",
      author: "Sarah Chen",
      role: "Principal Product Lead",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const values = [
    {
      icon: <Zap className="h-8 w-8 text-visly-teal" />,
      title: "Excellence in Execution",
      description: "We don't just get it done; we do it faster, better, and with precision that sets a new standard."
    },
    {
      icon: <Shield className="h-8 w-8 text-visly-blue" />,
      title: "Integrity & Transparency",
      description: "Building trust through honest communication and rock-solid reliability in every interaction."
    },
    {
      icon: <Users className="h-8 w-8 text-visly-cyan" />,
      title: "Client-focused Problem Solving",
      description: "Your challenges are our obsession. We tailor solutions that solve real problems, not just hypothetical ones."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-yellow-400" />,
      title: "Continuous Learning & Innovation",
      description: "Staying ahead of the curve to bring you the latest, most effective technologies and strategies."
    }
  ];

  const goals = [
    {
      title: "Build Credibility",
      desc: "Establishing a strong, trustworthy tech brand.",
      icon: <Globe className="h-6 w-6" />
    },
    {
      title: "Deliver Value",
      desc: "Consistent, measurable impact for every client.",
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      title: "Sustainable Growth",
      desc: "Forging long-term partnerships that last.",
      icon: <TrendingUpIcon className="h-6 w-6" />
    },
    {
      title: "Expertise-Driven",
      desc: "Real solutions, no hype. Just results.",
      icon: <Layers className="h-6 w-6" />
    }
  ];

  return (
    <div className="pt-20 overflow-hidden bg-white selection:bg-visly-blue selection:text-white">
      {/* Hero Section */}
      <section className="relative bg-visly-dark py-32 lg:py-48 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-visly-navy opacity-50 transform -skew-x-12 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-visly-blue opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-visly-cyan opacity-10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8">
              Building World-Class <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-visly-blue to-visly-cyan">
                Apps & Data Products.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed font-light max-w-3xl">
              We are <span className="text-white font-semibold">VislyBluq</span>. A digital product company delivering high-performance websites, mobile apps, and intelligent data systems that is reliable, sustainable, maintainable, scalable, and cost-effective.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/contact"
                className="group bg-visly-blue text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-visly-navy transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-visly-blue/50"
              >
                Start Your Project
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="group border border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Strip */}
      <section className="py-10 bg-visly-navy/5 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by Innovative Companies accros the Globe</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder Logos using Text for simplicity but styled as logos */}
            <span className="text-xl font-black text-gray-600"></span>
            <span className="text-xl font-bold text-gray-600"></span>
            <span className="text-xl font-extrabold text-gray-600 italic"></span>
            <span className="text-xl font-bold text-gray-600 tracking-tighter"></span>
            <span className="text-xl font-semibold text-gray-600"></span>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-visly-navy/20 mix-blend-multiply"></div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-visly-gray rounded-3xl -z-10"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-visly-cyan/20 rounded-full blur-2xl -z-10"></div>
            </div>

            <div>
              <div className="inline-flex items-center space-x-2 bg-visly-blue/10 text-visly-blue px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                <Target className="h-4 w-4" />
                <span>Our Mission</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-visly-dark mb-8 leading-tight">
                Designing Experiences. <br />
                <span className="text-visly-blue">Engineering Growth.</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                To deliver high-quality digital products and strategic technology services that help individuals, startups, and SMEs solve real problems and operate efficiently.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-visly-navy flex items-center justify-center mt-1">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-visly-dark mb-2">App & Web Development</h3>
                    <p className="text-gray-600">Beautiful, responsive websites and mobile applications built with modern frameworks.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-visly-teal flex items-center justify-center mt-1">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-visly-dark mb-2">Data & AI Strategy</h3>
                    <p className="text-gray-600">Intelligent data systems that turn information into actionable business insights.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-24 bg-visly-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-visly-navy opacity-30 radial-gradient"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">What Our Clients Say</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-14 border border-white/10 text-center">
              <Quote className="h-12 w-12 text-visly-cyan mx-auto mb-8 opacity-50" />

              <div className="min-h-[200px] flex items-center justify-center">
                <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed italic transition-all duration-500 ease-in-out">
                  "{testimonials[currentTestimonial].quote}"
                </p>
              </div>

              <div className="mt-10 flex flex-col items-center">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].author}
                  className="w-16 h-16 rounded-full border-2 border-visly-blue mb-4 object-cover"
                />
                <h4 className="text-xl font-bold text-white">{testimonials[currentTestimonial].author}</h4>
                <p className="text-visly-cyan font-medium">{testimonials[currentTestimonial].role}</p>
              </div>

              {/* Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentTestimonial ? 'bg-visly-cyan w-8' : 'bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-visly-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-visly-dark mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that drive every decision, every line of code, and every partnership we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-visly-navy transition-colors duration-300">
                  <div className="group-hover:text-white transition-colors duration-300">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-visly-dark mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Goals - The "Framework" */}
      <section className="py-24 bg-visly-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-visly-dark opacity-50 transform skew-x-12 translate-x-32"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8">
                Strategic Goals & <br /> Vision
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Our framework is designed to evolve as Vislybluq grows while maintaining clarity, credibility, and strategic focus. <strong>We aim to be better than the best.</strong>
              </p>

              <a
                href="/about#vision"
                className="inline-flex items-center space-x-2 text-visly-cyan font-bold hover:text-white transition-colors text-lg"
              >
                <span>Read more about our vision</span>
                <ChevronRight className="h-5 w-5" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {goals.map((goal, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="mb-4 text-visly-cyan">
                    {goal.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {goal.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Code className="w-[800px] h-[800px]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-visly-dark mb-8 tracking-tight">
            Simply Perfect.
          </h2>
          <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Ready to experience a website and service that works so perfectly you'll love what you see?
          </p>
          <Link
            to="/contact"
            className="inline-block bg-visly-navy text-white text-xl font-bold px-12 py-6 rounded-full hover:bg-visly-blue hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Let's Build Something Amazing
          </Link>
        </div>
      </section>
    </div>
  );
};

// Start: Helper component for icon
function TrendingUpIcon(props: any) {
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
  )
}

export default Home;

