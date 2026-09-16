'use client';

import { useState } from 'react';
import { LeadModal } from '@/components/lead-modal';
import { SiteMap } from '@/components/site-map';
import { ADDRESS_LABEL, PHONE_HREF, PHONE_LABEL, YANDEX_MAPS_HREF } from '@/lib/location';

export function ContactsContent() {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col bg-[#1a1a1a]" aria-labelledby="contacts-title">
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <h1
          id="contacts-title"
          className="text-[28px] font-light uppercase tracking-[0.12em] sm:text-4xl lg:text-5xl"
        >
          <span className="text-white">Контакты</span>
        </h1>
        <a href={PHONE_HREF} className="mt-8 block text-xl tracking-wide text-white hover:text-white/80">
          {PHONE_LABEL}
        </a>
        <a
          href={YANDEX_MAPS_HREF}
          target="_blank"
          rel="noreferrer"
          className="mt-3 block text-white/60 hover:text-white"
        >
          {ADDRESS_LABEL}
        </a>
        <button
          type="button"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-white px-8 text-sm font-medium uppercase tracking-[0.16em] text-[#1a1a1a] transition-colors duration-300 hover:bg-white/80"
          onClick={() => setOpen(true)}
        >
          Заказать обратный звонок
        </button>
      </div>
      <SiteMap className="h-[50vh] min-h-[360px] w-full lg:h-[60vh]" />

      {open ? (
        <LeadModal title="Заказать обратный звонок" source="contacts" onClose={() => setOpen(false)} />
      ) : null}
    </section>
  );
}
