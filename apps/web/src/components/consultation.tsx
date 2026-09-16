'use client';

import { useState } from 'react';
import { LeadModal } from '@/components/lead-modal';

export function Consultation() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="border-t border-white/10 bg-[#1a1a1a] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      aria-labelledby="consultation-title"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2
          id="consultation-title"
          className="text-[28px] font-light uppercase leading-tight tracking-[0.12em] sm:text-4xl lg:text-5xl"
        >
          <span className="text-white">Бесплатная</span>{' '}
          <span className="text-white/35">консультация</span>
        </h2>
        <button
          type="button"
          className="btn-primary mt-10 min-w-[220px]"
          onClick={() => setOpen(true)}
        >
          Записаться
        </button>
      </div>

      {open ? (
        <LeadModal title="Бесплатная консультация" source="consultation" onClose={() => setOpen(false)} />
      ) : null}
    </section>
  );
}
