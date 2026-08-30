import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-400">Đang xác thực quyền Quản trị (Admin)...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to specialized admin login page if not logged in
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // If logged in as customer/user, redirect to admin login with unauthorized state
    return <Navigate to="/admin/login" state={{ from: location, unauthorized: true }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
