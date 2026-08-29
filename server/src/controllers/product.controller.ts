import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { createSlug } from '../utils/slugify.js';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      brand,
      category,
      search,
      minPrice,
      maxPrice,
      sort = 'newest',
      page = '1',
      limit = '20',
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const take = Math.min(100, Math.max(1, parseInt(limit as string) || 20));
    const skip = (pageNum - 1) * take;

    const where: any = {};

    if (brand && brand !== 'all') {
      where.brand = { equals: brand as string, mode: 'insensitive' };
    }

    if (category && category !== 'all') {
      where.OR = [
        { category: { slug: category as string } },
        { categoryId: category as string },
      ];
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { brand: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    else if (sort === 'price_desc') orderBy = { price: 'desc' };
    else if (sort === 'popular') orderBy = { sold: 'desc' };
    else if (sort === 'oldest') orderBy = { createdAt: 'asc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          reviews: { select: { rating: true } },
        },
        orderBy,
        skip,
        take,
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: pageNum,
        limit: take,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Lỗi lấy danh sách sản phẩm' });
  }
};

export const getProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug as string;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
      return;
    }

    // Get related products
    const relatedProducts = await prisma.product.findMany({
      where: {
        brand: product.brand,
        id: { not: product.id },
      },
      take: 4,
      orderBy: { sold: 'desc' },
      include: {
        reviews: { select: { rating: true } },
      },
    });

    res.json({
      success: true,
      data: product,
      related: relatedProducts,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!product) {
      res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
      return;
    }

    res.json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id as string;
    const { userName, userPhone, rating, comment } = req.body;

    if (!userName || !rating || !comment) {
      res.status(400).json({ success: false, message: 'Vui lòng điền Họ tên, số sao đánh giá và nội dung nhận xét' });
      return;
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userName: userName.trim(),
        userPhone: userPhone ? userPhone.trim() : null,
        rating: Math.min(5, Math.max(1, parseInt(rating))),
        comment: comment.trim(),
        verified: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Cảm ơn bạn đã gửi đánh giá cho Tấn Đạt Smartphone!',
      data: review,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Lỗi gửi đánh giá' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      brand,
      price,
      oldPrice,
      storage,
      ram,
      stock = 0,
      images = [],
      colors = [],
      description,
      highlights = [],
      specs = {},
      inBox = [],
      warranty,
      categoryId,
    } = req.body;

    if (!name || !brand || price === undefined) {
      res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ tên sản phẩm, thương hiệu và giá' });
      return;
    }

    const slug = createSlug(name);

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        brand,
        price: parseFloat(price),
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        storage,
        ram,
        stock: parseInt(stock) || 0,
        images: Array.isArray(images) ? images : [images],
        colors: Array.isArray(colors) ? colors : [colors],
        description,
        highlights: Array.isArray(highlights) ? highlights : [],
        specs: specs || {},
        inBox: Array.isArray(inBox) ? inBox : [],
        warranty: warranty || '12 Tháng chính hãng, 1 đổi 1 trong 30 ngày',
        categoryId: categoryId || null,
      },
      include: { category: true },
    });

    res.status(201).json({
      success: true,
      message: 'Thêm sản phẩm thành công',
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Lỗi thêm sản phẩm' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const {
      name,
      brand,
      price,
      oldPrice,
      storage,
      ram,
      stock,
      images,
      colors,
      description,
      highlights,
      specs,
      inBox,
      warranty,
      categoryId,
    } = req.body;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
      return;
    }

    const updateData: any = {};
    if (name) {
      updateData.name = name;
      if (name !== existing.name) {
        updateData.slug = createSlug(name);
      }
    }
    if (brand) updateData.brand = brand;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (oldPrice !== undefined) updateData.oldPrice = oldPrice ? parseFloat(oldPrice) : null;
    if (storage !== undefined) updateData.storage = storage;
    if (ram !== undefined) updateData.ram = ram;
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (images !== undefined) updateData.images = Array.isArray(images) ? images : [images];
    if (colors !== undefined) updateData.colors = Array.isArray(colors) ? colors : [colors];
    if (description !== undefined) updateData.description = description;
    if (highlights !== undefined) updateData.highlights = Array.isArray(highlights) ? highlights : [];
    if (specs !== undefined) updateData.specs = specs;
    if (inBox !== undefined) updateData.inBox = Array.isArray(inBox) ? inBox : [];
    if (warranty !== undefined) updateData.warranty = warranty;
    if (categoryId !== undefined) updateData.categoryId = categoryId || null;

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { category: true },
    });

    res.json({
      success: true,
      message: 'Cập nhật sản phẩm thành công',
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Lỗi cập nhật sản phẩm' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
      return;
    }

    await prisma.product.delete({ where: { id } });

    res.json({ success: true, message: 'Đã xóa sản phẩm thành công' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Lỗi xóa sản phẩm' });
  }
};
