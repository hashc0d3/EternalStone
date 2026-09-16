import { z } from 'zod';

export const leadCreateSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(5).max(40),
  email: z.string().email().max(200).optional().or(z.literal('')),
  message: z.string().max(4000).default(''),
  source: z.string().max(80).default('site'),
});
export type LeadCreateInput = z.infer<typeof leadCreateSchema>;
