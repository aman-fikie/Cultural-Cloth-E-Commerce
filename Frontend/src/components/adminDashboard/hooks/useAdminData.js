import { useState, useEffect } from "react";
import adminService from "../../../api/adminService";
import { initialMetrics } from "../data/analyticsData";

export const useAdminData = () => {
  const [stats, setStats] = useState(initialMetrics);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, sellersRes, buyersRes, ordersRes, notifRes] = await Promise.allSettled([
        adminService.getDashboardData(),
        adminService.getSellers(),
        adminService.getBuyers(),
        adminService.getOrders(),
        adminService.getNotifications(),
      ]);

      if (statsRes.status === "fulfilled") setStats(statsRes.value.data);
      if (sellersRes.status === "fulfilled") setSellers(sellersRes.value.data);
      if (buyersRes.status === "fulfilled") setBuyers(buyersRes.value.data);
      if (ordersRes.status === "fulfilled") setOrders(ordersRes.value.data);
      if (notifRes.status === "fulfilled") setNotifications(notifRes.value.data);
    } catch (e) {
      // Graceful fallback to initial state on API failure
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    stats,
    sellers,
    setSellers,
    buyers,
    setBuyers,
    orders,
    setOrders,
    notifications,
    setNotifications,
    loading,
    refresh: loadData,
  };
};