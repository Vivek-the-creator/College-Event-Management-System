import type { Response } from 'express';

type Meta = Record<string, unknown>;

export function sendSuccess<T>(res: Response, data: T, meta: Meta = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    meta,
    error: null
  });
}
