import { Router } from 'express';
import {
  createCashOnDeliveryOrder,
  createRazorpayOrder,
  getPayments,
  updatePayment,
  verifyRazorpayPayment,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', protect, authorizeRoles('admin'), getPayments);
router.post('/razorpay/orders', protect, createRazorpayOrder);
router.post('/razorpay/verify', protect, verifyRazorpayPayment);
router.post('/cash-on-delivery', protect, createCashOnDeliveryOrder);
router.put('/:id', protect, authorizeRoles('admin'), updatePayment);

export default router;
