import type { Metadata } from 'next';
import { ServicesSection } from '@/components/services-section';
import { SiteShell } from '@/components/site-shell';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Услуги',
  description: 'Установка памятников, облицовка могил, доставка, замер и разработка макетов в Омске.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <SiteShell
      crumbs={[{ href: '/', label: 'Главная' }, { href: '/services', label: 'Услуги' }]}
      afterHero={<ServicesSection heading="h1" />}
    />
  );
}
