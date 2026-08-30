import React from 'react';
import { Lock, ShieldCheck, UserCheck, EyeOff } from 'lucide-react';
import { SEO } from '../components/SEO.js';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <SEO
        title="Chính Sách Bảo Mật Thông Tin — Tấn Đạt Smartphone"
        description="Cam kết bảo mật tuyệt đối thông tin cá nhân và dữ liệu của khách hàng tại Tấn Đạt Smartphone."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase">
            <Lock className="w-3.5 h-3.5" />
            <span>Bảo vệ quyền riêng tư</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            CHÍNH SÁCH BẢO MẬT THÔNG TIN
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Tấn Đạt Smartphone cam kết tôn trọng và bảo mật tuyệt đối mọi thông tin cá nhân của khách hàng khi truy cập và mua hàng.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              1. Mục đích thu thập thông tin
            </h2>
            <p>Chúng tôi chỉ thu thập các thông tin cần thiết phục vụ cho quá trình mua sắm và bảo hành, bao gồm:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Họ và tên, Số điện thoại liên hệ để xác nhận đơn và giao hàng.</li>
              <li>Địa chỉ nhận hàng (Tỉnh/Thành, Huyện, Xã, Thôn/Đường).</li>
              <li>Địa chỉ Email để gửi thông báo trạng thái đơn hàng và hóa đơn điện tử.</li>
              <li>Lịch sử mua máy và thời hạn bảo hành để tra cứu trực tuyến.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              2. Phạm vi sử dụng thông tin
            </h2>
            <p>Thông tin thu thập được chỉ sử dụng trong các trường hợp sau:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Xử lý và vận chuyển đơn hàng tới tận tay khách hàng.</li>
              <li>Thực hiện quyền lợi bảo hành, sửa chữa, thay thế linh kiện theo cam kết.</li>
              <li>Gửi thông báo về các chương trình ưu đãi, quà tặng tri ân khách hàng thân thiết.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              3. Cam kết bảo mật tuyệt đối
            </h2>
            <p>
              Tấn Đạt Smartphone <b>tuyệt đối không</b> bán, chia sẻ hoặc tiết lộ thông tin của quý khách cho bất kỳ bên thứ ba nào vì mục đích thương mại. Toàn bộ thông tin được lưu trữ trên máy chủ bảo mật có mã hóa SSL/TLS tiêu chuẩn cao.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              4. Quyền của khách hàng đối với thông tin cá nhân
            </h2>
            <p>
              Khách hàng có quyền truy cập vào mục <b>"Tài khoản của tôi"</b> để kiểm tra, cập nhật hoặc yêu cầu chúng tôi xóa bỏ thông tin cá nhân khỏi hệ thống bất kỳ lúc nào qua hotline <b>093 567 7775</b>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
