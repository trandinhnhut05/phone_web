import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { api } from '../../services/api.js';
import { SEO } from '../../components/SEO.js';
import { TanDatLogo } from '../../components/Logo.js';
import toast from 'react-hot-toast';

export const AdminLoginPage: React.FC = () => {
  const { user, isAdmin, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const unauthorizedAttempt = (location.state as any)?.unauthorized;

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await api.login({ email, password });
      if (res.success && res.token && res.user) {
        if (res.user.role !== 'ADMIN') {
          setErrorMessage(
            'Tài khoản này không có quyền Quản trị viên (Admin). Vui lòng đăng nhập qua Cổng Khách hàng.'
          );
          toast.error('Từ chối truy cập: Tài khoản không có quyền Admin');
          return;
        }

        login(res.token, res.user);
        toast.success(`Xin chào Quản trị viên ${res.user.name}!`);
        navigate('/admin', { replace: true });
      } else {
        setErrorMessage(res.message || 'Email hoặc mật khẩu không chính xác');
        toast.error(res.message || 'Đăng nhập thất bại');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Đã xảy ra lỗi khi kết nối máy chủ');
      toast.error(err.message || 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      <SEO title="Admin Portal — Tấn Đạt Smartphone" />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về Cửa hàng Khách</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SECURE SYSTEM v2.0</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-6">
          {/* Brand & Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-3 ring-4 ring-blue-500/20">
              <TanDatLogo className="w-full h-full" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Management Center</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                CỔNG QUẢN TRỊ VIÊN
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Khu vực kiểm soát sản phẩm, đơn hàng và hệ thống Tấn Đạt
              </p>
            </div>
          </div>

          {/* Unauthorized Alert if redirected */}
          {(unauthorizedAttempt || errorMessage) && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Từ chối truy cập</p>
                <p className="text-xs text-red-300/90 mt-0.5">
                  {errorMessage ||
                    'Bạn cần đăng nhập bằng tài khoản có quyền Quản trị viên (ADMIN) để truy cập trang quản lý.'}
                </p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Email Quản trị <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="admin@phoneweb.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Mật khẩu Quản trị <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang xác thực bảo mật...</span>
                  </>
                ) : (
                  <>
                    <span>Đăng Nhập Quản Trị</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-3 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-400">
                Bạn là khách hàng mua sắm?{' '}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-bold underline">
                  Đăng nhập Cổng Khách hàng
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="relative z-10 py-4 text-center text-[11px] text-slate-600">
        © 2026 Tấn Đạt Smartphone • Hệ thống Quản trị & Điều hành Nội bộ
      </div>
    </div>
  );
};

export default AdminLoginPage;
