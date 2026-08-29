import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { createCleanSlug } from '../utils/slugify.js';

export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    res.json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ success: false, message: 'Tên danh mục là bắt buộc' });
      return;
    }

    const slug = createCleanSlug(name);

    const category = await prisma.category.create({
      data: { name: name.trim(), slug },
    });

    res.status(201).json({ success: true, message: 'Thêm danh mục thành công', data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Lỗi thêm danh mục' });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ success: false, message: 'Tên danh mục là bắt buộc' });
      return;
    }

    const slug = createCleanSlug(name);

    const category = await prisma.category.update({
      where: { id },
      data: { name: name.trim(), slug },
    });

    res.json({ success: true, message: 'Cập nhật danh mục thành công', data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    await prisma.category.delete({ where: { id } });
    res.json({ success: true, message: 'Đã xóa danh mục' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
