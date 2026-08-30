import React, { useEffect, useState } from 'react';
import {
  ShoppingBag,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  X,
  Phone,
  MapPin,
  Mail,
  Search,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { api } from '../../services/api.js';
import { formatPrice } from '../../components/ProductCard.js';
import toast from 'react-hot-toast';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.getOrders({
        status: statusFilter,
        limit: '100',
      });
      if (res && res.success && Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (err: any) {
      toast.error('Lỗi tải danh sách đơn hàng');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await api.updateOrderStatus(orderId, newStatus);
      if (res && res.success) {
        toast.success('Đã cập nhật trạng thái đơn hàng thành công');
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder?.id === orderId) {
          setSelectedOrder((prev: any) => ({ ...prev, status: newStatus }));
        }
      } else {
        toast.error(res?.message || 'Không thể cập nhật trạng thái');
      }
    } catch (err: any) {
      toast.error(err.message || 'Lỗi cập nhật trạng thái');
    }
  };

  const filteredOrders = orders.filter((ord) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      ord.id?.toLowerCase().includes(q) ||
      ord.customerName?.toLowerCase().includes(q) ||
      ord.customerPhone?.toLowerCase().includes(q)
    );
  });

  const statusOptions = [
    { value: 'ALL', label: 'Tất cả trạng thái' },
    { value: 'PENDING', label: 'Chờ xác nhận' },
    { value: 'PROCESSING', label: 'Đang xử lý' },
    { value: 'SHIPPED', label: 'Đang vận chuyển' },
    { value: 'DELIVERED', label: 'Đã giao thành công' },
    { value: 'CANCELLED', label: 'Đã hủy' },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Đơn Hàng ({filteredOrders.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi, xử lý và cập nhật tiến độ vận chuyển đơn đặt hàng của khách.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm tên, SĐT, mã đơn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 shadow-xs w-52 sm:w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3.5 rounded-xl shadow-xs outline-none focus:border-blue-500"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={fetchOrders}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl shadow-xs transition-colors"
            title="Làm mới danh sách"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Mã đơn</th>
                <th className="py-4 px-4">Khách hàng</th>
                <th className="py-4 px-4">Số lượng món</th>
                <th className="py-4 px-4">Tổng tiền</th>
                <th className="py-4 px-4">Hình thức</th>
                <th className="py-4 px-4">Trạng thái</th>
                <th className="py-4 px-4">Thời gian</th>
                <th className="py-4 px-6 text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Đang tải danh sách đơn hàng...
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-bold text-xs text-blue-600">
                      {ord.id.slice(0, 8)}...
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{ord.customerName}</div>
                      <div className="text-xs text-slate-400">{ord.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {ord.items?.length || 0} món
                    </td>
                    <td className="py-3.5 px-4 font-black text-blue-600">
                      {formatPrice(ord.total)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {ord.paymentMethod || 'COD'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                        className={`text-xs font-bold py-1 px-2.5 rounded-full border outline-none cursor-pointer ${
                          ord.status === 'DELIVERED'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : ord.status === 'CANCELLED'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : ord.status === 'SHIPPED'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : ord.status === 'PROCESSING'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="PENDING">Chờ xác nhận</option>
                        <option value="PROCESSING">Đang xử lý</option>
                        <option value="SHIPPED">Đang vận chuyển</option>
                        <option value="DELIVERED">Đã giao hàng</option>
                        <option value="CANCELLED">Hủy đơn</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {new Date(ord.createdAt).toLocaleString('vi-VN')}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Không có đơn hàng nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Chi tiết đơn hàng</h3>
                <p className="text-xs font-mono text-slate-400">{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-bold">Người nhận:</span>
                <span>{selectedOrder.customerName}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <a href={`tel:${selectedOrder.customerPhone}`} className="text-blue-600 font-bold hover:underline">
                  {selectedOrder.customerPhone}
                </a>
              </div>
              {selectedOrder.customerEmail && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedOrder.customerEmail}</span>
                </div>
              )}
              <div className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{selectedOrder.address}</span>
              </div>
              {selectedOrder.note && (
                <p className="pt-1 italic text-slate-500">Ghi chú: "{selectedOrder.note}"</p>
              )}
            </div>

            {/* Items list */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                Sản phẩm đặt mua
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl max-h-48 overflow-y-auto">
                {selectedOrder.items?.map((item: any) => (
                  <div key={item.id} className="p-3 flex items-center gap-3">
                    {item.product?.images?.[0] && (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-50 border shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {item.product?.name || 'Sản phẩm'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.qty} × {formatPrice(item.price)}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-blue-600">
                      {formatPrice(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Update in Modal */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
              <span className="text-xs font-bold text-slate-700">Trạng thái xử lý:</span>
              <select
                value={selectedOrder.status}
                onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                className="text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-200 bg-white shadow-xs outline-none cursor-pointer"
              >
                <option value="PENDING">Chờ xác nhận</option>
                <option value="PROCESSING">Đang xử lý</option>
                <option value="SHIPPED">Đang vận chuyển</option>
                <option value="DELIVERED">Đã giao hàng</option>
                <option value="CANCELLED">Hủy đơn</option>
              </select>
            </div>

            <div className="pt-2 flex justify-between items-baseline border-t border-slate-100">
              <span className="text-sm font-bold text-slate-700">Tổng thanh toán:</span>
              <span className="text-xl font-black text-blue-600">
                {formatPrice(selectedOrder.total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;

