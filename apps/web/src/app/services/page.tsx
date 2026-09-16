import { ServicesSection } from '@/components/services-section';
import { SiteShell } from '@/components/site-shell';

export default function ServicesPage() {
  return <SiteShell afterHero={<ServicesSection heading="h1" />} />;
}
