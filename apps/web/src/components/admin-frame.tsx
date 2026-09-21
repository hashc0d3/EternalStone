'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const LINKS = [
  { href: '/admin', label: 'Панель' },
  { href: '/admin/catalog', label: 'Каталог' },
  { href: '/', label: 'На сайт' },
];

export function AdminFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === '/admin/login';

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a] text-white">
      <header className="flex h-[var(--header-height)] items-center justify-between border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.18em]">Админка</p>
        {isLogin ? (
          <Link href="/" className="text-[12px] uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white">
            На сайт
          </Link>
        ) : (
          <nav className="flex items-center gap-6 text-[12px] uppercase tracking-[0.16em] text-white/55">
            {LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-white ${pathname === item.href ? 'text-white' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <button type="button" className="transition-colors hover:text-white" onClick={logout}>
              Выйти
            </button>
          </nav>
        )}
      </header>
      {children}
    </div>
  );
}
