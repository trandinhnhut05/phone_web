import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/order.controller.js';
import { verifyToken, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Public / Authenticated user can place orders
router.post('/', createOrder);

// Admin-only management routes
router.get('/', verifyToken, requireAdmin, getOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', verifyToken, requireAdmin, updateOrderStatus);

export default router;
