import { Router } from 'express';
import { createCoupon, deleteCoupon, getCoupons, updateCoupon } from '../controllers/couponController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', getCoupons);
router.post('/', protect, authorizeRoles('admin', 'seller'), createCoupon);
router.put('/:id', protect, authorizeRoles('admin', 'seller'), updateCoupon);
router.delete('/:id', protect, authorizeRoles('admin'), deleteCoupon);

export default router;
