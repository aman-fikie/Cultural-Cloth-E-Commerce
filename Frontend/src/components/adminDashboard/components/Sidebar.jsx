import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiBox,
  FiFolder,
  FiShoppingBag as FiOrder,
  FiDollarSign,
  FiBarChart2,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import adminService from "../../../api/adminService";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: FiGrid },
  { name: "Sellers", path: "/admin/sellers", icon: FiShoppingBag },
  { name: "Buyers", path: "/admin/buyers", icon: FiUsers },
  { name: "Products", path: "/admin/products", icon: FiBox },
  { name: "Categories", path: "/admin/categories", icon: FiFolder },
  { name: "Orders", path: "/admin/orders", icon: FiOrder },
  { name: "Payments", path: "/admin/payments", icon: FiDollarSign },
  { name: "Reports", path: "/admin/reports", icon: FiBarChart2 },
  { name: "Notifications", path: "/admin/notifications", icon: FiBell },
  { name: "Profile", path: "/admin/profile", icon: FiUser },
  { name: "Settings", path: "/admin/settings", icon: FiSettings },
];

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await adminService.logout();
    } catch (e) {
      // Clear client state on failure
    }
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="brand-badge">C</div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3
              style={{
                margin: 0,
                fontSize: "1.05rem",
                color: "#FAF6EF",
                fontFamily: "serif",
              }}
            >
              Cultural Cloth
            </h3>
            <span
              style={{
                fontSize: "0.65rem",
                color: "#C8A44D",
                letterSpacing: "0.08em",
                fontWeight: "bold",
              }}
            >
              ADMINISTRATION
            </span>
          </motion.div>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
