'use client';

import Link from 'next/link';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-[#1a1a1a] text-white antialiased">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-white/40">Ошибка</p>
          <h1 className="mt-6 text-[28px] font-light uppercase tracking-[0.12em] sm:text-4xl">Сайт временно недоступен</h1>
          <p className="mt-4 max-w-md text-sm text-white/55">Обновите страницу. Если не поможет — зайдите чуть позже.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              className="inline-flex min-h-12 items-center bg-white px-8 text-sm uppercase tracking-[0.16em] text-[#1a1a1a]"
              onClick={reset}
            >
              Повторить
            </button>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center border border-white/75 px-8 text-sm uppercase tracking-[0.16em]"
            >
              На главную
            </Link>
          </div>
        </section>
      </body>
    </html>
  );
}
