'use client';

import Image from 'next/image';
import { useState } from 'react';
import { LeadModal } from '@/components/lead-modal';

const PARTNERS = [
  { src: '/images/partners/2.png', alt: 'Шато' },
  { src: '/images/partners/1.png', alt: 'Сбербанк' },
  { src: '/images/partners/3.png', alt: 'ОмГМУ' },
] as const;

export function Partners() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-[#1a1a1a] px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="partners-title">
      <div className="mx-auto max-w-5xl text-center">
        <h2
          id="partners-title"
          className="text-[28px] font-light uppercase tracking-[0.12em] sm:text-4xl lg:text-5xl"
        >
          <span className="text-white">Нам</span> <span className="text-white/35">доверяют</span>
        </h2>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-10 sm:gap-16">
          {PARTNERS.map((partner) => (
            <li key={partner.src} className="flex h-20 w-40 items-center justify-center sm:h-24 sm:w-48">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={320}
                height={160}
                className="max-h-20 w-auto object-contain mix-blend-screen sm:max-h-24"
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-12 inline-flex min-h-12 min-w-[220px] items-center justify-center bg-white px-8 text-sm font-medium uppercase tracking-[0.16em] text-[#1a1a1a] transition-colors duration-300 hover:bg-white/80"
          onClick={() => setOpen(true)}
        >
          Стать партнером
        </button>
      </div>

      {open ? <LeadModal title="Стать партнёром" source="partner" onClose={() => setOpen(false)} /> : null}
    </section>
  );
}
