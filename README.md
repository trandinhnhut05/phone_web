# 📱 PhoneStore — Website Bán Điện Thoại Di Động Chính Hãng (Monorepo)

Hệ thống thương mại điện tử chuyên kinh doanh điện thoại di động (iPhone, Samsung, Xiaomi, OPPO) với giao diện hiện đại, chuẩn SEO, tối ưu tốc độ và bảng điều khiển quản trị (Admin Dashboard).

---

## 🛠️ Công Nghệ Sử Dụng

| Layer | Công nghệ | Mục đích |
|---|---|---|
| **Frontend** | React 19 + TypeScript | UI component, type safety |
| **Styling** | Tailwind CSS v4 | Giao diện hiện đại, tối ưu CSS |
| **Routing** | React Router v7 | SPA đa trang, lazy loading |
| **Backend** | Node.js + Express + TypeScript | RESTful API, phân quyền |
| **Database** | PostgreSQL + Prisma ORM | Quản lý quan hệ dữ liệu chuẩn |
| **Container** | Docker Compose | Chạy PostgreSQL cục bộ nhanh chóng |
| **Authentication**| JWT + bcryptjs | Đăng nhập stateless bảo mật |
| **Uploads** | Cloudinary & Local Storage | Hỗ trợ lưu trữ ảnh sản phẩm |
| **SEO** | React Helmet Async + JSON-LD | Tối ưu hóa công cụ tìm kiếm |

---

## 📂 Cấu Trúc Thư Mục Monorepo

```
Phone_Web/
├── client/                     # Frontend React 19 + Tailwind v4 + Vite
│   ├── src/
│   │   ├── components/         # Navbar, Footer, ProductCard, SEO...
│   │   ├── context/            # AuthContext, CartContext
│   │   ├── pages/              # HomePage, ProductsPage, Detail, Cart, Checkout...
│   │   │   └── admin/          # Admin Dashboard, Products, Orders, Blog
│   │   ├── services/           # api.ts (Fetch wrapper + token)
│   │   ├── App.tsx             # React Router v7 config
│   │   └── main.tsx
│   └── package.json
├── server/                     # Backend Express + Prisma + TypeScript
│   ├── prisma/
│   │   ├── schema.prisma       # Database Schema (User, Product, Order, BlogPost...)
│   │   └── seed.ts             # Script seed 8 sản phẩm & tài khoản mẫu
│   ├── src/
│   │   ├── controllers/        # Auth, Product, Category, Order, Blog, Dashboard
│   │   ├── middlewares/        # verifyToken, requireAdmin, errorHandler
│   │   ├── routes/             # Định tuyến API
│   │   ├── services/           # Upload (Cloudinary / Local fallback)
│   │   └── server.ts           # Điểm khởi chạy Express
│   ├── .env.example
│   └── package.json
├── docker-compose.yml          # Chạy PostgreSQL 16
├── package.json                # Monorepo root scripts
└── README.md
```

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Cài đặt các gói phụ thuộc (Dependencies)

Tại thư mục gốc của dự án:
```bash
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### 2. Khởi chạy cơ sở dữ liệu với Docker

```bash
npm run db:up
# Hoặc: docker compose up -d
```

### 3. Đồng bộ Database Schema & Nạp dữ liệu mẫu (Seed)

```bash
cd server
npx prisma db push
npm run db:seed
cd ..
```

> **Tài khoản mẫu sau khi seed:**
> - **Admin:** `admin@phoneweb.com` / `admin123`
> - **Khách hàng:** `khachhang@gmail.com` / `user123`

### 4. Khởi chạy ứng dụng (Client + Server đồng thời)

```bash
npm run dev
```

- **Frontend (Client):** `http://localhost:5173`
- **Backend (Server API):** `http://localhost:5000`
- **Prisma Studio (Xem DB trực quan):** `cd server && npx prisma studio`

---

## 🔑 Danh Sách API Chính

### 🔐 Xác thực (Auth)
- `POST /api/auth/register` — Đăng ký tài khoản
- `POST /api/auth/login` — Đăng nhập & nhận JWT token
- `GET  /api/auth/me` — Lấy thông tin tài khoản hiện tại

### 📦 Sản phẩm (Products)
- `GET    /api/products` — Lấy danh sách sản phẩm (hỗ trợ lọc theo brand, giá, sắp xếp)
- `GET    /api/products/:slug` — Lấy chi tiết sản phẩm theo slug
- `POST   /api/products` *(Admin)* — Thêm sản phẩm mới
- `PUT    /api/products/:id` *(Admin)* — Sửa thông tin sản phẩm
- `DELETE /api/products/:id` *(Admin)* — Xóa sản phẩm

### 🛒 Đơn hàng (Orders)
- `POST /api/orders` — Đặt hàng mới (tự động trừ số lượng tồn kho)
- `GET  /api/orders` *(Admin)* — Lấy danh sách tất cả đơn hàng
- `GET  /api/orders/:id` — Tra cứu chi tiết đơn hàng
- `PUT  /api/orders/:id/status` *(Admin)* — Cập nhật trạng thái đơn hàng

### 📊 Thống kê (Dashboard)
- `GET /api/dashboard/stats` *(Admin)* — Doanh thu, số lượng đơn hàng, biểu đồ 7 ngày
- `GET /api/dashboard/top-products` *(Admin)* — Top 5 sản phẩm bán chạy nhất

---

## 🔗 Liên kết Git Repository
- Kho lưu trữ: [https://github.com/trandinhnhut05/phone_web](https://github.com/trandinhnhut05/phone_web)
