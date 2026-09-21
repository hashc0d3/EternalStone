'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  OPT_CATEGORIES,
  RETAIL_CATEGORIES,
  categoriesFor,
  formatPrice,
  type CatalogCategory,
  type CatalogProduct,
  type CatalogView,
} from '@/lib/catalog';
import { removeCatalogProduct, upsertCatalogProduct, useCatalogProducts } from '@/lib/catalog-store';

const PRODUCT_IMAGES = [
  '/images/catalog/1.png',
  '/images/catalog/2.png',
  '/images/catalog/3.png',
  '/images/catalog/4.png',
  '/images/catalog/5.png',
  '/images/slider/marble.png',
  '/images/slider/complex.png',
  '/images/slider/stairs.png',
  '/images/works/orig-1.png',
  '/images/works/orig-2.png',
  '/images/works/orig-3.jpg',
  '/images/works/orig-4.png',
  '/images/works/orig-5.jpg',
  '/images/works/orig-6.png',
  '/images/services/1.png',
];

type Draft = {
  id?: string;
  name: string;
  view: CatalogView;
  category: string;
  subcategory: string;
  image: string;
  price: string;
  priceOnRequest: boolean;
  size: string;
  excerpt: string;
  description: string;
};

const emptyDraft = (preset?: Partial<Draft>): Draft => ({
  name: '',
  view: 'retail',
  category: 'pamyatniki',
  subcategory: '',
  image: PRODUCT_IMAGES[0],
  price: '',
  priceOnRequest: true,
  size: '',
  excerpt: '',
  description: '',
  ...preset,
});

function productsIn(products: CatalogProduct[], view: CatalogView, category: string, subcategory?: string) {
  return products.filter((item) => {
    if (item.view !== view || item.category !== category) return false;
    if (subcategory) return item.subcategory === subcategory;
    if (!subcategory && item.subcategory) return false;
    return true;
  });
}

export function AdminCatalog() {
  const products = useCatalogProducts();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const deleting = products.find((item) => item.id === deleteId) ?? null;

  function openCreate(preset?: Partial<Draft>) {
    setDraft(emptyDraft(preset));
  }

  function openEdit(product: CatalogProduct) {
    setDraft({
      id: product.id,
      name: product.name,
      view: product.view,
      category: product.category,
      subcategory: product.subcategory ?? '',
      image: product.image,
      price: product.price == null ? '' : String(product.price),
      priceOnRequest: product.price == null || product.price <= 0,
      size: product.size,
      excerpt: product.excerpt,
      description: product.description,
    });
  }

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-light uppercase tracking-[0.12em] sm:text-4xl">
            <span className="text-white">Каталог</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/45">
            Добавляйте, меняйте и удаляйте позиции. Изменения сразу видны на сайте.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary min-h-11 px-5 text-[11px]" onClick={() => openCreate()}>
            Добавить товар
          </button>
          <Link href="/catalog" className="btn-ghost min-h-11 px-5 text-[11px]">
            Открыть на сайте
          </Link>
        </div>
      </div>

      <ViewBlock
        title="Розница"
        view="retail"
        categories={RETAIL_CATEGORIES}
        products={products}
        onAdd={(preset) => openCreate({ view: 'retail', ...preset })}
        onEdit={openEdit}
        onDelete={setDeleteId}
      />
      <ViewBlock
        title="Опт"
        view="opt"
        categories={OPT_CATEGORIES}
        products={products}
        onAdd={(preset) => openCreate({ view: 'opt', ...preset })}
        onEdit={openEdit}
        onDelete={setDeleteId}
      />

      {draft ? (
        <ProductFormModal
          draft={draft}
          onChange={setDraft}
          onClose={() => setDraft(null)}
          onSave={(product) => {
            upsertCatalogProduct(product);
            setDraft(null);
          }}
        />
      ) : null}

      {deleting ? (
        <ConfirmModal
          title="Удалить товар?"
          text={deleting.name}
          confirmLabel="Удалить"
          onClose={() => setDeleteId(null)}
          onConfirm={() => {
            removeCatalogProduct(deleting.id);
            setDeleteId(null);
          }}
        />
      ) : null}
    </main>
  );
}

