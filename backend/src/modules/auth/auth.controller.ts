import type { RequestHandler } from 'express';
import { sendSuccess } from '../../shared/http/api-response.js';
import { authService } from './auth.service.js';

export const register: RequestHandler = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    sendSuccess(res, user, {}, 201);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const me: RequestHandler = (req, res) => {
  sendSuccess(res, req.user);
};
