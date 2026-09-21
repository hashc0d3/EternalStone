import type { MetadataRoute } from 'next';
import { absUrl, siteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: absUrl('/sitemap.xml'),
    host: siteUrl(),
  };
}
