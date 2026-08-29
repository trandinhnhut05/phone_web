import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { formatPrice } from '../components/ProductCard.js';
import { SEO } from '../components/SEO.js';

export const CartPage: React.FC = () => {
  const { items, updateQty, removeFromCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <SEO title="Giỏ Hàng Của Bạn — PhoneStore" description="Xem và quản lý các sản phẩm điện thoại đã thêm vào giỏ hàng." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          Giỏ hàng của bạn ({totalItems} sản phẩm)
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Giỏ hàng đang trống</h3>
            <p className="text-sm text-slate-500">
              Hãy dạo một vòng và chọn cho mình chiếc điện thoại ưng ý nhất nhé!
            </p>
            <Link
              to="/dien-thoai"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-md"
            >
              Tiếp tục mua sắm
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="p-4 sm:p-6 flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl bg-slate-50 border border-slate-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <Link
                        to={`/dien-thoai/${item.slug}`}
                        className="text-sm sm:text-base font-bold text-slate-800 hover:text-blue-600 transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>

                      <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                        {item.storage && <span>Dung lượng: <b className="text-slate-700">{item.storage}</b></span>}
                        {item.color && <span>• Màu: <b className="text-slate-700">{item.color}</b></span>}
                      </div>

                      <div className="text-sm sm:text-base font-extrabold text-blue-600">
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    {/* Qty & Delete */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1, item.color)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-800">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1, item.color)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.color)}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
                  Tóm tắt đơn hàng
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Tổng tiền hàng ({totalItems} món)</span>
                    <span className="font-semibold text-slate-900">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Phí vận chuyển</span>
                    <span className="font-semibold text-emerald-600">Miễn phí (Toàn quốc)</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Bảo hiểm vận chuyển</span>
                    <span className="font-semibold text-emerald-600">Đã bao gồm</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-base font-bold text-slate-800">Tổng thanh toán</span>
                  <span className="text-2xl font-black text-blue-600">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/thanh-toan')}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2"
                >
                  Tiến hành thanh toán
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Bảo mật thanh toán & thông tin 100%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
