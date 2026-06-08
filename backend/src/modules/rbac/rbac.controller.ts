import type { RequestHandler } from 'express';
import { sendSuccess } from '../../shared/http/api-response.js';
import { rbacService } from './rbac.service.js';

export const listRoles: RequestHandler = async (_req, res, next) => {
  try {
    sendSuccess(res, await rbacService.listRoles());
  } catch (error) {
    next(error);
  }
};

export const listPermissions: RequestHandler = async (_req, res, next) => {
  try {
    sendSuccess(res, await rbacService.listPermissions());
  } catch (error) {
    next(error);
  }
};

export const createRole: RequestHandler = async (req, res, next) => {
  try {
    sendSuccess(res, await rbacService.createRole(req.body), {}, 201);
  } catch (error) {
    next(error);
  }
};
