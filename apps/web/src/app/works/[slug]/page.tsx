import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/site-shell';
import { ApiError, apiGet } from '@/lib/api';

type Work = {
  slug: string;
  title: string;
  description: string;
};

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const work = await apiGet<Work>(`/works/${slug}`);
    return (
      <SiteShell>
        <h1 className="text-3xl font-semibold">{work.title}</h1>
        <p className="mt-6 max-w-2xl whitespace-pre-wrap">{work.description}</p>
      </SiteShell>
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}
