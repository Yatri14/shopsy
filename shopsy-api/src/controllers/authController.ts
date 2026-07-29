import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendMail } from '../utils/email.js';

const signTokens = (user: any) => {

  if (!user._id) {
    throw new Error("User ID missing");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is missing");
  }


  const accessToken = jwt.sign(
    {
      id: user._id.toString(),
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m'
    }
  );


  const refreshToken = jwt.sign(
    {
      id: user._id.toString(),
      role: user.role
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '7d'
    }
  );


  return {
    accessToken,
    refreshToken
  };
};

const setAuthCookies = (res: any, accessToken: string, refreshToken: string) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('accessToken', accessToken, { httpOnly: true, secure: isProd, sameSite: 'lax', maxAge: 15 * 60 * 1000 });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: isProd, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'customer' } = req.body;
  const existing = await User.findOne({ email });
  if (existing) throw new AppError('User already exists', 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const otpCode = crypto.randomInt(100000, 999999).toString();
  const user = await User.create({ name, email, password: hashedPassword, role, otpCode, otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) });

  await sendMail(email, 'Verify your Shopsy account', `<p>Your OTP is <strong>${otpCode}</strong></p>`);
  res.status(201).json({ success: true, message: 'Account created. Verify OTP to continue.', userId: user._id });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otpCode } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new AppError('User not found', 400);
  if (user.otpCode !== otpCode || !user.otpExpiresAt || user.otpExpiresAt < new Date()) throw new AppError('Invalid or expired OTP', 400);

  user.isVerified = true;
  user.otpCode = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  res.json({ success: true, message: 'Email verified successfully' });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new AppError('Invalid credentials', 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError('Invalid credentials', 400);
  if (!user.isVerified) throw new AppError('Please verify your email first', 403);

  const { accessToken, refreshToken } = signTokens(user);
  user.refreshToken = refreshToken;
  await user.save();

  setAuthCookies(res, accessToken, refreshToken);
  res.json({ success: true, accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!refreshToken) throw new AppError('Refresh token missing', 401);

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refreshsecret') as any;
  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) throw new AppError('Invalid refresh token', 403);

  const { accessToken, refreshToken: newRefreshToken } = signTokens(user);
  user.refreshToken = newRefreshToken;
  await user.save();

  setAuthCookies(res, accessToken, newRefreshToken);
  res.json({ success: true, accessToken, refreshToken: newRefreshToken });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new AppError('User not found', 404);

  const otpCode = crypto.randomInt(100000, 999999).toString();
  user.passwordResetOtp = otpCode;
  user.passwordResetExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendMail(email, 'Reset your Shopsy password', `<p>Your reset OTP is <strong>${otpCode}</strong></p>`);
  res.json({ success: true, message: 'Reset OTP sent to your email' });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otpCode, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new AppError('User not found', 404);
  if (user.passwordResetOtp !== otpCode || !user.passwordResetExpiresAt || user.passwordResetExpiresAt < new Date()) throw new AppError('Invalid or expired reset OTP', 400);

  user.password = await bcrypt.hash(newPassword, 10);
  user.passwordResetOtp = undefined;
  user.passwordResetExpiresAt = undefined;
  await user.save();

  res.json({ success: true, message: 'Password reset successfully' });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (refreshToken) {
    const decoded = jwt.decode(refreshToken) as any;
    if (decoded?.id) {
      await User.findByIdAndUpdate(decoded.id, { refreshToken: null });
    }
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = (req as any).user;
  res.json({ success: true, user });
});
