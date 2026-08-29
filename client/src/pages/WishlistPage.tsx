import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowLeft, Smartphone } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.js';
import { useCart } from '../context/CartContext.js';
import { formatPrice } from '../components/ProductCard.js';
import { SEO } from '../components/SEO.js';
import toast from 'react-hot-toast';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <SEO
        title="Danh Sách Yêu Thích — Tấn Đạt Smartphone"
        description="Danh sách các mẫu điện thoại bạn yêu thích tại Tấn Đạt Smartphone."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Heart className="w-7 h-7 text-rose-600 fill-rose-600" />
              <span>Sản Phẩm Yêu Thích ({wishlist.length})</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Những chiếc điện thoại bạn đã lưu lại để theo dõi giá và ưu đãi tại Tấn Đạt.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors self-start sm:self-center"
            >
              Xóa tất cả danh sách
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Chưa có sản phẩm yêu thích nào</h3>
            <p className="text-sm text-slate-500">
              Hãy nhấn biểu tượng trái tim ❤️ ở bất kỳ sản phẩm nào để lưu lại và mua sau.
            </p>
            <Link
              to="/dien-thoai"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Khám phá điện thoại ngay
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-square rounded-2xl bg-slate-50 overflow-hidden mb-3 p-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 text-slate-400 hover:text-red-600 hover:bg-white shadow-xs transition-colors"
                    title="Xóa khỏi yêu thích"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">{item.brand}</span>
                    <Link
                      to={`/dien-thoai/${item.slug}`}
                      className="block text-sm font-bold text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-base font-black text-blue-600">
                      {formatPrice(item.price)}
                    </div>
                    <button
                      onClick={() => {
                        addToCart({
                          id: item.id,
                          name: item.name,
                          slug: item.slug,
                          price: item.price,
                          image: item.image,
                          color: 'Mặc định',
                        });
                        toast.success(`Đã thêm ${item.name} vào giỏ hàng!`);
                      }}
                      className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-all"
                      title="Thêm vào giỏ hàng"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
