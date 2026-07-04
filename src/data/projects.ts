export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: string;
  summary: string;
  stack: string;
  type: 'security' | 'cooperative' | 'platform';
  overview: string[];
  highlights: string[];
  outcomes: string[];
}

export const projects: ProjectCaseStudy[] = [
  {
    id: 'sentinel-fraud-engine',
    title: 'Sentinel Fraud Engine',
    category: 'Security Intelligence',
    summary: 'A real-time fraud monitoring interface for identity, session, credit piggybacking, and device spoofing signals.',
    stack: 'React / TypeScript / Risk Analytics',
    type: 'security',
    overview: [
      'Sentinel Fraud Engine presents high-risk fraud signals in a focused command interface built for fast investigation and operational clarity.',
      'The dashboard organizes identities processed, active sessions, detected threats, latency, live threat feed, and engine status in one dark monitoring surface.',
      'The product direction emphasizes fast scanning, clear risk categories, and immediate visibility into active monitoring engines.',
    ],
    highlights: ['Live threat feed', 'Identity and biometric analysis views', 'Threat distribution monitoring', 'Engine status cards'],
    outcomes: ['Faster fraud triage', 'Clear operational dashboards', 'Reusable security design system'],
  },
  {
    id: 'lighthill-cooperative-platform',
    title: 'Lighthill Cooperative Society Platform',
    category: 'Financial Community Platform',
    summary: 'A cooperative society web platform for member trust, savings visibility, product education, and digital onboarding.',
    stack: 'React / Member Portal / Financial UX',
    type: 'cooperative',
    overview: [
      'The Lighthill platform presents a warm financial community experience around savings, loans, land investment, purchasing power, and member growth.',
      'The design balances credibility and accessibility with clear CTAs, member metrics, trust signals, and a product section for cooperative offerings.',
      'For public-facing financial communities, the experience must feel transparent, calm, and easy for members to understand.',
    ],
    highlights: ['Member-first landing page', 'Savings and loan metrics', 'Product education sections', 'Trust-led visual identity'],
    outcomes: ['Clearer member onboarding', 'Better product communication', 'Scalable cooperative web foundation'],
  },
  {
    id: 'visly-analytics-hub',
    title: 'Visly Analytics Hub',
    category: 'Business Intelligence',
    summary: 'A dashboard framework for teams that need operational metrics, alerts, and reporting clarity across departments.',
    stack: 'Dashboards / Data Modeling / KPI Design',
    type: 'platform',
    overview: [
      'Visly Analytics Hub is a business intelligence pattern for turning scattered operational data into decision-ready dashboards.',
      'The system focuses on KPI clarity, permission-aware access, clean information hierarchy, and reporting flows that leaders can scan quickly.',
    ],
    highlights: ['KPI architecture', 'Department views', 'Alert-ready metrics', 'Executive reporting'],
    outcomes: ['Better decision speed', 'Less reporting friction', 'Reusable analytics components'],
  },
  {
    id: 'cognitive-core-ops',
    title: 'Cognitive Core Ops',
    category: 'AI Operations',
    summary: 'A workflow intelligence layer for routing requests, summarizing context, and escalating exceptions to human teams.',
    stack: 'LLM Workflows / Automation / Integrations',
    type: 'platform',
    overview: [
      'Cognitive Core Ops is designed for businesses that want AI-assisted operations without losing human control over important decisions.',
      'It combines intake, context retrieval, suggested actions, and escalation into a controlled workflow surface.',
    ],
    highlights: ['Request triage', 'AI summaries', 'Human escalation', 'Workflow analytics'],
    outcomes: ['Faster response cycles', 'Clearer team handoffs', 'Measured automation quality'],
  },
];

export const getProject = (id: string) => projects.find((project) => project.id === id);
