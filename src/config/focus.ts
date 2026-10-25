/**
 * Flagship long-form "focus" page. To change the topic, edit this object: the route
 * (/focus/<slug>), header dropdown link and home hero link all read from here.
 * Empty strings are unwritten content: they show TODO markers in dev and are hidden in production.
 */
export interface FocusStat {
  value: string;
  label: string;
}

export interface FocusPageConfig {
  slug: string;
  /** Short name used in navigation links. */
  navLabel: string;
  title: string;
  intro: string;
  cta: { label: string; to: string };
  stats: FocusStat[];
  /** Full-bleed band image; import from src/images when available. */
  bandImage?: string;
  bandImageAlt?: string;
  problem: string;
  approach: string;
  /** Service IDs from src/data/services.ts; drives the capability accordion and related content. */
  serviceIds: string[];
}

export const focusPage: FocusPageConfig = {
  slug: 'ai-for-fintech',
  navLabel: 'Focus: AI for fintech',
  title: 'AI for Fintech',
  // TODO(content): one-paragraph intro for the focus page.
  intro: '',
  cta: { label: 'Talk to us about your project', to: '/contact?service=ml-ai' },
  // TODO(content): three or four real stats (value + label).
  stats: [
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
  ],
  // TODO(content): band image (product shot or team photo) and its alt text.
  bandImage: undefined,
  bandImageAlt: '',
  // TODO(content): "the problem" paragraph.
  problem: '',
  // TODO(content): "how we approach it" paragraph.
  approach: '',
  serviceIds: ['ml-ai', 'data-engineering', 'digital-product-development', 'business-intelligence'],
};

export const focusPagePath = `/focus/${focusPage.slug}`;
