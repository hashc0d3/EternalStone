import { Suspense } from 'react';
import { CatalogPageView } from '@/components/catalog-page-view';
import { SiteShell } from '@/components/site-shell';

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
