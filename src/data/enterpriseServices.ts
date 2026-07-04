import type { ComponentType } from 'react';
import { Brain, CloudCog, Languages, Layers, Paintbrush, Settings } from 'lucide-react';

export interface ServicePillar {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  summary: string;
  value: string;
  tags: string[];
  action: string;
  detailTitle: string;
  detail: string[];
  outcomes: string[];
  process: string[];
}

export const servicePillars: ServicePillar[] = [
  {
    id: 'enterprise-ai-strategy',
    title: 'Enterprise AI Strategy',
    icon: Brain,
    summary: 'Operationalize generative AI and machine learning at scale. We help teams move from experiments to production-ready workflows.',
    value: 'Clear automation opportunities and measurable operating leverage',
    tags: ['LLMOps', 'Model Evaluation', 'Workflow AI'],
    action: 'View Core Pillars',
    detailTitle: 'Core pillars for practical enterprise AI',
    detail: [
      'We identify where AI can remove repetitive work, improve decision speed, or create new customer experiences without forcing unnecessary complexity.',
      'The engagement covers data readiness, model selection, governance, evaluation, rollout planning, and human-in-the-loop safeguards.',
      'For teams already experimenting with AI, we help move prototypes into monitored production systems with traceable outputs and escalation paths.',
    ],
    outcomes: ['AI opportunity map', 'LLM workflow architecture', 'Evaluation and guardrail plan', 'Implementation roadmap'],
    process: ['Discovery and workflow audit', 'Data and risk review', 'Prototype architecture', 'Production rollout plan'],
  },
  {
    id: 'full-stack-modernization',
    title: 'Full-Stack Modernization',
    icon: Languages,
    summary: 'Transform legacy or fragmented systems into fast, maintainable web platforms built for modern teams and customers.',
    value: 'Faster interfaces, cleaner architecture, and easier feature delivery',
    tags: ['React', 'Next.js', 'APIs', 'Edge Runtimes'],
    action: 'Explore Case Studies',
    detailTitle: 'Modern product engineering without losing business continuity',
    detail: [
      'We assess the current application surface, data flow, hosting model, and user experience before recommending a migration path.',
      'Modernization can mean a new frontend, API consolidation, database cleanup, cloud migration, performance work, or a careful phased rebuild.',
      'The goal is to reduce maintenance drag while preserving the workflows the business depends on.',
    ],
    outcomes: ['Architecture audit', 'Migration roadmap', 'Frontend/API rebuild plan', 'Performance budget'],
    process: ['System mapping', 'Risk-based prioritization', 'Incremental rebuild', 'Launch and optimization'],
  },
  {
    id: 'data-fabric-architecture',
    title: 'Data Fabric Architecture',
    icon: Layers,
    summary: 'Unify scattered business data into reliable pipelines, warehouses, dashboards, and operational intelligence layers.',
    value: 'Cleaner reporting and faster decisions from trusted data',
    tags: ['Warehousing', 'ETL/ELT', 'Streaming', 'Governance'],
    action: 'View Technical Specs',
    detailTitle: 'A practical foundation for trusted business data',
    detail: [
      'We design data systems around real decisions: finance, operations, growth, customer support, risk, and product usage.',
      'The architecture can include ingestion pipelines, data quality checks, warehouse modeling, dashboards, and governance processes.',
      'We avoid overbuilding by starting with the questions leaders and teams must answer reliably every week.',
    ],
    outcomes: ['Data source map', 'Pipeline architecture', 'Warehouse model', 'Dashboard and KPI plan'],
    process: ['Data discovery', 'Modeling and pipeline design', 'Quality controls', 'Analytics rollout'],
  },
  {
    id: 'cloud-native-migration',
    title: 'Cloud Native Migration',
    icon: CloudCog,
    summary: 'Move infrastructure toward scalable, observable, cost-aware cloud environments across AWS, Azure, GCP, or hybrid setups.',
    value: 'More reliable deployments and stronger operational visibility',
    tags: ['Terraform', 'Kubernetes', 'CI/CD', 'FinOps'],
    action: 'Request Assessment',
    detailTitle: 'Cloud migration with cost and reliability in view',
    detail: [
      'We review hosting, deployment, security, scaling, observability, and backup practices to find the best migration path.',
      'Not every system needs Kubernetes or a complex platform. We recommend the simplest infrastructure that satisfies reliability and growth needs.',
      'The work can include infrastructure-as-code, CI/CD, monitoring, disaster recovery, and cost governance.',
    ],
    outcomes: ['Cloud readiness assessment', 'Migration plan', 'Deployment architecture', 'Monitoring and cost controls'],
    process: ['Infrastructure audit', 'Target architecture', 'Migration execution', 'Operational handover'],
  },
  {
    id: 'intelligent-automation',
    title: 'Intelligent Automation',
    icon: Settings,
    summary: 'Replace repetitive manual operations with connected workflows, internal tools, and AI-assisted task automation.',
    value: 'Time reclaimed from manual coordination and repeated back-office work',
    tags: ['Workflow Design', 'RPA', 'Integrations', 'Internal Tools'],
    action: 'Start Free Audit',
    detailTitle: 'Automation that fits how your team already works',
    detail: [
      'We identify repeated handoffs, status checks, document tasks, approvals, data entry, and reporting bottlenecks.',
      'Then we design workflows that connect the tools you already use, adding custom software only where it creates clear leverage.',
      'Where AI is useful, it is paired with review, fallback, and escalation paths so the business remains in control.',
    ],
    outcomes: ['Automation opportunity audit', 'Workflow map', 'Integration plan', 'Pilot implementation'],
    process: ['Process interviews', 'Workflow scoring', 'Pilot design', 'Measurement and scale'],
  },
  {
    id: 'strategic-product-design',
    title: 'Strategic Product Design',
    icon: Paintbrush,
    summary: 'Design systems and user experiences for dashboards, internal tools, customer platforms, and complex workflows.',
    value: 'Cleaner user journeys and higher adoption across product surfaces',
    tags: ['UX Research', 'Design Systems', 'React UI', 'Prototyping'],
    action: 'View Design Philosophy',
    detailTitle: 'Design for complex products people can actually use',
    detail: [
      'We translate business goals and technical constraints into product flows, interface systems, and implementation-ready designs.',
      'For enterprise tools, our design work emphasizes clarity, information density, predictable workflows, and fast scanning.',
      'The output can include product strategy, wireframes, prototypes, component systems, and implementation support.',
    ],
    outcomes: ['Product flow maps', 'Prototype screens', 'Design system foundation', 'Implementation notes'],
    process: ['Stakeholder and user discovery', 'Flow design', 'Prototype iteration', 'Developer handoff'],
  },
];

export const additionalServices = [
  ['Security Architecture', 'Threat modeling, access design, audit readiness, and secure delivery practices.'],
  ['API & Integration Strategy', 'Connect tools, payment systems, CRMs, ERPs, dashboards, and custom apps cleanly.'],
  ['Business Intelligence', 'Dashboards and reporting surfaces that help teams make decisions faster.'],
  ['Mobile Product Delivery', 'Cross-platform and native mobile experiences for customer or internal use.'],
  ['MVP Launch Support', 'Lean product scoping, prototype delivery, and launch readiness for early teams.'],
  ['Technical Due Diligence', 'Architecture, code, infrastructure, and delivery risk reviews for leaders and investors.'],
  ['Managed Evolution', 'Ongoing improvements, monitoring, refactoring, and roadmap delivery after launch.'],
  ['Fractional CTO Support', 'Senior technical guidance for teams that need leadership before hiring full-time.'],
];

export const getServicePillar = (id: string) => servicePillars.find((service) => service.id === id);
