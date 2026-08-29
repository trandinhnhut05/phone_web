import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.js';

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
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

export const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  const { addToCart } = useCart();

  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const defaultImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: defaultImage,
      storage: product.storage || undefined,
      color: product.colors?.[0] || undefined,
      stock: product.stock,
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:shadow-xl hover:border-blue-200/80 transition-all duration-300 flex flex-col justify-between">
      {/* Discount & Brand Tags */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          {product.brand}
        </span>
        {discountPercent ? (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
            Giảm {discountPercent}%
          </span>
        ) : (
          <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
            <Check className="w-3 h-3" /> Còn hàng
          </span>
        )}
      </div>

      {/* Product Image */}
      <Link
        to={`/dien-thoai/${product.slug}`}
        className="block aspect-square w-full rounded-xl overflow-hidden bg-slate-50 relative my-2"
      >
        <img
          src={defaultImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Specs Chips */}
      <div className="flex flex-wrap gap-1.5 my-2">
        {product.storage && (
          <span className="text-[11px] font-medium px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md">
            {product.storage}
          </span>
        )}
        {product.ram && (
          <span className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
            RAM {product.ram}
          </span>
        )}
      </div>

      {/* Product Title */}
      <Link to={`/dien-thoai/${product.slug}`}>
        <h3 className="text-sm font-bold text-slate-800 line-clamp-2 hover:text-blue-600 transition-colors min-h-[40px]">
          {product.name}
        </h3>
      </Link>

      {/* Colors preview */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex items-center gap-1.5 my-2">
          <span className="text-[11px] text-slate-400">Màu:</span>
          <span className="text-[11px] text-slate-600 font-medium truncate">
            {product.colors.join(', ')}
          </span>
        </div>
      )}

      {/* Pricing & Cart Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div>
          <div className="text-base font-extrabold text-blue-600">
            {formatPrice(product.price)}
          </div>
          {product.oldPrice && product.oldPrice > product.price && (
            <div className="text-xs text-slate-400 line-through">
              {formatPrice(product.oldPrice)}
            </div>
          )}
        </div>

        <button
          onClick={handleQuickAdd}
          disabled={product.stock <= 0}
          className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-blue-50 disabled:hover:text-blue-600"
          title={product.stock > 0 ? 'Thêm nhanh vào giỏ' : 'Hết hàng'}
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
