import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, Calendar, ArrowRight, Tag } from 'lucide-react';
import { api } from '../services/api.js';
import { SEO } from '../components/SEO.js';

export const BlogListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = searchParams.get('category') || '';

  const categories = ['Tất cả', 'Đánh giá', 'Tư vấn', 'Mẹo hay', 'Công nghệ'];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = { published: 'true' };
        if (currentCategory && currentCategory !== 'Tất cả') {
          params.category = currentCategory;
        }
        const res = await api.getBlogPosts(params);
        if (res.success) setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentCategory]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <SEO
        title="Tin Tức & Đánh Giá Điện Thoại Mới Nhất 2026 — PhoneStore"
        description="Tổng hợp tin tức công nghệ, đánh giá smartphone, mẹo thủ thuật và cẩm nang chọn mua điện thoại chất lượng."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tin Tức & Đánh Giá Công Nghệ
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Khám phá những xu hướng công nghệ mới nhất cùng đánh giá chuyên sâu từ các chuyên gia.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => {
              const isSelected = (!currentCategory && cat === 'Tất cả') || currentCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    if (cat === 'Tất cả') setSearchParams({});
                    else setSearchParams({ category: cat });
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 animate-pulse space-y-4">
                <div className="w-full aspect-video bg-slate-200 rounded-2xl"></div>
                <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={post.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-blue-600 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {post.summary || post.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{post.views} lượt xem</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-slate-500">Chưa có bài viết nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
};
