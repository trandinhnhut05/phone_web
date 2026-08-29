import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingCart,
  Zap,
  Check,
  ChevronRight,
  Heart,
  Phone,
  Gift,
  Package,
  Wrench,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Send,
  Sliders,
} from 'lucide-react';
import { api } from '../services/api.js';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import { formatPrice, ProductCard, ProductType } from '../components/ProductCard.js';
import { SEO } from '../components/SEO.js';
import toast from 'react-hot-toast';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<any | null>(null);
  const [related, setRelated] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews'>('specs');

  // Review Form States
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerPhone, setReviewerPhone] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (!slug) return;
        const res = await api.getProductBySlug(slug);
        if (res.success && res.data) {
          setProduct(res.data);
          setSelectedImage(res.data.images?.[0] || '');
          setSelectedColor(res.data.colors?.[0] || 'Mặc định');
          setSelectedStorage(res.data.storage || '');
          setRelated(res.related || []);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Lỗi tải chi tiết sản phẩm:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500">Đang tải thông số kỹ thuật...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy sản phẩm</h2>
        <p className="text-slate-500 mt-2 mb-6">Sản phẩm này có thể đã ngừng kinh doanh hoặc đường dẫn không đúng.</p>
        <Link to="/dien-thoai" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-md">
          Khám phá điện thoại khác
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: selectedImage || product.images[0],
      color: selectedColor,
      storage: selectedStorage,
    });
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/thanh-toan');
  };

  const handleWishlist = () => {
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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      toast.error('Vui lòng điền Họ tên và Nội dung đánh giá');
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await api.createReview(product.id, {
        userName: reviewerName.trim(),
        userPhone: reviewerPhone.trim() || undefined,
        rating: reviewRating,
        comment: reviewComment.trim(),
      });

      if (res.success && res.data) {
        toast.success('Cảm ơn bạn đã gửi đánh giá cho Tấn Đạt Smartphone!');
        setProduct({
          ...product,
          reviews: [res.data, ...(product.reviews || [])],
        });
        setReviewComment('');
        setReviewerName('');
        setReviewerPhone('');
      }
    } catch (err: any) {
      toast.error(err.message || 'Gửi đánh giá không thành công');
    } finally {
      setSubmittingReview(false);
    }
  };

  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const reviewsList = product.reviews || [];
  const avgRating =
    reviewsList.length > 0
      ? (reviewsList.reduce((acc: number, r: any) => acc + r.rating, 0) / reviewsList.length).toFixed(1)
      : '5.0';

  // Fallback default specs if not defined in DB
  const specsObject = product.specs && typeof product.specs === 'object' && Object.keys(product.specs).length > 0
    ? product.specs
    : {
        'Màn hình': 'OLED / AMOLED, Tần số quét 120Hz sắc nét',
        'Hệ điều hành': 'Phiên bản mới nhất, hỗ trợ cập nhật lâu dài',
        'Camera sau': 'Cảm biến chất lượng cao, chống rung quang học OIS, quay phim 4K',
        'Camera trước': 'Selfie sắc nét, làm đẹp tự nhiên',
        'Chipset / CPU': 'Hiệu năng mạnh mẽ, xử lý mượt mà mọi tác vụ',
        'RAM & Bộ nhớ': `${product.ram || '8GB'} RAM - ${product.storage || '128GB'} ROM`,
        'Pin & Sạc': 'Dung lượng cao, sạc nhanh tiện lợi',
        'Tiện ích': 'Kháng nước kháng bụi, Bảo mật vân tay / Khuôn mặt',
      };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <SEO
        title={`${product.name} — Tấn Đạt Smartphone (Huế)`}
        description={product.description || `Mua ${product.name} chính hãng giá tốt tại Tấn Đạt Smartphone, Chợ Phong Xuân, Phong Điền, TP. Huế.`}
        image={product.images[0]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-blue-600 shrink-0">Trang chủ</Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <Link to="/dien-thoai" className="hover:text-blue-600 shrink-0">Điện thoại</Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <Link to={`/dien-thoai?brand=${product.brand}`} className="hover:text-blue-600 shrink-0">{product.brand}</Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-bold truncate">{product.name}</span>
        </nav>

        {/* Top Product Hero Block */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Gallery Images */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 p-4 flex items-center justify-center">
                <img
                  src={selectedImage || product.images[0]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300"
                />
                {discountPercent && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-xl shadow-md">
                    Giảm {discountPercent}%
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-label="Thêm vào yêu thích"
                  className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md transition-all ${
                    isFavorite
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-white text-slate-400 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-2xl overflow-hidden border-2 p-1 bg-slate-50 shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-blue-600 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt={`${product.name}-${idx}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Pricing, Options & Exclusive Offers */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{avgRating}</span>
                    <span className="text-slate-400">({reviewsList.length} đánh giá)</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500">Đã bán {product.sold || 25} máy</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100 flex flex-wrap items-baseline gap-4">
                <div className="text-2xl sm:text-3xl font-black text-blue-600">
                  {formatPrice(product.price)}
                </div>
                {product.oldPrice && product.oldPrice > product.price && (
                  <div className="text-base text-slate-400 line-through font-semibold">
                    {formatPrice(product.oldPrice)}
                  </div>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg ml-auto">
                  ✔ Còn hàng ({product.stock} máy có sẵn)
                </span>
              </div>

              {/* Color Select */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                    Chọn màu sắc: <span className="text-blue-600">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Exclusive Store Gifts at Tan Dat */}
              <div className="p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/50 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-800 tracking-wider">
                  <Gift className="w-4 h-4 text-amber-600" />
                  <span>Ưu đãi độc quyền tại Tấn Đạt Smartphone:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Tặng kèm <b>Ốp lưng cao cấp + Dán cường lực miễn phí</b> trọn đời máy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Giảm <b>20%</b> khi mua phụ kiện (Củ sạc 20W/65W, Tai nghe, Sạc dự phòng)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Hỗ trợ <b>Thu cũ đổi mới</b> lên đời trợ giá lên đến 2.000.000đ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Bảo hành phần mềm & Vệ sinh khử trùng máy <b>miễn phí trọn đời</b></span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span>MUA NGAY (GIAO TẬN NƠI)</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
              </div>

              {/* Fast Hotline Contact */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Cần tư vấn nhanh cấu hình & giá tốt?</span>
                </span>
                <a href="tel:0935677775" className="text-blue-600 font-bold hover:underline">
                  Gọi 093 567 7775
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Tech Specs Sheet, In the Box, and Customer Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Tabs Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tab Switches */}
            <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'specs'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Thông Số Kỹ Thuật Chi Tiết
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'reviews'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Đánh Giá Khách Hàng ({reviewsList.length})
              </button>
              <button
                onClick={() => setActiveTab('desc')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'desc'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bài Viết Đánh Giá
              </button>
            </div>

            {/* Tab 1: Full Specifications Sheet */}
            {activeTab === 'specs' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-blue-600" />
                    <span>Bảng thông số kỹ thuật {product.name}</span>
                  </h3>
                </div>

                {/* Specs Table */}
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden text-sm">
                  {Object.entries(specsObject).map(([key, val], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 gap-2 ${
                        idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'
                      }`}
                    >
                      <span className="font-bold text-slate-700 text-xs sm:text-sm">{key}</span>
                      <span className="sm:col-span-2 text-slate-800 text-xs sm:text-sm leading-relaxed">
                        {val as string}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Highlights List */}
                {product.highlights && product.highlights.length > 0 && (
                  <div className="pt-4 space-y-3">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Đặc điểm nổi bật của máy:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.highlights.map((hl: string, idx: number) => (
                        <div key={idx} className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-slate-800 font-medium flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Reviews & Ratings */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8 animate-in fade-in duration-200">
                {/* Rating Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 items-center text-center sm:text-left">
                  <div className="sm:border-r sm:border-slate-200 sm:pr-6">
                    <div className="text-4xl font-black text-slate-900">{avgRating} / 5</div>
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 my-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">{reviewsList.length} đánh giá hài lòng</p>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5 text-xs text-slate-600">
                    <p className="font-bold text-slate-800">Cam kết dịch vụ tại Tấn Đạt Smartphone:</p>
                    <p>✔ 100% đánh giá từ khách hàng đã mua và trải nghiệm thực tế.</p>
                    <p>✔ Hỗ trợ kỹ thuật và bảo hành nhanh chóng tại cửa hàng Chợ Phong Xuân.</p>
                  </div>
                </div>

                {/* Review Form */}
                <form onSubmit={handleReviewSubmit} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span>Gửi đánh giá của bạn về sản phẩm này</span>
                  </h4>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Đánh giá số sao:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 text-amber-400 hover:scale-125 transition-transform"
                        >
                          <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên của bạn *"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder="Số điện thoại (để nhận quà tri ân)"
                      value={reviewerPhone}
                      onChange={(e) => setReviewerPhone(e.target.value)}
                      className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <textarea
                    rows={3}
                    required
                    placeholder="Chia sẻ cảm nhận của bạn về chất lượng máy, tốc độ phục vụ..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittingReview ? 'Đang gửi...' : 'Gửi đánh giá'}</span>
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm">Nhận xét từ khách hàng ({reviewsList.length})</h4>
                  <div className="divide-y divide-slate-100">
                    {reviewsList.map((rev: any, idx: number) => (
                      <div key={idx} className="py-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                              {rev.userName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <span className="font-bold text-slate-800 text-xs">{rev.userName}</span>
                              <span className="inline-block ml-2 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                                ✔ Đã mua tại Tấn Đạt Smartphone
                              </span>
                            </div>
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-10">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Detailed Description */}
            {activeTab === 'desc' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-slate-700 leading-relaxed text-sm animate-in fade-in duration-200">
                <h3 className="text-lg font-bold text-slate-900">Đánh giá chi tiết {product.name}</h3>
                <p>{product.description || 'Sản phẩm chính hãng với thiết kế sang trọng, hiệu năng bền bỉ và camera đẳng cấp.'}</p>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                  <p className="font-bold text-slate-900">Cam kết nguồn gốc:</p>
                  <p>Mọi sản phẩm bán ra tại <b>Tấn Đạt Smartphone</b> đều có nguồn gốc minh bạch, đầy đủ hóa đơn chứng từ và bảo hành theo đúng quy chuẩn nhà sản xuất.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: In the Box & Guarantees */}
          <div className="lg:col-span-4 space-y-6">
            {/* In The Box (Hộp Phụ Kiện) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                <span>Hộp sản phẩm gồm có:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {(product.inBox && product.inBox.length > 0 ? product.inBox : [
                  `Thân máy ${product.name}`,
                  'Cáp sạc chính hãng',
                  'Sách hướng dẫn sử dụng',
                  'Cây lấy SIM',
                  'Tặng ốp lưng & dán cường lực tại Tấn Đạt',
                ]).map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees & Policy */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">Chính Sách Bán Hàng & Bảo Hành</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Bảo hành dài hạn:</span>
                    <p className="text-slate-500 mt-0.5">{product.warranty || '12 Tháng chính hãng, 1 đổi 1 trong 30 ngày'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <RotateCcw className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Đổi mới 30 ngày:</span>
                    <p className="text-slate-500 mt-0.5">Lỗi là đổi máy mới ngay không mất phí</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Giao hàng tận nơi:</span>
                    <p className="text-slate-500 mt-0.5">Miễn phí giao hàng tại Huế & Toàn quốc</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Wrench className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Hỗ trợ kỹ thuật trọn đời:</span>
                    <p className="text-slate-500 mt-0.5">Ép kính, thay pin ưu đãi đặc quyền cho khách quen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Sản phẩm tương tự cùng thương hiệu {product.brand}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
