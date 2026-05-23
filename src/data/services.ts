import { Layout, Database, Brain, BarChart3, Cloud, Lightbulb, LucideIcon } from 'lucide-react';
import { createElement } from 'react';

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  teaser: string;
  description: string;
  benefits: string;
  features: string[];
  color: string;
  icon: LucideIcon;
  number: string;
}

export const services: Service[] = [
  {
    id: 'technology-consulting',
    title: 'Technology Consulting',
    shortTitle: 'Consulting',
    teaser: 'Expert guidance before and during your build',
    description:
      'Strategic technology consulting to clarify direction, reduce risk, and align your roadmap with business goals — whether you need advice only or a full build partner.',
    benefits:
      'Make confident decisions with unbiased expert advice tailored to your stage, budget, and long-term vision.',
    features: [
      'Discovery workshops & needs assessment',
      'Technology audits & recommendations',
      'Product & digital roadmapping',
      'Architecture & vendor advisory',
      'Fractional CTO / technical leadership',
    ],
    color: 'from-indigo-600 to-visly-blue',
    icon: Lightbulb,
    number: '01',
  },
  {
    id: 'digital-product-development',
    title: 'Web & Mobile App Development',
    shortTitle: 'App Development',
    teaser: 'High-performance web and mobile products',
    description:
      'We consult on your product vision, then build scalable web and mobile applications that deliver exceptional user experiences and measurable outcomes.',
    benefits:
      'Engage customers with beautiful, fast, and reliable digital products built on modern technology stacks.',
    features: [
      'Custom Web Applications (React, Next.js)',
      'Mobile App Development (iOS, Android)',
      'Progressive Web Apps (PWA)',
      'API Development & Integration',
      'UI/UX Design & Prototyping',
    ],
    color: 'from-visly-blue to-visly-cyan',
    icon: Layout,
    number: '02',
  },
  {
    id: 'data-strategy',
    title: 'Data Strategy & Architecture',
    shortTitle: 'Data Strategy',
    teaser: 'Roadmaps aligned with business goals',
    description:
      'We help you define a clear data roadmap, aligning technology with your business goals to drive scalable growth.',
    benefits:
      'Build a solid foundation for your digital future, ensuring every tech investment delivers real ROI.',
    features: [
      'Data maturity assessment',
      'Enterprise data architecture',
      'Data governance frameworks',
      'Technology roadmapping',
      'Digital transformation strategy',
    ],
    color: 'from-visly-navy to-visly-blue',
    icon: Database,
    number: '03',
  },
  {
    id: 'ml-ai',
    title: 'Machine Learning & AI',
    shortTitle: 'ML & AI',
    teaser: 'Practical AI that solves real problems',
    description:
      'Deploy intelligent AI systems that automate processes, predict outcomes, and create new competitive advantages.',
    benefits:
      'Move beyond hype to practical AI applications that solve real business problems and enhance efficiency.',
    features: [
      'Custom LLM integration',
      'Predictive analytics models',
      'Computer vision systems',
      'NLP & Chatbot development',
      'AI model deployment & MLOps',
    ],
    color: 'from-visly-teal to-emerald-400',
    icon: Brain,
    number: '04',
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence',
    shortTitle: 'Business Intelligence',
    teaser: 'Data stories that drive decisions',
    description:
      'Turn raw data into visual narratives that empower your team to make faster, smarter decisions.',
    benefits:
      'Democratize data across your organization, enabling every team to act on insights, not just instincts.',
    features: [
      'Interactive dashboard design',
      'Real-time KPI monitoring',
      'Self-service BI setup',
      'Data storytelling',
      'Automated reporting',
    ],
    color: 'from-amber-500 to-orange-400',
    icon: BarChart3,
    number: '05',
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    shortTitle: 'Data Engineering',
    teaser: 'Pipelines that scale with you',
    description:
      'Build robust, scalable data pipelines and warehouses that ensure your data is accurate, accessible, and secure.',
    benefits:
      "Eliminate data silos and ensure your critical information flows seamlessly where it's needed most.",
    features: [
      'ETL/ELT pipeline development',
      'Data warehouse modernization',
      'Real-time data streaming',
      'Data quality automation',
      'Legacy data migration',
    ],
    color: 'from-purple-600 to-pink-500',
    icon: Cloud,
    number: '06',
  },
];

export const getServiceById = (id: string): Service | undefined =>
  services.find((s) => s.id === id);

export const ServiceIcon = ({ service, className = 'h-5 w-5' }: { service: Service; className?: string }) =>
  createElement(service.icon, { className });
