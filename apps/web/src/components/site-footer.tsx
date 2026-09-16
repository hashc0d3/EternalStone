import Image from 'next/image';
import Link from 'next/link';
import { ADDRESS_LABEL, PHONE_HREF, PHONE_LABEL, YANDEX_MAPS_HREF } from '@/lib/location';

const FOOTER_LINKS = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/services', label: 'Услуги' },
  { href: '/works', label: 'Работы' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[var(--header)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-8">
        <Link href="/" className="order-1 shrink-0 self-start">
          <Image
            src="/images/brand/logo.png"
            alt="Вечный камень"
            width={261}
            height={120}
            className="h-12 w-auto"
            style={{ width: 'auto', height: '3rem' }}
          />
        </Link>

        <div className="order-2 text-sm lg:order-3">
          <a
            href={PHONE_HREF}
            className="inline-flex min-h-10 items-center border border-white/75 px-4 text-[15px] tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-[#1a1a1a]"
          >
            {PHONE_LABEL}
          </a>
          <a
            href={YANDEX_MAPS_HREF}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block leading-relaxed text-white/70 hover:text-white"
          >
            {ADDRESS_LABEL}
          </a>
        </div>

        <nav
          aria-label="Разделы сайта"
          className="order-3 grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-white/75 sm:grid-cols-3 lg:order-2"
        >
          {FOOTER_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/privacy" className="text-xs text-white/45 transition-colors hover:text-white/70">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
