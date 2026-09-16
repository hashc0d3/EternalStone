import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/site-shell';
import { ApiError, apiGet } from '@/lib/api';

type Product = {
  slug: string;
  name: string;
  description: string;
  priceFrom: number | null;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const product = await apiGet<Product>(`/products/${slug}`);
    return (
      <SiteShell>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        {product.priceFrom ? (
          <p className="mt-2 text-[var(--muted)]">от {product.priceFrom.toLocaleString('ru-RU')} ₽</p>
        ) : null}
        <p className="mt-6 max-w-2xl whitespace-pre-wrap">{product.description}</p>
      </SiteShell>
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}
