import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import { AppError } from '../utils/appError.js';

export const validateAuthInput = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log('PATH:', req.path);
  console.log('BODY:', req.body);

  const {
    email,
    password,
    name,
    role,
  } = req.body;

  /* =========================
     REGISTER
  ========================= */

  if (req.path.includes('/register')) {
    console.log('REGISTER VALIDATION:', {
      name,
      email,
      passwordLength: password?.length,
      role,
      isEmail: validator.isEmail(
        typeof email === 'string'
          ? email
          : ''
      ),
    });

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof email !== 'string' ||
      !validator.isEmail(email) ||
      typeof password !== 'string' ||
      !validator.isLength(password, {
        min: 6,
      })
    ) {
      return next(
        new AppError(
          'Invalid registration payload',
          400
        )
      );
    }

    // Validate role if supplied
    if (
      role &&
      !['customer', 'seller', 'admin'].includes(role)
    ) {
      return next(
        new AppError(
          'Invalid role',
          400
        )
      );
    }
  }

  /* =========================
     LOGIN
  ========================= */

  if (req.path.includes('/login')) {
    console.log('LOGIN VALIDATION:', {
      email,
      passwordLength: password?.length,
      role,
      isEmail: validator.isEmail(
        typeof email === 'string'
          ? email
          : ''
      ),
    });

    if (
      typeof email !== 'string' ||
      !validator.isEmail(email) ||
      typeof password !== 'string' ||
      !validator.isLength(password, {
        min: 6,
      })
    ) {
      return next(
        new AppError(
          'Invalid login payload',
          400
        )
      );
    }

    // Role is required for role-based login
    if (
      typeof role !== 'string' ||
      !['customer', 'seller', 'admin'].includes(role)
    ) {
      return next(
        new AppError(
          'Invalid role',
          400
        )
      );
    }
  }

  next();
};