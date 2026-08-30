import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, LayoutDashboard, Package, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

export const AdminQuickBar: React.FC = () => {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 px-4 py-1.5 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-200">Chế độ Quản trị viên:</span>
          <span className="hidden sm:inline text-slate-400">Bạn đang duyệt dưới tư cách Admin ({user.name})</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="hidden md:inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors"
          >
            <Package className="w-3.5 h-3.5 text-blue-400" />
            <span>Sản phẩm</span>
          </Link>
          <Link
            to="/admin/orders"
            className="hidden md:inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Đơn hàng</span>
          </Link>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-xs"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Vào Dashboard Admin</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminQuickBar;
