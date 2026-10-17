import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminCookieOptions, adminSessionToken, credentialsMatch } from '@/lib/admin-auth';

export async function POST(request: Request) {
  let body: { login?: string; password?: string };
  try {
    body = (await request.json()) as { login?: string; password?: string };
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 });
  }

  const login = body.login?.trim() ?? '';
  const password = body.password ?? '';

  if (!credentialsMatch(login, password)) {
    return NextResponse.json({ error: 'Неверный логин или пароль' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, await adminSessionToken(), adminCookieOptions(60 * 60 * 24 * 7));
  return response;
}
