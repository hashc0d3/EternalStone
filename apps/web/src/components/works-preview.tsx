import Link from 'next/link';
import { WorksGrid } from '@/components/works-grid';
import { getWorkPhotos } from '@/lib/works';

export async function WorksPreview() {
  const photos = await getWorkPhotos(6);

  return (
    <section className="flex flex-col bg-[#1a1a1a]" aria-labelledby="works-preview-title">
      <h2
        id="works-preview-title"
        className="px-4 py-6 text-[28px] font-light uppercase tracking-[0.12em] sm:px-6 sm:py-8 sm:text-4xl lg:px-8 lg:text-5xl"
      >
        <span className="text-white">Наши</span> <span className="text-white/35">работы</span>
      </h2>

      <WorksGrid photos={photos} />

      <Link
        href="/works"
        className="flex min-h-[72px] w-full items-center justify-center gap-3 border-t border-white/10 bg-[#111] text-sm uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
      >
        <span className="h-2 w-2 bg-white" aria-hidden="true" />
        Больше работ
      </Link>
    </section>
  );
}
