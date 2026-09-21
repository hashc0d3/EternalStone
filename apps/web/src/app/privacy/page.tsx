import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Политика конфиденциальности',
  description: 'Как компания «Вечный камень» обрабатывает имя и телефон из заявок на сайте.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <SiteShell
      crumbs={[
        { href: '/', label: 'Главная' },
        { href: '/privacy', label: 'Политика конфиденциальности' },
      ]}
    >
      <h1 className="text-3xl font-semibold">Политика конфиденциальности</h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">
        Текст политики появится позже. Имя и телефон используем только для звонка по вашей заявке.
      </p>
    </SiteShell>
  );
}
