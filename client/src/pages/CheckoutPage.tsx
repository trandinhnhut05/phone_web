import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  QrCode,
  ArrowLeft,
  Tag,
  AlertTriangle,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';
import { api } from '../services/api.js';
import { formatPrice } from '../components/ProductCard.js';
import { SEO } from '../components/SEO.js';
import { VIETNAM_PROVINCES } from '../data/vietnamAddressData.js';
import toast from 'react-hot-toast';

export const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');

  // Address selection state
  const [selectedProvince, setSelectedProvince] = useState('Thừa Thiên Huế');
  const [selectedDistrict, setSelectedDistrict] = useState('Huyện Phong Điền (Cửa hàng Tấn Đạt)');
  const [selectedWard, setSelectedWard] = useState('Xã Phong Xuân (Chợ Phong Xuân)');
  const [streetAddress, setStreetAddress] = useState('');
  const [note, setNote] = useState('');

  // Payment states (Default COD, online QR is under maintenance)
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BANKING'>('COD');
  const [submitting, setSubmitting] = useState(false);

  // Voucher states
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  const currentProvinceData = VIETNAM_PROVINCES.find((p) => p.name === selectedProvince);
  const currentDistricts = currentProvinceData ? currentProvinceData.districts : [];
  const currentDistrictData = currentDistricts.find((d) => d.name === selectedDistrict);
  const currentWards = currentDistrictData ? currentDistrictData.wards : [];

  // Update district/ward when province changes
  useEffect(() => {
    if (currentDistricts.length > 0) {
      setSelectedDistrict(currentDistricts[0].name);
      if (currentDistricts[0].wards.length > 0) {
        setSelectedWard(currentDistricts[0].wards[0]);
      } else {
        setSelectedWard('');
      }
    }
  }, [selectedProvince]);

  // Update ward when district changes
  useEffect(() => {
    if (currentDistrictData && currentDistrictData.wards.length > 0) {
      setSelectedWard(currentDistrictData.wards[0]);
    } else {
      setSelectedWard('');
    }
  }, [selectedDistrict]);

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

  const fullAddress = `${streetAddress ? streetAddress.trim() + ', ' : ''}${selectedWard ? selectedWard + ', ' : ''}${selectedDistrict}, ${selectedProvince}`;

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

    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error('Vui lòng điền đầy đủ Họ tên và Số điện thoại nhận hàng');
      return;
    }

    if (!streetAddress.trim()) {
      toast.error('Vui lòng nhập địa chỉ cụ thể (Thôn/Số nhà/Đường)');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || null,
        address: fullAddress,
        note: note.trim() || null,
        paymentMethod: 'COD',
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
      } else {
        toast.error(res.message || 'Không thể tạo đơn hàng');
      }
    } catch (err: any) {
      toast.error(err.message || 'Đặt hàng không thành công');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <SEO title="Thanh Toán Đơn Hàng — Tấn Đạt Smartphone" description="Đặt mua điện thoại chính hãng tại Tấn Đạt Smartphone, bảo hành 12 tháng 1 đổi 1, giao tận nơi miễn phí toàn quốc." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/gio-hang" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Quay lại giỏ hàng
        </Link>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          Thông tin đặt hàng tại Tấn Đạt Smartphone
        </h1>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 font-bold text-slate-800 text-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>1. Thông tin giao nhận hàng</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Họ và tên người nhận <span className="text-red-500">*</span></label>
                    <input type="text" required placeholder="vd: Nguyễn Văn A" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Số điện thoại liên hệ <span className="text-red-500">*</span></label>
                    <input type="tel" required placeholder="vd: 0935677775" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email nhận thông báo đơn & bảo hành</label>
                  <input type="email" placeholder="email@example.com (tùy chọn)" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all" />
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Địa chỉ hành chính</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Tỉnh / Thành phố <span className="text-red-500">*</span></label>
                      <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white">
                        {VIETNAM_PROVINCES.map((p) => (<option key={p.name} value={p.name}>{p.name}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Quận / Huyện <span className="text-red-500">*</span></label>
                      <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white">
                        {currentDistricts.map((d) => (<option key={d.name} value={d.name}>{d.name}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Phường / Xã <span className="text-red-500">*</span></label>
                      <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white">
                        {currentWards.map((w) => (<option key={w} value={w}>{w}</option>))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Số nhà, Tên đường / Thôn / Xóm <span className="text-red-500">*</span></label>
                    <input type="text" required placeholder="vd: Thôn Phong Thu (gần Chợ Phong Xuân), Nhà số 12..." value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Ghi chú đơn hàng (yêu cầu dán cường lực, giờ giao máy...)</label>
                  <textarea rows={2} placeholder="vd: Gọi trước khi giao, dán sẵn kính cường lực và tặng ốp lưng..." value={note} onChange={(e) => setNote(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all" />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 font-bold text-slate-800 text-lg">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span>2. Phương thức thanh toán</span>
                </div>

                <div className="space-y-3">
                  <label onClick={() => setPaymentMethod('COD')} className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="hidden" />
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5"><Banknote className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2"><span className="text-sm font-bold text-slate-900">Thanh toán khi nhận hàng (COD)</span><span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">Khuyên Dùng</span></div>
                      <p className="text-xs text-slate-500 mt-0.5">Kiểm tra đúng máy, nguyên seal, đúng màu sắc rồi mới thanh toán tiền cho nhân viên giao hàng.</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  </label>

                  <div onClick={() => setPaymentMethod('BANKING')} className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${paymentMethod === 'BANKING' ? 'border-amber-400 bg-amber-50/40 ring-2 ring-amber-400/20' : 'border-slate-200 hover:border-amber-300 bg-white'}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5"><QrCode className="w-5 h-5" /></div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-bold text-slate-800">Chuyển khoản Ngân hàng / Quét mã QR Online</span><span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-[10px] font-extrabold animate-pulse">⚠️ ĐANG BẢO TRÌ NÂNG CẤP</span></div>
                        <p className="text-xs text-slate-500 mt-1">Cổng thanh toán tự động qua mã VietQR / VNPay / Ví điện tử.</p>
                      </div>
                    </div>
                    <div className="mt-3.5 p-3.5 bg-amber-50/90 border border-amber-200 rounded-xl text-xs space-y-2">
                      <div className="flex items-start gap-2 text-amber-900 font-semibold"><AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /><span>Chức năng quét mã QR thanh toán trực tuyến tự động đang trong thời gian bảo trì & nâng cấp hệ thống kết nối ngân hàng.</span></div>
                      <p className="text-slate-600 pl-6 text-[11px]">👉 Quý khách vui lòng chọn hình thức <b>"Thanh toán khi nhận hàng (COD)"</b> để đặt hàng thuận tiện, hoặc gọi hotline <a href="tel:0935677775" className="text-blue-600 font-bold underline">093 567 7775</a> để được nhân viên hỗ trợ chuyển khoản ngân hàng trực tiếp.</p>
                      <div className="pt-1 pl-6"><button type="button" onClick={(e) => { e.stopPropagation(); setPaymentMethod('COD'); }} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer">Chọn Thanh toán khi nhận hàng (COD)</button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">Đơn hàng của bạn</h3>
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.color}`} className="py-3 flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-slate-50 border shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">{item.name}</div>
                        <div className="text-[11px] text-slate-500">{item.color} • SL: {item.qty}</div>
                      </div>
                      <div className="text-xs font-extrabold text-blue-600">{formatPrice(item.price * item.qty)}</div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-blue-600" /><span>Mã giảm giá / Voucher</span></div>
                  {appliedCoupon ? (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                      <div><span className="font-bold text-emerald-800">Mã: {appliedCoupon.code}</span><p className="text-[11px] text-emerald-600">Giảm: -{formatPrice(appliedCoupon.discount)}</p></div>
                      <button type="button" onClick={() => { setAppliedCoupon(null); setCouponCode(''); }} className="text-[11px] text-red-500 font-bold hover:underline cursor-pointer">Hủy mã</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input type="text" placeholder="vd: TANDAT200, TANDAT500" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs uppercase font-bold outline-none focus:border-blue-500" />
                      <button type="button" onClick={handleApplyCoupon} disabled={validatingCoupon || !couponCode.trim()} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer">{validatingCoupon ? 'Kiểm tra...' : 'Áp dụng'}</button>
                    </div>
                  )}
                  <p className="text-[10px] text-slate-400">Gợi ý mã: <b>TANDAT200</b>, <b>TANDAT500</b>, <b>FREESHIP</b></p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-sm">
                  <div className="flex justify-between text-slate-600"><span>Tạm tính</span><span className="font-semibold text-slate-900">{formatPrice(totalPrice)}</span></div>
                  {discountAmount > 0 && (<div className="flex justify-between text-emerald-600 font-semibold"><span>Giảm giá Voucher</span><span>-{formatPrice(discountAmount)}</span></div>)}
                  <div className="flex justify-between text-slate-600"><span>Vận chuyển / Giao nhận</span><span className="font-semibold text-emerald-600">Miễn phí toàn quốc</span></div>
                  <div className="flex justify-between text-slate-600"><span>Bảo hành kèm theo</span><span className="font-semibold text-emerald-600">12 Tháng 1 đổi 1</span></div>
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline"><span className="text-base font-bold text-slate-900">Tổng thanh toán</span><span className="text-2xl font-black text-blue-600">{formatPrice(finalTotal)}</span></div>
                </div>

                <button type="submit" disabled={submitting} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer text-base">
                  {submitting ? 'Đang gửi đơn hàng...' : 'Xác nhận đặt mua (Thanh toán COD)'}
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
