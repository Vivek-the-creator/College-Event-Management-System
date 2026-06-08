import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../shared/errors/app-error.js';

export type AuthUser = {
  id: string;
  email: string;
  permissions: string[];
  roles: string[];
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;

  if (!token) {
    return next(new AppError(401, 'AUTH_REQUIRED', 'Authentication is required.'));
  }

  try {
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthUser;
    return next();
  } catch {
    return next(new AppError(401, 'INVALID_TOKEN', 'Access token is invalid or expired.'));
  }
};

export function requirePermission(permission: string): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new AppError(401, 'AUTH_REQUIRED', 'Authentication is required.'));
    }

    if (!req.user.permissions.includes(permission)) {
      return next(new AppError(403, 'FORBIDDEN', 'You do not have permission for this action.'));
    }

    return next();
  };
}
