'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? 'Не удалось войти');
      }

      router.replace(searchParams.get('next') || '/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось войти');
      setSending(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-[28px] font-light uppercase tracking-[0.12em]">Вход</h1>
      <p className="mt-3 text-sm text-white/50">Админка «Вечный камень»</p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={onSubmit}>
        <input
          required
          autoFocus
          name="login"
          autoComplete="username"
          placeholder="Логин"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
          className="h-12 border border-white/20 bg-black/40 px-4 text-sm outline-none placeholder:text-white/35 focus:border-white"
        />
        <input
          required
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-12 border border-white/20 bg-black/40 px-4 text-sm outline-none placeholder:text-white/35 focus:border-white"
        />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
          {sending ? 'Входим…' : 'Войти'}
        </button>
      </form>
    </main>
  );
}
