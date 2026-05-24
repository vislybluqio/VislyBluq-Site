/** Server-side knowledge base for the VislyBluq AI assistant (no React imports). */
export const COMPANY_KNOWLEDGE = `
## About VislyBluq
VislyBluq is a technology consultancy and build partner for startups and SMEs. We advise first, then deliver when clients are ready.
Tagline: BUILD & CONSULT.
We combine expert technology consultation with hands-on delivery: strategy, roadmaps, websites, mobile apps, AI systems, and intelligent data platforms.

## Mission
Provide expert technology consultation and high-quality product development that helps startups and SMEs make smart decisions, solve real problems, and scale sustainably.

## Vision
Be the bedrock of digital transformation globally — where every product we build is reliable, sustainable, and excellent.

## Core values
- Excellence in Execution
- Integrity & Transparency
- Client-focused Problem Solving
- Continuous Learning

## Services

### 1. Technology Consulting
Strategic consulting to clarify direction, reduce risk, and align roadmaps with business goals.
Features: discovery workshops, technology audits, product & digital roadmapping, architecture & vendor advisory, fractional CTO / technical leadership.

### 2. Web & Mobile App Development
Scalable web and mobile applications with modern stacks.
Features: custom web apps (React, Next.js), mobile (iOS, Android), PWAs, API development & integration, UI/UX design & prototyping.

### 3. Data Strategy & Architecture
Data roadmaps aligned with business goals.
Features: data maturity assessment, enterprise data architecture, data governance, technology roadmapping, digital transformation strategy.

### 4. Machine Learning & AI
Practical AI: automation, prediction, competitive advantage.
Features: custom LLM integration, predictive analytics, computer vision, NLP & chatbots, AI model deployment & MLOps.

### 5. Business Intelligence
Dashboards and narratives for faster decisions.
Features: interactive dashboards, real-time KPI monitoring, self-service BI, data storytelling, automated reporting.

### 6. Data Engineering
Pipelines and warehouses that scale.
Features: ETL/ELT pipelines, data warehouse modernization, real-time streaming, data quality automation, legacy migration.

## Engagement & process
- Models: fixed-price, time & materials, or dedicated teams.
- MVPs often 3–4 months; enterprise data/AI platforms 6–12 months.
- Consulting-only engagements available (no build required).
- Post-launch: maintenance, SLA support, managed services.

## Industries
Healthcare, e-commerce, manufacturing, fintech — technologies are industry-agnostic.

## Security
Encryption at rest and in transit, strict access controls, NDAs available before sensitive discussions.

## Contact
Email: vislybluq5@gmail.com
Response time: within 24 hours.
Free initial consultation available.
Contact page: /contact
Book consulting: /contact?service=technology-consulting

## Technical depth (representative stacks)
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Mobile: iOS, Android, React Native
- Backend: Node.js, REST/GraphQL APIs
- Data: warehouses, ETL/ELT, streaming, governance
- AI/ML: LLMs, predictive models, MLOps, NLP, computer vision
- Cloud: scalable platforms (architecture advisory per client needs)

## What we do NOT do in chat
- Final binding quotes or contracts (direct to consultation)
- Legal, medical, or licensed financial advice
- Guarantees of specific business outcomes
`.trim();

export const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  fr: 'French',
  es: 'Spanish',
  de: 'German',
  zh: 'Chinese (Mandarin)',
};
