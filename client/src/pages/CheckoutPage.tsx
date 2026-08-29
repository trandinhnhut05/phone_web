import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, Banknote, QrCode, ArrowLeft, Tag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';
import { api } from '../services/api.js';
import { formatPrice } from '../components/ProductCard.js';
import { SEO } from '../components/SEO.js';
import toast from 'react-hot-toast';

export const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [submitting, setSubmitting] = useState(false);

  // Voucher states
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Không có sản phẩm để thanh toán</h2>
        <p className="text-slate-500 mt-2 mb-6">Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.</p>
        <Link to="/dien-thoai" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalTotal = Math.max(0, totalPrice - discountAmount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setValidatingCoupon(true);
    try {
      const res = await api.applyCoupon(couponCode.trim(), totalPrice);
      if (res.success && res.data) {
        setAppliedCoupon(res.data);
        toast.success(res.message || 'Áp dụng mã giảm giá thành công!');
      } else {
        toast.error(res.message || 'Mã giảm giá không hợp lệ');
      }
    } catch (err: any) {
      toast.error(err.message || 'Không thể áp dụng mã giảm giá');
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !address.trim()) {
      toast.error('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || null,
        address: address.trim(),
        note: note.trim() || null,
        paymentMethod,
        discount: discountAmount,
        couponCode: appliedCoupon?.code || null,
        items: items.map((item) => ({
          productId: item.id,
          qty: item.qty,
        })),
      };

      const res = await api.createOrder(orderPayload);
      if (res.success && res.data) {
        clearCart();
        toast.success('Đặt hàng thành công tại Tấn Đạt Smartphone!');
        navigate(`/tra-cuu-don-hang?id=${res.data.id}&phone=${customerPhone}`);
      }
    } catch (err: any) {
      toast.error(err.message || 'Đặt hàng không thành công');
    } finally {
      setSubmitting(false);
    }
  };

  const qrImageUrl = `https://img.vietqr.io/image/MB-0935677775-compact2.png?amount=${finalTotal}&addInfo=TANDAT%20${customerPhone || 'MUA%20HANG'}&accountName=TAN%20DAT%20SMARTPHONE`;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <SEO title="Thanh Toán Đơn Hàng — Tấn Đạt Smartphone" description="Đặt hàng online uy tín, giao tận nơi hoặc nhận tại Chợ Phong Xuân, Phong Điền, TP. Huế." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/gio-hang"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại giỏ hàng
        </Link>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          Thông tin đặt hàng tại Tấn Đạt Smartphone
        </h1>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Form: Delivery Address & Payment */}
            <div className="lg:col-span-7 space-y-6">
              {/* Shipping Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 font-bold text-slate-800 text-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>1. Địa chỉ giao nhận hàng</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Họ và tên người nhận <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="vd: Nguyễn Văn A"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Số điện thoại liên hệ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="vd: 0988888888"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Email nhận xác nhận đơn hàng
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com (tùy chọn)"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Địa chỉ nhận hàng chi tiết <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="vd: Thôn Phong Thu, Xã Phong Xuân, Huyện Phong Điền, TP. Huế"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Ghi chú (yêu cầu dán cường lực, giờ giao máy...)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="vd: Gọi trước khi giao, dán sẵn cường lực và tặng ốp lưng..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 font-bold text-slate-800 text-lg">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span>2. Chọn phương thức thanh toán</span>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod('COD')}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-900">
                        Thanh toán khi nhận hàng (COD)
                      </div>
                      <div className="text-xs text-slate-500">
                        Kiểm tra máy và thanh toán tiền mặt cho nhân viên giao hàng
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('BANKING')}
                    className={`flex flex-col gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'BANKING'
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'BANKING'}
                        onChange={() => setPaymentMethod('BANKING')}
                        className="hidden"
                      />
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-900">
                          Chuyển khoản Ngân hàng (Quét mã VietQR)
                        </div>
                        <div className="text-xs text-slate-500">
                          Tự động điền số tiền và nội dung chuyển khoản cho Tấn Đạt Smartphone
                        </div>
                      </div>
                    </div>

                    {/* QR Code Preview */}
                    {paymentMethod === 'BANKING' && (
                      <div className="mt-2 p-4 bg-white rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <img
                          src={qrImageUrl}
                          alt="VietQR Tấn Đạt Smartphone"
                          className="w-36 h-36 rounded-xl border border-slate-200 p-1 bg-white shrink-0 shadow-xs"
                        />
                        <div className="text-xs space-y-1 text-slate-700">
                          <p className="font-bold text-slate-900 text-sm">MB Bank (Ngân hàng Quân Đội)</p>
                          <p>Số tài khoản: <b className="text-blue-600 font-mono text-sm">0935677775</b></p>
                          <p>Chủ tài khoản: <b className="text-slate-900 uppercase">TẤN ĐẠT SMARTPHONE</b></p>
                          <p>Số tiền thanh toán: <b className="text-red-600 font-bold">{formatPrice(finalTotal)}</b></p>
                          <p className="text-[11px] text-slate-500 pt-1">
                            * Hệ thống sẽ tự động xác nhận đơn hàng ngay khi nhận được thanh toán.
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Right Summary & Coupons */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
                  Đơn hàng của bạn
                </h3>

                {/* Items in order preview */}
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.color}`} className="py-3 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-50 border shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">{item.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {item.color} • SL: {item.qty}
                        </div>
                      </div>
                      <div className="text-xs font-extrabold text-blue-600">
                        {formatPrice(item.price * item.qty)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    <span>Mã giảm giá / Voucher</span>
                  </div>

                  {appliedCoupon ? (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-emerald-800">Mã: {appliedCoupon.code}</span>
                        <p className="text-[11px] text-emerald-600">Giảm: -{formatPrice(appliedCoupon.discount)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAppliedCoupon(null);
                          setCouponCode('');
                        }}
                        className="text-[11px] text-red-500 font-bold hover:underline"
                      >
                        Hủy mã
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="vd: TANDAT200, TANDAT500"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs uppercase font-bold outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={validatingCoupon || !couponCode.trim()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                      >
                        {validatingCoupon ? 'Kiểm tra...' : 'Áp dụng'}
                      </button>
                    </div>
                  )}
                  <p className="text-[10px] text-slate-400">Gợi ý mã: <b>TANDAT200</b>, <b>TANDAT500</b>, <b>FREESHIP</b></p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Tạm tính</span>
                    <span className="font-semibold text-slate-900">{formatPrice(totalPrice)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Giảm giá Voucher</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Vận chuyển / Giao nhận</span>
                    <span className="font-semibold text-emerald-600">Miễn phí toàn quốc</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Bảo hành kèm theo</span>
                    <span className="font-semibold text-emerald-600">12 Tháng 1 đổi 1</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                    <span className="text-base font-bold text-slate-900">Tổng thanh toán</span>
                    <span className="text-2xl font-black text-blue-600">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'Đang gửi đơn hàng...' : 'Xác nhận đặt mua ngay'}
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Cam kết Uy Tín & Bảo Hành Dài Hạn</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
