import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, Search, RefreshCcw } from 'lucide-react';
import { api } from '../services/api.js';
import { ProductCard, ProductType } from '../components/ProductCard.js';
import { SEO } from '../components/SEO.js';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12, totalPages: 1 });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const currentBrand = searchParams.get('brand') || 'all';
  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentSearch = searchParams.get('search') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';
  const currentPage = searchParams.get('page') || '1';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.getCategories();
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {
          page: currentPage,
          limit: '12',
          sort: currentSort,
        };
        if (currentBrand !== 'all') params.brand = currentBrand;
        if (currentCategory !== 'all') params.category = currentCategory;
        if (currentSearch) params.search = currentSearch;
        if (currentMinPrice) params.minPrice = currentMinPrice;
        if (currentMaxPrice) params.maxPrice = currentMaxPrice;

        const res = await api.getProducts(params);
        if (res.success) {
          setProducts(res.data);
          setPagination(res.pagination);
        }
      } catch (err) {
        console.error('Lỗi tải danh sách sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentBrand, currentCategory, currentSort, currentSearch, currentMinPrice, currentMaxPrice, currentPage]);

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const brands = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Apple', label: 'Apple (iPhone)' },
    { id: 'Samsung', label: 'Samsung' },
    { id: 'Xiaomi', label: 'Xiaomi' },
    { id: 'OPPO', label: 'OPPO' },
  ];

  const priceRanges = [
    { label: 'Tất cả mức giá', min: '', max: '' },
    { label: 'Dưới 10 triệu', min: '0', max: '10000000' },
    { label: 'Từ 10 - 20 triệu', min: '10000000', max: '20000000' },
    { label: 'Từ 20 - 30 triệu', min: '20000000', max: '30000000' },
    { label: 'Trên 30 triệu', min: '30000000', max: '' },
  ];

  const pageTitle = currentBrand !== 'all'
    ? `Điện thoại ${currentBrand} Chính Hãng`
    : currentSearch
    ? `Tìm kiếm: "${currentSearch}"`
    : 'Danh Sách Điện Thoại Di Động Chính Hãng';

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <SEO
        title={pageTitle}
        description={`Xem danh sách điện thoại ${currentBrand !== 'all' ? currentBrand : ''} giá tốt nhất tại PhoneStore. Khuyến mãi sốc, bảo hành 12 tháng.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title & Sorting Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Hiển thị <span className="font-bold text-slate-800">{pagination.total}</span> sản phẩm phù hợp
            </p>
          </div>

          {/* Right Sort Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Bộ lọc
            </button>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={currentSort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="bg-slate-100 hover:bg-slate-200/70 text-slate-700 text-sm font-semibold py-2.5 px-3 rounded-xl outline-none cursor-pointer"
              >
                <option value="newest">Mới nhất</option>
                <option value="popular">Bán chạy nhất</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Layout: Filter Sidebar + Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filter Sidebar (Desktop) */}
          <aside className={`md:block space-y-6 ${mobileFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span>Bộ lọc sản phẩm</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold"
                >
                  <RefreshCcw className="w-3 h-3" />
                  Xóa lọc
                </button>
              </div>

              {/* Brand Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Thương hiệu
                </h4>
                <div className="space-y-2">
                  {brands.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => updateParam('brand', b.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        currentBrand === b.id
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Khoảng giá
                </h4>
                <div className="space-y-2">
                  {priceRanges.map((range, idx) => {
                    const isSelected =
                      currentMinPrice === range.min && currentMaxPrice === range.max;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          const newParams = new URLSearchParams(searchParams);
                          if (range.min) newParams.set('minPrice', range.min);
                          else newParams.delete('minPrice');
                          if (range.max) newParams.set('maxPrice', range.max);
                          else newParams.delete('maxPrice');
                          newParams.set('page', '1');
                          setSearchParams(newParams);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {range.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 animate-pulse space-y-3">
                    <div className="w-full aspect-square bg-slate-200 rounded-xl"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => updateParam('page', pageNum.toString())}
                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                          pageNum === pagination.page
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">Không tìm thấy sản phẩm nào</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Hãy thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh lại các bộ lọc bên trái.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Xóa toàn bộ bộ lọc
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
