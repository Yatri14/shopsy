import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/dashboard', protect, authorizeRoles('seller', 'admin'), (_req, res) => {
  res.json({ success: true, message: 'Seller dashboard data' });
});

export default router;
