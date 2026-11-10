import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

/** Web app manifest, replaces the CRA boilerplate `manifest.json`. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | ${site.role}`,
    short_name: site.name,
    description: site.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0e13',
    theme_color: '#0c0e13',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
