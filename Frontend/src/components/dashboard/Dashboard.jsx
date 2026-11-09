import React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { FiStar } from "react-icons/fi";

import { useDashboard } from "./hooks/useDashboard";
import { formatCurrency } from "./utils/formatCurrency";

import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import StatsCards from "./components/StatsCards";
import RevenueChart from "./components/RevenueChart";
import SalesPieChart from "./components/SalesPieChart";
import OrdersTable from "./components/OrdersTable";
import QuickActions from "./components/QuickActions";
import Notifications from "./components/Notifications";
import LowStock from "./components/LowStock";
import Footer from "./components/Footer";

import "./Dashboard.css";

export default function Dashboard() {
  const {
    isSidebarCollapsed,
    isMobileDrawerOpen,
    activeTab,
    searchQuery,
    notifications,
    unreadCount,
    // sellerProfile, // We will override this with real database info from localStorage
    stats,
    monthlyRevenue,
    categorySales,
    weeklyOrders,
    recentOrders,
    products,
    setActiveTab,
    setSearchQuery,
    toggleSidebar,
    toggleMobileDrawer,
    markNotificationAsRead,
  } = useDashboard();

  // 1. Retrieve the authenticated user stored during login
  const storedUser = JSON.parse(localStorage.getItem("user_info") || "{}");

  // 2. Format profile avatar URL from Laravel uploads
  const buildAvatarUrl = (path) => {
    if (!path) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(storedUser.name || "Seller")}&background=7A1E2C&color=fff`;
    }
    return path.startsWith("http") ? path : `http://localhost:8000/${path}`;
  };

  // 3. Build live profile object from actual DB values
  const liveSellerProfile = {
    name: storedUser.name || "Seller",
    storeName: storedUser.shop_name || "Cultural Cloth Store",
    role: "Seller",
    avatar: buildAvatarUrl(storedUser.profile_image),
  };

  return (
    <div className="dashboard-layout-root">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        isMobileOpen={isMobileDrawerOpen}
        toggleMobile={toggleMobileDrawer}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="dashboard-main-wrapper">
        {/* Pass live profile object to TopNavbar */}
        <TopNavbar
          profile={liveSellerProfile}
          toggleMobile={toggleMobileDrawer}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          unreadCount={unreadCount}
        />

        <main className="dashboard-content-area">
          {/* 1. Welcome Banner displaying authenticated DB user */}
          <motion.section
            className="welcome-banner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="welcome-text">
              <h2>Welcome back, {liveSellerProfile.name} ❖</h2>
              <p>
                Your store performance is up <strong>+14.2%</strong> this month.
                You have 12 pending orders awaiting fulfillment.
              </p>
            </div>
          </motion.section>

          {/* 2. Quick Operations */}
          <QuickActions />

          {/* 3. Statistics Grid */}
          <StatsCards stats={stats} />

          {/* 4. Analytics Grid */}
          <div className="analytics-grid">
            <RevenueChart data={monthlyRevenue} />
            <SalesPieChart data={categorySales} />
          </div>

          {/* 5. Weekly Orders Bar Chart */}
          <div className="chart-card">
            <div className="chart-card-header">
              <div>
                <h3 className="chart-title">Weekly Orders Overview</h3>
                <p className="chart-subtitle">
                  Daily order volume distribution
                </p>
              </div>
            </div>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyOrders}>
                  <XAxis
                    dataKey="day"
                    stroke="#757575"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis stroke="#757575" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      border: "1px solid #C8A44D",
                    }}
                  />
                  <Bar dataKey="orders" fill="#7A1E2C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 6. Best Selling Products Section */}
          <div className="best-sellers-section">
            <h3 className="section-title">Best Selling Products</h3>
            <div className="best-sellers-grid">
              {products?.map((prd) => (
                <div key={prd.id} className="best-seller-card">
                  <img
                    src={prd.image}
                    alt={prd.name}
                    className="best-seller-img"
                  />
                  <div className="best-seller-info">
                    <h4>{prd.name}</h4>
                    <span className="best-seller-category">{prd.category}</span>
                    <div className="best-seller-metrics">
                      <span>
                        <strong>{prd.unitsSold}</strong> units sold
                      </span>
                      <span>
                        <strong>{formatCurrency(prd.revenue)}</strong>
                      </span>
                    </div>
                    <div className="best-seller-rating">
                      <FiStar className="star-icon" /> {prd.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Orders Table & Side Widgets */}
          <div className="bottom-sections-grid">
            <OrdersTable orders={recentOrders} />
            <div className="widgets-column">
              <LowStock products={products} />
              <Notifications
                notifications={notifications}
                onMarkAsRead={markNotificationAsRead}
              />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
