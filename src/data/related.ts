import { servicePillars } from './enterpriseServices';
import { services } from './services';
import { insights } from './insights';
import { projects } from './projects';

const overlaps = (a: string[], b: string[]) => a.some((id) => b.includes(id));

/**
 * services.ts IDs are the tagging vocabulary, but the detail pages under /services/:id are the
 * pillars in enterpriseServices.ts. This picks the one pillar page that best covers each service.
 * Services without a dedicated pillar link to the /services overview.
 */
const primaryPillarFor: Record<string, string> = {
  'digital-product-development': 'full-stack-modernization',
  'data-strategy': 'data-fabric-architecture',
  'ml-ai': 'enterprise-ai-strategy',
  'business-intelligence': 'data-fabric-architecture',
  'data-engineering': 'data-fabric-architecture',
};

export const serviceHref = (serviceId: string) =>
  primaryPillarFor[serviceId] ? `/services/${primaryPillarFor[serviceId]}` : '/services';

export interface ServiceLink {
  id: string;
  title: string;
  summary: string;
  icon: (typeof services)[number]['icon'];
  href: string;
}

export const serviceLinksForIds = (serviceIds: string[]): ServiceLink[] =>
  serviceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service) => service !== undefined)
    .map((service) => ({ id: service.id, title: service.title, summary: service.description, icon: service.icon, href: serviceHref(service.id) }));

/** Service IDs covered by a pillar page, for finding content related to that page. */
export const serviceIdsForPillar = (pillarId: string) =>
  servicePillars.find((pillar) => pillar.id === pillarId)?.serviceIds ?? [];

export const insightsForServiceIds = (serviceIds: string[], limit?: number) =>
  insights.filter((insight) => overlaps(insight.tags, serviceIds)).slice(0, limit);

export const projectsForServiceIds = (serviceIds: string[], limit?: number) =>
  projects.filter((project) => overlaps(project.tags, serviceIds)).slice(0, limit);

export const projectsByIds = (ids: string[]) =>
  ids.map((id) => projects.find((project) => project.id === id)).filter((project) => project !== undefined);
