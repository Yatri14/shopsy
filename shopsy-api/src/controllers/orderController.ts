import Order from '../models/Order.js';
import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: (req as any).user?._id || req.query.user }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError('Order not found', 404);
  res.json({ success: true, order });
});

export const createOrder = asyncHandler(async (req, res) => {
  const order = await Order.create({ ...req.body, user: (req as any).user?._id });
  res.status(201).json({ success: true, order });
});

export const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!order) throw new AppError('Order not found', 404);
  res.json({ success: true, order });
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) throw new AppError('Order not found', 404);
  res.json({ success: true, message: 'Order deleted successfully' });
});
