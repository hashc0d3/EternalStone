'use client';

import { useEffect, useState } from 'react';
import { CATALOG_PRODUCTS, type CatalogProduct } from '@/lib/catalog';

const STORAGE_KEY = 'eternal-stone-catalog-v1';
const CHANGE_EVENT = 'catalog-changed';

export function loadCatalogProducts(): CatalogProduct[] {
  if (typeof window === 'undefined') return CATALOG_PRODUCTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return CATALOG_PRODUCTS;
    const parsed = JSON.parse(raw) as CatalogProduct[];
    return Array.isArray(parsed) ? parsed : CATALOG_PRODUCTS;
  } catch {
    return CATALOG_PRODUCTS;
  }
}

function persist(products: CatalogProduct[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function saveCatalogProducts(products: CatalogProduct[]) {
  persist(products);
}

export function upsertCatalogProduct(product: CatalogProduct) {
  const current = loadCatalogProducts();
  const index = current.findIndex((item) => item.id === product.id);
  if (index === -1) persist([...current, product]);
  else persist(current.map((item) => (item.id === product.id ? product : item)));
}

export function removeCatalogProduct(id: string) {
  persist(loadCatalogProducts().filter((item) => item.id !== id));
}

export function useCatalogProducts() {
  const [products, setProducts] = useState<CatalogProduct[]>(CATALOG_PRODUCTS);

  useEffect(() => {
    const refresh = () => setProducts(loadCatalogProducts());
    refresh();
    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(CHANGE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return products;
}
