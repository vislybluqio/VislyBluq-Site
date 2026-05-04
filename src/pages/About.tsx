import { Users, BookOpen, Sparkles, Shield, Zap } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Data Strategist",
      bio: "15+ years in data architecture and business intelligence. Former VP of Data at Fortune 500 companies.",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-visly-blue to-visly-cyan"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & ML Engineer",
      bio: "PhD in Machine Learning from Stanford. Expert in deep learning and AI model deployment at scale.",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-visly-navy to-visly-blue"
    },
    {
      name: "Emily Johnson",
      role: "Lead Data Scientist",
      bio: "Specialized in predictive analytics and statistical modeling. Published researcher in data science.",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-yellow-500 to-orange-400"
    },
    {
      name: "David Park",
      role: "Cloud Solutions Architect",
      bio: "AWS and Azure certified expert. 12+ years building scalable data platforms in the cloud.",
      image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-visly-teal to-emerald-400"
    }
  ];

  const values = [
    {
      icon: <Zap className="h-16 w-16 text-white" />,
      title: "Excellence in Execution",
      description: "We don't just get it done; we do it faster, better, and with precision that sets a new standard.",
      color: "from-visly-blue to-visly-cyan"
    },
    {
      icon: <Shield className="h-16 w-16 text-white" />,
      title: "Integrity & Transparency",
      description: "Building trust through honest communication and rock-solid reliability in every interaction.",
      color: "from-visly-navy to-visly-blue"
    },
    {
      icon: <Users className="h-16 w-16 text-white" />,
      title: "Client-focused Problem Solving",
      description: "Your challenges are our obsession. We tailor solutions that solve real problems, not just hypothetical ones.",
      color: "from-yellow-500 to-orange-400"
    },
    {
      icon: <BookOpen className="h-16 w-16 text-white" />,
      title: "Continuous Learning",
      description: "Staying ahead of the curve to bring you the latest, most effective technologies and strategies.",
      color: "from-visly-teal to-emerald-400"
    }
  ];

  return (
    <div className="pt-20 overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-visly-gray to-white py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-visly-cyan rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-visly-blue rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-visly-navy rounded-full opacity-5"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-visly-blue/10 text-visly-blue px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <Sparkles className="h-4 w-4" />
              <span>MEET THE TEAM</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-visly-dark mb-8 leading-tight">
              ABOUT
              <span className="block bg-gradient-to-r from-visly-blue to-visly-cyan bg-clip-text text-transparent">
                VISLYBLUQ
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              We're a team of data scientists, engineers, and strategists passionate about
              transforming businesses through the power of data and artificial intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div id="vision">
              <h2 className="text-4xl md:text-5xl font-black text-visly-dark mb-8 leading-tight">
                Our
                <span className="bg-gradient-to-r from-visly-blue to-visly-cyan bg-clip-text text-transparent"> Mission & Vision</span>
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-visly-blue mb-3 uppercase tracking-wider">The Mission</h3>
                  <p className="text-xl text-gray-600 leading-relaxed font-medium">
                    To deliver high-quality technology applications and strategic consulting services that help individuals, startups, and SMEs solve real problems, operate efficiently, and scale sustainably.
                  </p>
                </div>

                <div className="bg-visly-dark p-8 rounded-3xl border-l-8 border-visly-cyan shadow-xl">
                  <h3 className="text-2xl font-bold text-visly-cyan mb-3 uppercase tracking-wider">The Vision</h3>
                  <p className="text-xl text-white leading-relaxed font-bold italic">
                    "To be the bedrock of digital transformation globally, where every product we build is a testament to reliability, sustainability, and unparalleled excellence. We don't just build software; we engineer the future of business."
                  </p>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  At VislyBluq, we are driven by a relentless pursuit of perfection. Every line of code, every design pixel, and every strategic decision is made with one goal: to create lasting, maintainable value that propels our clients ahead of the competition.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-visly-navy via-visly-blue to-visly-cyan rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-4">Established Excellence</h3>
                  <p className="text-white/90 mb-8 font-medium leading-relaxed">
                    Started by a team of varied experts who saw
                    the need for accessible, enterprise-grade data solutions for growing businesses.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-black">150+</div>
                      <div className="text-sm text-white/80 font-medium">Projects Delivered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black">50+</div>
                      <div className="text-sm text-white/80 font-medium">Happy Clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-visly-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-visly-dark mb-6">
              OUR CORE VALUES
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              These principles guide everything we do and ensure we deliver exceptional
              value to our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-br ${value.color} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>

                  <div className="relative z-10 text-center">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-black text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed font-medium">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-visly-dark mb-6">
              MEET OUR TEAM
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Our diverse team of experts brings together decades of experience in data science,
              engineering, and business strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                  <div className={`bg-gradient-to-br ${member.color} p-6 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="relative z-10">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-2xl mx-auto object-cover border-4 border-white shadow-lg"
                      />
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-xl font-black text-visly-dark mb-2">
                      {member.name}
                    </h3>
                    <p className="text-visly-blue font-bold mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-visly-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-visly-navy rounded-full opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-visly-blue rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-visly-teal rounded-full opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              OUR
              <span className="block bg-gradient-to-r from-visly-cyan to-visly-teal bg-clip-text text-transparent">
                EXPERTISE
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-16 max-w-4xl mx-auto font-medium">
              We combine technical excellence with deep business understanding to deliver
              solutions that drive real results.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="text-5xl font-black text-white mb-4 group-hover:scale-110 transition-transform duration-300">10+</div>
                <div className="text-gray-300 font-semibold">Years Experience</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl font-black text-white mb-4 group-hover:scale-110 transition-transform duration-300">25+</div>
                <div className="text-gray-300 font-semibold">Industries Served</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl font-black text-white mb-4 group-hover:scale-110 transition-transform duration-300">100+</div>
                <div className="text-gray-300 font-semibold">AI Models Deployed</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;