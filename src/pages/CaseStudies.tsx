
import { ArrowRight, TrendingUp, Clock, DollarSign, BarChart3, PieChart, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "E-commerce Revenue Optimization",
      client: "TechShop Inc.",
      industry: "E-commerce",
      challenge: "Declining conversion rates and inability to predict customer behavior accurately.",
      solution: "Implemented ML-powered recommendation engine and predictive analytics for inventory management.",
      results: [
        { metric: "Revenue Increase", value: "42%", icon: <DollarSign className="h-5 w-5" /> },
        { metric: "Conversion Rate", value: "+28%", icon: <TrendingUp className="h-5 w-5" /> },
        { metric: "Customer Retention", value: "+35%", icon: <Clock className="h-5 w-5" /> }
      ],
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
      testimonial: "Vislybluq transformed our understanding of customer behavior. The predictive models have been game-changing for our inventory management.",
      author: "Sarah Johnson, CEO"
    },
    {
      title: "Healthcare Data Integration",
      client: "MedCare Solutions",
      industry: "Healthcare",
      challenge: "Fragmented patient data across multiple systems leading to inefficient care delivery.",
      solution: "Built unified data platform with real-time patient monitoring and predictive health analytics.",
      results: [
        { metric: "Patient Satisfaction", value: "+45%", icon: <Activity className="h-5 w-5" /> },
        { metric: "Operational Efficiency", value: "+60%", icon: <PieChart className="h-5 w-5" /> },
        { metric: "Cost Reduction", value: "38%", icon: <DollarSign className="h-5 w-5" /> }
      ],
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600",
      testimonial: "The integrated platform has revolutionized how we deliver patient care. We can now predict health issues before they become critical.",
      author: "Dr. Michael Rodriguez, CTO"
    },
    {
      title: "Manufacturing Process Optimization",
      client: "Global Manufacturing Corp",
      industry: "Manufacturing",
      challenge: "High equipment downtime and unpredictable maintenance costs affecting production efficiency.",
      solution: "Deployed IoT sensors and predictive maintenance algorithms to optimize equipment performance.",
      results: [
        { metric: "Downtime Reduction", value: "55%", icon: <Clock className="h-5 w-5" /> },
        { metric: "Maintenance Costs", value: "-40%", icon: <DollarSign className="h-5 w-5" /> },
        { metric: "Production Efficiency", value: "+32%", icon: <BarChart3 className="h-5 w-5" /> }
      ],
      image: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600",
      testimonial: "Predictive maintenance has transformed our operations. We've eliminated unexpected failures and optimized our maintenance schedule.",
      author: "Emily Chen, Operations Director"
    }
  ];

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="bg-visly-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-visly-navy opacity-50 transform skew-x-12 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-visly-blue opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Case <span className="text-visly-cyan">Studies</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Discover how we've helped businesses across industries transform their operations
              through data-driven solutions that deliver measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-visly-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="bg-visly-blue/10 text-visly-blue px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
                        {study.industry}
                      </span>
                      <span className="text-gray-500 font-medium">{study.client}</span>
                    </div>

                    <h2 className="text-3xl font-black text-visly-dark mb-4 leading-tight">
                      {study.title}
                    </h2>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-sm font-bold text-visly-blue uppercase tracking-wider mb-2">Challenge</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">{study.challenge}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-visly-blue uppercase tracking-wider mb-2">Solution</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">{study.solution}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-visly-blue uppercase tracking-wider mb-4">Key Results</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="bg-visly-gray rounded-xl p-4 border border-gray-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="text-visly-cyan">{result.icon}</div>
                                <span className="text-2xl font-black text-visly-dark">{result.value}</span>
                              </div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">{result.metric}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-visly-navy/5 rounded-2xl p-6 border-l-4 border-visly-navy">
                        <blockquote className="text-visly-dark italic mb-3 font-medium text-lg leading-relaxed">
                          "{study.testimonial}"
                        </blockquote>
                        <cite className="text-visly-blue font-bold not-italic">— {study.author}</cite>
                      </div>
                    </div>
                  </div>

                  <div className="lg:order-first relative h-full min-h-[400px]">
                    <div className="absolute inset-0 bg-visly-navy/20 mix-blend-multiply z-10"></div>
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-visly-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-visly-blue rounded-full opacity-10"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-visly-teal rounded-full opacity-10"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Our Impact by the Numbers
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              These results represent the average improvements our clients experience
              within the first year of implementation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "3.2x", label: "Average ROI", sublabel: "Within 12 months" },
              { number: "45%", label: "Cost Reduction", sublabel: "Operational efficiency" },
              { number: "60%", label: "Time Savings", sublabel: "Automated processes" },
              { number: "85%", label: "Accuracy Improvement", sublabel: "Predictive models" }
            ].map((stat, index) => (
              <div key={index} className="text-center group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-5xl font-black text-visly-cyan mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                <div className="text-lg font-bold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-visly-blue relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-visly-teal opacity-20 transform skew-x-12"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
            Join the ranks of successful businesses that have transformed their operations
            with our data and AI solutions.
          </p>
          <Link to="/contact" className="bg-white text-visly-blue px-10 py-4 rounded-full font-bold text-lg hover:bg-visly-navy hover:text-white transition-all duration-300 inline-flex items-center shadow-xl transform hover:scale-105">
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;