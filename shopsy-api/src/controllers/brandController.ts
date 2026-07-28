import Brand from '../models/Brand.js';
import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getBrands = asyncHandler(async (_req, res) => {
  const brands = await Brand.find();
  res.json({ success: true, brands });
});

export const createBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.create(req.body);
  res.status(201).json({ success: true, brand });
});

export const updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!brand) throw new AppError('Brand not found', 404);
  res.json({ success: true, brand });
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand) throw new AppError('Brand not found', 404);
  res.json({ success: true, message: 'Brand deleted successfully' });
});
