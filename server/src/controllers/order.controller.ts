import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { notificationService } from '../services/notification.service.js';

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      address,
      paymentMethod = 'COD',
      items,
      note,
    } = req.body;

    if (!customerName || !customerPhone || !address || !items || !items.length) {
      res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin giao hàng và sản phẩm' });
      return;
    }

    // Verify all products and check stock
    const productIds = items.map((i: any) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(dbProducts.map((p) => [p.id, p]));

    let calculatedTotal = 0;
    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) {
        res.status(400).json({ success: false, message: `Sản phẩm ID ${item.productId} không tồn tại` });
        return;
      }
      if (product.stock < item.qty) {
        res.status(400).json({
          success: false,
          message: `Sản phẩm "${product.name}" chỉ còn ${product.stock} sản phẩm trong kho.`,
        });
        return;
      }
      calculatedTotal += product.price * item.qty;
    }

    // Execute order creation in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create order
      const newOrder = await tx.order.create({
        data: {
          userId: req.user?.id || null,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail ? customerEmail.trim() : null,
          address: address.trim(),
          paymentMethod,
          note: note ? note.trim() : null,
          total: calculatedTotal,
          status: 'PENDING',
          items: {
            create: items.map((item: any) => {
              const prod = productMap.get(item.productId)!;
              return {
                productId: prod.id,
                qty: item.qty,
                price: prod.price,
              };
            }),
          },
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      // 2. Decrement stock & increment sold
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.qty },
            sold: { increment: item.qty },
          },
        });
      }

      return newOrder;
    });

    // Send notifications in background (Telegram Bot & Email)
    notificationService.notifyNewOrder({
      id: order.id,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      address: order.address,
      total: order.total,
      paymentMethod: order.paymentMethod,
      items: order.items,
      note: order.note,
    });

    res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công! Chúng tôi sẽ liên hệ sớm nhất.',
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Lỗi xử lý đơn hàng' });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = '1', limit = '20' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const take = Math.min(100, Math.max(1, parseInt(limit as string) || 20));
    const skip = (pageNum - 1) * take;

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: { product: true },
          },
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: pageNum,
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true },
        },
        user: { select: { id: true, name: true, email: true } },
      },
    });

    if (!order) {
      res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
      return;
    }

    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ' });
      return;
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    res.json({
      success: true,
      message: 'Cập nhật trạng thái đơn hàng thành công',
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Vui lòng đăng nhập' });
      return;
    }

    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { userId: req.user.id },
          ...(req.user.email ? [{ customerEmail: req.user.email }] : []),
        ],
      },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

