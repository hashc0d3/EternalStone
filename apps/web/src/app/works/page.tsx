import { WorksGallery } from '@/components/works-grid';
import { SiteShell } from '@/components/site-shell';
import { getWorkPage } from '@/lib/works';

const PAGE_SIZE = 9;

export default async function WorksPage() {
  const { items, total } = await getWorkPage(1, PAGE_SIZE);

  return (
    <SiteShell
      afterHero={
        <section className="flex flex-col bg-[#1a1a1a]" aria-labelledby="works-title">
          <h1
            id="works-title"
            className="px-4 py-6 text-[28px] font-light uppercase tracking-[0.12em] sm:px-6 sm:py-8 sm:text-4xl lg:px-8 lg:text-5xl"
          >
            <span className="text-white">Наши</span> <span className="text-white/35">работы</span>
          </h1>

          <WorksGallery initialPhotos={items} total={total} pageSize={PAGE_SIZE} />
        </section>
      }
    />
  );
}
