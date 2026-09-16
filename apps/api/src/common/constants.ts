export const SESSION_COOKIE = 'es.sid';
export const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
export const UPLOADS_DIR = 'uploads';
export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;
export const ALLOWED_IMAGE_MIME = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;
