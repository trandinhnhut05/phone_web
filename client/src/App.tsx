import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext.js';
import { CartProvider } from './context/CartContext.js';

import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';

import { HomePage } from './pages/HomePage.js';
import { ProductsPage } from './pages/ProductsPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';
import { CartPage } from './pages/CartPage.js';
import { CheckoutPage } from './pages/CheckoutPage.js';
import { OrderLookupPage } from './pages/OrderLookupPage.js';
import { BlogListPage } from './pages/BlogListPage.js';
import { BlogDetailPage } from './pages/BlogDetailPage.js';
import { LoginPage } from './pages/LoginPage.js';

import { AdminLayout } from './pages/admin/AdminLayout.js';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.js';
import { AdminProductsPage } from './pages/admin/AdminProductsPage.js';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage.js';
import { AdminBlogPage } from './pages/admin/AdminBlogPage.js';

// Customer Layout wrapper
const CustomerLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// 404 Not Found Component
const NotFoundPage: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
    <h1 className="text-6xl font-black text-blue-600">404</h1>
    <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy trang yêu cầu</h2>
    <p className="text-sm text-slate-500 max-w-sm">
      Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được chuyển sang vị trí mới.
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
              {/* Customer Routes */}
              <Route element={<CustomerLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/dien-thoai" element={<ProductsPage />} />
                <Route path="/dien-thoai/:slug" element={<ProductDetailPage />} />
                <Route path="/gio-hang" element={<CartPage />} />
                <Route path="/thanh-toan" element={<CheckoutPage />} />
                <Route path="/tra-cuu-don-hang" element={<OrderLookupPage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Standalone Auth */}
              <Route path="/login" element={<LoginPage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="blog" element={<AdminBlogPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
