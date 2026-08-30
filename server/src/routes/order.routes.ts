import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
} from '../controllers/order.controller.js';
import { verifyToken, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Public / Authenticated user can place orders
router.post('/', createOrder);

// Customer: Get my own orders
router.get('/my-orders', verifyToken, getMyOrders);

// Admin-only management routes
router.get('/', verifyToken, requireAdmin, getOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', verifyToken, requireAdmin, updateOrderStatus);

export default router;

