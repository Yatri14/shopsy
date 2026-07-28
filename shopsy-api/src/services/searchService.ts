import Product from '../models/Product.js';
import SearchHistory from '../models/SearchHistory.js';

interface SearchQuery {
  q?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  availability?: 'in-stock' | 'out-of-stock';
  sort?: 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  limit?: number;
  page?: number;
}

const buildFilter = (query: SearchQuery) => {
  const filter: Record<string, any> = { status: 'active' };

  if (query.q) {
    filter.$or = [
      { name: { $regex: query.q, $options: 'i' } },
      { description: { $regex: query.q, $options: 'i' } },
      { brand: { $regex: query.q, $options: 'i' } },
      { category: { $regex: query.q, $options: 'i' } },
    ];
  }

  if (query.category) filter.category = { $regex: query.category, $options: 'i' };
  if (query.brand) filter.brand = { $regex: query.brand, $options: 'i' };
  if (query.minPrice !== undefined) filter.price = { ...filter.price, $gte: query.minPrice };
  if (query.maxPrice !== undefined) filter.price = { ...filter.price, $lte: query.maxPrice };
  if (query.availability === 'in-stock') filter.stock = { $gt: 0 };
  if (query.availability === 'out-of-stock') filter.stock = { $lte: 0 };
  if (query.rating) filter.rating = { $gte: query.rating };

  return filter;
};

const buildSort = (sort?: string) => {
  switch (sort) {
    case 'price-asc':
      return { price: 1 } as Record<string, any>;
    case 'price-desc':
      return { price: -1 } as Record<string, any>;
    case 'newest':
      return { createdAt: -1 } as Record<string, any>;
    case 'rating':
      return { rating: -1 } as Record<string, any>;
    default:
      return { score: { $meta: 'textScore' } } as Record<string, any>;
  }
};

export const runSearch = async (query: SearchQuery, userId?: string) => {
  const filter = buildFilter(query);
  const sort = buildSort(query.sort);
  const limit = query.limit || 20;
  const page = query.page || 1;

  const productsQuery = Product.find(filter);

  if (query.q) {
    productsQuery.find({ $text: { $search: query.q } });
  }

  const [products, total] = await Promise.all([
    productsQuery
      .sort(sort as any)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
  ]);

  if (userId && query.q) {
    await SearchHistory.findOneAndUpdate(
      { user: userId, query: query.q },
      { $inc: { count: 1 }, $set: { updatedAt: new Date(), type: 'search' } },
      { upsert: true, new: true }
    );
  }

  return { products, total, page, pages: Math.ceil(total / limit) };
};

export const autocomplete = async (q: string) => {
  const suggestions = await Product.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } },
      { brand: { $regex: q, $options: 'i' } },
    ],
    status: 'active',
  })
    .select('name category brand')
    .limit(8)
    .lean();

  return suggestions;
};

export const getTrendingProducts = async () => {
  return Product.find({ status: 'active' }).sort({ createdAt: -1 }).limit(8).lean();
};

export const getPopularSearches = async () => {
  return SearchHistory.find({ type: 'search' }).sort({ count: -1 }).limit(10).lean();
};

export const getRecentSearches = async (userId: string) => {
  return SearchHistory.find({ user: userId, type: 'search' }).sort({ updatedAt: -1 }).limit(10).lean();
};

export const getRecommendations = async (category?: string) => {
  const filter: Record<string, any> = { status: 'active' };
  if (category) filter.category = { $regex: category, $options: 'i' };
  return Product.find(filter).sort({ createdAt: -1 }).limit(8).lean();
};

export const voiceSearch = async (q: string, userId?: string) => {
  return runSearch({ q, sort: 'relevance', limit: 8 }, userId);
};

export const imageSearch = async (category?: string) => {
  const filter: Record<string, any> = { status: 'active' };
  if (category) filter.category = { $regex: category, $options: 'i' };
  return Product.find(filter).limit(8).lean();
};
