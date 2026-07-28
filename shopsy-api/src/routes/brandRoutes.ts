import { Router } from 'express';
import { createBrand, deleteBrand, getBrands, updateBrand } from '../controllers/brandController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', getBrands);
router.post('/', protect, authorizeRoles('admin', 'seller'), createBrand);
router.put('/:id', protect, authorizeRoles('admin', 'seller'), updateBrand);
router.delete('/:id', protect, authorizeRoles('admin'), deleteBrand);

export default router;
