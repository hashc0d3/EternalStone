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
    <section className="flex flex-col bg-[#1a1a1a]" aria-labelledby="partners-title">
      <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h2
          id="partners-title"
          className="text-[28px] font-light uppercase tracking-[0.12em] sm:text-4xl lg:text-5xl"
        >
          <span className="text-white">Нам</span> <span className="text-white/35">доверяют</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm tracking-wide text-white/45 sm:text-[15px]">
          Компании и учреждения, с которыми мы работаем в Омске.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-px bg-black sm:grid-cols-3">
        {PARTNERS.map((partner) => (
          <li key={partner.src}>
            <div className="group flex min-h-[240px] flex-col items-center justify-center gap-6 bg-[#1a1a1a] px-8 py-10 transition-colors duration-300 hover:bg-[#111] lg:min-h-[280px]">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={400}
                height={200}
                className="max-h-24 w-auto object-contain opacity-80 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100 sm:max-h-28"
              />
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 group-hover:text-white/80">
                {partner.alt}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <button type="button" className="btn-bar group" onClick={() => setOpen(true)}>
        <span className="mark-sq" aria-hidden="true" />
        Стать партнером
      </button>

      {open ? <LeadModal title="Стать партнёром" source="partner" onClose={() => setOpen(false)} /> : null}
    </section>
  );
}
