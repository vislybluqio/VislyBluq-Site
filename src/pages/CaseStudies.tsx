import { ArrowRight, TrendingUp, Clock, DollarSign, BarChart3, PieChart, Activity } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: 'E-commerce Revenue Optimization',
      client: 'TechShop Inc.',
      industry: 'E-commerce',
      challenge: 'Declining conversion rates and inability to predict customer behavior.',
      solution: 'ML-powered recommendation engine and predictive analytics for inventory.',
      results: [
        { metric: 'Revenue', value: '42%', icon: DollarSign },
        { metric: 'Conversion', value: '+28%', icon: TrendingUp },
        { metric: 'Retention', value: '+35%', icon: Clock },
      ],
      image:
        'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
      testimonial:
        'VislyBluq transformed our understanding of customer behavior. Game-changing for inventory.',
      author: 'Sarah Johnson, CEO',
    },
    {
      title: 'Healthcare Data Integration',
      client: 'MedCare Solutions',
      industry: 'Healthcare',
      challenge: 'Fragmented patient data across multiple systems.',
      solution: 'Unified data platform with real-time monitoring and predictive analytics.',
      results: [
        { metric: 'Satisfaction', value: '+45%', icon: Activity },
        { metric: 'Efficiency', value: '+60%', icon: PieChart },
        { metric: 'Cost', value: '-38%', icon: DollarSign },
      ],
      image:
        'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600',
      testimonial: 'We can now predict health issues before they become critical.',
      author: 'Dr. Michael Rodriguez, CTO',
    },
    {
      title: 'Manufacturing Process Optimization',
      client: 'Global Manufacturing Corp',
      industry: 'Manufacturing',
      challenge: 'High equipment downtime and unpredictable maintenance costs.',
      solution: 'IoT sensors and predictive maintenance algorithms.',
      results: [
        { metric: 'Downtime', value: '-55%', icon: Clock },
        { metric: 'Maintenance', value: '-40%', icon: DollarSign },
        { metric: 'Production', value: '+32%', icon: BarChart3 },
      ],
      image:
        'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600',
      testimonial: 'We eliminated unexpected failures and optimized our maintenance schedule.',
      author: 'Emily Chen, Operations Director',
    },
  ];

  return (
    <div className="pt-16 bg-white">
      <PageHero
        title={
          <>
            Case <span className="text-visly-cyan">Studies</span>
          </>
        }
        subtitle="How we've helped businesses transform operations through data-driven solutions."
      />

      <Section bg="gray">
        <div className="space-y-10">
          {caseStudies.map((study, index) => (
            <Card key={index} className="!p-0 overflow-hidden" hover>
              <div className="grid lg:grid-cols-2">
                <div className="h-48 lg:h-auto lg:min-h-[280px] relative order-first lg:order-none">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-visly-blue/10 text-visly-blue px-3 py-1 rounded-full text-xs font-semibold uppercase">
                      {study.industry}
                    </span>
                    <span className="text-gray-500 text-sm">{study.client}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-visly-dark mb-4">{study.title}</h2>
                  <div className="space-y-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-visly-blue uppercase mb-1">Challenge</p>
                      <p className="text-sm text-gray-600">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-visly-blue uppercase mb-1">Solution</p>
                      <p className="text-sm text-gray-600">{study.solution}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {study.results.map((r) => (
                      <div key={r.metric} className="bg-visly-gray rounded-lg p-3 text-center">
                        <r.icon className="h-4 w-4 text-visly-cyan mx-auto mb-1" />
                        <p className="text-lg font-bold text-visly-dark">{r.value}</p>
                        <p className="text-[10px] text-gray-500 uppercase">{r.metric}</p>
                      </div>
                    ))}
                  </div>
                  <blockquote className="text-sm text-gray-600 italic border-l-2 border-visly-navy pl-3">
                    &ldquo;{study.testimonial}&rdquo;
                    <cite className="block text-visly-blue text-xs not-italic mt-1 font-medium">
                      — {study.author}
                    </cite>
                  </blockquote>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section bg="dark">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-white mb-2">Impact by the numbers</h2>
          <p className="text-sm text-gray-400">Average improvements within the first year.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { number: '3.2x', label: 'Average ROI' },
            { number: '45%', label: 'Cost Reduction' },
            { number: '60%', label: 'Time Savings' },
            { number: '85%', label: 'Accuracy Gain' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <p className="text-3xl font-bold text-visly-cyan mb-1">{stat.number}</p>
              <p className="text-sm text-white font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="py-16 bg-visly-blue text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Ready to write your success story?
          </h2>
          <p className="text-white/90 text-sm mb-6">
            Join businesses that transformed operations with our data and AI solutions.
          </p>
          <Button to="/contact" variant="white">
            Start Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
