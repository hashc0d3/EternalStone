import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';

export function ErrorScreen({
  code,
  title,
  text,
}: {
  code: string;
  title: string;
  text: string;
}) {
  return (
    <SiteShell
      crumbs={[{ href: '/', label: 'Главная' }, { label: code }]}
      afterHero={
        <section className="flex min-h-[calc(100dvh-var(--header-height)-52px)] flex-col items-center justify-center bg-[#1a1a1a] px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-white/40">{code}</p>
          <h1 className="mt-6 max-w-[16ch] text-[28px] font-light uppercase tracking-[0.12em] text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">{text}</p>
          <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="btn-primary w-full sm:w-auto">
              На главную
            </Link>
            <Link href="/catalog" className="btn-ghost w-full sm:w-auto">
              В каталог
            </Link>
          </div>
        </section>
      }
    />
  );
}
