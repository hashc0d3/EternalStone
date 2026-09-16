import { ContactsContent } from '@/components/contacts-content';
import { SiteShell } from '@/components/site-shell';

export default function ContactsPage() {
  return <SiteShell afterHero={<ContactsContent />} />;
}
