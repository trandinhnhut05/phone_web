import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Heart,
  Gift,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { api } from '../services/api.js';
import { SEO } from '../components/SEO.js';
import { TanDatLogo } from '../components/Logo.js';
import toast from 'react-hot-toast';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        const res = await api.register({ email, password, name, phone });
        if (res.success && res.token && res.user) {
          login(res.token, res.user);
          toast.success('Đăng ký tài khoản khách hàng thành công!');
          navigate(from, { replace: true });
        } else {
          toast.error(res.message || 'Đăng ký không thành công');
        }
      } else {
        const res = await api.login({ email, password });
        if (res.success && res.token && res.user) {
          login(res.token, res.user);
          toast.success(`Chào mừng trở lại, ${res.user.name}!`);

          // If user is Admin and logs in here, redirect to Admin or requested page
          if (res.user.role === 'ADMIN') {
            navigate('/admin', { replace: true });
          } else {
            navigate(from === '/login' ? '/tai-khoan' : from, { replace: true });
          }
        } else {
          toast.error(res.message || 'Email hoặc mật khẩu không chính xác');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Đã xảy ra lỗi khi xác thực');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/60 via-slate-50 to-slate-100 py-12 flex items-center justify-center px-4 sm:px-6">
      <SEO title={isRegister ? 'Tạo Tài Khoản Mua Hàng — Tấn Đạt Smartphone' : 'Đăng Nhập Khách Hàng — Tấn Đạt Smartphone'} />

      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 rounded-3xl bg-white p-2 flex items-center justify-center shadow-xl shadow-blue-500/10 border border-slate-200 group-hover:scale-105 transition-transform">
              <TanDatLogo className="w-12 h-12" />
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                TẤN ĐẠT SMARTPHONE
              </span>
              <span className="block text-[11px] text-blue-600 font-bold uppercase tracking-wider">
                Cổng Khách Hàng Thành Viên
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-500 mt-2">
            {isRegister
              ? 'Tạo tài khoản để nhận ưu đãi thành viên, bảo hành & theo dõi đơn hàng'
              : 'Đăng nhập để tra cứu lịch sử mua hàng, bảo hành & yêu thích'}
          </p>
        </div>

        {/* Benefits bar */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center justify-center gap-1 shadow-xs">
            <ShoppingBag className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold text-slate-700">Đơn hàng tiện lợi</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center justify-center gap-1 shadow-xs">
            <Gift className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-bold text-slate-700">Tích điểm & Quà</span>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center justify-center gap-1 shadow-xs">
            <Heart className="w-4 h-4 text-rose-500" />
            <span className="text-[10px] font-bold text-slate-700">Lưu sản phẩm thích</span>
          </div>
        </div>

        {/* Auth Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                !isRegister
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isRegister
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Đăng ký tài khoản
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="0935677775"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="khachhang@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                'Đang xử lý...'
              ) : (
                <>
                  <span>{isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
