import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import validator from 'validator';
import { AppError } from '../utils/appError.js';

export const securityHeaders = helmet();

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many authentication attempts.' },
});

export const parseCookies = cookieParser();

export const csrfProtection = csrf({ cookie: true });

export const sanitizeInput = (req: Request, _res: Response, next: NextFunction) => {
  for (const key of Object.keys(req.body || {})) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = validator.escape(req.body[key]);
    }
  }
  for (const key of Object.keys(req.query || {})) {
    if (typeof req.query[key] === 'string') {
      req.query[key] = validator.escape(req.query[key] as string) as any;
    }
  }
  next();
};

export const preventNoSqlInjection = (req: Request, _res: Response, next: NextFunction) => {
  const forbidden = ["$where", "$ne", "$gt", "$lt", "$gte", "$lte", "$regex", "$or", "$and"];
  const values = [...Object.values(req.body || {}), ...Object.values(req.query || {})];
  const containsForbidden = values.some((value) => typeof value === 'string' && forbidden.some((token) => value.includes(token)));
  if (containsForbidden) {
    return next(new AppError('Malformed request payload', 400));
  }
  next();
};
