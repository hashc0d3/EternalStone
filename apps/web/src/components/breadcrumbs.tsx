import Link from 'next/link';
import { absUrl } from '@/lib/seo';

export type Crumb = {
  href?: string;
  label: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;
  const last = items.length - 1;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absUrl(item.href) } : {}),
    })),
  };

  return (
    <nav aria-label="Навигация по разделам" className="border-b border-white/10 bg-[#1a1a1a] text-white">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-white/45 sm:px-6 lg:px-8">
        {items.map((item, index) => {
          const current = index === last;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-white/25">
                  /
                </span>
              ) : null}
              {current || !item.href ? (
                <span className={current ? 'text-white' : undefined} aria-current={current ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
