import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/dashboard', protect, authorizeRoles('admin'), (_req, res) => {
  res.json({ success: true, message: 'Admin dashboard data' });
});

export default router;
