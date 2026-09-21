'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CatalogSwitch } from '@/components/catalog-switch';
import { LeadModal } from '@/components/lead-modal-lazy';
import { ProductCard } from '@/components/product-card';
import { ProductModal } from '@/components/product-modal';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  catalogCrumbs,
  categoriesFor,
  categoryTitle,
  filterProducts,
  materialTitle,
  parseMaterial,
  sortProducts,
  subcategoryTitle,
  type CatalogMaterial,
  type CatalogProduct,
  type CatalogSort,
  type CatalogView,
} from '@/lib/catalog';
import { useCatalogProducts } from '@/lib/catalog-store';

const SORTS: { id: CatalogSort; label: string }[] = [
  { id: 'default', label: 'По товару' },
  { id: 'alpha', label: 'По алфавиту' },
  { id: 'price', label: 'По цене' },
];

export function CatalogShop() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view: CatalogView = searchParams.get('view') === 'opt' ? 'opt' : 'retail';
  const category = searchParams.get('cat');
  const subcategory = searchParams.get('sub');
  const material = parseMaterial(searchParams.get('material'));
  const sort = (searchParams.get('sort') as CatalogSort) || 'default';
  const categories = categoriesFor(view);
  const [openId, setOpenId] = useState<string | null>(null);
  const [orderProduct, setOrderProduct] = useState<CatalogProduct | null>(null);
  const [openMonuments, setOpenMonuments] = useState(Boolean(subcategory) || Boolean(material));
  const catalogProducts = useCatalogProducts();

  const products = useMemo(
    () =>
      sortProducts(
        filterProducts(view, category, subcategory, material, catalogProducts),
        SORTS.some((item) => item.id === sort) ? sort : 'default',
      ),
    [view, category, subcategory, material, sort, catalogProducts],
  );
  const openProduct = products.find((item) => item.id === openId) ?? null;
  const heading =
    subcategoryTitle(view, category, subcategory) ?? materialTitle(material) ?? categoryTitle(view, category);

  function setParams(next: {
    view?: CatalogView;
    cat?: string | null;
    sub?: string | null;
    sort?: CatalogSort;
    material?: CatalogMaterial | null;
  }) {
    const params = new URLSearchParams();
    const nextView = next.view ?? view;
    const nextCat = next.cat === undefined ? category : next.cat;
    const nextSub = next.sub === undefined ? subcategory : next.sub;
    const nextSort = next.sort ?? sort;
    const nextMaterial =
      next.material !== undefined
        ? next.material
        : next.cat !== undefined || next.sub !== undefined
          ? null
          : material;
    if (nextView === 'opt') params.set('view', 'opt');
    if (nextCat) params.set('cat', nextCat);
    if (nextSub) params.set('sub', nextSub);
    if (nextMaterial) params.set('material', nextMaterial);
    if (nextSort !== 'default') params.set('sort', nextSort);
    const query = params.toString();
    router.replace(query ? `/catalog?${query}` : '/catalog', { scroll: false });
  }

  return (
    <section className="flex min-h-[calc(100dvh-var(--header-height))] flex-col bg-[#1a1a1a]" aria-labelledby="catalog-title">
      <Breadcrumbs items={catalogCrumbs(view, category, subcategory, material)} />
      <div className="flex flex-wrap items-end justify-between gap-4 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h1
          id="catalog-title"
          className="text-[28px] font-light uppercase tracking-[0.12em] sm:text-4xl lg:text-5xl"
        >
          <span className="text-white">Каталог</span>
        </h1>
      </div>

      <CatalogSwitch
        value={view}
        onChange={(next) => {
          setOpenMonuments(false);
          setParams({ view: next, cat: null, sub: null });
        }}
      />

      <div className="grid flex-1 lg:grid-cols-[minmax(240px,320px)_1fr]">
        <nav aria-label="Категории" className="border-b border-white/10 lg:border-b-0 lg:border-r">
          <ul>
            <li className="border-b border-white/10">
              <button
                type="button"
                className={`flex min-h-14 w-full items-center px-4 text-left text-sm uppercase tracking-[0.12em] transition-colors duration-300 sm:px-6 ${
                  !category ? 'bg-white text-[#1a1a1a]' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setParams({ cat: null, sub: null })}
              >
                Все товары
              </button>
            </li>
            {categories.map((item) => {
              const active = category === item.slug && !subcategory;
              const expanded = Boolean(item.children && openMonuments);

              return (
                <li key={item.slug} className="border-b border-white/10">
                  <button
                    type="button"
                    className={`flex min-h-14 w-full items-center justify-between gap-3 px-4 text-left text-sm uppercase tracking-[0.12em] transition-colors duration-300 sm:px-6 ${
                      active ? 'bg-white text-[#1a1a1a]' : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                    onClick={() => {
                      if (item.children) {
                        if (category === item.slug && !subcategory) {
                          setOpenMonuments((value) => !value);
                        } else {
                          setOpenMonuments(true);
                        }
                      }
                      setParams({ cat: item.slug, sub: null });
                    }}
                  >
                    <span>{item.title}</span>
                    {item.children ? <span className="text-xs">{expanded ? '▾' : '▸'}</span> : null}
                  </button>
                  {item.children && expanded ? (
                    <ul className="bg-black/30">
                      {item.children.map((child) => {
                        const isChild = subcategory === child.slug;
                        return (
                          <li key={child.slug}>
                            <button
                              type="button"
                              className={`flex min-h-12 w-full items-center px-6 py-3 text-left text-[13px] tracking-wide transition-colors duration-300 sm:px-8 ${
                                isChild ? 'bg-white text-[#1a1a1a]' : 'text-white/60 hover:text-white'
                              }`}
                              onClick={() => {
                                setOpenMonuments(true);
                                setParams({ cat: item.slug, sub: child.slug });
                              }}
                            >
                              {child.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-col">
          <div className="flex flex-col gap-4 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                {view === 'opt' ? 'Опт' : 'Розница'}
              </p>
              <h2 className="mt-1 text-lg uppercase tracking-[0.1em] text-white">{heading}</h2>
              <p className="mt-1 text-sm text-white/45">{products.length} позиций</p>
            </div>
            <div className="flex border border-white/20" role="group" aria-label="Сортировка">
              {SORTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`min-h-10 px-3 text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 sm:px-4 ${
                    sort === item.id ? 'bg-white text-[#1a1a1a]' : 'text-white/55 hover:text-white'
                  }`}
                  onClick={() => setParams({ sort: item.id })}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {products.length === 0 ? (
            <p className="px-4 py-16 text-sm text-white/50 sm:px-6">В этой категории пока нет позиций.</p>
          ) : (
            <div className="grid grid-cols-1 gap-px bg-black sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={() => setOpenId(product.id)}
                  onOrder={() => setOrderProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {openProduct ? (
        <ProductModal
          product={openProduct}
          onClose={() => setOpenId(null)}
          onOrder={() => {
            setOrderProduct(openProduct);
            setOpenId(null);
          }}
        />
      ) : null}

      {orderProduct ? (
        <LeadModal
          title={`Заказ: ${orderProduct.name}`}
          source="order"
          productName={orderProduct.name}
          onClose={() => setOrderProduct(null)}
        />
      ) : null}
    </section>
  );
}
