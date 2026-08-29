import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Smartphone,
  Search,
  ShoppingCart,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Phone,
  MapPin,
  Wrench,
  Package,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useCart } from '../context/CartContext.js';

export const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dien-thoai?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Điện thoại', path: '/dien-thoai' },
    { name: 'iPhone', path: '/dien-thoai?brand=Apple' },
    { name: 'Samsung', path: '/dien-thoai?brand=Samsung' },
    { name: 'Xiaomi', path: '/dien-thoai?brand=Xiaomi' },
    { name: 'OPPO', path: '/dien-thoai?brand=OPPO' },
    { name: 'Sửa Chữa & Ép Kính', path: '/dich-vu-sua-chua', highlight: true },
    { name: 'Tin Công Nghệ', path: '/blog' },
    { name: 'Tra cứu đơn hàng', path: '/tra-cuu-don-hang' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner with Store Credentials */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-medium">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-200 shrink-0" />
              <span>Chợ Phong Xuân, Phong Điền, TP. Huế</span>
            </span>
            <span className="hidden md:inline text-blue-200">|</span>
            <span className="hidden md:inline">Uy Tín • Chất Lượng • Giá Tốt • Bảo Hành Dài Hạn</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:0935677775"
              className="flex items-center gap-1.5 font-bold hover:text-amber-300 transition-colors bg-white/10 px-2.5 py-0.5 rounded-full"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>Hotline: 093 567 7775</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo TĐ TẤN ĐẠT SMARTPHONE */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 flex flex-col items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform border border-blue-400/40">
              <span className="text-xs font-black tracking-tighter leading-none text-amber-300">TĐ</span>
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black tracking-tight flex items-baseline gap-1">
                <span className="text-slate-900">TẤN ĐẠT</span>
                <span className="text-blue-600 text-sm sm:text-base font-extrabold uppercase">SMARTPHONE</span>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold block -mt-1 tracking-tight">
                MUA BÁN • SỬA CHỮA • ÉP KÍNH
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md relative"
          >
            <input
              type="text"
              placeholder="Tìm kiếm điện thoại, giá tốt tại Tấn Đạt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-sm rounded-full border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Link
              to="/gio-hang"
              className="relative p-2.5 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
              title="Giỏ hàng"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-full transition-all border border-slate-200"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Đăng nhập với</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                      {isAdmin && (
                        <span className="inline-block mt-1 text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                          Quản trị viên
                        </span>
                      )}
                    </div>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        Trang Quản trị (Admin)
                      </Link>
                    )}

                    <Link
                      to="/tra-cuu-don-hang"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Package className="w-4 h-4 text-slate-500" />
                      Đơn hàng của tôi
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-full shadow-sm transition-all"
              >
                <UserIcon className="w-4 h-4" />
                <span>Đăng nhập</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 py-2 border-t border-slate-100 text-sm font-semibold overflow-x-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  link.highlight
                    ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 font-bold'
                    : isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/70'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 text-sm rounded-xl outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          <div className="space-y-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  link.highlight
                    ? 'bg-amber-50 text-amber-800 font-bold'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-indigo-700 bg-indigo-50"
              >
                Trang Quản trị (Admin)
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
