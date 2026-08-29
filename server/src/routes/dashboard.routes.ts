import { Router } from 'express';
import { getDashboardStats, getTopProducts } from '../controllers/dashboard.controller.js';
import { verifyToken, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/stats', verifyToken, requireAdmin, getDashboardStats);
router.get('/top-products', verifyToken, requireAdmin, getTopProducts);

export default router;
