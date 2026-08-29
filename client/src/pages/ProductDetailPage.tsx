import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { api } from '../services/api.js';
import { useCart } from '../context/CartContext.js';
import { ProductCard, ProductType, formatPrice } from '../components/ProductCard.js';
import { SEO } from '../components/SEO.js';
import toast from 'react-hot-toast';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [related, setRelated] = useState<ProductType[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await api.getProductBySlug(slug);
        if (res.success && res.data) {
          setProduct(res.data);
          setRelated(res.related || []);
          setSelectedImage(res.data.images?.[0] || '');
          setSelectedColor(res.data.colors?.[0] || '');
          setQuantity(1);
        }
      } catch (err) {
        console.error('Lỗi tải chi tiết sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy sản phẩm</h2>
        <p className="text-slate-500 mt-2 mb-6">Sản phẩm có thể đã ngừng kinh doanh hoặc đường dẫn không đúng.</p>
        <Link to="/dien-thoai" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: selectedImage || product.images?.[0] || '',
        color: selectedColor,
        storage: product.storage || undefined,
        stock: product.stock,
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/thanh-toan');
  };

  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description || product.name,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'VND',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <SEO
        title={`${product.name} — Giá Tốt, Trả Góp 0%`}
        description={`Mua ngay ${product.name} chính hãng, giá chỉ ${formatPrice(product.price)}. Bảo hành 12 tháng, giao hàng toàn quốc.`}
        image={selectedImage}
        schema={productSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/dien-thoai" className="hover:text-blue-600 transition-colors">Điện thoại</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to={`/dien-thoai?brand=${product.brand}`} className="hover:text-blue-600 transition-colors">{product.brand}</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold truncate">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative">
                <img
                  src={selectedImage || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {discountPercent && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                    Tiết kiệm {discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-blue-600 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Buying Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">
                  {product.brand} Official
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                  <span>Đã bán: <b className="text-slate-800">{product.sold}</b></span>
                  <span>•</span>
                  <span>Tình trạng: <b className={product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}>
                    {product.stock > 0 ? `Còn hàng (${product.stock} sản phẩm)` : 'Tạm hết hàng'}
                  </b></span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-baseline gap-3">
                <span className="text-3xl font-black text-blue-600">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    Chọn màu sắc: <span className="text-blue-600 font-semibold">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Pills */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {product.storage && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Bộ nhớ trong</span>
                    <span className="text-sm font-bold text-slate-800">{product.storage}</span>
                  </div>
                )}
                {product.ram && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Dung lượng RAM</span>
                    <span className="text-sm font-bold text-slate-800">{product.ram}</span>
                  </div>
                )}
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-bold uppercase text-slate-700">Số lượng:</span>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="py-3.5 px-6 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-40"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-40"
                >
                  <Zap className="w-5 h-5" />
                  Mua ngay
                </button>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-slate-700 block">Bảo hành 12T</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <Truck className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-slate-700 block">Freeship toàn quốc</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <RotateCcw className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-slate-700 block">1 Đổi 1 30 ngày</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          {product.description && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Đặc điểm nổi bật</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>{product.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Sản phẩm cùng thương hiệu</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {related.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
