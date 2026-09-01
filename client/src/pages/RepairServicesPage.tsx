import React, { useState, useMemo } from 'react';
import {
  Wrench,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  Smartphone,
  Cpu,
  BatteryCharging,
  Layers,
  Search,
  Tag,
  ArrowRight,
  Sparkles,
  Filter,
  Check,
  HelpCircle,
  Zap,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';
import { SEO } from '../components/SEO.js';
import { TanDatLogo } from '../components/Logo.js';
import {
  REPAIR_PRICE_ITEMS,
  SERVICE_CATEGORIES,
} from '../data/repairPriceData.js';

const SERIES_FILTERS = [
  { id: 'all', name: 'Tất cả Series' },
  { id: '15', name: 'iPhone 15' },
  { id: '14', name: 'iPhone 14' },
  { id: '13', name: 'iPhone 13' },
  { id: '12', name: 'iPhone 12' },
  { id: '11', name: 'iPhone 11' },
  { id: 'x', name: 'iPhone X/XS' },
  { id: '8plus', name: 'iPhone 8+' },
];

export const RepairServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ep-kinh' | 'thay-lung' | 'cam-ung'>('all');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayLimit, setDisplayLimit] = useState<number>(9);

  const scrollToPriceTable = (catId?: 'ep-kinh' | 'thay-lung' | 'cam-ung') => {
    if (catId) {
      setSelectedCategory(catId);
    }
    const element = document.getElementById('bang-gia');
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const generalServices = [
    {
      title: 'Ép Kính Smartphone Lấy Liền',
      icon: Smartphone,
      categoryKey: 'ep-kinh' as const,
      desc: 'Công nghệ hút chân không tự động, giữ trọn màn hình và cảm ứng gốc. Áp dụng cho iPhone, Samsung, Xiaomi, OPPO...',
      time: '30 - 60 Phút',
      warranty: 'Keo bọt 12 tháng',
    },
    {
      title: 'Thay Lưng Kính Cắt Mắt',
      icon: Layers,
      categoryKey: 'thay-lung' as const,
      desc: 'Kính lưng chuẩn màu zin, cắt mắt camera CNC khít đẹp không hở bụi, không cần tháo máy bung main.',
      time: '30 - 45 Phút',
      warranty: 'Hở keo trọn đời',
    },
    {
      title: 'Thay Cảm Ứng (Sàng IC)',
      icon: Cpu,
      categoryKey: 'cam-ung' as const,
      desc: 'Xử lý triệt để đơ loạn cảm ứng. Sàng IC gốc chuẩn hãng, không cảnh báo linh kiện trên iOS.',
      time: '45 - 90 Phút',
      warranty: 'Cảm ứng 3 tháng',
    },
    {
      title: 'Thay Pin & Phần Cứng',
      icon: BatteryCharging,
      categoryKey: null,
      desc: 'Thay pin dung lượng cao chính hãng, sửa chữa mất nguồn, sóng yếu, camera, chuông loa lấy ngay.',
      time: '15 - 30 Phút',
      warranty: '1 đổi 1 6 - 12T',
    },
  ];

  // Filter items based on category, series and search query
  const filteredItems = useMemo(() => {
    return REPAIR_PRICE_ITEMS.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;

      let matchSeries = true;
      if (selectedSeries !== 'all') {
        const lowerModel = item.model.toLowerCase();
        if (selectedSeries === '15') matchSeries = lowerModel.includes('15');
        else if (selectedSeries === '14') matchSeries = lowerModel.includes('14');
        else if (selectedSeries === '13') matchSeries = lowerModel.includes('13');
        else if (selectedSeries === '12') matchSeries = lowerModel.includes('12');
        else if (selectedSeries === '11') matchSeries = lowerModel.includes('11');
        else if (selectedSeries === 'x') matchSeries = lowerModel.includes('x') || lowerModel.includes('xs') || lowerModel.includes('xr');
        else if (selectedSeries === '8plus') matchSeries = lowerModel.includes('8 plus') || lowerModel.includes('8plus');
      }

      const matchSearch =
        item.model.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (item.note && item.note.toLowerCase().includes(searchQuery.toLowerCase().trim()));

      return matchCat && matchSeries && matchSearch;
    });
  }, [selectedCategory, selectedSeries, searchQuery]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, displayLimit);
  }, [filteredItems, displayLimit]);

  const hasMore = displayLimit < filteredItems.length;

  const handleShowMore = () => {
    setDisplayLimit((prev) => prev + 9);
  };

  const handleShowAll = () => {
    setDisplayLimit(filteredItems.length);
  };

  const handleCollapse = () => {
    setDisplayLimit(9);
    scrollToPriceTable();
  };

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

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10 md:py-14">
      <SEO
        title="Bảng Giá Ép Kính, Thay Lưng & Cảm Ứng iPhone — Tấn Đạt Smartphone Huế"
        description="Bảng giá ép kính màn hình, thay lưng cắt mắt, thay cảm ứng sàng IC iPhone ưu đãi giảm ngay 100k mỗi sản phẩm tại Tấn Đạt Smartphone Chợ Phong Xuân, Phong Điền, TP. Huế."
      />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-10 md:space-y-12">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-bold border border-blue-200 shadow-xs">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0">
              <TanDatLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span>TẤN ĐẠT SMARTPHONE — BẢNG GIÁ DỊCH VỤ & LINH KIỆN</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            BẢNG GIÁ ÉP KÍNH & SỬA CHỮA LINH KIỆN
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed px-1">
            Máy móc hiện đại tại <b>Chợ Phong Xuân, Phong Điền, TP. Huế</b>. Linh kiện zin chuẩn, thợ lành nghề, khách hàng theo dõi trực tiếp — lấy liền 30 - 60 phút.
          </p>

          {/* Promotion Highlight Tag */}
          <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 text-white font-extrabold text-[11px] sm:text-sm shadow-md shadow-red-500/20 animate-pulse text-center">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>ƯU ĐÃI: TẤT CẢ SẢN PHẨM TRỪ NGAY 100.000đ SO VỚI GIÁ GỐC!</span>
          </div>

          {/* Action CTAs - Responsive grid on mobile */}
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2">
            <button
              onClick={() => scrollToPriceTable()}
              className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl sm:rounded-2xl shadow-md shadow-amber-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
            >
              <Tag className="w-4 h-4" />
              <span>Xem Bảng Giá Giảm 100K</span>
            </button>
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3.5 w-full sm:w-auto">
              <a
                href="tel:0935677775"
                className="px-3 py-3 sm:px-6 sm:py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5 sm:gap-2 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
                <span className="truncate">Gọi 0935.677.775</span>
              </a>
              <a
                href="https://zalo.me/0935677775"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-3 sm:px-6 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 sm:gap-2 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="truncate">Zalo Báo Giá</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Core Repair Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {generalServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  if (srv.categoryKey) {
                    scrollToPriceTable(srv.categoryKey);
                  } else {
                    window.location.href = 'tel:0935677775';
                  }
                }}
                className="cursor-pointer bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-blue-400 transition-all flex flex-col justify-between space-y-2.5 sm:space-y-4 group active:scale-[0.98]"
              >
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    {srv.categoryKey && (
                      <span className="text-[10px] sm:text-[11px] font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform hidden xs:inline-flex items-center gap-0.5">
                        Xem giá <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {srv.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-2 sm:pt-3 border-t border-slate-100 flex flex-col gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold">
                  <div className="flex items-center gap-1 text-slate-700">
                    <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{srv.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3 h-3 shrink-0" />
                    <span className="truncate">{srv.warranty}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Price Table Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-8" id="bang-gia">
          {/* Section Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-1.5 border border-amber-200">
                <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>BẢNG GIÁ NIÊM YẾT MINH BẠCH</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Tra Cứu Bảng Giá Ép Kính & Linh Kiện iPhone
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tất cả giá dưới đây đã áp dụng ưu đãi <span className="font-bold text-red-600">trừ 100.000đ</span>, bao trọn gói công thợ và bảo hành.
              </p>
            </div>

            {/* Quick Search Mobile-friendly */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm dòng máy (vd: 12, 14 pro max, xs)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setDisplayLimit(filteredItems.length || 9);
                }}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 1. Category Filter Tabs - Horizontal Scroll on Mobile */}
          <div className="space-y-2">
            <div className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
              Chọn dịch vụ:
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap no-scrollbar">
              {SERVICE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setDisplayLimit(9);
                    }}
                    className={`shrink-0 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 active:scale-95 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm scale-[1.02]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.id === 'ep-kinh' && <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />}
                    {cat.id === 'thay-lung' && <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />}
                    {cat.id === 'cam-ung' && <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
                    {cat.id === 'all' && <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />}
                    <span>{cat.shortName}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full font-extrabold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
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
          </div>

          {/* 2. Series Quick Filter Chips - Horizontal Scroll on Mobile */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <div className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Lọc theo dòng máy:</span>
              {(selectedSeries !== 'all' || selectedCategory !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedSeries('all');
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setDisplayLimit(9);
                  }}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 active:scale-95"
                >
                  <RotateCcw className="w-3 h-3" />
                  Đặt lại
                </button>
              )}
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap no-scrollbar">
              {SERIES_FILTERS.map((s) => {
                const isActive = selectedSeries === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSeries(s.id);
                      setDisplayLimit(9);
                    }}
                    className={`shrink-0 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs transition-all active:scale-95 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count bar */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 pt-1 pb-1">
            <span>
              Tìm thấy <b className="text-slate-900">{filteredItems.length}</b> sản phẩm
              {filteredItems.length > 0 && ` (Hiển thị ${visibleItems.length}/${filteredItems.length})`}
            </span>
            {hasMore && (
              <span className="text-blue-600 font-bold hidden sm:inline-block">
                Còn {filteredItems.length - visibleItems.length} sản phẩm
              </span>
            )}
          </div>

          {/* Grid of items */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-10 sm:py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 px-4">
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Không tìm thấy linh kiện nào phù hợp.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedSeries('all');
                  setDisplayLimit(9);
                }}
                className="mt-3 text-xs text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Xem lại toàn bộ bảng giá
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {visibleItems.map((item) => {
                const catBadge = getCategoryBadge(item.category);
                const isCall = item.discountedPrice === null;

                return (
                  <div
                    key={item.id}
                    className="relative bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2.5 sm:space-y-3">
                      {/* Badge Top */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg border ${catBadge.bg}`}>
                          {catBadge.label}
                        </span>

                        {!isCall && (
                          <span className="text-[10px] sm:text-[11px] font-extrabold px-1.5 py-0.5 sm:px-2 rounded-md bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                            <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            -100K
                          </span>
                        )}
                      </div>

                      {/* Model Name */}
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.model}
                        </h4>
                        {item.note && (
                          <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price Block & Action */}
                    <div className="pt-3 sm:pt-4 mt-2 sm:mt-3 border-t border-slate-100 space-y-2.5 sm:space-y-3">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Giá ưu đãi:</div>
                          {isCall ? (
                            <div className="text-base sm:text-lg font-black text-amber-600 flex items-center gap-1">
                              <span>Liên hệ báo giá</span>
                            </div>
                          ) : (
                            <div className="flex items-baseline gap-1.5 sm:gap-2">
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

                        <div className="text-right">
                          <div className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold inline-flex items-center gap-0.5 sm:gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Bảo hành</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] sm:text-[11px] text-slate-600 flex items-center gap-1.5 bg-slate-50 p-1.5 sm:p-2 rounded-xl border border-slate-100">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.warranty}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <a
                          href={`tel:0935677775`}
                          className="py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1 active:scale-95"
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
                          className="py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1 active:scale-95"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Zalo Tư Vấn</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Show More / Expand Controls */}
          {filteredItems.length > 9 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-100">
              {hasMore ? (
                <>
                  <button
                    onClick={handleShowMore}
                    className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-md shadow-blue-600/20 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <ChevronDown className="w-4 h-4" />
                    <span>Xem Thêm 9 Sản Phẩm (Còn {filteredItems.length - visibleItems.length})</span>
                  </button>
                  <button
                    onClick={handleShowAll}
                    className="w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
                  >
                    <span>Xem Tất Cả ({filteredItems.length})</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCollapse}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>Thu Gọn Danh Sách</span>
                </button>
              )}
            </div>
          )}

          {/* Quick Summary Note */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-xs sm:text-sm">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
              <span>Ghi chú dịch vụ tại Tấn Đạt Smartphone:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-amber-800 text-[11px] sm:text-xs">
              <li><b>Giá trên là giá trọn gói:</b> Đã bao gồm công thợ tháo ráp, vệ sinh máy và bảo hành, không phát sinh chi phí phụ.</li>
              <li><b>Ép kính:</b> Giữ trọn màn hình và cảm ứng nguyên bản của máy, máy móc hút chân không hiện đại nhất.</li>
              <li><b>Thay nắp lưng:</b> Cắt mắt camera CNC tinh xảo, khít đẹp như zin mới xuất xưởng.</li>
              <li><b>Thay cảm ứng iPhone:</b> Đã bao gồm công sàng IC cảm ứng chính hãng để màn hình hoạt động mượt mà và không báo lỗi.</li>
            </ul>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 space-y-6 sm:space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
            <h2 className="text-xl sm:text-3xl font-extrabold">Quy Trình Sửa Chữa Tại Tấn Đạt</h2>
            <p className="text-xs sm:text-sm text-slate-400">Nhanh chóng — Chuẩn xác — Minh bạch 100%</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 sm:space-y-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-xs sm:text-sm">
                1
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-white">Tiếp Nhận & Kiểm Tra</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                Kỹ thuật viên kiểm tra toàn diện tình trạng máy trực tiếp trước mặt khách hàng.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 sm:space-y-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-xs sm:text-sm">
                2
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-white">Tư Vấn & Báo Giá</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                Báo đúng mã linh kiện, áp dụng ưu đãi giảm 100.000đ, cam kết không phát sinh.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 sm:space-y-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-xs sm:text-sm">
                3
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-white">Tiến Hành Ép / Sửa</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                Thực hiện bằng máy ép kính chân không hoặc thay thế linh kiện lấy liền sau 30-60 phút.
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 sm:space-y-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-xs sm:text-sm">
                4
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-white">Bàn Giao & Bảo Hành</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                Khách hàng kiểm tra hài lòng, dán tem bảo hành và viết phiếu bảo hành chu đáo.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-slate-200 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs sm:text-sm">
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>CÂU HỎI THƯỜNG GẶP (FAQ)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Giải Đáp Thắc Mắc Khi Ép Kính & Sửa Chữa</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 pt-1">
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 sm:space-y-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Ép kính có ảnh hưởng đến màn hình hiển thị không?</h4>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                Hoàn toàn không. Công nghệ ép kính chân không chỉ bóc tách lớp kính vỡ bên ngoài và dán lớp kính mới, giữ lại 100% màn hình hiển thị OLED/Retina gốc của máy.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 sm:space-y-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Sàng IC cảm ứng iPhone là gì?</h4>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                Từ các dòng iPhone X/11/12 trở lên, khi thay cảm ứng kỹ thuật viên Tấn Đạt sẽ chuyển (sàng) con chip IC cảm ứng gốc từ màn hình cũ sang màn hình mới, giúp máy hoạt động trơn tru và không bị cảnh báo linh kiện.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 sm:space-y-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Thay nắp lưng cắt mắt có cần tháo bung máy không?</h4>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                Thay lưng cắt mắt là công nghệ hiện đại giúp thay thế kính nắp lưng chuẩn xác vừa khít với cụm camera mà không cần tháo rời toàn bộ linh kiện bên trong, đảm bảo an toàn tối đa cho bo mạch.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 sm:space-y-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Thời gian bảo hành dịch vụ là bao lâu?</h4>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                Ép kính bảo hành bọt keo 12 tháng; thay cảm ứng bảo hành 3 tháng bao gồm sàng IC; thay lưng bảo hành khít keo trọn đời. Quý khách hoàn toàn an tâm sử dụng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
