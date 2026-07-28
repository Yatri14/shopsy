import { Router } from 'express';
import { autocompleteSearch, imageSearchRoute, popularSearches, recentSearches, recommendationSearch, searchProducts, trendingProducts, voiceSearchRoute } from '../controllers/searchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/autocomplete', autocompleteSearch);
router.get('/trending', trendingProducts);
router.get('/popular', popularSearches);
router.get('/history', protect, recentSearches);
router.get('/recommendations', recommendationSearch);
router.get('/voice', protect, voiceSearchRoute);
router.get('/image', imageSearchRoute);
router.get('/', searchProducts);

export default router;
