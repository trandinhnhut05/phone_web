import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Award, RotateCcw, Wrench, MessageCircle } from 'lucide-react';
import { TanDatLogo } from './Logo.js';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Values from Store Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">UY TÍN</h4>
              <p className="text-xs text-slate-400">Chất lượng hàng đầu</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">GIÁ TỐT NHẤT</h4>
              <p className="text-xs text-slate-400">Cạnh tranh thị trường</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">BẢO HÀNH DÀI HẠN</h4>
              <p className="text-xs text-slate-400">Hỗ trợ trọn đời máy</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">ÉP KÍNH & SỬA CHỮA</h4>
              <p className="text-xs text-slate-400">Lấy ngay trong ngày</p>
            </div>
          </div>
        </div>

        {/* Main Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12">
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md shrink-0">
                <TanDatLogo className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  TẤN ĐẠT SMARTPHONE
                </span>
                <span className="text-[10px] text-blue-400 block font-semibold uppercase">
                  Mua Bán • Sửa Chữa • Ép Kính
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Cửa hàng điện thoại <b>Tấn Đạt Smartphone</b> — Điểm đến tin cậy tại Huế chuyên cung cấp các dòng smartphone chính hãng, dịch vụ sửa chữa chuyên sâu và ép kính công nghệ cao.
            </p>

            <div className="space-y-2.5 text-sm text-slate-400 pt-2">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hotline / Zalo: <a href="tel:0935677775" className="text-white font-bold hover:text-amber-400 transition-colors">093 567 7775</a> (8:00 - 21:00)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <span>Địa chỉ: <b className="text-white">Chợ Phong Xuân, Huyện Phong Điền, TP. Huế</b></span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Điện Thoại</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/dien-thoai?brand=Apple" className="hover:text-white transition-colors">iPhone Chính Hãng</Link></li>
              <li><Link to="/dien-thoai?brand=Samsung" className="hover:text-white transition-colors">Samsung Galaxy</Link></li>
              <li><Link to="/dien-thoai?brand=Xiaomi" className="hover:text-white transition-colors">Xiaomi Giá Tốt</Link></li>
              <li><Link to="/dien-thoai?brand=OPPO" className="hover:text-white transition-colors">OPPO Selfie Đẹp</Link></li>
              <li><Link to="/dien-thoai" className="hover:text-white transition-colors">Tất cả sản phẩm</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Dịch Vụ & Bảo Hành</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/dich-vu-sua-chua" className="hover:text-white transition-colors font-medium text-amber-300">Ép kính Smartphone lấy liền</Link></li>
              <li><Link to="/dich-vu-sua-chua" className="hover:text-white transition-colors">Thay màn hình, thay pin</Link></li>
              <li><Link to="/chinh-sach-bao-hanh" className="hover:text-white transition-colors">Chính sách bảo hành dài hạn</Link></li>
              <li><Link to="/tra-cuu-don-hang" className="hover:text-white transition-colors">Tra cứu tiến độ đơn hàng</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Kết Nối Với Chúng Tôi</h4>
            <div className="space-y-3">
              <a
                href="https://zalo.me/0935677775"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Nhắn tin Zalo: 0935677775</span>
              </a>
              <a
                href="tel:0935677775"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-slate-900 transition-all text-xs font-bold"
              >
                <Phone className="w-4 h-4" />
                <span>Gọi tư vấn: 093 567 7775</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} <b>TẤN ĐẠT SMARTPHONE</b> — Chợ Phong Xuân, Phong Điền, TP. Huế. Uy tín tạo nên thương hiệu.</p>
        </div>
      </div>
    </footer>
  );
};
