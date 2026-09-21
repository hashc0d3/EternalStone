'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { CatalogProduct } from '@/lib/catalog';
import { formatPrice } from '@/lib/catalog';

export function ProductModal({
  product,
  onClose,
  onOrder,
}: {
  product: CatalogProduct;
  onClose: () => void;
  onOrder: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-[#1a1a1a] text-white shadow-2xl lg:grid-cols-[1.1fr_0.9fr]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Закрыть"
          className="btn-icon absolute right-3 top-3 z-20 h-10 w-10 sm:h-10 sm:w-10"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" className="block h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 7l10 10M17 7L7 17" />
          </svg>
        </button>

        <div className="relative min-h-[240px] lg:min-h-full">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute bottom-4 left-4 border border-white/70 bg-black/60 px-3 py-1.5 text-sm">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="flex flex-col px-6 py-8 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">{product.size}</p>
          <h2 id="product-modal-title" className="mt-3 text-2xl font-medium uppercase tracking-[0.08em]">
            {product.name}
          </h2>
          <p className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-white/70">{product.description}</p>
          <button type="button" className="btn-primary mt-8 w-full" onClick={onOrder}>
            Заказать
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
