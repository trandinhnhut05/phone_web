import React, { useState, useMemo } from 'react';
import {
  Wrench,
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  CheckCircle2,
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
} from 'lucide-react';
import { SEO } from '../components/SEO.js';
import { TanDatLogo } from '../components/Logo.js';
import {
  REPAIR_PRICE_ITEMS,
  SERVICE_CATEGORIES,
  RepairServiceItem,
} from '../data/repairPriceData.js';

export const RepairServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ep-kinh' | 'thay-lung' | 'cam-ung'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<RepairServiceItem | null>(null);

  const generalServices = [
    {
      title: 'Ép Kính Smartphone Lấy Liền',
      icon: Smartphone,
      desc: 'Công nghệ ép kính hút chân không tự động, giữ lại màn hình hiển thị và cảm ứng gốc của máy. Áp dụng cho iPhone, Samsung, Xiaomi, OPPO, Realme...',
      time: '30 - 60 Phút',
      warranty: 'Bảo hành keo bọt 12 tháng',
    },
    {
      title: 'Thay Lưng Kính Cắt Mắt Camera',
      icon: Layers,
      desc: 'Thay nắp lưng kính chuẩn màu sắc nguyên bản, cắt mắt camera CNC tinh xảo khít đẹp không hở bụi, không cần bung máy tháo main.',
      time: '30 - 45 Phút',
      warranty: 'Bảo hành hở keo trọn đời',
    },
    {
      title: 'Thay Cảm Ứng (Sàng IC Chuẩn Zin)',
      icon: Cpu,
      desc: 'Xử lý triệt để đơ loạn, liệt cảm ứng. Kỹ thuật viên tay nghề cao sàng IC gốc không báo lỗi linh kiện không xác định trên iOS.',
      time: '45 - 90 Phút',
      warranty: 'Bảo hành cảm ứng 3 tháng',
    },
    {
      title: 'Thay Pin & Sửa Chữa Phần Cứng',
      icon: BatteryCharging,
      desc: 'Thay pin dung lượng cao / dung lượng chuẩn chính hãng, sửa chữa mất nguồn, mất sóng, camera, chuông loa lấy liền.',
      time: '15 - 30 Phút',
      warranty: 'Bảo hành 1 đổi 1 6 - 12 tháng',
    },
  ];

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return REPAIR_PRICE_ITEMS.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        item.model.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (item.note && item.note.toLowerCase().includes(searchQuery.toLowerCase().trim()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

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
    <div className="min-h-screen bg-slate-50 py-10 md:py-14">
      <SEO
        title="Bảng Giá Ép Kính, Thay Lưng & Cảm Ứng iPhone — Tấn Đạt Smartphone Huế"
        description="Bảng giá ép kính màn hình, thay lưng cắt mắt, thay cảm ứng sàng IC iPhone ưu đãi giảm ngay 100k mỗi sản phẩm tại Tấn Đạt Smartphone Chợ Phong Xuân, Phong Điền, TP. Huế."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 shadow-xs">
            <div className="w-5 h-5 rounded-full bg-white p-0.5 flex items-center justify-center">
              <TanDatLogo className="w-4 h-4" />
            </div>
            <span>TẤN ĐẠT SMARTPHONE — BẢNG GIÁ DỊCH VỤ & LINH KIỆN</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            BẢNG GIÁ ÉP KÍNH & SỬA CHỮA LINH KIỆN
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Hệ thống máy móc hiện đại tại <b>Chợ Phong Xuân, Phong Điền, TP. Huế</b>. Linh kiện zin chuẩn, thợ lành nghề, khách hàng theo dõi trực tiếp — lấy liền trong 30 đến 60 phút.
          </p>

          {/* Promotion Highlight Tag */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-500/20 animate-pulse">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>ƯU ĐÃI ĐẶC BIỆT: TẤT CẢ SẢN PHẨM TRỪ NGAY 100.000đ SO VỚI GIÁ GỐC!</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="tel:0935677775"
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>Hotline Báo Giá: 093 567 7775</span>
            </a>
            <a
              href="https://zalo.me/0935677775"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Gửi Ảnh Báo Giá Qua Zalo</span>
            </a>
          </div>
        </div>

        {/* 4 Core Repair Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {generalServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{srv.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-1.5 text-[11px] font-semibold">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Thời gian: <b>{srv.time}</b></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{srv.warranty}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Price Table Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-8" id="bang-gia">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-2 border border-amber-200">
                <Tag className="w-3.5 h-3.5" />
                <span>BẢNG GIÁ NIÊM YẾT MINH BẠCH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Tra Cứu Bảng Giá Ép Kính & Linh Kiện iPhone
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tất cả giá dưới đây đã áp dụng ưu đãi <span className="font-bold text-red-600">trừ trực tiếp 100.000đ</span>, bao công thợ và bảo hành chuẩn chỉ.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm dòng máy (vd: 12, 14 pro max, xs)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Xóa
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.id === 'ep-kinh' && <Smartphone className="w-4 h-4 text-blue-400" />}
                  {cat.id === 'thay-lung' && <Layers className="w-4 h-4 text-purple-400" />}
                  {cat.id === 'cam-ung' && <Cpu className="w-4 h-4 text-emerald-400" />}
                  {cat.id === 'all' && <Filter className="w-4 h-4 text-amber-400" />}
                  <span>{cat.shortName}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
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

          {/* Table / Grid of items */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-medium">Không tìm thấy linh kiện cho từ khóa "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs text-blue-600 font-bold hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const catBadge = getCategoryBadge(item.category);
                const isCall = item.discountedPrice === null;

                return (
                  <div
                    key={item.id}
                    className="relative bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      {/* Badge Top */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${catBadge.bg}`}>
                          {catBadge.label}
                        </span>

                        {!isCall && (
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            -100K
                          </span>
                        )}
                      </div>

                      {/* Model Name */}
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.model}
                        </h4>
                        {item.note && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price Block & Action */}
                    <div className="pt-4 mt-3 border-t border-slate-100 space-y-3">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-[11px] text-slate-400 font-medium">Giá ưu đãi:</div>
                          {isCall ? (
                            <div className="text-lg font-black text-amber-600 flex items-center gap-1">
                              <span>Liên hệ báo giá</span>
                            </div>
                          ) : (
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-black text-red-600">
                                {formatPrice(item.discountedPrice)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-xs text-slate-400 line-through">
                                  {formatPrice(item.originalPrice)}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-bold inline-flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Bảo hành</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.warranty}</span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={`tel:0935677775`}
                          className="flex-1 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
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
                          className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
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

          {/* Quick Summary Note at the bottom of Table */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
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
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Quy Trình Sửa Chữa Tại Tấn Đạt</h2>
            <p className="text-xs sm:text-sm text-slate-400">Nhanh chóng — Chuẩn xác — Minh bạch 100%</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-bold text-sm text-white">Tiếp Nhận & Kiểm Tra</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kỹ thuật viên kiểm tra toàn diện tình trạng máy trực tiếp trước mặt khách hàng.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-bold text-sm text-white">Tư Vấn & Báo Giá</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Báo đúng mã linh kiện, áp dụng ưu đãi giảm 100.000đ, cam kết không phát sinh.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-bold text-sm text-white">Tiến Hành Ép / Sửa</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Thực hiện bằng máy ép kính chân không hoặc thay thế linh kiện lấy liền sau 30-60 phút.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm">
                4
              </div>
              <h4 className="font-bold text-sm text-white">Bàn Giao & Bảo Hành</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Khách hàng kiểm tra hài lòng, dán tem bảo hành và viết phiếu bảo hành chu đáo.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <HelpCircle className="w-5 h-5" />
            <span>CÂU HỎI THƯỜNG GẶP (FAQ)</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Giải Đáp Thắc Mắc Khi Ép Kính & Sửa Chữa</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Ép kính có ảnh hưởng đến màn hình hiển thị không?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hoàn toàn không. Công nghệ ép kính chân không chỉ bóc tách lớp kính vỡ bên ngoài và dán lớp kính mới, giữ lại 100% màn hình hiển thị OLED/Retina gốc của máy.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Sàng IC cảm ứng iPhone là gì?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Từ các dòng iPhone X/11/12 trở lên, khi thay cảm ứng kỹ thuật viên Tấn Đạt sẽ chuyển (sàng) con chip IC cảm ứng gốc từ màn hình cũ sang màn hình mới, giúp máy hoạt động trơn tru và không bị cảnh báo linh kiện.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Thay nắp lưng cắt mắt có cần tháo bung máy không?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thay lưng cắt mắt là công nghệ hiện đại giúp thay thế kính nắp lưng chuẩn xác vừa khít với cụm camera mà không cần tháo rời toàn bộ linh kiện bên trong, đảm bảo an toàn tối đa cho bo mạch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Thời gian bảo hành dịch vụ là bao lâu?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ép kính bảo hành bọt keo 12 tháng; thay cảm ứng bảo hành 3 tháng bao gồm sàng IC; thay lưng bảo hành khít keo trọn đời. Quý khách hoàn toàn an tâm sử dụng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
