import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Package,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { api } from '../../services/api.js';
import { formatPrice } from '../../components/ProductCard.js';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any | null>(null);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, topRes] = await Promise.all([
          api.getDashboardStats(),
          api.getTopProducts(),
        ]);
        if (statsRes.success) setStats(statsRes.data);
        if (topRes.success) setTopProducts(topRes.data);
      } catch (err) {
        console.error('Lỗi tải dữ liệu dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Tổng doanh thu',
      value: formatPrice(stats?.totalRevenue || 0),
      icon: TrendingUp,
      color: 'bg-emerald-500/10 text-emerald-600',
      border: 'border-emerald-200',
    },
    {
      title: 'Tổng số đơn hàng',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'bg-blue-500/10 text-blue-600',
      border: 'border-blue-200',
    },
    {
      title: 'Đơn chờ xử lý',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'bg-amber-500/10 text-amber-600',
      border: 'border-amber-200',
    },
    {
      title: 'Sản phẩm trong kho',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-purple-500/10 text-purple-600',
      border: 'border-purple-200',
    },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Bảng Điều Khiển Quản Trị
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Theo dõi tổng quan tình hình kinh doanh, doanh thu và đơn hàng mới.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 border ${card.border} shadow-xs space-y-4`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {card.title}
                </span>
                <div className={`w-10 h-10 rounded-2xl ${card.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Top Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Biểu đồ doanh thu 7 ngày gần nhất</h3>
              <p className="text-xs text-slate-400">Thống kê doanh số bán hàng theo ngày</p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.revenueChart || []}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(val) => {
                    const parts = val.split('-');
                    return `${parts[2]}/${parts[1]}`;
                  }}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={(val) => `${(val / 1000000).toFixed(0)}Tr`}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: any) => [formatPrice(Number(value)), 'Doanh thu']}
                  labelFormatter={(label) => `Ngày: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Sản phẩm bán chạy</h3>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>

          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80'}
                  alt={product.name}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-50 border shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">{product.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    Đã bán: <b className="text-blue-600">{product.sold}</b> • Kho: {product.stock}
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-700">
                  {formatPrice(product.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Đơn hàng mới nhất</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Mã đơn</th>
                <th className="pb-3">Khách hàng</th>
                <th className="pb-3">Số ĐT</th>
                <th className="pb-3">Tổng tiền</th>
                <th className="pb-3">Trạng thái</th>
                <th className="pb-3">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {stats?.recentOrders?.map((ord: any) => (
                <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-mono text-xs text-blue-600 font-bold">{ord.id}</td>
                  <td className="py-3 font-bold text-slate-900">{ord.customerName}</td>
                  <td className="py-3 text-slate-500">{ord.customerPhone}</td>
                  <td className="py-3 font-extrabold text-blue-600">{formatPrice(ord.total)}</td>
                  <td className="py-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        ord.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : ord.status === 'CANCELLED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-slate-400">
                    {new Date(ord.createdAt).toLocaleString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
