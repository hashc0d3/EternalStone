const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
const INTERNAL_API_URL = process.env.API_INTERNAL_URL ?? PUBLIC_API_URL;

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

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl()}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new ApiError(`Request failed: ${path}`, response.status);
  }

  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${apiBaseUrl()}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new ApiError(`Request failed: ${path}`, response.status);
  }

  return response.json() as Promise<T>;
}

export function mediaUrl(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${PUBLIC_API_URL}${path}`;
}
