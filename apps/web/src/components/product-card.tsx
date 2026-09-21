'use client';

import Image from 'next/image';
import type { CatalogProduct } from '@/lib/catalog';
import { formatPrice } from '@/lib/catalog';

export function ProductCard({
  product,
  onOpen,
  onOrder,
}: {
  product: CatalogProduct;
  onOpen: () => void;
  onOrder: () => void;
}) {
  return (
    <article className="flex h-full flex-col bg-[#1a1a1a]">
      <button
        type="button"
        className="group relative min-h-[240px] flex-1 overflow-hidden p-0 text-left lg:min-h-[280px]"
        onClick={onOpen}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="bg-[#111] object-cover brightness-[0.82] transition-[filter] duration-500 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
        <span className="absolute right-4 top-4 border border-white/70 bg-black/60 px-3 py-1.5 text-sm tracking-wide text-white">
          {formatPrice(product.price)}
        </span>
        <span className="absolute bottom-4 left-4 inline-flex min-h-9 items-center border border-white/70 bg-black/55 px-3 text-[11px] uppercase tracking-[0.14em] text-white transition-colors duration-300 [@media(hover:hover)]:group-hover:bg-white [@media(hover:hover)]:group-hover:text-[#1a1a1a]">
          Подробнее
        </span>
      </button>

      <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-4">
        <button type="button" className="text-left" onClick={onOpen}>
          <h3 className="text-[15px] font-medium uppercase tracking-[0.08em] text-white">{product.name}</h3>
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/45">{product.size}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{product.excerpt}</p>
        </button>
        <button type="button" className="btn-ghost mt-1 min-h-11 w-full px-4 text-[12px]" onClick={onOrder}>
          Заказать
        </button>
      </div>
    </article>
  );
}
