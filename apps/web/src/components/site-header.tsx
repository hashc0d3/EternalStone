'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';

import { PHONE_HREF, PHONE_LABEL } from '@/lib/location';

const NAV_ITEMS = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/services', label: 'Услуги' },
  { href: '/about', label: 'О компании' },
  { href: '/works', label: 'Работы' },
  { href: '/contacts', label: 'Контакты' },
] as const;

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  if (href === '/catalog') {
    return pathname === '/catalog' || pathname.startsWith('/catalog/') || pathname === '/opt';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src="/images/brand/logo.png"
        alt="Вечный камень"
        width={261}
        height={120}
        className="h-12 w-auto sm:h-14"
        style={{ width: 'auto' }}
        priority
      />
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--header)] text-white">
      <div className="relative z-[60] flex h-[var(--header-height)] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden min-[1200px]:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 text-[12px] uppercase tracking-[0.18em] transition-colors ${
                  active ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-px h-px bg-white transition-opacity ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
          <a
            href={PHONE_HREF}
            className="inline-flex h-10 items-center border border-white/35 px-4 text-[13px] tracking-[0.06em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#1a1a1a]"
          >
            {PHONE_LABEL}
          </a>
        </nav>

        <div className="flex min-[1200px]:hidden items-center gap-3 sm:gap-4">
          <a
            href={PHONE_HREF}
            className="inline-flex h-9 items-center border border-white/35 px-3 text-[12px] tracking-[0.04em] text-white sm:text-[13px]"
          >
            {PHONE_LABEL}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-white"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-[1.6px] w-full bg-white transition-all duration-300 ${
                  open ? 'top-[7px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[1.6px] w-full bg-white transition-opacity duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.6px] w-full bg-white transition-all duration-300 ${
                  open ? 'top-[7px] -rotate-45' : 'top-[14px]'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 bg-black/50 transition-opacity duration-300 min-[1200px]:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        id={menuId}
        className={`fixed top-[var(--header-height)] right-0 bottom-0 z-50 flex w-[min(20rem,86vw)] flex-col border-l border-white/10 bg-[var(--header)] transition-transform duration-300 ease-out min-[1200px]:hidden ${
          open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 text-[13px] uppercase tracking-[0.16em] transition-colors hover:text-white ${
                isActive(item.href, pathname) ? 'text-white' : 'text-white/50'
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 px-6 py-5">
          <a href={PHONE_HREF} className="block text-[15px] tracking-wide text-white">
            {PHONE_LABEL}
          </a>
        </div>
      </aside>
    </header>
  );
}
