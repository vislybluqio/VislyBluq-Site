export interface Industry {
  id: string;
  title: string;
  /** Short intro shown on the industry page and in navigation. Empty means not yet written. */
  description: string;
  /** Service IDs from src/data/services.ts. */
  serviceIds: string[];
}

export const industries: Industry[] = [
  {
    id: 'fintech-cooperatives',
    title: 'Fintech and Cooperatives',
    // TODO(content): short description of our fintech and cooperative work.
    description: '',
    serviceIds: ['digital-product-development', 'ml-ai', 'data-engineering'],
  },
  {
    id: 'smbs-retail',
    title: 'SMBs and Retail',
    // TODO(content): short description of our SMB and retail work.
    description: '',
    serviceIds: ['technology-consulting', 'digital-product-development', 'business-intelligence'],
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    // TODO(content): short description of our healthcare work.
    description: '',
    serviceIds: ['digital-product-development', 'data-engineering', 'business-intelligence'],
  },
  {
    id: 'education',
    title: 'Education',
    // TODO(content): short description of our education work.
    description: '',
    serviceIds: ['digital-product-development', 'ml-ai', 'technology-consulting'],
  },
  {
    id: 'logistics-supply-chain',
    title: 'Logistics and Supply Chain',
    // TODO(content): short description of our logistics and supply chain work.
    description: '',
    serviceIds: ['data-engineering', 'business-intelligence', 'ml-ai'],
  },
  {
    id: 'real-estate-property',
    title: 'Real Estate and Property',
    // TODO(content): short description of our real estate and property work.
    description: '',
    serviceIds: ['digital-product-development', 'business-intelligence', 'technology-consulting'],
  },
];

export const getIndustry = (id: string) => industries.find((industry) => industry.id === id);
