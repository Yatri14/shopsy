import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/appError.js';

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return next(new AppError('Access denied', 403));
    }
    next();
  };
};
