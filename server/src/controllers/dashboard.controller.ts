import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getDashboardStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalProducts,
      totalOrders,
      pendingOrders,
      orders,
      recentOrders,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.findMany({
        where: { status: { not: 'CANCELLED' } },
        select: { total: true, createdAt: true },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          items: { include: { product: true } },
          user: { select: { name: true, email: true } },
        },
      }),
    ]);

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Calculate revenue for the last 7 days
    const last7Days: { [key: string]: number } = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      last7Days[dateStr] = 0;
    }

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      if (last7Days[orderDate] !== undefined) {
        last7Days[orderDate] += order.total;
      }
    });

    const revenueChart = Object.entries(last7Days).map(([date, revenue]) => ({
      date,
      revenue,
    }));

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        pendingOrders,
        totalProducts,
        revenueChart,
        recentOrders,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTopProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const topProducts = await prisma.product.findMany({
      take: 5,
      orderBy: { sold: 'desc' },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        images: true,
        brand: true,
        sold: true,
        stock: true,
      },
    });

    res.json({ success: true, data: topProducts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
