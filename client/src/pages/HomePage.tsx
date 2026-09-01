import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  ShieldCheck,
  Award,
  Phone,
  Wrench,
  CheckCircle2,
  Smartphone,
  Layers,
  Cpu,
  Tag,
  MessageCircle,
  Clock,
  Check,
} from 'lucide-react';
import { api } from '../services/api.js';
import { SEO } from '../components/SEO.js';
import { TanDatLogo } from '../components/Logo.js';
import {
  REPAIR_PRICE_ITEMS,
  SERVICE_CATEGORIES,
} from '../data/repairPriceData.js';

export const HomePage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepairCategory, setSelectedRepairCategory] = useState<'all' | 'ep-kinh' | 'thay-lung' | 'cam-ung'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await api.getBlogPosts({ limit: '3', published: 'true' });
        if (blogRes.success) setBlogPosts(blogRes.data);
      } catch (err) {
        console.error('Lỗi tải dữ liệu bài viết:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const brands = [
    { name: 'iPhone Chính Hãng', slug: 'Apple', logo: '', color: 'from-slate-900 to-slate-800' },
    { name: 'Samsung Galaxy', slug: 'Samsung', logo: 'SAMSUNG', color: 'from-blue-900 to-blue-800' },
    { name: 'Xiaomi Giá Tốt', slug: 'Xiaomi', logo: 'MI', color: 'from-orange-600 to-amber-600' },
    { name: 'OPPO Camera Đẹp', slug: 'OPPO', logo: 'OPPO', color: 'from-emerald-700 to-teal-800' },
  ];

  // Filter repair items for homepage showcase
  const featuredRepairItems = useMemo(() => {
    let items = REPAIR_PRICE_ITEMS;
    if (selectedRepairCategory !== 'all') {
      items = items.filter((item) => item.category === selectedRepairCategory);
    }
    // Return top 12 items
    return items.slice(0, 12);
  }, [selectedRepairCategory]);

  const formatPrice = (price: number | null) => {
    if (price === null) return 'Liên hệ';
    return price.toLocaleString('vi-VN') + ' đ';
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'ep-kinh':
        return { label: 'Ép Kính', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'thay-lung':
        return { label: 'Thay Lưng', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'cam-ung':
        return { label: 'Thay Cảm Ứng (Sàng IC)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      default:
        return { label: 'Dịch Vụ', bg: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Tấn Đạt Smartphone',
    image: '/logo.svg',
    telephone: '0935677775',
    priceRange: '150000VND - 50000000VND',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chợ Phong Xuân',
      addressLocality: 'Huyện Phong Điền',
      addressRegion: 'Thừa Thiên Huế',
      addressCountry: 'VN',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Tấn Đạt Smartphone — Mua Bán, Sửa Chữa & Ép Kính Chuyên Nghiệp (TP. Huế)"
        description="Tấn Đạt Smartphone: Dịch vụ sửa chữa, thay màn hình, ép kính lấy liền, thay lưng cắt mắt, thay cảm ứng sàng IC tại Chợ Phong Xuân, Phong Điền, TP. Huế. Hotline: 093 567 7775."
        image="/logo.svg"
        schema={structuredData}
      />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-12 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.3),rgba(255,255,255,0))]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold backdrop-blur-md">
                <div className="w-5 h-5 rounded-full bg-white p-0.5 flex items-center justify-center">
                  <TanDatLogo className="w-4 h-4" />
                </div>
                <span>TẤN ĐẠT SMARTPHONE — CHỢ PHONG XUÂN, HUẾ</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                MUA BÁN • SỬA CHỮA <br />
                <span className="bg-gradient-to-r from-amber-300 via-blue-300 to-sky-300 bg-clip-text text-transparent">
                  ÉP KÍNH SMARTPHONE
                </span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Điểm đến tin cậy tại Thừa Thiên Huế. Cam kết <b>Uy Tín • Chất Lượng • Giá Tốt • Bảo Hành Dài Hạn</b> cho mọi khách hàng.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/dich-vu-sua-chua#bang-gia"
                  className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-500/30 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  Bảng giá ép kính (-100K)
                </Link>
                <Link
                  to="/dien-thoai"
                  className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  Xem điện thoại mới
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 4 Core commitments */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-black text-blue-300 uppercase">UY TÍN</div>
                  <div className="text-[11px] text-slate-400">Hàng đầu khu vực</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-black text-amber-300 uppercase">CHẤT LƯỢNG</div>
                  <div className="text-[11px] text-slate-400">Linh kiện zin chuẩn</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-black text-emerald-300 uppercase">GIẢM 100K</div>
                  <div className="text-[11px] text-slate-400">Mỗi dịch vụ</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-black text-purple-300 uppercase">BẢO HÀNH</div>
                  <div className="text-[11px] text-slate-400">Dài hạn chu đáo</div>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase with Official Logo */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl p-6 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md">
                      <TanDatLogo className="w-9 h-9" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-white">TẤN ĐẠT</h3>
                      <p className="text-xs text-amber-300 font-medium">Smartphone & Ép Kính</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30">
                    Đang mở cửa
                  </span>
                </div>

                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-inner bg-slate-900">
                  <img
                    src="/images/repair/thay_lung.jpg"
                    alt="Linh kiện và sửa chữa tại Tấn Đạt Smartphone"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">Ưu Đãi Đặc Biệt</p>
                    <p className="text-sm font-extrabold text-white">Ép Kính & Thay Lưng Giảm Trực Tiếp 100K</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <a
                    href="tel:0935677775"
                    className="p-3 rounded-xl bg-red-600 hover:bg-red-700 transition-colors text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30"
                  >
                    <Phone className="w-4 h-4" />
                    <span>093 567 7775</span>
                  </a>
                  <Link
                    to="/dich-vu-sua-chua"
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/20"
                  >
                    <Wrench className="w-4 h-4 text-amber-300" />
                    <span>Báo Giá Nhanh</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              to={`/dien-thoai?brand=${brand.slug}`}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex items-center gap-3 sm:gap-4 group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${brand.color} text-white flex items-center justify-center font-black text-sm shadow-md group-hover:scale-110 transition-transform`}
              >
                {brand.logo}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                  {brand.name}
                </h4>
                <span className="text-xs text-slate-400">Xem ngay →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== REPAIR & GLASS REPLACEMENT FEATURED PRODUCTS (REPLACED SECTION) ==================== */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-red-600 bg-red-50 px-3 py-1 rounded-full mb-2 border border-red-200">
              <Flame className="w-4 h-4 text-red-500 fill-red-500" />
              <span>DỊCH VỤ SỬA CHỮA & ÉP KÍNH BÁN CHẠY NHẤT TẠI TẤN ĐẠT</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Bảng Giá Ép Kính, Thay Lưng & Cảm Ứng iPhone
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Linh kiện chuẩn zin, ép máy hút chân không lấy ngay — <span className="font-bold text-red-600">Ưu đãi giảm trực tiếp 100.000đ</span> mỗi sản phẩm.
            </p>
          </div>

          <Link
            to="/dich-vu-sua-chua#bang-gia"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 hover:gap-2 transition-all self-start md:self-end bg-blue-50 px-4 py-2 rounded-xl border border-blue-200"
          >
            <span>Xem toàn bộ 39 dịch vụ (-100K)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 sm:flex-wrap no-scrollbar">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = selectedRepairCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedRepairCategory(cat.id)}
                className={`shrink-0 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 active:scale-95 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.id === 'ep-kinh' && <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />}
                {cat.id === 'thay-lung' && <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />}
                {cat.id === 'cam-ung' && <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
                {cat.id === 'all' && <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />}
                <span>{cat.shortName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full font-extrabold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.id === 'all'
                    ? REPAIR_PRICE_ITEMS.length
                    : REPAIR_PRICE_ITEMS.filter((i) => i.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Repair Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {featuredRepairItems.map((item) => {
            const catBadge = getCategoryBadge(item.category);
            const isCall = item.discountedPrice === null;

            return (
              <div
                key={item.id}
                className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between group"
              >
                {/* Image Banner */}
                <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.model}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                    <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md border shadow-xs bg-white/95 backdrop-blur-xs ${catBadge.bg}`}>
                      {catBadge.label}
                    </span>

                    {!isCall && (
                      <span className="text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-md bg-red-600 text-white shadow-xs flex items-center gap-1 animate-pulse">
                        <Tag className="w-2.5 h-2.5" />
                        -100K
                      </span>
                    )}
                  </div>

                  {/* Model Name */}
                  <div className="absolute bottom-2 left-2.5 right-2.5">
                    <h4 className="text-sm sm:text-base font-extrabold text-white truncate drop-shadow-sm">
                      {item.model}
                    </h4>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
                  <div>
                    {item.note && (
                      <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {item.note}
                      </p>
                    )}
                  </div>

                  {/* Price Block */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Giá ưu đãi:</div>
                        {isCall ? (
                          <div className="text-base sm:text-lg font-black text-amber-600">
                            Liên hệ báo giá
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-lg sm:text-xl font-black text-red-600">
                              {formatPrice(item.discountedPrice)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-[11px] sm:text-xs text-slate-400 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold inline-flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Bảo hành</span>
                      </div>
                    </div>

                    <div className="text-[10px] sm:text-[11px] text-slate-600 flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{item.warranty}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={`tel:0935677775`}
                        className="py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1 active:scale-95"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Gọi Ngay</span>
                      </a>
                      <a
                        href={`https://zalo.me/0935677775?text=${encodeURIComponent(
                          `Chào shop, tôi muốn hỏi giá dịch vụ ${item.model} (${catBadge.label})`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1 active:scale-95"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Zalo Tư Vấn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all CTA at bottom of section */}
        <div className="text-center pt-8">
          <Link
            to="/dich-vu-sua-chua#bang-gia"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-600/25 transition-all hover:scale-105 active:scale-95 text-sm"
          >
            <span>Tra Cứu Toàn Bộ Bảng Giá Ép Kính & Linh Kiện iPhone (-100K)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Repair & Glass Replacement Highlight Banner */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(circle_at_center,white,transparent)]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] sm:text-xs font-bold border border-amber-400/30">
                <Wrench className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>DỊCH VỤ TẠI TP. HUẾ — ƯU ĐÃI GIẢM 100K</span>
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Ép Kính, Thay Lưng & Cảm Ứng Smartphone Lấy Liền
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
                Cửa hàng Tấn Đạt trang bị máy ép chân không tự động, kính lưng cắt mắt camera chuẩn zin, sàng IC cảm ứng không báo lỗi. <span className="text-amber-300 font-bold">Ưu đãi giảm ngay 100.000đ</span> cho toàn bộ dòng iPhone từ iP 8 Plus đến iPhone 15 Pro Max.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <Link
                  to="/dich-vu-sua-chua#bang-gia"
                  className="px-5 py-3 sm:px-6 sm:py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl sm:rounded-2xl text-xs sm:text-sm transition-all shadow-md shadow-amber-400/20 hover:scale-105 text-center"
                >
                  Xem Bảng Giá Giảm 100K
                </Link>
                <a
                  href="tel:0935677775"
                  className="px-5 py-3 sm:px-6 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl sm:rounded-2xl text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-300" />
                  <span>Gọi 093 567 7775 (Báo Giá Nhanh)</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                  <TanDatLogo className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-300 text-sm">TẤN ĐẠT SMARTPHONE</h4>
                  <p className="text-[11px] text-slate-300">Cam Kết Chất Lượng</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Trực tiếp theo dõi quá trình sửa chữa</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lấy máy ngay sau 30 - 60 phút</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bảo hành bọt keo, bụi màn hình vĩnh viễn</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Giá cả công khai, không phát sinh chi phí</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Guarantees */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Tại Sao Chọn Tấn Đạt Smartphone?
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Chợ Phong Xuân, Phong Điền, TP. Huế — Nơi mang đến sự an tâm tuyệt đối cho chiếc điện thoại của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Bảo Hành Dài Hạn</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Lên đến 12 tháng chính hãng, 1 đổi 1 trong 30 ngày đầu nếu phát sinh lỗi phần cứng.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Linh Kiện Chính Hãng</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  100% máy nguyên bản, được kiểm định nghiêm ngặt 32 bước bởi đội ngũ kỹ thuật viên.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Ép Kính & Sửa Lấy Liền</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Máy móc công nghệ cao, xử lý sự cố nhanh chóng trong 30 - 60 phút, khách xem trực tiếp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog & News */}
      {blogPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                Kiến thức & Thủ thuật
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Tin Tức Công Nghệ Mới Nhất
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 hover:gap-2 transition-all self-start sm:self-center"
            >
              Xem tất cả bài viết
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col group"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">
                      {post.category || 'Công nghệ'}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                    <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Đọc tiếp →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
