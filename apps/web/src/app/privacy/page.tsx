import { SiteShell } from '@/components/site-shell';

export default function PrivacyPage() {
  return (
    <SiteShell>
      <h1 className="text-3xl font-semibold">Политика конфиденциальности</h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">
        Текст политики появится позже. Имя и телефон используем только для звонка по вашей заявке.
      </p>
    </SiteShell>
  );
}
