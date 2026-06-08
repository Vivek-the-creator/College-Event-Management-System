import { Router } from 'express';
import { sendSuccess } from '../../shared/http/api-response.js';

export const healthRoutes = Router();

healthRoutes.get('/', (_req, res) => {
  sendSuccess(res, {
    status: 'ok',
    service: '@marketplace/api',
    timestamp: new Date().toISOString()
  });
});
