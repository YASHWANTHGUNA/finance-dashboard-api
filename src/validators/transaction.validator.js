import { z } from 'zod';

export const createTransactionValidator = z.object({
  amount: z
    .number({ invalid_type_error: 'Amount must be a number' })
    .positive('Amount must be greater than 0'),

  type: z.enum(['income', 'expense'], {
    errorMap: () => ({ message: 'Type must be income or expense' }),
  }),

  category: z
    .string({ required_error: 'Category is required' })
    .min(1, 'Category cannot be empty')
    .trim(),

  date: z.coerce.date().optional(),

  description: z.string().trim().optional().default(''),
});

export const updateTransactionValidator = z.object({
  amount: z
    .number()
    .positive('Amount must be greater than 0')
    .optional(),

  type: z.enum(['income', 'expense']).optional(),

  category: z.string().min(1).trim().optional(),

  date: z.coerce.date().optional(),

  description: z.string().trim().optional(),
});