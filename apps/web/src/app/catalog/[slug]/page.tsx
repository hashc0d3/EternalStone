import { forbidden, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';
import { ApiError, apiGet } from '@/lib/api';
import { pageMetadata } from '@/lib/seo';

type Product = {
  slug: string;
  name: string;
  description: string;
  priceFrom: number | null;
};

async function loadProduct(slug: string) {
  try {
    return await apiGet<Product>(`/products/${slug}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    if (error instanceof ApiError && error.status === 403) forbidden();
    throw error;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await apiGet<Product>(`/products/${slug}`);
    return pageMetadata({
      title: product.name,
      description: product.description.slice(0, 160) || product.name,
      path: `/catalog/${slug}`,
    });
  } catch {
    return pageMetadata({ title: 'Товар', path: `/catalog/${slug}`, noIndex: true });
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await loadProduct(slug);

  return (
    <SiteShell
      crumbs={[
        { href: '/', label: 'Главная' },
        { href: '/catalog', label: 'Каталог' },
        { href: `/catalog/${slug}`, label: product.name },
      ]}
    >
      <h1 className="text-3xl font-semibold">{product.name}</h1>
      {product.priceFrom ? (
        <p className="mt-2 text-[var(--muted)]">от {product.priceFrom.toLocaleString('ru-RU')} ₽</p>
      ) : null}
      <p className="mt-6 max-w-2xl whitespace-pre-wrap">{product.description}</p>
    </SiteShell>
  );
}
