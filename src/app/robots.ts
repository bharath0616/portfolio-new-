import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';

/**
 * robots.txt.
 *
 * Open to all crawlers except the API route, which has nothing indexable and would
 * only waste crawl budget. AI crawlers are intentionally *not* blocked — for a
 * portfolio, being readable by AI search is upside, not risk.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
