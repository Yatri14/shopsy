import Payment from '../models/Payment.js';
import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getPayments = asyncHandler(async (_req, res) => {
  const payments = await Payment.find();
  res.json({ success: true, payments });
});

export const createPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.create({ ...req.body, user: (req as any).user?._id });
  res.status(201).json({ success: true, payment });
});

export const updatePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!payment) throw new AppError('Payment not found', 404);
  res.json({ success: true, payment });
});
