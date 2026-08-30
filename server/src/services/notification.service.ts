import nodemailer from 'nodemailer';

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

  // 2. Send Confirmation Email to Customer
  sendOrderEmailCustomer: async (order: OrderNotificationData) => {
    if (!order.customerEmail) return;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser) {
      console.log(`ℹ️ [EMAIL SERVICE] Đã mô phỏng gửi email xác nhận đơn hàng tới ${order.customerEmail}`);
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
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
      notificationService.sendOrderEmailCustomer(order),
    ]);
  },
};
