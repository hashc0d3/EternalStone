'use client';

import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-[#1a1a1a] px-6 py-16 text-center text-white">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">Ошибка</p>
      <h1 className="mt-6 text-[28px] font-light uppercase tracking-[0.12em] sm:text-4xl">Что-то пошло не так</h1>
      <p className="mt-4 max-w-md text-sm text-white/55">Обновите страницу или вернитесь на главную.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button type="button" className="btn-primary" onClick={reset}>
          Повторить
        </button>
        <Link href="/" className="btn-ghost">
          На главную
        </Link>
      </div>
    </section>
  );
}
