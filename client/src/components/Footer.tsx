import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Phone, Mail, MapPin, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Chính Hãng 100%</h4>
              <p className="text-xs text-slate-400">Cam kết bảo hành toàn diện</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Giao Hỏa Tốc 2H</h4>
              <p className="text-xs text-slate-400">Miễn phí ship toàn quốc</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">1 Đổi 1 Trong 30 Ngày</h4>
              <p className="text-xs text-slate-400">Nếu phát sinh lỗi nhà SX</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Trả Góp 0%</h4>
              <p className="text-xs text-slate-400">Thủ tục duyệt nhanh trong 5p</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12">
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                PhoneStore
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Hệ thống bán lẻ điện thoại di động chính hãng uy tín số 1 Việt Nam. Trải nghiệm công nghệ đỉnh cao với mức giá và dịch vụ hậu mãi tốt nhất.
            </p>
            <div className="space-y-2 text-sm text-slate-400 pt-2">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Hotline: <b className="text-white">1900 6868</b> (8:00 - 21:30)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Email: contact@phonestore.vn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Sản Phẩm</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/dien-thoai?brand=Apple" className="hover:text-white transition-colors">iPhone Series</Link></li>
              <li><Link to="/dien-thoai?brand=Samsung" className="hover:text-white transition-colors">Samsung Galaxy</Link></li>
              <li><Link to="/dien-thoai?brand=Xiaomi" className="hover:text-white transition-colors">Xiaomi Flagship</Link></li>
              <li><Link to="/dien-thoai?brand=OPPO" className="hover:text-white transition-colors">OPPO Reno & Find</Link></li>
              <li><Link to="/dien-thoai" className="hover:text-white transition-colors">Tất cả điện thoại</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Chính Sách</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Giao hàng & Thanh toán</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bảo mật thông tin</a></li>
              <li><Link to="/tra-cuu-don-hang" className="hover:text-white transition-colors">Tra cứu đơn hàng</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Tin Tức & Blog</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/blog" className="hover:text-white transition-colors">Tin công nghệ mới</Link></li>
              <li><Link to="/blog?category=Đánh giá" className="hover:text-white transition-colors">Đánh giá điện thoại</Link></li>
              <li><Link to="/blog?category=Mẹo hay" className="hover:text-white transition-colors">Thủ thuật & Mẹo hay</Link></li>
              <li><Link to="/blog?category=Tư vấn" className="hover:text-white transition-colors">Tư vấn chọn mua</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} PhoneStore. Tất cả quyền được bảo lưu. Thiết kế & xây dựng trên nền tảng React 19 + TypeScript + Tailwind CSS v4.</p>
        </div>
      </div>
    </footer>
  );
};
