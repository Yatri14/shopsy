import { Router } from 'express';
import { forgotPassword, getMe, login, logout, refresh, register, resetPassword, verifyOtp } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { csrfProtection } from '../middleware/securityMiddleware.js';

const router = Router();

router.post('/register', csrfProtection, register);
router.post('/verify-otp', csrfProtection, verifyOtp);
router.post('/login', csrfProtection, login);
router.post('/refresh', csrfProtection, refresh);
router.post('/forgot-password', csrfProtection, forgotPassword);
router.post('/reset-password', csrfProtection, resetPassword);
router.post('/logout', csrfProtection, logout);
router.get('/me', protect, getMe);

export default router;
