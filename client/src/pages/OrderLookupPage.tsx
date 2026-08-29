import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, Clock, CheckCircle2, Truck, Check, AlertCircle, Phone, QrCode } from 'lucide-react';
import { api } from '../services/api.js';
import { formatPrice } from '../components/ProductCard.js';
import { SEO } from '../components/SEO.js';
import toast from 'react-hot-toast';

export const OrderLookupPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(initialId);
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchOrder = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await api.getOrderById(id.trim());
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setOrder(null);
      }
    } catch (err: any) {
      setOrder(null);
      toast.error('Không tìm thấy thông tin đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchOrder(initialId);
    }
  }, [initialId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setSearchParams({ id: orderId.trim() });
      fetchOrder(orderId.trim());
    }
  };

  const steps = [
    { key: 'PENDING', label: 'Chờ xác nhận', desc: 'Đơn hàng vừa được tạo' },
    { key: 'PROCESSING', label: 'Đang đóng gói', desc: 'Kiểm tra máy & dán cường lực' },
    { key: 'SHIPPED', label: 'Đang vận chuyển', desc: 'Bàn giao cho đơn vị vận chuyển' },
    { key: 'DELIVERED', label: 'Đã nhận hàng', desc: 'Giao hàng thành công' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'PENDING': return 0;
      case 'PROCESSING': return 1;
      case 'SHIPPED': return 2;
      case 'DELIVERED': return 3;
      default: return -1;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <SEO title="Tra Cứu Đơn Hàng — Tấn Đạt Smartphone" description="Kiểm tra tiến độ đơn hàng tại Tấn Đạt Smartphone." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tra cứu hành trình đơn hàng
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Nhập Mã đơn hàng được cấp khi hoàn tất đặt mua tại <b>Tấn Đạt Smartphone</b>.
          </p>
        </div>

        {/* Search Input Card */}
        <form
          onSubmit={handleSearch}
          className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 mb-8"
        >
          <div className="relative flex-1">
            <input
              type="text"
              required
              placeholder="Nhập mã đơn hàng (vd: cmte...)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
          >
            {loading ? 'Đang tìm...' : 'Tra cứu ngay'}
          </button>
        </form>

        {/* Order Details Display */}
        {order ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8 animate-in fade-in duration-300">
            {/* Header Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs text-slate-400 font-medium">Mã đơn hàng:</span>
                <div className="text-lg font-bold text-slate-800 font-mono">{order.id}</div>
                <div className="text-xs text-slate-400">
                  Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}
                </div>
              </div>

              <div className="self-start sm:self-center">
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold ${
                    order.status === 'DELIVERED'
                      ? 'bg-emerald-100 text-emerald-700'
                      : order.status === 'CANCELLED'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  {order.status === 'PENDING' && 'Chờ xác nhận'}
                  {order.status === 'PROCESSING' && 'Đang đóng gói'}
                  {order.status === 'SHIPPED' && 'Đang vận chuyển'}
                  {order.status === 'DELIVERED' && 'Đã giao thành công'}
                  {order.status === 'CANCELLED' && 'Đã hủy đơn'}
                </span>
              </div>
            </div>

            {/* Tracking Progression */}
            {order.status !== 'CANCELLED' && (
              <div className="py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                  {steps.map((step, idx) => {
                    const currentIdx = getStepIndex(order.status);
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div
                        key={step.key}
                        className={`p-4 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20'
                            : isCompleted
                            ? 'bg-slate-50 border-slate-200'
                            : 'bg-white border-slate-100 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              isCompleted
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </div>
                          <h4 className="text-xs font-bold text-slate-800">{step.label}</h4>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight">{step.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Banking QR Code if chosen Banking */}
            {order.paymentMethod === 'BANKING' && order.status === 'PENDING' && (
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={`https://img.vietqr.io/image/MB-0935677775-compact2.png?amount=${order.total}&addInfo=TANDAT%20${order.id.slice(-6)}&accountName=TAN%20DAT%20SMARTPHONE`}
                  alt="Mã QR Chuyển Khoản Tấn Đạt"
                  className="w-40 h-40 rounded-xl bg-white p-2 border border-slate-200 shadow-sm shrink-0"
                />
                <div className="space-y-1.5 text-xs text-slate-700 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1 text-blue-700 font-bold text-sm">
                    <QrCode className="w-4 h-4" />
                    <span>Quét mã VietQR thanh toán tự động</span>
                  </div>
                  <p>Ngân hàng: <b className="text-slate-900">MB Bank</b></p>
                  <p>Số tài khoản: <b className="text-blue-600 font-mono text-sm">0935677775</b></p>
                  <p>Tên tài khoản: <b className="text-slate-900 uppercase">TẤN ĐẠT SMARTPHONE</b></p>
                  <p>Số tiền: <b className="text-red-600 font-bold text-sm">{formatPrice(order.total)}</b></p>
                  <p className="text-[11px] text-slate-500">
                    Nội dung chuyển khoản: <b className="font-mono text-slate-800">TANDAT {order.id.slice(-6)}</b>
                  </p>
                </div>
              </div>
            )}

            {/* Customer & Shipping Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400 mb-2">
                  Thông tin người nhận
                </h4>
                <p className="font-bold text-slate-900">{order.customerName}</p>
                <p className="text-slate-600">SĐT: {order.customerPhone}</p>
                {order.customerEmail && <p className="text-slate-600">Email: {order.customerEmail}</p>}
                <p className="text-slate-600">Địa chỉ: {order.address}</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400 mb-2">
                  Thanh toán & Hỗ trợ
                </h4>
                <p className="text-slate-700">
                  Phương thức: <b className="text-slate-900">{order.paymentMethod === 'COD' ? 'Tiền mặt khi nhận (COD)' : 'Chuyển khoản VietQR'}</b>
                </p>
                {order.note && <p className="text-slate-600 italic">Ghi chú: "{order.note}"</p>}
                <div className="pt-2 text-xs text-blue-600 font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hotline hỗ trợ đơn: 093 567 7775</span>
                </div>
              </div>
            </div>

            {/* Items table */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4">Sản phẩm trong đơn hàng</h4>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="p-4 flex items-center gap-4 bg-white">
                    {item.product?.images?.[0] && (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover bg-slate-50 border shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-bold text-slate-800 truncate">
                        {item.product?.name || 'Sản phẩm'}
                      </h5>
                      <p className="text-xs text-slate-500">
                        Số lượng: {item.qty} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-blue-600">
                      {formatPrice(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-baseline text-slate-800">
                <span className="font-bold">Tổng thanh toán:</span>
                <span className="text-2xl font-black text-blue-600">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>
        ) : searched && !loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">Không tìm thấy đơn hàng</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Vui lòng kiểm tra lại Mã đơn hàng hoặc liên hệ Hotline Tấn Đạt <b className="text-blue-600">093 567 7775</b> để được hỗ trợ nhanh nhất.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
