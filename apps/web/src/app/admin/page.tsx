'use client';

import Link from 'next/link';
import { useCatalogProducts } from '@/lib/catalog-store';

export default function AdminHomePage() {
  const products = useCatalogProducts();
  const retail = products.filter((item) => item.view === 'retail').length;
  const opt = products.filter((item) => item.view === 'opt').length;

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-[28px] font-light uppercase tracking-[0.12em] sm:text-4xl">
        <span className="text-white">Панель</span> <span className="text-white/35">управления</span>
      </h1>
      <p className="mt-4 max-w-xl text-sm text-white/50">
        Каталог, товары и заявки. Добавление и правки позиций — в разделе «Каталог».
      </p>

      <div className="mt-10 grid gap-px bg-black sm:grid-cols-2">
        <Link
          href="/admin/catalog"
          className="group flex min-h-[180px] flex-col justify-between bg-[#1a1a1a] p-6 transition-colors hover:bg-[#111]"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">Раздел</span>
          <span className="text-2xl uppercase tracking-[0.1em]">Каталог</span>
          <span className="text-sm text-white/45">
            {retail} розница · {opt} опт
          </span>
        </Link>
        <div className="flex min-h-[180px] flex-col justify-between bg-[#1a1a1a] p-6 text-white/35">
          <span className="text-[11px] uppercase tracking-[0.2em]">Раздел</span>
          <span className="text-2xl uppercase tracking-[0.1em]">Работы</span>
          <span className="text-sm">Скоро</span>
        </div>
      </div>
    </main>
  );
}
