import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().trim().min(2).max(80).regex(/^[a-z0-9.-]+$/),
  description: z.string().trim().max(500).optional()
});

export const assignPermissionsSchema = z.object({
  permissionIds: z.array(z.string().uuid()).min(1)
});
