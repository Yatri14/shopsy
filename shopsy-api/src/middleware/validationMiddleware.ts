import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import { AppError } from '../utils/appError.js';

export const validateAuthInput = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;
  if (req.path.includes('/register')) {
    if (!name || !validator.isEmail(email) || !validator.isLength(password, { min: 6 })) {
      return next(new AppError('Invalid registration payload', 400));
    }
  }
  if (req.path.includes('/login')) {
    if (!validator.isEmail(email) || !validator.isLength(password, { min: 6 })) {
      return next(new AppError('Invalid login payload', 400));
    }
  }
  next();
};
