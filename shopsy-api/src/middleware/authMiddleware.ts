import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return next(new AppError('Not authenticated', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret') as { id: string; role: string };
  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    return next(new AppError('User not found', 401));
  }

  (req as any).user = user;
  next();
});
