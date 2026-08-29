import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const validateCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, orderTotal } = req.body;

    if (!code) {
      res.status(400).json({ success: false, message: 'Vui lòng nhập mã giảm giá' });
      return;
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.trim().toUpperCase() },
    });

    if (!coupon || !coupon.active) {
      res.status(404).json({ success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' });
      return;
    }

    if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
      res.status(400).json({ success: false, message: 'Mã giảm giá này đã hết thời gian áp dụng' });
      return;
    }

    const total = parseFloat(orderTotal) || 0;
    if (coupon.minOrder && total < coupon.minOrder) {
      res.status(400).json({
        success: false,
        message: `Mã giảm giá này chỉ áp dụng cho đơn hàng từ ${coupon.minOrder.toLocaleString('vi-VN')}đ`,
      });
      return;
    }

    let discountAmount = 0;
    if (coupon.type === 'PERCENT') {
      discountAmount = (total * coupon.discount) / 100;
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = coupon.discount;
    }

    res.json({
      success: true,
      message: `Đã áp dụng mã ${coupon.code} thành công!`,
      data: {
        code: coupon.code,
        discount: discountAmount,
        description: coupon.description,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Lỗi kiểm tra mã giảm giá' });
  }
};
