import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';
import { OPT_CATEGORIES, RETAIL_CATEGORIES, catalogHref } from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Карта сайта',
  description: 'Все разделы сайта «Вечный камень»: каталог, услуги, работы, контакты.',
  path: '/sitemap',
});

const PAGES = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: catalogHref('opt'), label: 'Оптовый каталог' },
  { href: '/services', label: 'Услуги' },
  { href: '/works', label: 'Работы' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/privacy', label: 'Политика конфиденциальности' },
];

export default function HtmlSitemapPage() {
  return (
    <SiteShell crumbs={[{ href: '/', label: 'Главная' }, { href: '/sitemap', label: 'Карта сайта' }]}>
      <h1 className="text-[28px] font-light uppercase tracking-[0.12em] sm:text-4xl">Карта сайта</h1>

      <section className="mt-10">
        <h2 className="text-sm uppercase tracking-[0.18em] text-white/50">Разделы</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {PAGES.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-white/75 transition-colors hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-sm uppercase tracking-[0.18em] text-white/50">Розница</h2>
        <ul className="mt-4 space-y-3">
          {RETAIL_CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link href={catalogHref('retail', category.slug)} className="text-white/80 hover:text-white">
                {category.title}
              </Link>
              {category.children ? (
                <ul className="mt-2 space-y-1 pl-4 text-sm text-white/55">
                  {category.children.map((child) => (
                    <li key={child.slug}>
                      <Link href={catalogHref('retail', category.slug, child.slug)} className="hover:text-white">
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-sm uppercase tracking-[0.18em] text-white/50">Опт</h2>
        <ul className="mt-4 space-y-2">
          {OPT_CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link href={catalogHref('opt', category.slug)} className="text-white/75 hover:text-white">
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
