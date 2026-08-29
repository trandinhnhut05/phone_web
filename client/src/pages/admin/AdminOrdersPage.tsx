import React, { useEffect, useState } from 'react';
import { ShoppingBag, Eye, CheckCircle2, Clock, Truck, X, Phone, MapPin, Mail } from 'lucide-react';
import { api } from '../../services/api.js';
import { formatPrice } from '../../components/ProductCard.js';
import toast from 'react-hot-toast';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.getOrders({
        status: statusFilter,
        limit: '50',
      });
      if (res.success) setOrders(res.data);
    } catch (err: any) {
      toast.error('Lỗi tải danh sách đơn hàng');
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
      if (res.success) {
        toast.success('Đã cập nhật trạng thái đơn hàng');
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder?.id === orderId) {
          setSelectedOrder((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Lỗi cập nhật trạng thái');
    }
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Đơn Hàng
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi, xử lý và cập nhật tiến độ vận chuyển đơn đặt hàng của khách.
          </p>
        </div>

        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-slate-200 text-slate-700 text-sm font-semibold py-2.5 px-4 rounded-xl shadow-xs outline-none"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
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
                <th className="py-4 px-4">Trạng thái</th>
                <th className="py-4 px-4">Thời gian</th>
                <th className="py-4 px-6 text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Đang tải danh sách đơn hàng...
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-bold text-xs text-blue-600">
                      {ord.id.slice(0, 10)}...
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
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Không có đơn hàng nào trong trạng thái này.
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
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
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
                <span>{selectedOrder.customerPhone}</span>
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
                        className="w-10 h-10 rounded-lg object-cover bg-slate-50 border"
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
