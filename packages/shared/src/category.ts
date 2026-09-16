import { z } from 'zod';
import { slugSchema } from './common';

export const categoryCreateSchema = z.object({
  name: z.string().min(1).max(120),
  slug: slugSchema,
  sortOrder: z.number().int().default(0),
});
export type CategoryCreateInput = z.infer<typeof categoryCreateSchema>;

export const categoryUpdateSchema = categoryCreateSchema.partial();
export type CategoryUpdateInput = z.infer<typeof categoryUpdateSchema>;
