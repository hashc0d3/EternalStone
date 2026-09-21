const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
const INTERNAL_API_URL = process.env.API_INTERNAL_URL ?? PUBLIC_API_URL;
const FETCH_TIMEOUT_MS = 8_000;

function apiBaseUrl() {
  return typeof window === 'undefined' ? INTERNAL_API_URL : PUBLIC_API_URL;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function fetchJson<T>(
  path: string,
  init: RequestInit & { revalidate?: number | false } = {},
): Promise<T> {
  const { revalidate, ...requestInit } = init;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const isServer = typeof window === 'undefined';
    const response = await fetch(`${apiBaseUrl()}${path}`, {
      ...requestInit,
      signal: requestInit.signal ?? controller.signal,
      ...(isServer
        ? { next: { revalidate: revalidate === false ? 0 : (revalidate ?? 60) } }
        : { cache: 'no-store' }),
    });

    if (!response.ok) {
      throw new ApiError(`Request failed: ${path}`, response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(`Request failed: ${path}`, 503);
  } finally {
    clearTimeout(timer);
  }
}

export async function apiGet<T>(path: string, revalidate?: number | false): Promise<T> {
  return fetchJson<T>(path, { revalidate });
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  return fetchJson<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    revalidate: false,
  });
}

export function mediaUrl(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${PUBLIC_API_URL}${path}`;
}
