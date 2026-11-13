import type { MetaDescriptor } from 'react-router';

/** The live site settles on www (the bare domain redirects there). */
export const SITE_URL = 'https://www.vislybluq.com';
const SITE_NAME = 'VislyBluq';
const SHARE_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Title, description, canonical URL and share-preview tags for one page. These end up in the
 * prerendered HTML, which is what search engines, WhatsApp/LinkedIn previews and AI assistants read.
 */
export const pageMeta = ({ title, description, path }: { title: string; description: string; path: string }): MetaDescriptor[] => {
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  return [
    { title: fullTitle },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: SHARE_IMAGE },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'VislyBluq: technology consulting and product engineering' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
};
