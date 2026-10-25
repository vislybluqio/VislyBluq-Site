export interface Metric {
  value: string;
  label: string;
}

// TODO(content): confirm each number below is accurate before launch.
export const homeMetrics: Metric[] = [
  { value: '5+', label: 'Builds & prototypes' },
  { value: '10+', label: 'Strategy sessions' },
  { value: '24h', label: 'Typical first response' },
  { value: '3', label: 'Core delivery tracks' },
];
