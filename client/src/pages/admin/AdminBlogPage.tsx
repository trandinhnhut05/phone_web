import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, Upload, X, Check, FileText } from 'lucide-react';
import { api } from '../../services/api.js';
import toast from 'react-hot-toast';

export const AdminBlogPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Đánh giá',
    summary: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    published: true,
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.getBlogPosts({ limit: '100' });
      if (res.success) setPosts(res.data);
    } catch (err: any) {
      toast.error('Lỗi tải danh sách bài viết');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Đánh giá',
      summary: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      published: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: any) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      category: p.category || 'Công nghệ',
      summary: p.summary || '',
      content: p.content,
      image: p.image || '',
      published: p.published,
    });
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setUploadingImage(true);
    try {
      const res = await api.uploadImage(data);
      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, image: res.url }));
        toast.success('Tải ảnh đại diện bài viết thành công!');
      }
    } catch (err: any) {
      toast.error(err.message || 'Lỗi tải ảnh');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      summary: formData.summary.trim() || null,
      content: formData.content.trim(),
      image: formData.image.trim() || null,
      published: formData.published,
    };

    try {
      if (editingId) {
        const res = await api.updateBlogPost(editingId, payload);
        if (res.success) {
          toast.success('Cập nhật bài viết thành công!');
          setModalOpen(false);
          fetchPosts();
        }
      } else {
        const res = await api.createBlogPost(payload);
        if (res.success) {
          toast.success('Tạo bài viết mới thành công!');
          setModalOpen(false);
          fetchPosts();
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Thao tác không thành công');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa bài viết "${title}"?`)) return;

    try {
      const res = await api.deleteBlogPost(id);
      if (res.success) {
        toast.success('Đã xóa bài viết');
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err: any) {
      toast.error(err.message || 'Lỗi xóa bài viết');
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Tin Tức & Blog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Đăng bài viết đánh giá, cẩm nang tư vấn và thủ thuật công nghệ để tăng trưởng SEO.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          Viết bài mới
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Bài viết</th>
                <th className="py-4 px-4">Chuyên mục</th>
                <th className="py-4 px-4">Lượt xem</th>
                <th className="py-4 px-4">Trạng thái</th>
                <th className="py-4 px-4">Ngày đăng</th>
                <th className="py-4 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Đang tải danh sách bài viết...
                  </td>
                </tr>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-6 flex items-center gap-3">
                      <img
                        src={post.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80'}
                        alt={post.title}
                        className="w-14 h-10 rounded-lg object-cover bg-slate-50 border shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 line-clamp-1">{post.title}</div>
                        <div className="text-xs text-slate-400 font-mono">/blog/{post.slug}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">{post.views}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          post.published
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {post.published ? 'Công khai' : 'Bản nháp'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Chưa có bài viết nào. Hãy bấm "Viết bài mới" để bắt đầu!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Blog Post */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {editingId ? 'Chỉnh sửa bài viết' : 'Soạn bài viết mới'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tiêu đề bài viết *
                </label>
                <input
                  type="text"
                  required
                  placeholder="vd: Đánh giá chi tiết camera iPhone 16 Pro Max..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Chuyên mục
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white font-semibold"
                  >
                    <option value="Đánh giá">Đánh giá</option>
                    <option value="Tư vấn">Tư vấn</option>
                    <option value="Mẹo hay">Mẹo hay</option>
                    <option value="Công nghệ">Công nghệ</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-bold text-slate-800">
                      Xuất bản công khai trên website
                    </span>
                  </label>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Ảnh bìa bài viết (URL hoặc Tải lên)
                  </label>
                  <label className="cursor-pointer text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Đang tải lên...' : 'Tải ảnh từ máy tính'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tóm tắt ngắn (SEO Meta Description)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tóm tắt ngắn gọn nội dung bài viết..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nội dung chi tiết bài viết *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Viết nội dung bài viết ở đây..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                >
                  {editingId ? 'Cập nhật bài viết' : 'Lưu bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
