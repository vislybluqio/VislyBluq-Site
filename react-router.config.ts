import type { Config } from '@react-router/dev/config';
import { servicePillars } from './src/data/enterpriseServices';

export default {
  appDirectory: 'src',
  // No server at runtime: every page below is rendered to HTML at build time and served as a static
  // file, then the app takes over in the browser. The /api functions are unaffected.
  ssr: false,
  prerender: async ({ getStaticPaths }) => [
    ...getStaticPaths(),
    ...servicePillars.map((pillar) => `/services/${pillar.id}`),
  ],
} satisfies Config;
