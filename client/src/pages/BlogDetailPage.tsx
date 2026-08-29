import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, ArrowLeft, Share2, Tag, ChevronRight } from 'lucide-react';
import { api } from '../services/api.js';
import { SEO } from '../components/SEO.js';
import toast from 'react-hot-toast';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await api.getBlogPostBySlug(slug);
        if (res.success && res.data) {
          setPost(res.data);
          setRelated(res.related || []);
          api.incrementBlogView(res.data.id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Đã sao chép liên kết bài viết!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy bài viết</h2>
        <Link to="/blog" className="mt-4 inline-block px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold">
          Quay lại danh sách tin tức
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <SEO
        title={`${post.title} — PhoneStore Blog`}
        description={post.summary || post.title}
        image={post.image}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/blog" className="hover:text-blue-600">Tin tức</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold truncate">{post.title}</span>
        </nav>

        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-4">
            <span className="inline-block text-xs font-bold uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {post.category}
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <Eye className="w-3.5 h-3.5" />
                  {post.views} lượt xem
                </span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold"
              >
                <Share2 className="w-3.5 h-3.5" />
                Chia sẻ bài viết
              </button>
            </div>
          </div>

          {post.image && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {post.summary && (
            <div className="p-4 bg-slate-50 rounded-2xl border-l-4 border-blue-600 text-slate-700 italic font-medium text-sm leading-relaxed">
              {post.summary}
            </div>
          )}

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
            <p className="whitespace-pre-line">{post.content}</p>
          </div>
        </article>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-12 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Bài viết liên quan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.slug}`}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all group"
                >
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80'}
                    alt={item.title}
                    className="w-full aspect-video object-cover rounded-xl mb-3"
                  />
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