function ViewBlock({
  title,
  view,
  categories,
  products,
  onAdd,
  onEdit,
  onDelete,
}: {
  title: string;
  view: CatalogView;
  categories: CatalogCategory[];
  products: CatalogProduct[];
  onAdd: (preset: Partial<Draft>) => void;
  onEdit: (product: CatalogProduct) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-sm uppercase tracking-[0.18em] text-white/50">{title}</h2>
      <div className="mt-4 flex flex-col gap-8">
        {categories.map((category) => (
          <div key={category.slug}>
            <div className="flex items-center justify-between gap-4 border-y border-white/10 bg-[#111] px-4 py-3">
              <h3 className="text-sm uppercase tracking-[0.12em]">{category.title}</h3>
              {category.children ? null : (
                <button
                  type="button"
                  className="text-[11px] uppercase tracking-[0.14em] text-white/40 hover:text-white"
                  onClick={() => onAdd({ view, category: category.slug, subcategory: '' })}
                >
                  Добавить
                </button>
              )}
            </div>
            {category.children ? (
              category.children.map((child) => (
                <div key={child.slug} className="border-b border-white/10">
                  <div className="flex items-center justify-between px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/40">{child.title}</p>
                    <button
                      type="button"
                      className="text-[11px] uppercase tracking-[0.14em] text-white/40 hover:text-white"
                      onClick={() => onAdd({ view, category: category.slug, subcategory: child.slug })}
                    >
                      Добавить
                    </button>
                  </div>
                  <ProductGrid
                    products={productsIn(products, view, category.slug, child.slug)}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              ))
            ) : (
              <ProductGrid
                products={productsIn(products, view, category.slug)}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductGrid({
  products,
  onEdit,
  onDelete,
}: {
  products: CatalogProduct[];
  onEdit: (product: CatalogProduct) => void;
  onDelete: (id: string) => void;
}) {
  if (products.length === 0) {
    return <p className="px-4 py-6 text-sm text-white/35">Нет позиций</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-px bg-black sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <article key={product.id} className="flex flex-col gap-4 bg-[#1a1a1a] p-4">
          <div className="flex gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden">
              <Image src={product.image} alt="" fill className="object-cover" sizes="96px" />
            </div>
            <div className="min-w-0">
              <p className="text-sm uppercase tracking-[0.08em]">{product.name}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-white/40">{product.size}</p>
              <p className="mt-2 text-sm text-white/70">{formatPrice(product.price)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn-ghost min-h-10 flex-1 px-3 text-[11px]" onClick={() => onEdit(product)}>
              Редактировать
            </button>
            <button
              type="button"
              className="min-h-10 flex-1 border border-white/20 px-3 text-[11px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:border-white hover:text-white"
              onClick={() => onDelete(product.id)}
            >
              Удалить
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProductFormModal({
  draft,
  onChange,
  onClose,
  onSave,
}: {
  draft: Draft;
  onChange: (draft: Draft) => void;
  onClose: () => void;
  onSave: (product: CatalogProduct) => void;
}) {
  const categories = categoriesFor(draft.view);
  const selected = categories.find((item) => item.slug === draft.category);
  const children = selected?.children ?? [];

  const canSave = draft.name.trim().length >= 2 && draft.category && draft.image;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSave) return;
    const raw = draft.price.trim().replace(/\s/g, '').replace(',', '.');
    const parsed = draft.priceOnRequest || raw === '' ? null : Number(raw);
    const price = parsed != null && Number.isFinite(parsed) && parsed > 0 ? parsed : null;
    onSave({
      id: draft.id ?? `custom-${Date.now()}`,
      name: draft.name.trim(),
      view: draft.view,
      category: draft.category,
      subcategory: children.length ? draft.subcategory || children[0].slug : undefined,
      image: draft.image,
      price,
      size: draft.size.trim() || 'по запросу',
      excerpt: draft.excerpt.trim() || draft.name.trim(),
      description: draft.description.trim() || draft.excerpt.trim() || draft.name.trim(),
    });
  }

  const field = 'h-12 w-full border border-white/20 bg-black/40 px-4 text-sm outline-none placeholder:text-white/35 focus:border-white';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md" onClick={onClose}>
      <form
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#1a1a1a] p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
        onSubmit={submit}
      >
        <button type="button" aria-label="Закрыть" className="btn-icon absolute right-3 top-3 h-10 w-10" onClick={onClose}>
          <svg viewBox="0 0 24 24" className="block h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 7l10 10M17 7L7 17" />
          </svg>
        </button>
        <h2 className="pr-12 text-xl uppercase tracking-[0.1em]">{draft.id ? 'Редактировать товар' : 'Добавить товар'}</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2 text-[11px] uppercase tracking-[0.16em] text-white/45">
            Название
            <input className={`${field} mt-2`} value={draft.name} onChange={(event) => onChange({ ...draft, name: event.target.value })} required />
          </label>
          <label className="text-[11px] uppercase tracking-[0.16em] text-white/45">
            Тип
            <select
              className={`${field} mt-2`}
              value={draft.view}
              onChange={(event) => {
                const view = event.target.value as CatalogView;
                const nextCats = categoriesFor(view);
                onChange({ ...draft, view, category: nextCats[0].slug, subcategory: nextCats[0].children?.[0]?.slug ?? '' });
              }}
            >
              <option value="retail">Розница</option>
              <option value="opt">Опт</option>
            </select>
          </label>
          <label className="text-[11px] uppercase tracking-[0.16em] text-white/45">
            Категория
            <select
              className={`${field} mt-2`}
              value={draft.category}
              onChange={(event) => {
                const category = event.target.value;
                const next = categories.find((item) => item.slug === category);
                onChange({ ...draft, category, subcategory: next?.children?.[0]?.slug ?? '' });
              }}
            >
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          {children.length ? (
            <label className="sm:col-span-2 text-[11px] uppercase tracking-[0.16em] text-white/45">
              Подкатегория
              <select
                className={`${field} mt-2`}
                value={draft.subcategory}
                onChange={(event) => onChange({ ...draft, subcategory: event.target.value })}
              >
                {children.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          <div className="flex flex-col gap-3">
            <label className="text-[11px] uppercase tracking-[0.16em] text-white/45">
              Цена, ₽
              <input
                className={`${field} mt-2 disabled:opacity-40`}
                inputMode="numeric"
                placeholder="По запросу"
                value={draft.priceOnRequest ? '' : draft.price}
                disabled={draft.priceOnRequest}
                onChange={(event) => onChange({ ...draft, price: event.target.value, priceOnRequest: false })}
              />
            </label>
            <label className="flex cursor-pointer items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-white/60">
              <input
                type="checkbox"
                checked={draft.priceOnRequest}
                onChange={(event) =>
                  onChange({
                    ...draft,
                    priceOnRequest: event.target.checked,
                    price: event.target.checked ? '' : draft.price,
                  })
                }
                className="h-4 w-4 accent-white"
              />
              По запросу
            </label>
          </div>
          <label className="text-[11px] uppercase tracking-[0.16em] text-white/45">
            Размер
            <input className={`${field} mt-2`} value={draft.size} onChange={(event) => onChange({ ...draft, size: event.target.value })} />
          </label>
          <label className="sm:col-span-2 text-[11px] uppercase tracking-[0.16em] text-white/45">
            Короткое описание
            <input className={`${field} mt-2`} value={draft.excerpt} onChange={(event) => onChange({ ...draft, excerpt: event.target.value })} />
          </label>
          <label className="sm:col-span-2 text-[11px] uppercase tracking-[0.16em] text-white/45">
            Полное описание
            <textarea
              className="mt-2 min-h-28 w-full border border-white/20 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-white"
              value={draft.description}
              onChange={(event) => onChange({ ...draft, description: event.target.value })}
            />
          </label>
        </div>

        <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-white/45">Фото</p>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {PRODUCT_IMAGES.map((image) => (
            <button
              key={image}
              type="button"
              className={`relative aspect-square overflow-hidden border ${draft.image === image ? 'border-white' : 'border-white/15'}`}
              onClick={() => onChange({ ...draft, image })}
            >
              <Image src={image} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>

        <button type="submit" disabled={!canSave} className="btn-primary mt-8 w-full disabled:opacity-50">
          Сохранить
        </button>
      </form>
    </div>
  );
}

function ConfirmModal({
  title,
  text,
  confirmLabel,
  onClose,
  onConfirm,
}: {
  title: string;
  text: string;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md" onClick={onClose}>
      <div className="w-full max-w-md bg-[#1a1a1a] p-8" onClick={(event) => event.stopPropagation()}>
        <h2 className="text-xl uppercase tracking-[0.1em]">{title}</h2>
        <p className="mt-3 text-sm text-white/60">{text}</p>
        <div className="mt-8 flex gap-3">
          <button type="button" className="btn-ghost flex-1 min-h-11 px-4 text-[12px]" onClick={onClose}>
            Отмена
          </button>
          <button type="button" className="btn-primary flex-1 min-h-11 px-4 text-[12px]" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
