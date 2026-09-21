import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, adminSessionToken } from '@/lib/admin-auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const expected = await adminSessionToken();
  const authed = token === expected;

  if (pathname === '/admin/login') {
    if (authed) return NextResponse.redirect(new URL('/admin', request.url));
    return NextResponse.next();
  }

  if (!authed) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
