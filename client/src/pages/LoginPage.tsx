import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, User as UserIcon, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
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
          toast.success('Đăng ký tài khoản thành công!');
          navigate(res.user.role === 'ADMIN' ? '/admin' : from, { replace: true });
        }
      } else {
        const res = await api.login({ email, password });
        if (res.success && res.token && res.user) {
          login(res.token, res.user);
          toast.success(`Chào mừng trở lại, ${res.user.name}!`);
          navigate(res.user.role === 'ADMIN' ? '/admin' : from, { replace: true });
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Đã xảy ra lỗi khi xác thực');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setIsRegister(false);
    setEmail('admin@phoneweb.com');
    setPassword('admin123');
    toast.success('Đã điền thông tin tài khoản Admin!');
  };

  const handleFillDemoCustomer = () => {
    setIsRegister(false);
    setEmail('khachhang@gmail.com');
    setPassword('user123');
    toast.success('Đã điền thông tin tài khoản Khách hàng mẫu!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-16 flex items-center justify-center px-4 sm:px-6">
      <SEO title={isRegister ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập — Tấn Đạt Smartphone'} />

      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-3xl bg-white p-2 flex items-center justify-center shadow-xl shadow-blue-500/20">
              <TanDatLogo className="w-12 h-12" />
            </div>
            <div className="mt-1">
              <span className="text-2xl font-black text-white tracking-tight">
                TẤN ĐẠT SMARTPHONE
              </span>
              <span className="block text-[11px] text-blue-400 font-bold uppercase tracking-wider">
                Chợ Phong Xuân, Phong Điền, TP. Huế
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 mt-2">
            {isRegister ? 'Tạo tài khoản mới để theo dõi đơn hàng & tích điểm' : 'Đăng nhập vào hệ thống quản lý & mua hàng'}
          </p>
        </div>

        {/* Demo Fast Logins */}
        <div className="bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700/60 mb-6 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Tài khoản thử nghiệm nhanh (1-Click):</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="px-3 py-2 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 rounded-xl text-xs font-bold transition-all text-left"
            >
              👑 Quản trị viên (Admin)
            </button>
            <button
              type="button"
              onClick={handleFillDemoCustomer}
              className="px-3 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 rounded-xl text-xs font-bold transition-all text-left"
            >
              👤 Khách hàng (User)
            </button>
          </div>
        </div>

        {/* Auth Box */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 space-y-6">
          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                !isRegister
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                isRegister
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Tạo tài khoản
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
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
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
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
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
                  placeholder="admin@phoneweb.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                'Đang xử lý...'
              ) : (
                <>
                  <span>{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</span>
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
