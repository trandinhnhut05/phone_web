import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface OrderNotificationData {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  address: string;
  total: number;
  paymentMethod: string;
  items: Array<{
    product?: { name: string } | null;
    qty: number;
    price: number;
  }>;
  note?: string | null;
}

export const notificationService = {
  // 1. Send Alert to Telegram Bot for Store Owner
  notifyNewOrderTelegram: async (order: OrderNotificationData) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.log('ℹ️ [TELEGRAM BOT] Chưa cấu hình TELEGRAM_BOT_TOKEN/CHAT_ID. Bỏ qua gửi tin nhắn Telegram.');
      return;
    }

    try {
      const itemsList = order.items
        .map((i) => `• ${i.product?.name || 'Sản phẩm'} (x${i.qty}) - ${(i.price * i.qty).toLocaleString('vi-VN')}đ`)
        .join('\n');

      const message = `🔔 *CÓ ĐƠN HÀNG MỚI TẠI TẤN ĐẠT SMARTPHONE!*\n\n` +
        `👤 *Khách hàng:* ${order.customerName}\n` +
        `📞 *Số điện thoại:* \`${order.customerPhone}\`\n` +
        `📍 *Địa chỉ:* ${order.address}\n` +
        `💳 *Hình thức:* ${order.paymentMethod}\n` +
        `💰 *Tổng tiền:* *${order.total.toLocaleString('vi-VN')} đ*\n\n` +
        `📦 *Danh sách máy:*\n${itemsList}\n` +
        (order.note ? `📝 *Ghi chú:* ${order.note}\n` : '') +
        `\n👉 Mã đơn: \`#${order.id.slice(0, 8).toUpperCase()}\``;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
      console.log('✅ [TELEGRAM] Đã gửi thông báo đơn hàng mới tới Telegram Admin!');
    } catch (err: any) {
      console.error('❌ [TELEGRAM ERROR] Lỗi gửi thông báo Telegram:', err.message);
    }
  },

  // Helper to send email via Resend API (HTTPS REST API - never blocked on cloud)
  sendEmailViaResend: async (to: string | string[], subject: string, html: string) => {
    const apiKey = process.env.RESEND_API_KEY;
    const recipients = Array.isArray(to) ? to : to.split(',').map((e) => e.trim()).filter(Boolean);
    if (!apiKey) return { successful: [], failed: recipients };

    const fromAddress = process.env.RESEND_FROM || 'Tấn Đạt Smartphone <onboarding@resend.dev>';
    const successful: string[] = [];
    const failed: string[] = [];

    for (const recipient of recipients) {
      try {
        let response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [recipient],
            subject,
            html,
          }),
        });

        // If custom domain is not yet verified, fallback to onboarding@resend.dev
        if (!response.ok && fromAddress !== 'onboarding@resend.dev') {
          response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Tấn Đạt Smartphone <onboarding@resend.dev>',
              to: [recipient],
              subject,
              html,
            }),
          });
        }

        const data: any = await response.json();
        if (response.ok) {
          console.log(`✅ [RESEND EMAIL] Đã gửi email thành công tới ${recipient}! ID:`, data.id);
          successful.push(recipient);
        } else {
          console.error(`❌ [RESEND ERROR] Không thể gửi tới ${recipient}:`, data.message || data);
          failed.push(recipient);
        }
      } catch (err: any) {
        console.error(`❌ [RESEND EXCEPTION] Lỗi khi gửi email tới ${recipient}:`, err.message);
        failed.push(recipient);
      }
    }

    return { successful, failed };
  },

  // 2. Send New Order Alert Email to Admin
  sendOrderEmailAdmin: async (order: OrderNotificationData) => {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    const resendKey = process.env.RESEND_API_KEY;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!adminEmail) {
      console.log('ℹ️ [EMAIL] Chưa cấu hình ADMIN_EMAIL. Bỏ qua gửi email admin.');
      return;
    }

    const clientUrl = process.env.CLIENT_URL || 'https://tandatsmartphone.com';
    const orderTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    const itemsHtml = order.items
      .map(
        (i) => `
      <tr>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${i.product?.name || 'Sản phẩm'}</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #64748b; font-weight: bold;">x${i.qty}</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold; color: #2563eb;">${(i.price * i.qty).toLocaleString('vi-VN')} đ</td>
      </tr>`
      )
      .join('');

    const emailSubject = `🔔 [ĐƠN HÀNG MỚI] #${order.id.slice(0, 8).toUpperCase()} - ${order.customerName} (${order.total.toLocaleString('vi-VN')} đ)`;
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 18px; background-color: #ffffff; color: #334155;">
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 22px 24px; border-radius: 14px; color: #ffffff; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; opacity: 0.85; margin-bottom: 4px;">TẤN ĐẠT SMARTPHONE • THÔNG BÁO HỆ THỐNG</div>
          <h2 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; color: #ffffff;">🎉 BẠN CÓ ĐƠN HÀNG MỚI!</h2>
          <p style="margin: 0; font-size: 13px; opacity: 0.9;">Mã đơn: <b style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 6px;">#${order.id.slice(0, 8).toUpperCase()}</b> &nbsp;•&nbsp; ${orderTime}</p>
        </div>

        <!-- Customer & Delivery Info -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 18px 20px; border-radius: 14px; margin-bottom: 24px; font-size: 14px; line-height: 1.7;">
          <div style="font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
            👤 Thông tin người nhận
          </div>
          <p style="margin: 4px 0;"><b>Họ tên khách:</b> <span style="color: #0f172a; font-weight: 600;">${order.customerName}</span></p>
          <p style="margin: 4px 0;">📞 <b>Số điện thoại:</b> <a href="tel:${order.customerPhone}" style="color: #2563eb; font-weight: 700; text-decoration: none; font-size: 15px;">${order.customerPhone}</a> (Bấm để gọi)</p>
          ${order.customerEmail ? `<p style="margin: 4px 0;">✉️ <b>Email khách:</b> <a href="mailto:${order.customerEmail}" style="color: #2563eb;">${order.customerEmail}</a></p>` : ''}
          <p style="margin: 4px 0;">📍 <b>Địa chỉ giao hàng:</b> <span style="color: #0f172a;">${order.address}</span></p>
          <p style="margin: 4px 0;">💳 <b>Hình thức:</b> <span style="color: #059669; font-weight: 700;">${order.paymentMethod === 'COD' ? 'Thanh toán tiền mặt khi nhận hàng (COD)' : order.paymentMethod}</span></p>
          ${order.note ? `<p style="margin: 6px 0 0 0; padding: 8px 12px; background: #fef3c7; border-radius: 8px; color: #92400e; font-size: 13px;">📝 <b>Ghi chú của khách:</b> <i>"${order.note}"</i></p>` : ''}
        </div>

        <!-- Order Items Table -->
        <h4 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 700;">Chi tiết sản phẩm đặt mua:</h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left; color: #475569; font-size: 13px;">
              <th style="padding: 10px 12px; border-radius: 8px 0 0 8px;">Tên sản phẩm</th>
              <th style="padding: 10px 8px; text-align: center;">SL</th>
              <th style="padding: 10px 12px; text-align: right; border-radius: 0 8px 8px 0;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <!-- Revenue Total -->
        <div style="padding: 16px 20px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <span style="font-size: 15px; font-weight: 700; color: #1e40af;">TỔNG TIỀN THANH TOÁN:</span>
          <span style="font-size: 20px; font-weight: 800; color: #dc2626; text-align: right;">${order.total.toLocaleString('vi-VN')} đ</span>
        </div>

        <!-- Call to action button -->
        <div style="text-align: center; padding-top: 8px;">
          <a href="${clientUrl}/admin/orders" style="display: inline-block; padding: 14px 28px; background: #2563eb; color: #ffffff; text-decoration: none; font-weight: 700; border-radius: 12px; font-size: 15px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);">
            ⚡ Mở Trang Quản Trị Đơn Hàng
          </a>
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #94a3b8;">
            Hệ thống quản lý tự động Tấn Đạt Smartphone • tandatsmartphone.com
          </p>
        </div>
      </div>
    `;

    // 1. Try sending via Resend API
    let recipientsToRetry: string[] = adminEmail.split(',').map((e: string) => e.trim()).filter(Boolean);

    if (resendKey) {
      const { failed } = await notificationService.sendEmailViaResend(recipientsToRetry, emailSubject, emailHtml);
      recipientsToRetry = failed;
    }

    // 2. Fallback to Nodemailer SMTP for any failed recipients (e.g. non-verified emails in Resend sandbox)
    if (recipientsToRetry.length > 0 && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: { user: smtpUser, pass: smtpPass },
          tls: { rejectUnauthorized: false },
        });

        for (const recipient of recipientsToRetry) {
          await transporter.sendMail({
            from: `"Tấn Đạt Smartphone Hệ Thống" <${smtpUser}>`,
            to: recipient,
            subject: emailSubject,
            html: emailHtml,
          });
          console.log(`✅ [SMTP EMAIL] Đã gửi email thông báo đơn hàng tới Quản trị viên: ${recipient}`);
        }
      } catch (err: any) {
        console.error('❌ [SMTP ERROR] Lỗi gửi email qua SMTP:', err.message);
      }
    }
  },

  // 3. Send Confirmation Email to Customer
  sendOrderEmailCustomer: async (order: OrderNotificationData) => {
    if (!order.customerEmail) return;

    const resendKey = process.env.RESEND_API_KEY;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const itemsHtml = order.items
      .map(
        (i) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${i.product?.name || 'Sản phẩm'}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center;">${i.qty}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold;">${(i.price * i.qty).toLocaleString('vi-VN')} đ</td>
      </tr>`
      )
      .join('');

    const emailSubject = `[Tấn Đạt Smartphone] Xác nhận đơn hàng #${order.id.slice(0, 8).toUpperCase()}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px;">
        <h2 style="color: #2563eb; margin-bottom: 8px;">TẤN ĐẠT SMARTPHONE</h2>
        <p style="color: #64748b; font-size: 13px;">Chợ Phong Xuân, Phong Điền, TP. Huế • Hotline: 093 567 7775</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <h3 style="color: #0f172a;">Cảm ơn quý khách ${order.customerName}!</h3>
        <p>Đơn hàng của quý khách đã được ghi nhận thành công và đang được nhân viên chuẩn bị đóng gói.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <thead>
            <tr style="background: #f8fafc; text-align: left;">
              <th style="padding: 10px;">Sản phẩm</th>
              <th style="padding: 10px; text-align: center;">SL</th>
              <th style="padding: 10px; text-align: right;">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <p style="font-size: 16px; font-weight: bold; color: #dc2626; text-align: right;">
          Tổng thanh toán: ${order.total.toLocaleString('vi-VN')} đ
        </p>
        <p style="font-size: 13px; color: #64748b;">
          Địa chỉ nhận hàng: <b>${order.address}</b><br/>
          Hình thức thanh toán: <b>${order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : order.paymentMethod}</b>
        </p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">
          Mọi thắc mắc vui lòng liên hệ hotline 093 567 7775 để được hỗ trợ nhanh nhất.
        </p>
      </div>
    `;

    // 1. Try sending via Resend API first
    if (resendKey) {
      const { successful } = await notificationService.sendEmailViaResend(order.customerEmail, emailSubject, emailHtml);
      if (successful.length > 0) return;
    }

    // 2. Fallback to SMTP
    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: { user: smtpUser, pass: smtpPass },
          tls: { rejectUnauthorized: false },
        });

        await transporter.sendMail({
          from: `"Tấn Đạt Smartphone" <${smtpUser}>`,
          to: order.customerEmail,
          subject: emailSubject,
          html: emailHtml,
        });
        console.log(`✅ [SMTP EMAIL] Đã gửi email xác nhận đơn hàng tới ${order.customerEmail}`);
      } catch (err: any) {
        console.error('❌ [SMTP ERROR] Lỗi gửi email xác nhận khách:', err.message);
      }
    }
  },

  // Combined Notification Trigger
  notifyNewOrder: async (order: OrderNotificationData) => {
    // Run in background without blocking API response
    Promise.allSettled([
      notificationService.notifyNewOrderTelegram(order),
      notificationService.sendOrderEmailAdmin(order),
      notificationService.sendOrderEmailCustomer(order),
    ]);
  },
};

export default notificationService;

