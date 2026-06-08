import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { validateRequest } from '../../middleware/validate-request.js';
import { forgotPassword, login, me, refresh, register, resetPassword, verifyEmail } from './auth.controller.js';
import { forgotPasswordSchema, loginSchema, refreshTokenSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from './auth.validators.js';

export const authRoutes = Router();

authRoutes.post('/register', validateRequest({ body: registerSchema }), register);
authRoutes.post('/login', validateRequest({ body: loginSchema }), login);
authRoutes.post('/refresh-token', validateRequest({ body: refreshTokenSchema }), refresh);
authRoutes.post('/forgot-password', validateRequest({ body: forgotPasswordSchema }), forgotPassword);
authRoutes.post('/reset-password', validateRequest({ body: resetPasswordSchema }), resetPassword);
authRoutes.post('/verify-email', validateRequest({ body: verifyEmailSchema }), verifyEmail);
authRoutes.get('/me', requireAuth, me);
