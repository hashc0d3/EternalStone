import { z } from 'zod';

export const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug: lowercase letters, numbers, hyphens');

export const idSchema = z.string().min(1);

export const contentStatusSchema = z.enum(['DRAFT', 'PUBLISHED']);
export type ContentStatus = z.infer<typeof contentStatusSchema>;

const numberFromQuery = (fallback: number, min: number, max: number) =>
  z.preprocess(
    (value) => (value === undefined || value === '' ? fallback : value),
    z.coerce.number().int().min(min).max(max),
  );

export const paginationQuerySchema = z.object({
  page: numberFromQuery(1, 1, 10_000),
  limit: numberFromQuery(20, 1, 50),
});
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
