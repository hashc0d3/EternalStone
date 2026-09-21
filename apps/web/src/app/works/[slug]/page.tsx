import { forbidden, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';
import { ApiError, apiGet } from '@/lib/api';
import { pageMetadata } from '@/lib/seo';

type Work = {
  slug: string;
  title: string;
  description: string;
};

async function loadWork(slug: string) {
  try {
    return await apiGet<Work>(`/works/${slug}`);
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
    const work = await apiGet<Work>(`/works/${slug}`);
    return pageMetadata({
      title: work.title,
      description: work.description.slice(0, 160) || work.title,
      path: `/works/${slug}`,
    });
  } catch {
    return pageMetadata({ title: 'Работа', path: `/works/${slug}`, noIndex: true });
  }
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await loadWork(slug);

  return (
    <SiteShell
      crumbs={[
        { href: '/', label: 'Главная' },
        { href: '/works', label: 'Работы' },
        { href: `/works/${slug}`, label: work.title },
      ]}
    >
      <h1 className="text-3xl font-semibold">{work.title}</h1>
      <p className="mt-6 max-w-2xl whitespace-pre-wrap">{work.description}</p>
    </SiteShell>
  );
}
