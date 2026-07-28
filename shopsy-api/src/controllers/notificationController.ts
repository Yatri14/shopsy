import Notification from '../models/Notification.js';
import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: (req as any).user._id }).sort({ createdAt: -1 });
  res.json({ success: true, notifications });
});

export const createNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.create({ ...req.body, user: (req as any).user._id });
  res.status(201).json({ success: true, notification });
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  if (!notification) throw new AppError('Notification not found', 404);
  res.json({ success: true, notification });
});
