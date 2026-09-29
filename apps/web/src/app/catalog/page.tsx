import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CatalogPageView } from '@/components/catalog-page-view';
import { SiteShell } from '@/components/site-shell';
import {
  catalogHref,
  categoryTitle,
  materialTitle,
  parseMaterial,
  subcategoryTitle,
  type CatalogView,
} from '@/lib/catalog';
import { pageMetadata } from '@/lib/seo';

type Search = Promise<{
  view?: string;
  cat?: string;
  sub?: string;
  material?: string;
}>;

export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
  const params = await searchParams;
  const view: CatalogView = params.view === 'opt' ? 'opt' : 'retail';
  const category = params.cat ?? null;
  const subcategory = params.sub ?? null;
  const material = parseMaterial(params.material ?? null);
  const title =
    subcategoryTitle(view, category, subcategory) ??
    materialTitle(material) ??
    (category ? categoryTitle(view, category) : view === 'opt' ? 'Оптовый каталог' : 'Каталог памятников');
  const description =
    view === 'opt'
      ? `Оптовый каталог камня: ${title}. Памятники, изделия и плитка от производителя в Омске.`
      : `${title} — гранит, изготовление и установка в Омске и по России.`;

  return pageMetadata({
    title,
    description,
    path: catalogHref(view, category, subcategory, material),
  });
}

export default function CatalogPage() {
  return (
    <SiteShell
      afterHero={
        <Suspense>
          <CatalogPageView />
        </Suspense>
      }
    />
  );
}
