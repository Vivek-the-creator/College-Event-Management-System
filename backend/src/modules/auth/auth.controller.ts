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

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken ?? req.cookies?.refreshToken;
    sendSuccess(res, await authService.refresh(refreshToken));
  } catch (error) {
    next(error);
  }
};

export const forgotPassword: RequestHandler = async (req, res, next) => {
  try {
    sendSuccess(res, await authService.forgotPassword(req.body.email));
  } catch (error) {
    next(error);
  }
};

export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    sendSuccess(res, await authService.resetPassword(req.body.token, req.body.password));
  } catch (error) {
    next(error);
  }
};

export const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    sendSuccess(res, await authService.verifyEmail(req.body.token));
  } catch (error) {
    next(error);
  }
};
