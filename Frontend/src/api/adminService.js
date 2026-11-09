import api from './api';

export const adminService = {
  // Dashboard & Overview
  getDashboardData: () => api.get('/admin/dashboard'),
  getAnalyticsData: (period = 'monthly') => api.get('/admin/analytics', { params: { period } }),

  // Seller Management
  getSellers: (params) => api.get('/admin/sellers', { params }),
  getSellerDetails: (id) => api.get(`/admin/sellers/${id}`),
  approveSeller: (id) => api.patch(`/admin/sellers/${id}/approve`),
  rejectSeller: (id, reason) => api.patch(`/admin/sellers/${id}/reject`, { reason }),
  toggleSellerStatus: (id, status) => api.patch(`/admin/sellers/${id}/status`, { status }),
  deleteSeller: (id) => api.delete(`/admin/sellers/${id}`),

  // Buyer Management
  getBuyers: (params) => api.get('/admin/buyers', { params }),
  toggleBuyerBlock: (id) => api.patch(`/admin/buyers/${id}/toggle-block`),
  deleteBuyer: (id) => api.delete(`/admin/buyers/${id}`),

  // Orders Management
  getOrders: (params) => api.get('/admin/orders', { params }),
  updateOrderStatus: (id, status) => api.patch(`/admin/orders/${id}/status`, { status }),
  issueRefund: (id, amount) => api.post(`/admin/orders/${id}/refund`, { amount }),

  // System & Profile
  getNotifications: () => api.get('/admin/notifications'),
  markNotificationRead: (id) => api.patch(`/admin/notifications/${id}/read`),
  updateProfile: (data) => api.put('/admin/profile', data),
  logout: () => api.post('/logout'),
};

export default adminService;