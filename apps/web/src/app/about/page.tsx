import type { Metadata } from 'next';
import { AboutContent } from '@/components/about-content';
import { Consultation } from '@/components/consultation';
import { SiteShell } from '@/components/site-shell';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'О компании',
  description:
    '«Вечный камень» работает с 1994 года: добыча и обработка гранита и мрамора, изготовление и установка памятников в Омске без посредников.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <SiteShell
      crumbs={[{ href: '/', label: 'Главная' }, { href: '/about', label: 'О компании' }]}
      afterHero={
        <>
          <AboutContent />
          <Consultation />
        </>
      }
    />
  );
}
