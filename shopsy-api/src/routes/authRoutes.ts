import { Router } from 'express';
import { forgotPassword, getMe, login, logout, refresh, register, resetPassword, verifyOtp } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { csrfProtection } from '../middleware/securityMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

export default router;
