export const ADMIN_COOKIE = 'es.admin';

export function adminCredentials() {
  return {
    login: process.env.ADMIN_UI_LOGIN ?? 'admin2026',
    password: process.env.ADMIN_UI_PASSWORD ?? 'admin2026!',
  };
}

export async function adminSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_UI_PASSWORD ?? 'admin2026!';
  const data = new TextEncoder().encode(`eternal-stone-admin:${secret}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function credentialsMatch(login: string, password: string) {
  const creds = adminCredentials();
  return login === creds.login && password === creds.password;
}
