import { Router, Response } from 'express';
import { uploadMiddleware, processUploadedFile } from '../services/upload.service.js';
import { verifyToken, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.post(
  '/',
  verifyToken,
  requireAdmin,
  uploadMiddleware.single('image'),
  async (req: any, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, message: 'Vui lòng chọn một hình ảnh để tải lên' });
        return;
      }

      const imageUrl = await processUploadedFile(req.file, req);

      res.json({
        success: true,
        message: 'Tải ảnh lên thành công',
        url: imageUrl,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || 'Lỗi tải ảnh lên' });
    }
  }
);

export default router;
