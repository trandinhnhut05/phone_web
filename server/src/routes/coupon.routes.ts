import { Router } from 'express';
import { validateCoupon } from '../controllers/coupon.controller.js';

const router = Router();

router.post('/apply', validateCoupon);

export default router;
