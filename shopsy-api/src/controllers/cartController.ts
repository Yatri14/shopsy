import Cart from '../models/Cart.js';
import { AppError } from '../utils/appError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: (req as any).user._id }).populate('items.product');
  if (!cart) return res.json({ success: true, cart: { items: [] } });
  res.json({ success: true, cart });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { product, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ user: (req as any).user._id });
  if (!cart) {
    cart = await Cart.create({ user: (req as any).user._id, items: [{ product, quantity }] });
  } else {
    const existingItem = cart.items.find((item: any) => item.product.toString() === product);
    if (existingItem) existingItem.quantity += quantity;
    else cart.items.push({ product, quantity });
  }
  await cart.save();
  res.status(201).json({ success: true, cart });
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: (req as any).user._id });
  if (!cart) throw new AppError('Cart not found', 404);
  const item = cart.items.find((entry: any) => entry._id.toString() === req.params.itemId);
  if (!item) throw new AppError('Cart item not found', 404);
  item.quantity = req.body.quantity;
  await cart.save();
  res.json({ success: true, cart });
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: (req as any).user._id });
  if (!cart) throw new AppError('Cart not found', 404);
  cart.items = cart.items.filter((item: any) => item._id.toString() !== req.params.itemId);
  await cart.save();
  res.json({ success: true, cart });
});
