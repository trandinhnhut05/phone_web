import React from 'react';
import { ShieldCheck, RefreshCw, CheckCircle2, Clock, HelpCircle, Phone } from 'lucide-react';
import { SEO } from '../components/SEO.js';

export const ReturnPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <SEO
        title="Chính Sách Đổi Trả & Hoàn Tiền — Tấn Đạt Smartphone"
        description="Quy định đổi trả 1 đổi 1 trong 30 ngày, bảo hành dài hạn 12 tháng tại Tấn Đạt Smartphone Phong Điền Huế."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Cam kết quyền lợi khách hàng</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            CHÍNH SÁCH ĐỔI TRẢ & BẢO HÀNH
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Tấn Đạt Smartphone luôn đặt sự hài lòng và an tâm của khách hàng lên hàng đầu với chính sách đổi trả minh bạch.
          </p>
        </div>

        {/* 3 Core Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">30 Ngày 1 Đổi 1</h3>
            <p className="text-xs text-slate-500">Đổi ngay máy mới cùng loại nếu phát sinh lỗi phần cứng do nhà sản xuất.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Bảo Hành 12 Tháng</h3>
            <p className="text-xs text-slate-500">Bảo hành toàn diện phần cứng, hỗ trợ nâng cấp phần mềm trọn đời.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Kiểm Hàng Trước</h3>
            <p className="text-xs text-slate-500">Khách mua online được kiểm tra máy, đúng sản phẩm mới thanh toán.</p>
          </div>
        </div>

        {/* Policy Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              1. Điều kiện áp dụng đổi trả
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Sản phẩm còn nguyên tem bảo hành của <b>Tấn Đạt Smartphone</b> hoặc nhà sản xuất.</li>
              <li>Thân máy không có dấu hiệu bị va đập, nứt vỡ, móp méo, vào nước hoặc ẩm ướt nghiêm trọng do người dùng.</li>
              <li>Còn đầy đủ phụ kiện, hộp (đối với máy mới Fullbox), quà tặng kèm theo (nếu có).</li>
              <li>Có phiếu bảo hành hoặc số điện thoại tra cứu đơn hàng trên hệ thống.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              2. Quy trình đổi trả nhanh trong 3 bước
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-black text-blue-600 text-base block mb-1">Bước 1: Liên hệ</span>
                Gọi hotline <b>093 567 7775</b> hoặc mang máy trực tiếp tới Chợ Phong Xuân, Phong Điền, TP. Huế.
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-black text-blue-600 text-base block mb-1">Bước 2: Kiểm tra</span>
                Kỹ thuật viên Tấn Đạt kiểm tra tình trạng máy và xác nhận lỗi phần cứng trong 15-30 phút.
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-black text-blue-600 text-base block mb-1">Bước 3: Đổi máy</span>
                Nhận máy đổi mới ngay lập tức hoặc hoàn tiền theo thỏa thuận nếu hết máy cùng phân khúc.
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              3. Trường hợp không hỗ trợ đổi trả
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Máy bị khóa tài khoản bảo mật (iCloud, Google Account, Knox) mà khách hàng không cung cấp được mật khẩu.</li>
              <li>Hết thời hạn 30 ngày đổi trả theo quy định (chuyển sang chế độ bảo hành sửa chữa miễn phí theo gói 12 tháng).</li>
            </ul>
          </section>

          {/* Contact Support CTA */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-base">Cần hỗ trợ kỹ thuật hoặc bảo hành ngay?</h4>
              <p className="text-xs text-blue-100 mt-0.5">Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc.</p>
            </div>
            <a
              href="tel:0935677775"
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Gọi 093 567 7775</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
