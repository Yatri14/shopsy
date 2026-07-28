import Wishlist from '../models/Wishlist.js';
import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: (req as any).user._id }).populate('items.product');
  if (!wishlist) return res.json({ success: true, wishlist: { items: [] } });
  res.json({ success: true, wishlist });
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { product } = req.body;
  let wishlist = await Wishlist.findOne({ user: (req as any).user._id });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: (req as any).user._id, items: [{ product }] });
  } else if (!wishlist.items.some((item: any) => item.product.toString() === product)) {
    wishlist.items.push({ product });
  }
  await wishlist.save();
  res.status(201).json({ success: true, wishlist });
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: (req as any).user._id });
  if (!wishlist) throw new AppError('Wishlist not found', 404);
  wishlist.items = wishlist.items.filter((item: any) => item.product.toString() !== req.params.productId);
  await wishlist.save();
  res.json({ success: true, wishlist });
});
