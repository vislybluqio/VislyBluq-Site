export interface InsightArticle {
  slug: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  body: string[];
  takeaways: string[];
  /** Service IDs from src/data/services.ts, used to cross-link insights to services, industries and focus pages. */
  tags: string[];
}

export const insights: InsightArticle[] = [
  {
    slug: 'generative-singularity-autonomous-enterprise-systems',
    category: 'AI Strategy',
    title: 'Practical AI Systems for Growing Businesses',
    summary: 'How teams can introduce LLM-driven workflows into existing operations without losing control, trust, or measurement.',
    readTime: '2 min read',
    body: [
      'Autonomous enterprise systems should not begin with a model choice. They should begin with a workflow that has enough repetition, data context, and decision value to justify automation.',
      'The strongest implementations usually combine retrieval, structured business rules, human approval, and clear fallback paths. This makes AI useful without pretending the model is the whole system.',
      'A production AI workflow needs observability. Teams should be able to see what was requested, what context was used, what was produced, who approved it, and where the system failed.',
      'For most companies, the first win is not replacing teams. It is removing coordination friction: summaries, triage, routing, draft responses, data lookup, and exception detection.',
    ],
    takeaways: ['Start with workflows, not model hype', 'Design human review into risky actions', 'Measure quality and escalation rate', 'Keep business context traceable'],
    tags: ['ml-ai', 'technology-consulting'],
  },
  // TODO(content): three more real posts are needed. See CONTENT_TODO.md.
];

export const getInsight = (slug: string) => insights.find((article) => article.slug === slug);
