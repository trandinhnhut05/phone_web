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

  // 2. Send New Order Alert Email to Admin
  sendOrderEmailAdmin: async (order: OrderNotificationData) => {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const adminEmail = process.env.ADMIN_EMAIL || smtpUser;

    if (!smtpUser || !smtpPass || !adminEmail) {
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const itemsHtml = order.items
        .map(
          (i) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">${i.product?.name || 'Sản phẩm'}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center;">${i.qty}</td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold; color: #2563eb;">${(i.price * i.qty).toLocaleString('vi-VN')} đ</td>
        </tr>`
        )
        .join('');

      await transporter.sendMail({
        from: `"Tấn Đạt Smartphone Hệ Thống" <${smtpUser}>`,
        to: adminEmail,
        subject: `🔔 [ĐƠN HÀNG MỚI] #${order.id.slice(0, 8).toUpperCase()} - ${order.customerName} (${order.total.toLocaleString('vi-VN')} đ)`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #cbd5e1; border-radius: 16px; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 16px 20px; border-radius: 12px; color: white; margin-bottom: 20px;">
              <h2 style="margin: 0; font-size: 20px;">🎉 CÓ ĐƠN HÀNG MỚI CẦN XỬ LÝ!</h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Mã đơn: #${order.id.slice(0, 8).toUpperCase()}</p>
            </div>

            <div style="background-color: #f8fafc; padding: 16px; border-radius: 12px; margin-bottom: 20px; font-size: 14px; line-height: 1.6;">
              <p style="margin: 4px 0;">👤 <b>Khách hàng:</b> ${order.customerName}</p>
              <p style="margin: 4px 0;">📞 <b>Số điện thoại:</b> <a href="tel:${order.customerPhone}" style="color: #2563eb; font-weight: bold; font-size: 16px;">${order.customerPhone}</a></p>
              ${order.customerEmail ? `<p style="margin: 4px 0;">✉️ <b>Email khách:</b> ${order.customerEmail}</p>` : ''}
              <p style="margin: 4px 0;">📍 <b>Địa chỉ nhận hàng:</b> ${order.address}</p>
              <p style="margin: 4px 0;">💳 <b>Hình thức:</b> <b>${order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : order.paymentMethod}</b></p>
              ${order.note ? `<p style="margin: 4px 0; color: #d97706;">📝 <b>Ghi chú:</b> <i>${order.note}</i></p>` : ''}
            </div>

            <h4 style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; color: #64748b;">Chi tiết sản phẩm đặt mua:</h4>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <thead>
                <tr style="background: #f1f5f9; text-align: left;">
                  <th style="padding: 10px;">Sản phẩm</th>
                  <th style="padding: 10px; text-align: center;">SL</th>
                  <th style="padding: 10px; text-align: right;">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="padding: 12px; background: #eff6ff; border-radius: 10px; text-align: right; font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 20px;">
              TỔNG DOANH THU: <span style="color: #dc2626;">${order.total.toLocaleString('vi-VN')} đ</span>
            </div>

            <div style="text-align: center;">
              <a href="http://localhost:5173/admin/orders" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 10px; font-size: 14px;">
                Mở Trang Quản Trị Đơn Hàng
              </a>
            </div>
          </div>
        `,
      });
      console.log(`✅ [EMAIL] Đã gửi email thông báo đơn hàng mới tới Quản trị viên: ${adminEmail}`);
    } catch (err: any) {
      console.error('❌ [EMAIL ADMIN ERROR] Lỗi gửi email thông báo đơn mới:', err.message);
    }
  },

  // 3. Send Confirmation Email to Customer
  sendOrderEmailCustomer: async (order: OrderNotificationData) => {
    if (!order.customerEmail) return;

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

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

      await transporter.sendMail({
        from: `"Tấn Đạt Smartphone" <${smtpUser}>`,
        to: order.customerEmail,
        subject: `[Tấn Đạt Smartphone] Xác nhận đơn hàng #${order.id.slice(0, 8).toUpperCase()}`,
        html: `
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
        `,
      });
      console.log(`✅ [EMAIL] Đã gửi email xác nhận đơn hàng tới ${order.customerEmail}`);
    } catch (err: any) {
      console.error('❌ [EMAIL ERROR] Lỗi gửi email xác nhận:', err.message);
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

