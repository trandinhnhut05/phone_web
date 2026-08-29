import React from 'react';
import { ShieldCheck, RotateCcw, Award, CheckCircle2, Phone } from 'lucide-react';
import { SEO } from '../components/SEO.js';
import { TanDatLogo } from '../components/Logo.js';

export const WarrantyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SEO
        title="Chính Sách Bảo Hành Dài Hạn — Tấn Đạt Smartphone"
        description="Chính sách bảo hành uy tín, 1 đổi 1 trong 30 ngày và hỗ trợ kỹ thuật trọn đời tại Tấn Đạt Smartphone (Chợ Phong Xuân, Phong Điền, TP. Huế)."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <div className="w-5 h-5 rounded-full bg-white p-0.5 flex items-center justify-center">
              <TanDatLogo className="w-4 h-4" />
            </div>
            <span>BẢO HÀNH DÀI HẠN — AN TÂM TUYỆT ĐỐI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Chính Sách Bảo Hành Tại Tấn Đạt Smartphone
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Với phương châm <b>"Uy Tín — Chất Lượng — Giá Tốt"</b>, chúng tôi luôn nỗ lực đem lại dịch vụ bảo hành tốt nhất cho quý khách.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              <span>1. Chính sách 1 đổi 1 trong 30 ngày</span>
            </h2>
            <p>
              Tất cả các dòng điện thoại smartphone (mới hoặc qua sử dụng) bán ra tại Tấn Đạt Smartphone đều được áp dụng chính sách <b>1 đổi 1 trong vòng 30 ngày đầu tiên</b> nếu máy phát sinh lỗi phần cứng do nhà sản xuất (nguồn, sóng, wifi, màn hình, cảm ứng, camera...).
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>2. Thời gian bảo hành tiêu chuẩn</span>
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><b>Máy mới nguyên hộp (Brand New):</b> Bảo hành 12 tháng phần cứng toàn diện.</li>
              <li><b>Máy qua sử dụng (Like New 99%):</b> Bảo hành 6 - 12 tháng phần cứng.</li>
              <li><b>Dịch vụ Ép kính màn hình:</b> Bảo hành keo, bọt khí, hở viền lên tới 12 tháng.</li>
              <li><b>Thay pin smartphone:</b> Bảo hành 1 đổi 1 trong 6 - 12 tháng nếu pin chai trên 20% hoặc có hiện tượng sập nguồn.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>3. Hỗ trợ phần mềm & vệ sinh máy trọn đời</span>
            </h2>
            <p>
              Khách hàng mua máy hoặc sửa chữa tại cửa hàng được hỗ trợ:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              <li>Cài đặt ứng dụng, nâng cấp hệ điều hành iOS/Android miễn phí.</li>
              <li>Chuyển dữ liệu danh bạ, hình ảnh từ máy cũ sang máy mới miễn phí.</li>
              <li>Vệ sinh loa, chân sạc, khử trùng máy miễn phí bất cứ khi nào ghé cửa hàng.</li>
            </ul>
          </div>

          {/* Contact Box */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900">Cần hỗ trợ bảo hành hoặc tư vấn kỹ thuật?</h4>
              <p className="text-xs text-slate-500 mt-0.5">Địa chỉ: Chợ Phong Xuân, Phong Điền, TP. Huế</p>
            </div>
            <a
              href="tel:0935677775"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>093 567 7775</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
