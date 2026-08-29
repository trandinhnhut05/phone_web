import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { createSlug } from '../utils/slugify.js';

export const getBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { published, category, page = '1', limit = '10' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const take = Math.min(50, Math.max(1, parseInt(limit as string) || 10));
    const skip = (pageNum - 1) * take;

    const where: any = {};
    if (published !== undefined) {
      where.published = published === 'true';
    }
    if (category) {
      where.category = category as string;
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.blogPost.count({ where }),
    ]);

    res.json({
      success: true,
      data: posts,
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

export const getBlogPostBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug as string;

    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
      return;
    }

    // Related posts
    const related = await prisma.blogPost.findMany({
      where: {
        category: post.category,
        id: { not: post.id },
        published: true,
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: post, related });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, summary, image, category, published = true } = req.body;

    if (!title || !content) {
      res.status(400).json({ success: false, message: 'Tiêu đề và nội dung là bắt buộc' });
      return;
    }

    const slug = createSlug(title);

    const post = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        slug,
        content,
        summary: summary || null,
        image: image || null,
        category: category || 'Công nghệ',
        published: Boolean(published),
      },
    });

    res.status(201).json({ success: true, message: 'Tạo bài viết thành công', data: post });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { title, content, summary, image, category, published } = req.body;

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
      return;
    }

    const updateData: any = {};
    if (title) {
      updateData.title = title;
      if (title !== existing.title) {
        updateData.slug = createSlug(title);
      }
    }
    if (content !== undefined) updateData.content = content;
    if (summary !== undefined) updateData.summary = summary;
    if (image !== undefined) updateData.image = image;
    if (category !== undefined) updateData.category = category;
    if (published !== undefined) updateData.published = Boolean(published);

    const updated = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    res.json({ success: true, message: 'Cập nhật bài viết thành công', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    await prisma.blogPost.delete({ where: { id } });
    res.json({ success: true, message: 'Đã xóa bài viết' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const incrementView = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    await prisma.blogPost.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
