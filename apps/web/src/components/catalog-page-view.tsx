'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SiteCatalog } from '@/components/site-catalog';
import type { CatalogView } from '@/lib/catalog';

export function CatalogPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view: CatalogView = searchParams.get('view') === 'opt' ? 'opt' : 'retail';

  function onChange(next: CatalogView) {
    router.replace(next === 'opt' ? '/catalog?view=opt' : '/catalog', { scroll: false });
  }

  return <SiteCatalog heading="h1" view={view} onChange={onChange} />;
}
