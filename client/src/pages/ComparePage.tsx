import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sliders, ArrowLeftRight, Check, X, Star, ShoppingCart } from 'lucide-react';
import { api } from '../services/api.js';
import { formatPrice } from '../components/ProductCard.js';
import { useCart } from '../context/CartContext.js';
import { SEO } from '../components/SEO.js';
import toast from 'react-hot-toast';

export const ComparePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedId1, setSelectedId1] = useState<string>('');
  const [selectedId2, setSelectedId2] = useState<string>('');
  const [phone1, setPhone1] = useState<any | null>(null);
  const [phone2, setPhone2] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await api.getProducts({ limit: '50' });
        if (res.success && res.data) {
          setProducts(res.data);
          const p1 = searchParams.get('p1') || res.data[0]?.id || '';
          const p2 = searchParams.get('p2') || res.data[1]?.id || '';
          setSelectedId1(p1);
          setSelectedId2(p2);
        }
      } catch (err) {
        console.error('Lỗi tải danh sách so sánh:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [searchParams]);

  useEffect(() => {
    if (selectedId1) {
      api.getProductById(selectedId1).then((res) => {
        if (res.success) setPhone1(res.data);
      });
    }
    if (selectedId2) {
      api.getProductById(selectedId2).then((res) => {
        if (res.success) setPhone2(res.data);
      });
    }
  }, [selectedId1, selectedId2]);

  const specCategories = [
    'Màn hình',
    'Hệ điều hành',
    'Chipset / CPU',
    'RAM & Bộ nhớ',
    'Camera sau',
    'Camera trước',
    'Pin & Sạc',
    'SIM & Kết nối',
    'Chất liệu & Kháng nước',
    'Trọng lượng',
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <SEO
        title="So Sánh Điện Thoại — Tấn Đạt Smartphone"
        description="So sánh thông số kỹ thuật, màn hình, camera, chip, pin và giá bán các dòng smartphone chính hãng tại Tấn Đạt Smartphone."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>CÔNG CỤ SO SÁNH CẤU HÌNH</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            So Sánh Chi Tiết Điện Thoại
          </h1>
          <p className="text-sm text-slate-500">
            Chọn 2 sản phẩm bất kỳ để đối chiếu thông số phần cứng, camera, pin và mức giá ưu đãi tại Tấn Đạt.
          </p>
        </div>

        {/* Product Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          {/* Phone 1 Picker */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Chọn điện thoại 1:
            </label>
            <select
              value={selectedId1}
              onChange={(e) => setSelectedId1(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:border-blue-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {formatPrice(p.price)}
                </option>
              ))}
            </select>
          </div>

          {/* Phone 2 Picker */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Chọn điện thoại 2:
            </label>
            <select
              value={selectedId2}
              onChange={(e) => setSelectedId2(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:border-blue-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {formatPrice(p.price)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Comparison Matrix */}
        {phone1 && phone2 && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Header Cards */}
            <div className="grid grid-cols-2 border-b border-slate-200 divide-x divide-slate-200 bg-slate-50/50">
              <div className="p-6 text-center space-y-3">
                <img
                  src={phone1.images?.[0]}
                  alt={phone1.name}
                  className="w-40 h-40 object-contain mx-auto bg-white rounded-2xl p-2 border"
                />
                <h3 className="font-bold text-slate-900 text-base line-clamp-2">{phone1.name}</h3>
                <div className="text-xl font-black text-blue-600">{formatPrice(phone1.price)}</div>
                <button
                  onClick={() => {
                    addToCart({
                      id: phone1.id,
                      name: phone1.name,
                      slug: phone1.slug,
                      price: phone1.price,
                      image: phone1.images[0],
                      color: phone1.colors?.[0] || 'Mặc định',
                    });
                    toast.success(`Đã thêm ${phone1.name} vào giỏ hàng!`);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md inline-flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Mua máy này</span>
                </button>
              </div>

              <div className="p-6 text-center space-y-3">
                <img
                  src={phone2.images?.[0]}
                  alt={phone2.name}
                  className="w-40 h-40 object-contain mx-auto bg-white rounded-2xl p-2 border"
                />
                <h3 className="font-bold text-slate-900 text-base line-clamp-2">{phone2.name}</h3>
                <div className="text-xl font-black text-blue-600">{formatPrice(phone2.price)}</div>
                <button
                  onClick={() => {
                    addToCart({
                      id: phone2.id,
                      name: phone2.name,
                      slug: phone2.slug,
                      price: phone2.price,
                      image: phone2.images[0],
                      color: phone2.colors?.[0] || 'Mặc định',
                    });
                    toast.success(`Đã thêm ${phone2.name} vào giỏ hàng!`);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md inline-flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Mua máy này</span>
                </button>
              </div>
            </div>

            {/* Spec Rows */}
            <div className="divide-y divide-slate-100">
              {specCategories.map((specTitle, idx) => {
                const val1 = phone1.specs?.[specTitle] || phone1[specTitle.toLowerCase()] || 'Đang cập nhật';
                const val2 = phone2.specs?.[specTitle] || phone2[specTitle.toLowerCase()] || 'Đang cập nhật';

                return (
                  <div key={specTitle} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}>
                    <div className="text-center py-2 bg-slate-100/70 text-xs font-black uppercase text-slate-700 tracking-wider">
                      {specTitle}
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-slate-100 p-4 text-xs sm:text-sm text-slate-800">
                      <div className="p-2 leading-relaxed text-center sm:text-left">{val1}</div>
                      <div className="p-2 leading-relaxed text-center sm:text-left">{val2}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
