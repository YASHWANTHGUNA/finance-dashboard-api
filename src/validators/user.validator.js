import { z } from 'zod';

export const updateRoleValidator = z.object({
  role: z.enum(['viewer', 'analyst', 'admin'], {
    errorMap: () => ({ message: 'Role must be viewer, analyst, or admin' }),
  }),
});

export const updateStatusValidator = z.object({
  isActive: z.boolean({
    invalid_type_error: 'isActive must be a boolean',
  }),
});