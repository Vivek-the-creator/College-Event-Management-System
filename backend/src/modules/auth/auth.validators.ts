import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().toLowerCase(),
  phone: z.string().trim().min(6).max(24).optional(),
  password: z.string().min(8).max(128),
  role: z.enum(['customer', 'vendor']).default('customer'),
  storeName: z.string().trim().min(2).max(120).optional(),
  ownerName: z.string().trim().min(2).max(120).optional(),
  gstNumber: z.string().trim().max(32).optional(),
  address: z.string().trim().max(500).optional()
});

export const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1)
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(20).optional()
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email().toLowerCase()
});

export const resetPasswordSchema = z.object({
  token: z.string().min(20),
  password: z.string().min(8).max(128)
});

export const verifyEmailSchema = z.object({
  token: z.string().min(20)
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
