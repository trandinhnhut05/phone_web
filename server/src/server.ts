import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import orderRoutes from './routes/order.routes.js';
import blogRoutes from './routes/blog.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import couponRoutes from './routes/coupon.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Bạn gửi quá nhiều yêu cầu, vui lòng thử lại sau 15 phút' },
});

// Stricter Auth & Order Limiter
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // Limit sensitive operations
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Thao tác quá thường xuyên. Vui lòng đợi trong giây lát' },
});

app.use('/api', globalLimiter);
app.use('/api/auth/login', strictLimiter);
app.use('/api/auth/register', strictLimiter);
app.post('/api/orders', strictLimiter);

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/coupons', couponRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString(), store: 'Tấn Đạt Smartphone' });
});

// Test Email Endpoint
app.get('/api/test-email', async (req: Request, res: Response) => {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL || smtpUser;

  if (!smtpUser || !smtpPass || !adminEmail) {
    res.status(400).json({
      success: false,
      message: 'Chưa cấu hình SMTP_USER, SMTP_PASS hoặc ADMIN_EMAIL trên server!',
      config: { smtpUser: !!smtpUser, smtpPass: !!smtpPass, adminEmail },
    });
    return;
  }

  try {
    const nodemailer = (await import('nodemailer')).default;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // TLS via STARTTLS (port 587 works seamlessly on Render)
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: `"Tấn Đạt Smartphone Hệ Thống" <${smtpUser}>`,
      to: adminEmail,
      subject: `🧪 [TEST THÔNG BÁO] Kiểm tra gửi email hệ thống Tấn Đạt Smartphone`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px; border: 1px solid #3b82f6; border-radius: 12px;">
          <h2 style="color: #2563eb; margin-top: 0;">✅ Hệ Thống Email Hoạt Động Tốt!</h2>
          <p>Email này được gửi thử nghiệm từ máy chủ <b>Tấn Đạt Smartphone (tandatsmartphone.com)</b>.</p>
          <p><b>Thời gian gửi:</b> ${new Date().toLocaleString('vi-VN')}</p>
          <p><b>Người nhận:</b> ${adminEmail}</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: `Đã gửi email thử nghiệm thành công tới: ${adminEmail}`,
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error('Lỗi test email:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi gửi email qua Gmail SMTP',
      error: error.message,
    });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Lỗi hệ thống máy chủ',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server Tấn Đạt Smartphone đang chạy tại http://localhost:${PORT}`);
});
