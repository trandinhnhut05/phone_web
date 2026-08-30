import React from 'react';
import { CreditCard, Banknote, QrCode, ShieldCheck, AlertCircle, Phone } from 'lucide-react';
import { SEO } from '../components/SEO.js';

export const PaymentPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <SEO
        title="Quy Định & Hình Thức Thanh Toán — Tấn Đạt Smartphone"
        description="Chi tiết các phương thức thanh toán tiền mặt COD, chuyển khoản ngân hàng tại Tấn Đạt Smartphone."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Thanh toán tiện lợi & An toàn</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            HÌNH THỨC & QUY ĐỊNH THANH TOÁN
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Tấn Đạt Smartphone hỗ trợ nhiều hình thức thanh toán linh hoạt, minh bạch và bảo đảm an toàn tuyệt đối cho người mua.
          </p>
        </div>

        <div className="space-y-6">
          {/* Method 1: COD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  1. Thanh toán tiền mặt khi nhận hàng (COD)
                </h2>
                <span className="text-xs text-emerald-600 font-semibold">Khuyên dùng cho khách hàng đặt mua online</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Khách hàng được quyền <b>đồng kiểm tra máy</b> trước khi thanh toán. Đúng mẫu mã, phụ kiện, màu sắc và tình trạng cam kết thì quý khách mới gửi tiền mặt cho bưu tá giao hàng.
            </p>
          </div>

          {/* Method 2: Direct Banking */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  2. Chuyển khoản Ngân hàng Trực tiếp
                </h2>
                <span className="text-xs text-slate-500">Dành cho khách hàng muốn thanh toán trước hoặc đặt cọc giữ máy</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 space-y-2">
              <p><b>Ngân hàng:</b> MB Bank (Ngân hàng Quân Đội)</p>
              <p><b>Số tài khoản:</b> <span className="font-mono font-bold text-blue-600 text-sm">0935677775</span></p>
              <p><b>Chủ tài khoản:</b> <span className="uppercase font-bold text-slate-900">TẤN ĐẠT SMARTPHONE</span></p>
              <p><b>Nội dung chuyển khoản:</b> <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">TANDAT [Số điện thoại của bạn]</span></p>
            </div>
            <p className="text-xs text-slate-500 italic">
              * Lưu ý: Cổng thanh toán quét mã QR online tự động đang trong thời gian bảo trì & nâng cấp. Quý khách vui lòng chuyển khoản theo số tài khoản chính chủ nêu trên.
            </p>
          </div>

          {/* Method 3: In-Store Payment */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  3. Thanh toán trực tiếp tại Cửa hàng
                </h2>
                <span className="text-xs text-slate-500">Chợ Phong Xuân, Phong Điền, TP. Huế</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Quý khách có thể ghé trực tiếp cửa hàng Tấn Đạt để trải nghiệm máy thực tế, test chức năng và thanh toán bằng tiền mặt hoặc chuyển khoản QR trực tiếp tại quầy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPolicyPage;
