import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User as UserIcon,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Phone,
  Mail,
  Lock,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import { api } from '../services/api.js';
import { SEO } from '../components/SEO.js';
import toast from 'react-hot-toast';

export const CustomerProfilePage: React.FC = () => {
  const { user, isAdmin, logout, refreshUser, loading: authLoading } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Profile form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: { pathname: '/tai-khoan' } } });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await api.getMyOrders();
      if (res.success && res.data) {
        setOrders(res.data);
      }
    } catch {
      // ignore
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);

    try {
      const payload: any = { name, phone };
      if (newPassword.trim()) {
        payload.password = newPassword.trim();
      }

      const res = await api.updateProfile(payload);
      if (res.success) {
        toast.success('Cập nhật thông tin thành công!');
        setNewPassword('');
        await refreshUser();
      } else {
        toast.error(res.message || 'Cập nhật không thành công');
      }
    } catch (err: any) {
      toast.error(err.message || 'Đã xảy ra lỗi khi cập nhật');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" />
            Chờ xác nhận
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <Package className="w-3.5 h-3.5" />
            Đang đóng gói
          </span>
        );
      case 'SHIPPED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
            <Truck className="w-3.5 h-3.5" />
            Đang giao hàng
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Đã giao thành công
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            <XCircle className="w-3.5 h-3.5" />
            Đã huỷ
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <SEO title={`Tài Khoản ${user.name} — Tấn Đạt Smartphone`} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb / Top Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">{user.name}</h1>
                {isAdmin && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                    Quản trị viên
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Trang Quản Trị (Admin)</span>
              </Link>
            )}
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar Menu */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-xs space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Đơn hàng của tôi</span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'wishlist'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5" />
                  <span>Sản phẩm yêu thích</span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {wishlist.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserIcon className="w-5 h-5" />
                  <span>Thông tin tài khoản</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-5 text-white shadow-xs">
              <h3 className="text-sm font-bold mb-1">Cần hỗ trợ đơn hàng?</h3>
              <p className="text-xs text-slate-300 mb-3">
                Liên hệ ngay hotline Tấn Đạt Smartphone để được giải đáp 24/7.
              </p>
              <a
                href="tel:0935677775"
                className="block text-center py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-colors"
              >
                Hotline: 093 567 7775
              </a>
            </div>
          </div>

          {/* Right Main Content Panel */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Lịch sử đơn hàng của tôi</h2>
                    <p className="text-xs text-slate-500">
                      Theo dõi tiến độ giao hàng & bảo hành máy tại Tấn Đạt
                    </p>
                  </div>
                  <button
                    onClick={fetchOrders}
                    className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Làm mới
                  </button>
                </div>

                {loadingOrders ? (
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-xs font-semibold">Đang tải danh sách đơn hàng...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800">Chưa có đơn hàng nào</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                        Bạn chưa đặt mua sản phẩm nào trên hệ thống Tấn Đạt Smartphone.
                      </p>
                    </div>
                    <Link
                      to="/dien-thoai"
                      className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      Khám phá điện thoại ngay
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all bg-slate-50/50 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                          <div className="space-y-0.5">
                            <span className="text-xs font-mono font-bold text-blue-600">
                              #{order.id.slice(0, 8).toUpperCase()}
                            </span>
                            <span className="text-xs text-slate-400 ml-2">
                              • {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <div>{getStatusBadge(order.status)}</div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3">
                          {order.items?.map((item: any) => (
                            <div key={item.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                                  {item.product?.image ? (
                                    <img
                                      src={item.product.image}
                                      alt={item.product.name}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <Package className="w-5 h-5 text-slate-400" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-800 text-xs sm:text-sm">
                                    {item.product?.name || 'Sản phẩm'}
                                  </p>
                                  <p className="text-[11px] text-slate-500">
                                    Số lượng: <span className="font-bold text-slate-700">{item.qty}</span>
                                  </p>
                                </div>
                              </div>
                              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                                {(item.price * item.qty).toLocaleString('vi-VN')} đ
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Summary & Address */}
                        <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                          <p className="text-slate-500">
                            Địa chỉ nhận hàng: <span className="font-semibold text-slate-700">{order.address}</span>
                          </p>
                          <div className="text-right">
                            <span className="text-slate-500 mr-2">Tổng thanh toán:</span>
                            <span className="text-base font-black text-rose-600">
                              {order.total?.toLocaleString('vi-VN')} đ
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-black text-slate-900">Sản phẩm yêu thích đã lưu</h2>
                  <p className="text-xs text-slate-500">
                    Danh sách các mẫu điện thoại bạn đang quan tâm tại Tấn Đạt
                  </p>
                </div>

                {wishlist.length === 0 ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-rose-50 text-rose-400 rounded-3xl flex items-center justify-center mx-auto">
                      <Heart className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800">Chưa có sản phẩm yêu thích</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                        Hãy bấm vào biểu tượng trái tim ở các mẫu điện thoại bạn yêu thích để lưu vào đây.
                      </p>
                    </div>
                    <Link
                      to="/dien-thoai"
                      className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      Xem sản phẩm ngay
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((product: any) => (
                      <div
                        key={product.id}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex items-center gap-4 bg-slate-50/50"
                      >
                        <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 p-2 flex items-center justify-center shrink-0">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Package className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/dien-thoai/${product.slug}`}
                            className="font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 truncate block"
                          >
                            {product.name}
                          </Link>
                          <p className="text-xs font-black text-rose-600 mt-1">
                            {product.price?.toLocaleString('vi-VN')} đ
                          </p>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-[11px] text-slate-400 hover:text-rose-500 font-medium mt-1 cursor-pointer"
                          >
                            Xóa khỏi danh sách
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Information Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-black text-slate-900">Cập nhật thông tin cá nhân</h2>
                  <p className="text-xs text-slate-500">
                    Quản lý thông tin liên hệ và mật khẩu bảo mật tài khoản
                  </p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
                      />
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Địa chỉ Email (Cố định)
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Số điện thoại nhận hàng
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

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Mật khẩu mới (Để trống nếu không đổi)
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={updatingProfile}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {updatingProfile ? 'Đang lưu thông tin...' : 'Lưu thay đổi'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
