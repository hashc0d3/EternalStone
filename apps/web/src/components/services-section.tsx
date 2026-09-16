'use client';

import { useState } from 'react';
import { CatalogCard } from '@/components/catalog-card';
import { LeadModal } from '@/components/lead-modal';

const SERVICES = [
  { title: 'Установка памятника и облицовка могил', image: '/images/services/install.png' },
  { title: 'Бесплатные консультации, выезд, замер', image: '/images/services/1.png' },
  { title: 'Доставка', image: '/images/services/2.png' },
  { title: 'Разработка макетов для могильных комплексов', image: '/images/services/layouts.png' },
] as const;

export function ServicesSection({ heading: Heading = 'h2' }: { heading?: 'h1' | 'h2' }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [install, consult, delivery, layouts] = SERVICES;

  return (
    <section className="flex min-h-[calc(100dvh-var(--header-height))] flex-col bg-[#1a1a1a]" aria-labelledby="services-title">
      <Heading
        id="services-title"
        className="px-4 py-6 text-[28px] font-light uppercase tracking-[0.12em] sm:px-6 sm:py-8 sm:text-4xl lg:px-8 lg:text-5xl"
      >
        <span className="text-white">Услуги</span>
      </Heading>

      <div className="grid min-h-0 flex-1 gap-px bg-black lg:grid-rows-2">
        <div className="grid min-h-[220px] gap-px lg:min-h-0 lg:grid-cols-[1.4fr_1fr]">
          <CatalogCard featured title={install.title} image={install.image} onClick={() => setSelected(install.title)} />
          <CatalogCard featured title={consult.title} image={consult.image} onClick={() => setSelected(consult.title)} />
        </div>
        <div className="grid min-h-[220px] gap-px lg:min-h-0 lg:grid-cols-[1fr_1.4fr]">
          <CatalogCard featured title={delivery.title} image={delivery.image} onClick={() => setSelected(delivery.title)} />
          <CatalogCard featured title={layouts.title} image={layouts.image} onClick={() => setSelected(layouts.title)} />
        </div>
      </div>

      {selected ? (
        <LeadModal title={selected} source="services" onClose={() => setSelected(null)} />
      ) : null}
    </section>
  );
}
