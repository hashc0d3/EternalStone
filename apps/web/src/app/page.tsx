import { Consultation } from '@/components/consultation';
import { HomeCatalog } from '@/components/site-catalog';
import { HomeSlider } from '@/components/home-slider';
import { Partners } from '@/components/partners';
import { ServicesSection } from '@/components/services-section';
import { SiteMap } from '@/components/site-map';
import { SiteShell } from '@/components/site-shell';
import { WorksPreview } from '@/components/works-preview';

export default function HomePage() {
  return (
    <SiteShell
      hero={<HomeSlider />}
      afterHero={
        <>
          <HomeCatalog />
          <ServicesSection />
          <WorksPreview />
          <Partners />
          <Consultation />
          <SiteMap className="h-[320px] w-full sm:h-[400px]" />
        </>
      }
    />
  );
}
