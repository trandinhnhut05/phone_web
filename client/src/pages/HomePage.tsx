import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Wrench,
  Award,
  Phone,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { api } from '../services/api.js';
import { ProductCard, ProductType } from '../components/ProductCard.js';
import { SEO } from '../components/SEO.js';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, blogRes] = await Promise.all([
          api.getProducts({ limit: '8', sort: 'popular' }),
          api.getBlogPosts({ limit: '3', published: 'true' }),
        ]);

        if (prodRes.success) setFeaturedProducts(prodRes.data);
        if (blogRes.success) setBlogPosts(blogRes.data);
      } catch (err) {
        console.error('Lỗi tải dữ liệu trang chủ:', err);
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Tấn Đạt Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    telephone: '0935677775',
    priceRange: '2000000VND - 50000000VND',
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
        description="Tấn Đạt Smartphone: Chuyên cung cấp iPhone, Samsung, Xiaomi, OPPO chính hãng. Dịch vụ sửa chữa, thay màn hình, ép kính lấy liền tại Chợ Phong Xuân, Phong Điền, TP. Huế. Hotline: 093 567 7775."
        schema={structuredData}
      />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-12 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.3),rgba(255,255,255,0))]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-300" />
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

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/dien-thoai"
                  className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  Xem mẫu điện thoại mới
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/dich-vu-sua-chua"
                  className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-500/20 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4 text-slate-950" />
                  Dịch vụ ép kính & sửa chữa
                </Link>
              </div>

              {/* 4 Core commitments from signboard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-black text-blue-300 uppercase">UY TÍN</div>
                  <div className="text-[11px] text-slate-400">Hàng đầu khu vực</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-black text-amber-300 uppercase">CHẤT LƯỢNG</div>
                  <div className="text-[11px] text-slate-400">Máy nguyên bản</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-black text-emerald-300 uppercase">GIÁ TỐT</div>
                  <div className="text-[11px] text-slate-400">Nhiều ưu đãi</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-black text-purple-300 uppercase">BẢO HÀNH</div>
                  <div className="text-[11px] text-slate-400">Dài hạn chu đáo</div>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-amber-500 to-indigo-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900/80 backdrop-blur-md p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                        TĐ
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">TẤN ĐẠT SMARTPHONE</div>
                        <div className="text-[10px] text-slate-400">Chợ Phong Xuân, Phong Điền, Huế</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Đang mở cửa
                    </span>
                  </div>

                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
                    alt="iPhone flagship showcase"
                    className="w-full h-56 object-cover rounded-2xl"
                  />

                  <div className="p-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-amber-400 font-bold uppercase">Hỗ trợ tư vấn 24/7</span>
                      <span className="text-xs text-slate-300 font-bold">093 567 7775</span>
                    </div>
                    <a
                      href="tel:0935677775"
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-center block text-sm transition-all"
                    >
                      📞 Gọi Hotline Nhận Báo Giá Ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Selector Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              to={`/dien-thoai?brand=${brand.slug}`}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${brand.color} text-white font-black text-sm flex items-center justify-center shadow-md shrink-0`}>
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

      {/* Featured Products / Hot Sales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-red-600 bg-red-50 px-3 py-1 rounded-full mb-2">
              <Flame className="w-4 h-4 text-red-500 fill-red-500" />
              Sản phẩm bán chạy nhất tại Tấn Đạt Smartphone
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Smartphone Giá Tốt & Bảo Hành Dài Hạn
            </h2>
          </div>

          <Link
            to="/dien-thoai"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 hover:gap-2 transition-all self-start sm:self-center"
          >
            Xem tất cả sản phẩm
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 animate-pulse space-y-3">
                <div className="w-full aspect-square bg-slate-200 rounded-xl"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500">Chưa có sản phẩm nào.</p>
          </div>
        )}
      </section>

      {/* Repair & Glass Replacement Highlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(circle_at_center,white,transparent)]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Wrench className="w-3.5 h-3.5" />
                <span>DỊCH VỤ CHUYÊN NGHIỆP TẠI TP. HUẾ</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Ép Kính & Sửa Chữa Smartphone Lấy Liền
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Cửa hàng Tấn Đạt trang bị hệ thống máy móc ép kính chân không công nghệ cao, thay màn hình, thay pin, sửa chữa mainboard với linh kiện chính hãng và bảo hành chu đáo.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/dich-vu-sua-chua"
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-all"
                >
                  Xem Bảng Giá Sửa Chữa
                </Link>
                <a
                  href="tel:0935677775"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm border border-white/20 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-300" />
                  Gọi 093 567 7775 (Tư Vấn Miễn Phí)
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-3">
              <h4 className="font-bold text-amber-300 text-sm">Cam Kết Dịch Vụ</h4>
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
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Uy Tín & Chất Lượng</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tất cả máy bán ra đều được kiểm tra kỹ thuật nghiêm ngặt 32 bước, cam kết máy nguyên zin, không bán hàng kém chất lượng.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Giá Tốt & Bảo Hành Dài Hạn</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mức giá cạnh tranh nhất khu vực Phong Điền - Huế. Chế độ bảo hành 1 đổi 1 và hỗ trợ phần mềm trọn đời.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Sửa Chữa Chuyên Nghiệp</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Đội ngũ thợ tay nghề cao, ép kính smartphone bằng công nghệ hiện đại lấy liền, thay thế linh kiện minh bạch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog & Tech News */}
      {blogPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Mẹo Hay & Tư Vấn Công Nghệ
              </h2>
              <p className="text-sm text-slate-500 mt-1">Kinh nghiệm sử dụng và chọn mua smartphone từ Tấn Đạt</p>
            </div>
            <Link
              to="/blog"
              className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Xem tất cả bài viết →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                    <span>{post.views} lượt xem</span>
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
