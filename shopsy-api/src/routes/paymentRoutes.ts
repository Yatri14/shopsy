import { Router } from 'express';
import { createPayment, getPayments, updatePayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', protect, authorizeRoles('admin'), getPayments);
router.post('/', protect, createPayment);
router.put('/:id', protect, authorizeRoles('admin'), updatePayment);

export default router;
