import { useState } from 'react';
import { sellerProfile, notificationsData } from '../data/dashboardData';
import { productsData } from '../data/products';
import { ordersData } from '../data/orders';
import { 
  statsOverviewData, 
  monthlyRevenueData, 
  categorySalesData, 
  weeklyOrdersData 
} from '../data/chartData';

export const useDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(notificationsData);

  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);
  const toggleMobileDrawer = () => setIsMobileDrawerOpen(prev => !prev);

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(item => item.id === id ? { ...item, unread: false } : item)
    );
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return {
    isSidebarCollapsed,
    isMobileDrawerOpen,
    activeTab,
    searchQuery,
    notifications,
    unreadCount,
    sellerProfile,
    stats: statsOverviewData,
    monthlyRevenue: monthlyRevenueData,
    categorySales: categorySalesData,
    weeklyOrders: weeklyOrdersData,
    recentOrders: ordersData,
    products: productsData,
    setActiveTab,
    setSearchQuery,
    toggleSidebar,
    toggleMobileDrawer,
    markNotificationAsRead,
  };
};