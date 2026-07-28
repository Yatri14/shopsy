import Review from '../models/Review.js';
import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getReviews = asyncHandler(async (_req, res) => {
  const reviews = await Review.find().populate('user', 'name');
  res.json({ success: true, reviews });
});

export const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create({ ...req.body, user: (req as any).user._id });
  res.status(201).json({ success: true, review });
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!review) throw new AppError('Review not found', 404);
  res.json({ success: true, review });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) throw new AppError('Review not found', 404);
  res.json({ success: true, message: 'Review deleted successfully' });
});
