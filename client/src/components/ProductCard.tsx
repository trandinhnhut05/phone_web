import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import toast from 'react-hot-toast';

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  oldPrice?: number | null;
  storage?: string | null;
  ram?: string | null;
  stock: number;
  sold: number;
  images: string[];
  colors: string[];
  description?: string | null;
  highlights?: string[];
  specs?: any;
  inBox?: string[];
  warranty?: string | null;
  reviews?: { rating: number }[];
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

export const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      color: product.colors[0] || 'Mặc định',
      storage: product.storage || undefined,
    });
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      slug: product.slug,
      brand: product.brand,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.images[0] || '',
    });
  };

  const isFavorite = isInWishlist(product.id);

  // Compute average rating
  const avgRating = product.reviews && product.reviews.length > 0
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="group relative bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      {/* Top Badges & Wishlist */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        <div className="flex flex-wrap gap-1">
          {discountPercent && (
            <span className="text-[10px] sm:text-xs font-black bg-red-600 text-white px-2 py-0.5 rounded-lg shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.storage && (
            <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200">
              {product.storage}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Thêm vào yêu thích"
          className={`p-2 rounded-full transition-all ${
            isFavorite
              ? 'bg-rose-50 text-rose-600 shadow-xs'
              : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600' : ''}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link to={`/dien-thoai/${product.slug}`} className="block relative overflow-hidden rounded-2xl bg-slate-50 aspect-square mb-3">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Brand & Title */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-semibold uppercase tracking-wider">
            <span>{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{avgRating}</span>
            </div>
          </div>

          <Link
            to={`/dien-thoai/${product.slug}`}
            className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug"
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-sm sm:text-base font-black text-blue-600">
              {formatPrice(product.price)}
            </div>
            {product.oldPrice && product.oldPrice > product.price && (
              <div className="text-[11px] text-slate-400 line-through">
                {formatPrice(product.oldPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-xs shrink-0"
            title="Thêm vào giỏ"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
