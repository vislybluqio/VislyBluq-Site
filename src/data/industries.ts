export interface Industry {
  id: string;
  title: string;
}

/** Listed in the header Industries menu and on the home page. Industries have no pages of their own. */
export const industries: Industry[] = [
  { id: 'fintech-cooperatives', title: 'Fintech and Cooperatives' },
  { id: 'smbs-retail', title: 'SMBs and Retail' },
  { id: 'healthcare', title: 'Healthcare' },
  { id: 'education', title: 'Education' },
  { id: 'logistics-supply-chain', title: 'Logistics and Supply Chain' },
  { id: 'real-estate-property', title: 'Real Estate and Property' },
];
