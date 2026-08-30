import { Router } from 'express';
import {
  login,
  register,
  getMe,
  updateProfile,
  logout,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from '../controllers/auth.controller.js';
import { verifyToken, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Customer / General Auth
router.post('/login', login);
router.post('/register', register);
router.get('/me', verifyToken, getMe);
router.put('/me', verifyToken, updateProfile);
router.post('/logout', logout);

// Admin-only User Management
router.get('/users', verifyToken, requireAdmin, getAllUsers);
router.put('/users/:id/role', verifyToken, requireAdmin, updateUserRole);
router.delete('/users/:id', verifyToken, requireAdmin, deleteUser);

export default router;


