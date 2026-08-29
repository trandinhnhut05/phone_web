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
    { name: 'Apple iPhone', slug: 'Apple', logo: '', color: 'from-slate-900 to-slate-800' },
    { name: 'Samsung Galaxy', slug: 'Samsung', logo: 'SAMSUNG', color: 'from-blue-900 to-blue-800' },
    { name: 'Xiaomi Flagship', slug: 'Xiaomi', logo: 'MI', color: 'from-orange-600 to-amber-600' },
    { name: 'OPPO Series', slug: 'OPPO', logo: 'OPPO', color: 'from-emerald-700 to-teal-800' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'PhoneStore Vietnam',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    telephone: '19006868',
    priceRange: '5000000VND - 50000000VND',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Đường Công Nghệ, Quận 1',
      addressLocality: 'Hồ Chí Minh',
      addressCountry: 'VN',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="PhoneStore — Hệ Thống Điện Thoại Chính Hãng Giá Tốt Nhất"
        description="Mua điện thoại iPhone 16 Pro Max, Samsung Galaxy S25 Ultra, Xiaomi 15 Pro, OPPO Find X8 chính hãng 100%, bảo hành uy tín."
        schema={structuredData}
      />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-12 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Siêu phẩm 2026 chính thức lên kệ
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Đỉnh Cao Công Nghệ. <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
                  Trải Nghiệm Đột Phá.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Sở hữu ngay các dòng flagship đình đám với mức giá ưu đãi độc quyền. Cam kết 100% hàng chính hãng, đổi trả trong 30 ngày.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/dien-thoai"
                  className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  Khám phá ngay
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/dien-thoai?brand=Apple"
                  className="px-7 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold rounded-2xl border border-slate-700 backdrop-blur-md hover:scale-105 transition-all duration-200"
                >
                  iPhone Series
                </Link>
              </div>

              {/* Badges list */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-xl font-extrabold text-blue-400">100%</div>
                  <div className="text-xs text-slate-400">Chính hãng VNA</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-indigo-400">2H</div>
                  <div className="text-xs text-slate-400">Giao siêu tốc</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-emerald-400">0%</div>
                  <div className="text-xs text-slate-400">Trả góp lãi suất</div>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
                <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800/50 backdrop-blur-sm p-4">
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
                    alt="iPhone 16 Pro Max Banner"
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">Hot Pick</span>
                      <h4 className="text-lg font-bold text-white">iPhone 16 Pro Max</h4>
                      <p className="text-sm font-semibold text-slate-300">Từ 34.990.000₫</p>
                    </div>
                    <Link
                      to="/dien-thoai/iphone-16-pro-max-256gb"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Xem ngay
                    </Link>
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
                <span className="text-xs text-slate-400">Xem tất cả →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products / Flash Sale */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-red-600 bg-red-50 px-3 py-1 rounded-full mb-2">
              <Flame className="w-4 h-4 text-red-500 fill-red-500" />
              Sản phẩm bán chạy nhất
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Điện Thoại Nổi Bật 2026
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

      {/* Services & Guarantees */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Tại sao hàng ngàn khách hàng chọn PhoneStore?
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Chúng tôi luôn đặt quyền lợi và sự hài lòng của khách hàng lên vị trí hàng đầu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Chính Hãng 100%</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tất cả máy mới đều nguyên seal, phân phối chính ngạch tại Việt Nam với chế độ bảo hành 12 tháng tại các trung tâm ủy quyền toàn quốc.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Giao Hàng & Đồng Kiểm</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Miễn phí giao hàng cho đơn từ 2.000.000₫. Khách hàng được kiểm tra ngoại quan máy và phụ kiện trước khi thanh toán.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Hỗ Trợ Kỹ Thuật Trọn Đời</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Đội ngũ chuyên viên hỗ trợ cài đặt ứng dụng, chuyển dữ liệu từ máy cũ sang máy mới hoàn toàn miễn phí tại cửa hàng hoặc từ xa.
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
                Tin Tức & Đánh Giá Công Nghệ
              </h2>
              <p className="text-sm text-slate-500 mt-1">Cập nhật xu hướng và mẹo sử dụng điện thoại mới nhất</p>
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
