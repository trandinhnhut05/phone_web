import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FileText,
  Home,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Settings,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { TanDatLogo } from '../../components/Logo.js';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-400">Đang xác thực quyền Admin...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Yêu Cầu Quyền Quản Trị</h2>
          <p className="text-sm text-slate-400">
            Bạn cần đăng nhập bằng tài khoản Quản trị viên (Admin) để truy cập trang này.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/admin/login"
              className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all"
            >
              Đăng nhập Cổng Quản trị Admin
            </Link>
            <Link
              to="/"
              className="py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-xl transition-all"
            >
              Quay về trang chủ cửa hàng
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Tổng quan (Dashboard)', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Quản lý Sản phẩm', path: '/admin/products', icon: Package },
    { label: 'Quản lý Đơn hàng', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Quản lý Tài khoản', path: '/admin/users', icon: Users },
    { label: 'Quản lý Tin tức & Blog', path: '/admin/blog', icon: FileText },
    { label: 'Cài đặt Cửa hàng', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md shrink-0">
              <TanDatLogo className="w-8 h-8" />
            </div>
            <div>
              <span className="text-base font-black text-white tracking-tight">TẤN ĐẠT</span>
              <span className="block text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Admin Center
              </span>
            </div>
          </Link>
        </div>

        {/* Menu Navigation */}
        <nav className="p-4 space-y-1.5 flex-1">
          {menuItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Storefront Link & Admin info */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-blue-400" />
              <span>Xem cửa hàng Tấn Đạt</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>

          <div className="flex items-center justify-between px-2 pt-2">
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              title="Đăng xuất Quản trị"
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
