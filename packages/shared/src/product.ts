import { z } from 'zod';
import { contentStatusSchema, paginationQuerySchema, slugSchema } from './common';

export const productCreateSchema = z.object({
  name: z.string().min(1).max(200),
  slug: slugSchema,
  description: z.string().max(20000).default(''),
  priceFrom: z.number().int().nonnegative().nullable().optional(),
  categoryId: z.string().min(1).nullable().optional(),
  status: contentStatusSchema.default('DRAFT'),
});
export type ProductCreateInput = z.infer<typeof productCreateSchema>;

export const productUpdateSchema = productCreateSchema.partial();
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;

export const productListQuerySchema = paginationQuerySchema.extend({
  category: z.string().optional(),
  status: contentStatusSchema.optional(),
  q: z.string().max(120).optional(),
});
export type ProductListQuery = z.infer<typeof productListQuerySchema>;
