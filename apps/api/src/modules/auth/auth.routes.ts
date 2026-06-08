import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { validateRequest } from '../../middleware/validate-request.js';
import { login, me, register } from './auth.controller.js';
import { loginSchema, registerSchema } from './auth.validators.js';

export const authRoutes = Router();

authRoutes.post('/register', validateRequest({ body: registerSchema }), register);
authRoutes.post('/login', validateRequest({ body: loginSchema }), login);
authRoutes.get('/me', requireAuth, me);
