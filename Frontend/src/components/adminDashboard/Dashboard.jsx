import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiDollarSign, FiShoppingBag, FiUsers, FiBox } from "react-icons/fi";

import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import StatsCards from "./components/StatsCards";
import RevenueChart from "./components/RevenueChart";
import SellerTable from "./components/SellerTable";
import OrdersTable from "./components/OrdersTable";
import BuyerTable from "./components/BuyerTable";
import Notifications from "./components/Notifications";
import Footer from "./components/Footer";

import { useAdminData } from "./hooks/useAdminData";
import { initialRevenueChart } from "./data/analyticsData";
import adminService from "../../api/adminService";

import "./Dashboard.css";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    stats,
    sellers,
    setSellers,
    buyers,
    setBuyers,
    orders,
    setOrders,
    notifications,
    setNotifications,
  } = useAdminData();

  // Handlers
  const handleApproveSeller = async (id) => {
    try {
      await adminService.approveSeller(id);
      setSellers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s)),
      );
    } catch {
      setSellers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s)),
      );
    }
  };

  const handleDeleteSeller = async (id) => {
    if (!window.confirm("Delete this seller?")) return;
    try {
      await adminService.deleteSeller(id);
      setSellers((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setSellers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleToggleBlockBuyer = async (id) => {
    try {
      await adminService.toggleBuyerBlock(id);
      setBuyers((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, is_blocked: !b.is_blocked } : b,
        ),
      );
    } catch {
      setBuyers((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, is_blocked: !b.is_blocked } : b,
        ),
      );
    }
  };

  const handleDeleteBuyer = async (id) => {
    if (!window.confirm("Delete buyer account?")) return;
    setBuyers((prev) => prev.filter((b) => b.id !== id));
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await adminService.updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      );
    } catch {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      );
    }
  };

  const handleMarkNotificationRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );
  };

  return (
    <div className="admin-shell">
      <Sidebar collapsed={collapsed} />

      <div className="admin-main-viewport">
        <TopNavbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="admin-content">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "linear-gradient(135deg, #7A1E2C 0%, #4A121B 100%)",
              color: "#FFFFFF",
              padding: "1.75rem 2rem",
              borderRadius: "12px",
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 20px rgba(122, 30, 44, 0.15)",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontFamily: "serif",
                  fontSize: "1.75rem",
                  color: "#FAF6EF",
                }}
              >
                System Administration
              </h1>
              <p
                style={{
                  margin: "0.35rem 0 0",
                  color: "#C8A44D",
                  fontSize: "0.925rem",
                }}
              >
                Cultural Clothing Marketplace Overview & Management
              </p>
            </div>
            <button
              style={{
                backgroundColor: "#C8A44D",
                color: "#000",
                border: "none",
                padding: "0.65rem 1.25rem",
                borderRadius: "8px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Export System Audit
            </button>
          </motion.div>

          {/* Metric Cards Grid */}
          <div className="stats-grid">
            <StatsCards
              title="Total Gross Revenue"
              value={`$${stats.total_revenue?.toLocaleString()}`}
              percentage="+18.4%"
              icon={FiDollarSign}
            />
            <StatsCards
              title="Active Merchants"
              value={stats.total_sellers}
              percentage="+6.2%"
              icon={FiShoppingBag}
            />
            <StatsCards
              title="Registered Buyers"
              value={stats.total_buyers}
              percentage="+12.1%"
              icon={FiUsers}
            />
            <StatsCards
              title="Catalog Products"
              value={stats.total_products}
              percentage="+4.5%"
              icon={FiBox}
            />
          </div>

          {/* Chart & Alerts Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <RevenueChart data={initialRevenueChart} />
            <Notifications
              notifications={notifications}
              onMarkRead={handleMarkNotificationRead}
            />
          </div>

          {/* Merchant Queue */}
          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                margin: "0 0 1rem",
                color: "#7A1E2C",
                fontFamily: "serif",
                fontSize: "1.2rem",
              }}
            >
              Merchant Verification Queue
            </h3>
            <SellerTable
              sellers={sellers}
              onApprove={handleApproveSeller}
              onDelete={handleDeleteSeller}
            />
          </div>

          {/* Recent Orders */}
          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                margin: "0 0 1rem",
                color: "#7A1E2C",
                fontFamily: "serif",
                fontSize: "1.2rem",
              }}
            >
              Recent Marketplace Orders
            </h3>
            <OrdersTable
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
              onRefund={() => alert("Refund processed")}
            />
          </div>

          {/* Buyer Accounts */}
          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                margin: "0 0 1rem",
                color: "#7A1E2C",
                fontFamily: "serif",
                fontSize: "1.2rem",
              }}
            >
              Registered Buyer Accounts
            </h3>
            <BuyerTable
              buyers={buyers}
              onToggleBlock={handleToggleBlockBuyer}
              onDelete={handleDeleteBuyer}
            />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
