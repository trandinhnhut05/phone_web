const API_BASE = '/api';

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('phone_web_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as any)['Authorization'] = `Bearer ${token}`;
  }

  // If body is FormData, delete Content-Type to let browser set boundary
  if (options.body instanceof FormData) {
    delete (headers as any)['Content-Type'];
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Đã xảy ra lỗi kết nối');
  }

  return data;
}

export const api = {
  // Auth
  login: (data: any) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data: any) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => apiRequest('/auth/me'),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),

  // Products
  getProducts: (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/products?${query}`);
  },
  getProductBySlug: (slug: string) => apiRequest(`/products/${slug}`),
  getProductById: (id: string) => apiRequest(`/products/id/${id}`),
  createProduct: (data: any) => apiRequest('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id: string, data: any) => apiRequest(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id: string) => apiRequest(`/products/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => apiRequest('/categories'),
  createCategory: (data: any) => apiRequest('/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id: string, data: any) => apiRequest(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id: string) => apiRequest(`/categories/${id}`, { method: 'DELETE' }),

  // Orders
  createOrder: (data: any) => apiRequest('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getOrders: (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/orders?${query}`);
  },
  getOrderById: (id: string) => apiRequest(`/orders/${id}`),
  updateOrderStatus: (id: string, status: string) =>
    apiRequest(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Blog
  getBlogPosts: (params: Record<string, string> = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/blog-posts?${query}`);
  },
  getBlogPostBySlug: (slug: string) => apiRequest(`/blog-posts/${slug}`),
  createBlogPost: (data: any) => apiRequest('/blog-posts', { method: 'POST', body: JSON.stringify(data) }),
  updateBlogPost: (id: string, data: any) => apiRequest(`/blog-posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlogPost: (id: string) => apiRequest(`/blog-posts/${id}`, { method: 'DELETE' }),
  incrementBlogView: (id: string) => apiRequest(`/blog-posts/${id}/view`, { method: 'POST' }),

  // Dashboard
  getDashboardStats: () => apiRequest('/dashboard/stats'),
  getTopProducts: () => apiRequest('/dashboard/top-products'),

  // Upload
  uploadImage: (formData: FormData) =>
    apiRequest('/upload', { method: 'POST', body: formData }),
};
