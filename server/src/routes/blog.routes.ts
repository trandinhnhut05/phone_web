import { Router } from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  incrementView,
} from '../controllers/blog.controller.js';
import { verifyToken, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);
router.post('/:id/view', incrementView);

// Admin routes
router.post('/', verifyToken, requireAdmin, createBlogPost);
router.put('/:id', verifyToken, requireAdmin, updateBlogPost);
router.delete('/:id', verifyToken, requireAdmin, deleteBlogPost);

export default router;
