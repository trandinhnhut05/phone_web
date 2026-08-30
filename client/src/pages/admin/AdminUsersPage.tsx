import React, { useEffect, useState } from 'react';
import {
  Users,
  ShieldCheck,
  UserCheck,
  Search,
  RefreshCw,
  Trash2,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  AlertTriangle,
  X,
  Lock,
} from 'lucide-react';
import { api } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.js';
import toast from 'react-hot-toast';

export const AdminUsersPage: React.FC = () => {
  const { user: currentAdmin } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [deletingUser, setDeletingUser] = useState<any | null>(null);
  const [submittingAction, setSubmittingAction] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.getUsers({
        role: roleFilter,
        search: searchQuery.trim(),
        limit: '100',
      });
      if (res && res.success && Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (err: any) {
      toast.error('Lỗi tải danh sách người dùng');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleRoleChange = async (userId: string, newRole: 'USER' | 'ADMIN') => {
    if (userId === currentAdmin?.id && newRole !== 'ADMIN') {
      toast.error('Bạn không thể tự hạ quyền Admin của chính mình');
      return;
    }

    try {
      const res = await api.updateUserRole(userId, newRole);
      if (res && res.success) {
        toast.success(res.message || 'Đã cập nhật quyền thành công');
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        toast.error(res?.message || 'Không thể cập nhật quyền');
      }
    } catch (err: any) {
      toast.error(err.message || 'Lỗi cập nhật quyền');
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    if (deletingUser.id === currentAdmin?.id) {
      toast.error('Bạn không thể xóa tài khoản của chính mình');
      setDeletingUser(null);
      return;
    }

    setSubmittingAction(true);
    try {
      const res = await api.deleteUser(deletingUser.id);
      if (res && res.success) {
        toast.success('Đã xóa tài khoản người dùng thành công');
        setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
        setDeletingUser(null);
      } else {
        toast.error(res?.message || 'Không thể xóa tài khoản');
      }
    } catch (err: any) {
      toast.error(err.message || 'Lỗi xóa tài khoản');
    } finally {
      setSubmittingAction(false);
    }
  };

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;
  const customerCount = users.filter((u) => u.role === 'USER').length;

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header & Stats Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <span>Quản Lý Tài Khoản</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Danh sách tất cả tài khoản khách hàng và phân quyền quản trị viên hệ thống.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-600' : ''}`} />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{totalUsers}</div>
            <div className="text-xs text-slate-500 font-semibold">Tổng số tài khoản</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-purple-600">{adminCount}</div>
            <div className="text-xs text-slate-500 font-semibold">Quản trị viên (Admin)</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-600">{customerCount}</div>
            <div className="text-xs text-slate-500 font-semibold">Khách hàng thành viên</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên, email, số điện thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
          />
        </form>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">Lọc theo vai trò:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl outline-none focus:border-blue-500"
          >
            <option value="ALL">Tất cả tài khoản</option>
            <option value="ADMIN">Quản trị viên (ADMIN)</option>
            <option value="USER">Khách hàng (USER)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Người dùng</th>
                <th className="py-4 px-4">Liên hệ</th>
                <th className="py-4 px-4">Vai trò (Role)</th>
                <th className="py-4 px-4">Đơn hàng</th>
                <th className="py-4 px-4">Ngày đăng ký</th>
                <th className="py-4 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Đang tải danh sách tài khoản...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((usr) => {
                  const isCurrent = usr.id === currentAdmin?.id;
                  return (
                    <tr key={usr.id} className="hover:bg-slate-50 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                            {usr.name ? usr.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>{usr.name || 'Người dùng'}</span>
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-extrabold">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 font-mono">ID: {usr.id.slice(0, 8)}...</div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-4 px-4 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{usr.email}</span>
                        </div>
                        {usr.phone ? (
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{usr.phone}</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Chưa cập nhật SĐT</span>
                        )}
                      </td>

                      {/* Role Selector */}
                      <td className="py-4 px-4">
                        <select
                          value={usr.role}
                          disabled={isCurrent}
                          onChange={(e) => handleRoleChange(usr.id, e.target.value as 'USER' | 'ADMIN')}
                          className={`text-xs font-bold py-1.5 px-3 rounded-full border outline-none cursor-pointer transition-all ${
                            usr.role === 'ADMIN'
                              ? 'bg-purple-50 text-purple-700 border-purple-200 focus:ring-2 focus:ring-purple-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-2 focus:ring-emerald-200'
                          } ${isCurrent ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          <option value="USER">Khách hàng (USER)</option>
                          <option value="ADMIN">Quản trị viên (ADMIN)</option>
                        </select>
                      </td>

                      {/* Orders Count */}
                      <td className="py-4 px-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                          <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                          <span>{usr._count?.orders || 0} đơn</span>
                        </div>
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(usr.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        {!isCurrent && (
                          <button
                            onClick={() => setDeletingUser(usr)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Không tìm thấy tài khoản người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Xác nhận xóa tài khoản</h3>
              <p className="text-xs text-slate-500">
                Bạn có chắc chắn muốn xóa tài khoản của người dùng <b>{deletingUser.name || deletingUser.email}</b> ({deletingUser.email})? Hành động này không thể hoàn tác.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingUser(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={submittingAction}
                onClick={handleDeleteUser}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                {submittingAction ? 'Đang xóa...' : 'Xóa vĩnh viễn'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
