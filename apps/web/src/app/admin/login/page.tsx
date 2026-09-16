export default function AdminLoginPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Вход</h1>
      <p className="mt-3 text-[var(--muted)]">
        Форма логина будет на этапе админки. Сейчас: POST /auth/login.
      </p>
    </main>
  );
}
