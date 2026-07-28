import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { autocomplete, getPopularSearches, getRecentSearches, getRecommendations, getTrendingProducts, imageSearch, runSearch, voiceSearch } from '../services/searchService.js';

export const searchProducts = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?._id?.toString();
  const result = await runSearch(
    {
      q: req.query.q as string | undefined,
      category: req.query.category as string | undefined,
      brand: req.query.brand as string | undefined,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      rating: req.query.rating ? Number(req.query.rating) : undefined,
      availability: req.query.availability as 'in-stock' | 'out-of-stock' | undefined,
      sort: req.query.sort as 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'rating' | undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      page: req.query.page ? Number(req.query.page) : undefined,
    },
    userId
  );

  res.json({ success: true, ...result });
});

export const autocompleteSearch = asyncHandler(async (req, res) => {
  const suggestions = await autocomplete((req.query.q as string) || '');
  res.json({ success: true, suggestions });
});

export const trendingProducts = asyncHandler(async (_req, res) => {
  const products = await getTrendingProducts();
  res.json({ success: true, products });
});

export const popularSearches = asyncHandler(async (_req, res) => {
  const searches = await getPopularSearches();
  res.json({ success: true, searches });
});

export const recentSearches = asyncHandler(async (req, res) => {
  const userId = (req as any).user?._id?.toString();
  if (!userId) return res.status(401).json({ success: false, message: 'Authentication required' });
  const searches = await getRecentSearches(userId);
  res.json({ success: true, searches });
});

export const recommendationSearch = asyncHandler(async (req, res) => {
  const recommendations = await getRecommendations(req.query.category as string | undefined);
  res.json({ success: true, recommendations });
});

export const voiceSearchRoute = asyncHandler(async (req, res) => {
  const userId = (req as any).user?._id?.toString();
  const result = await voiceSearch(req.query.q as string, userId);
  res.json({ success: true, ...result });
});

export const imageSearchRoute = asyncHandler(async (req, res) => {
  const products = await imageSearch(req.query.category as string | undefined);
  res.json({ success: true, products });
});
