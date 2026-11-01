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
];

export const getIndustry = (id: string) => industries.find((industry) => industry.id === id);
