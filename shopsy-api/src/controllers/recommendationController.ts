import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getRecommendations = asyncHandler(async (_req, res) => {
  const products = await Product.find().limit(6);
  res.json({ success: true, recommendations: products });
});
