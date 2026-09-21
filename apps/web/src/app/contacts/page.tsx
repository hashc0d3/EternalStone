import type { Metadata } from 'next';
import { ContactsContent } from '@/components/contacts-content';
import { SiteShell } from '@/components/site-shell';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Контакты',
  description: 'Телефон и адрес компании «Вечный камень» в Омске. Обратный звонок и консультация.',
  path: '/contacts',
});

export default function ContactsPage() {
  return (
    <SiteShell
      crumbs={[{ href: '/', label: 'Главная' }, { href: '/contacts', label: 'Контакты' }]}
      afterHero={<ContactsContent />}
    />
  );
}
