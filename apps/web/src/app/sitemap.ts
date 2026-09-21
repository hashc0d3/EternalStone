import type { MetadataRoute } from 'next';
import { OPT_CATEGORIES, RETAIL_CATEGORIES, catalogHref } from '@/lib/catalog';
import { absUrl } from '@/lib/seo';

function sitemapLoc(path: string) {
  return absUrl(path).replaceAll('&', '&amp;');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: sitemapLoc('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: sitemapLoc('/catalog'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: sitemapLoc(catalogHref('opt')), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: sitemapLoc('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: sitemapLoc('/works'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: sitemapLoc('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: sitemapLoc('/contacts'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: sitemapLoc('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: sitemapLoc('/sitemap'), lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];

  for (const category of RETAIL_CATEGORIES) {
    pages.push({
      url: sitemapLoc(catalogHref('retail', category.slug)),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
    for (const child of category.children ?? []) {
      pages.push({
        url: sitemapLoc(catalogHref('retail', category.slug, child.slug)),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  pages.push(
    {
      url: sitemapLoc(catalogHref('retail', 'pamyatniki', null, 'granite')),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: sitemapLoc(catalogHref('retail', 'pamyatniki', null, 'marble')),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  );

  for (const category of OPT_CATEGORIES) {
    pages.push({
      url: sitemapLoc(catalogHref('opt', category.slug)),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  return pages;
}
