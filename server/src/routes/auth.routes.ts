import { Router } from 'express';
import { login, register, getMe, updateProfile, logout } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', verifyToken, getMe);
router.put('/me', verifyToken, updateProfile);
router.post('/logout', logout);

export default router;

