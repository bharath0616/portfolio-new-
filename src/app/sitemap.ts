import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';

/**
 * Sitemap.
 *
 * Single-page site, so there is one canonical URL. Section anchors are deliberately
 * omitted — Google treats `#fragment` URLs as the same document, and listing them
 * dilutes rather than helps.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
