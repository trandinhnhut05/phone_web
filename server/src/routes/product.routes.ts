import { Router } from 'express';
import {
  getProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
} from '../controllers/product.controller.js';
import { verifyToken, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.get('/id/:id', getProductById);
router.post('/:id/reviews', createReview);

// Admin-only routes
router.post('/', verifyToken, requireAdmin, createProduct);
router.put('/:id', verifyToken, requireAdmin, updateProduct);
router.delete('/:id', verifyToken, requireAdmin, deleteProduct);

export default router;
