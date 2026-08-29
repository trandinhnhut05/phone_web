const envUrl = typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env.VITE_API_URL : '';
const API_BASE = envUrl ? `${envUrl}/api` : '/api';

const getHeaders = (isJson = true) => {
  const headers: Record<string, string> = {};
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Auth
  login: async (credentials: any) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  register: async (data: any) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Products
  getProducts: async (params?: Record<string, string>) => {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`${API_BASE}/products?${searchParams.toString()}`);
    return res.json();
  },

  getTopProducts: async (limit: number = 5) => {
    const res = await fetch(`${API_BASE}/products?limit=${limit}&sort=popular`);
    return res.json();
  },

  getProductBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE}/products/${slug}`);
    return res.json();
  },

  getProductById: async (id: string) => {
    const res = await fetch(`${API_BASE}/products/id/${id}`);
    return res.json();
  },

  createReview: async (productId: string, data: { userName: string; userPhone?: string; rating: number; comment: string }) => {
    const res = await fetch(`${API_BASE}/products/${productId}/reviews`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  createProduct: async (data: any) => {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateProduct: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteProduct: async (id: string) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Coupons
  applyCoupon: async (code: string, orderTotal: number) => {
    const res = await fetch(`${API_BASE}/coupons/apply`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ code, orderTotal }),
    });
    return res.json();
  },

  // Orders
  createOrder: async (data: any) => {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getOrders: async (params?: Record<string, string>) => {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`${API_BASE}/orders?${searchParams.toString()}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  getOrderById: async (id: string) => {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    return res.json();
  },

  updateOrderStatus: async (id: string, status: string) => {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  // Categories
  getCategories: async () => {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },

  // Blog
  getBlogPosts: async (params?: Record<string, string>) => {
    const searchParams = new URLSearchParams(params);
    const res = await fetch(`${API_BASE}/blog?${searchParams.toString()}`);
    return res.json();
  },

  getBlogPostBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE}/blog/${slug}`);
    return res.json();
  },

  incrementBlogView: async (slug: string) => {
    return { success: true };
  },

  createBlogPost: async (data: any) => {
    const res = await fetch(`${API_BASE}/blog`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateBlogPost: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/blog/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteBlogPost: async (id: string) => {
    const res = await fetch(`${API_BASE}/blog/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    const res = await fetch(`${API_BASE}/dashboard/stats`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Image Upload
  uploadImage: async (fileOrFormData: File | FormData) => {
    let body: FormData;
    if (fileOrFormData instanceof FormData) {
      body = fileOrFormData;
    } else {
      body = new FormData();
      body.append('image', fileOrFormData);
    }
    const res = await fetch(`${API_BASE}/uploads`, {
      method: 'POST',
      headers: getHeaders(false),
      body,
    });
    return res.json();
  },
};
