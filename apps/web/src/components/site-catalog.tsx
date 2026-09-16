'use client';

import { useState } from 'react';
import { CatalogCard } from '@/components/catalog-card';
import { CatalogSwitch } from '@/components/catalog-switch';
import { LeadModal } from '@/components/lead-modal';
import { RequestCta } from '@/components/request-cta';
import { OPT_CARDS, RETAIL_CARDS, type CatalogView } from '@/lib/catalog';

export function SiteCatalog({
  heading: Heading = 'h2',
  view,
  onChange,
}: {
  heading?: 'h1' | 'h2';
  view: CatalogView;
  onChange: (view: CatalogView) => void;
}) {
  const [requestOpen, setRequestOpen] = useState(false);
  const isOpt = view === 'opt';
  const [first, second, ...rest] = RETAIL_CARDS;

  return (
    <section className="flex min-h-[calc(100dvh-var(--header-height))] flex-col bg-[#1a1a1a]" aria-labelledby="catalog-title">
      <Heading
        id="catalog-title"
        className="px-4 py-6 text-[28px] font-light uppercase tracking-[0.12em] sm:px-6 sm:py-8 sm:text-4xl lg:px-8 lg:text-5xl"
      >
        <span className="text-white">Каталог</span>
      </Heading>

      <CatalogSwitch value={view} onChange={onChange} />

      {isOpt ? (
        <div className="grid min-h-[240px] flex-1 gap-px bg-black lg:min-h-[380px] lg:grid-cols-3">
          {OPT_CARDS.map((card) => (
            <CatalogCard key={card.href} {...card} featured />
          ))}
        </div>
      ) : (
        <div className="grid min-h-0 flex-1 gap-px bg-black lg:grid-rows-2">
          <div className="grid min-h-[220px] gap-px lg:min-h-0 lg:grid-cols-[1.35fr_1fr]">
            <CatalogCard {...first} featured />
            <CatalogCard {...second} featured />
          </div>
          <div className="grid min-h-[200px] gap-px lg:min-h-0 lg:grid-cols-3">
            {rest.map((card) => (
              <CatalogCard key={card.href} {...card} />
            ))}
          </div>
        </div>
      )}

      <RequestCta onClick={() => setRequestOpen(true)} />

      {requestOpen ? (
        <LeadModal
          title="Оставить заявку"
          source={isOpt ? 'wholesale' : 'retail'}
          onClose={() => setRequestOpen(false)}
        />
      ) : null}
    </section>
  );
}

export function HomeCatalog() {
  const [view, setView] = useState<CatalogView>('retail');
  return <SiteCatalog view={view} onChange={setView} />;
}
