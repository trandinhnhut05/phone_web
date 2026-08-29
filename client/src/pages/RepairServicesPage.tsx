import React from 'react';
import { Wrench, Phone, MessageCircle, ShieldCheck, Clock, CheckCircle2, Smartphone, Cpu, BatteryCharging } from 'lucide-react';
import { SEO } from '../components/SEO.js';
import { TanDatLogo } from '../components/Logo.js';

export const RepairServicesPage: React.FC = () => {
  const services = [
    {
      title: 'Ép Kính Smartphone Lấy Liền',
      icon: Smartphone,
      desc: 'Công nghệ ép kính hút chân không tự động, giữ lại màn hình hiển thị và cảm ứng gốc của máy. Áp dụng cho iPhone, Samsung, Xiaomi, OPPO, Realme...',
      time: '30 - 60 Phút',
      warranty: 'Bảo hành keo bọt 12 tháng',
    },
    {
      title: 'Thay Màn Hình Nguyên Bộ',
      icon: Cpu,
      desc: 'Thay màn hình zin chính hãng, hiển thị sắc nét, cảm ứng mượt mà. Hỗ trợ thay thế cho tất cả các dòng smartphone trên thị trường.',
      time: '30 Phút',
      warranty: 'Bảo hành 3 - 6 tháng',
    },
    {
      title: 'Thay Pin Chính Hãng Dung Lượng Chuẩn',
      icon: BatteryCharging,
      desc: 'Giải quyết triệt để tình trạng pin chai, phồng pin, sập nguồn đột ngột. Cam kết cell pin chất lượng cao, an toàn tuyệt đối.',
      time: '15 - 30 Phút',
      warranty: 'Bảo hành 1 đổi 1 6 - 12 tháng',
    },
    {
      title: 'Sửa Chữa Phần Cứng & Mainboard',
      icon: Wrench,
      desc: 'Xử lý các lỗi mất nguồn, máy rơi nước, mất sóng, không nhận sạc, mất âm thanh, lỗi camera, thay chân sạc, thay loa mic.',
      time: 'Kiểm tra & báo giá trước',
      warranty: 'Bảo hành linh kiện thay thế',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <SEO
        title="Dịch Vụ Ép Kính & Sửa Chữa Smartphone — Tấn Đạt Smartphone Huế"
        description="Tấn Đạt Smartphone: Dịch vụ ép kính màn hình, thay màn hình, thay pin, sửa chữa phần cứng lấy liền tại Chợ Phong Xuân, Phong Điền, TP. Huế. Hotline: 093 567 7775."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <div className="w-5 h-5 rounded-full bg-white p-0.5 flex items-center justify-center">
              <TanDatLogo className="w-4 h-4" />
            </div>
            <span>TẤN ĐẠT SMARTPHONE — CHUYÊN GIA SỬA CHỮA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            ÉP KÍNH & SỬA CHỮA SMARTPHONE LẤY LIỀN
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Hệ thống máy móc hiện đại tại <b>Chợ Phong Xuân, Phong Điền, TP. Huế</b>. Khách hàng theo dõi trực tiếp quá trình sửa chữa, đảm bảo minh bạch và an tâm tuyệt đối.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="tel:0935677775"
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>Hotline Báo Giá: 093 567 7775</span>
            </a>
            <a
              href="https://zalo.me/0935677775"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Gửi Ảnh Báo Giá Qua Zalo</span>
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{srv.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{srv.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Thời gian: <b>{srv.time}</b></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{srv.warranty}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Steps */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Quy Trình Sửa Chữa Tại Tấn Đạt</h2>
            <p className="text-xs sm:text-sm text-slate-400">Nhanh chóng — Chuẩn xác — Minh bạch 100%</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-bold text-sm text-white">Tiếp Nhận & Kiểm Tra</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kỹ thuật viên kiểm tra toàn diện tình trạng máy trước mặt khách hàng.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-bold text-sm text-white">Tư Vấn & Báo Giá</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Báo đúng lỗi, đúng giá, cam kết không phát sinh phụ phí bất ngờ.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-bold text-sm text-white">Tiến Hành Sửa Chữa</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ép kính bằng máy hút chân không hoặc thay linh kiện chính hãng lấy ngay.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm">
                4
              </div>
              <h4 className="font-bold text-sm text-white">Bàn Giao & Bảo Hành</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Khách kiểm tra lại toàn bộ chức năng, viết phiếu bảo hành chu đáo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
