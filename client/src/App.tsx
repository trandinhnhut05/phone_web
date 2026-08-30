import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext.js';
import { CartProvider } from './context/CartContext.js';
import { WishlistProvider } from './context/WishlistContext.js';

import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { FloatingContact } from './components/FloatingContact.js';
import { AdminQuickBar } from './components/AdminQuickBar.js';
import { AdminRoute } from './components/AdminRoute.js';

// Customer Pages
import { HomePage } from './pages/HomePage.js';
import { ProductsPage } from './pages/ProductsPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';
import { CartPage } from './pages/CartPage.js';
import { CheckoutPage } from './pages/CheckoutPage.js';
import { OrderLookupPage } from './pages/OrderLookupPage.js';
import { CustomerProfilePage } from './pages/CustomerProfilePage.js';
import { BlogListPage } from './pages/BlogListPage.js';
import { BlogDetailPage } from './pages/BlogDetailPage.js';
import { RepairServicesPage } from './pages/RepairServicesPage.js';
import { WarrantyPolicyPage } from './pages/WarrantyPolicyPage.js';
import { ReturnPolicyPage } from './pages/ReturnPolicyPage.js';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage.js';
import { PaymentPolicyPage } from './pages/PaymentPolicyPage.js';
import { ComparePage } from './pages/ComparePage.js';
import { WishlistPage } from './pages/WishlistPage.js';
import { LoginPage } from './pages/LoginPage.js';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage.js';
import { AdminLayout } from './pages/admin/AdminLayout.js';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.js';
import { AdminProductsPage } from './pages/admin/AdminProductsPage.js';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage.js';
import { AdminBlogPage } from './pages/admin/AdminBlogPage.js';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage.js';

// Customer Layout wrapper
const CustomerLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminQuickBar />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <FloatingContact />
    </div>
  );
};

// 404 Not Found Component
const NotFoundPage: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
    <h1 className="text-6xl font-black text-blue-600">404</h1>
    <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy trang yêu cầu</h2>
    <p className="text-sm text-slate-500 max-w-sm">
      Đường dẫn bạn vừa truy cập không tồn tại trên hệ thống Tấn Đạt Smartphone.
    </p>
    <a
      href="/"
      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md"
    >
      Về trang chủ
    </a>
  </div>
);

export function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    borderRadius: '16px',
                    background: '#0f172a',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                  },
                }}
              />
              <Routes>
                {/* 1. Customer Flow Routes */}
                <Route element={<CustomerLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dien-thoai" element={<ProductsPage />} />
                  <Route path="/dien-thoai/:slug" element={<ProductDetailPage />} />
                  <Route path="/so-sanh" element={<ComparePage />} />
                  <Route path="/yeu-thich" element={<WishlistPage />} />
                  <Route path="/gio-hang" element={<CartPage />} />
                  <Route path="/thanh-toan" element={<CheckoutPage />} />
                  <Route path="/tai-khoan" element={<CustomerProfilePage />} />
                  <Route path="/tra-cuu-don-hang" element={<OrderLookupPage />} />
                  <Route path="/dich-vu-sua-chua" element={<RepairServicesPage />} />
                  <Route path="/chinh-sach-bao-hanh" element={<WarrantyPolicyPage />} />
                  <Route path="/chinh-sach-doi-tra" element={<ReturnPolicyPage />} />
                  <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicyPage />} />
                  <Route path="/hinh-thuc-thanh-toan" element={<PaymentPolicyPage />} />
                  <Route path="/blog" element={<BlogListPage />} />
                  <Route path="/blog/:slug" element={<BlogDetailPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* 2. Customer Auth Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* 3. Admin Auth Route */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* 4. Protected Admin Flow Routes */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }
                >
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="orders" element={<AdminOrdersPage />} />
                  <Route path="blog" element={<AdminBlogPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

