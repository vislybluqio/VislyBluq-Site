import { services } from './services';

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
