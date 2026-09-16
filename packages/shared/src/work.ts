import { z } from 'zod';
import { contentStatusSchema, paginationQuerySchema, slugSchema } from './common';

export const workCreateSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  description: z.string().max(20000).default(''),
  status: contentStatusSchema.default('DRAFT'),
});
export type WorkCreateInput = z.infer<typeof workCreateSchema>;

export const workUpdateSchema = workCreateSchema.partial();
export type WorkUpdateInput = z.infer<typeof workUpdateSchema>;

export const workListQuerySchema = paginationQuerySchema.extend({
  status: contentStatusSchema.optional(),
});
export type WorkListQuery = z.infer<typeof workListQuerySchema>;
