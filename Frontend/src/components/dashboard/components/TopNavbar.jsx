import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiBell,
  FiMail,
  FiMenu,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./TopNavbar.css";

export default function TopNavbar({
  profile,
  toggleMobile,
  searchQuery,
  setSearchQuery,
  unreadCount,
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // 1. Fetch user info saved during login from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user_info") || "{}");

  // 2. Merge passed prop with localStorage (or default fallback values)
  const userData = {
    name: profile?.name || storedUser.name || "Seller",
    storeName: profile?.storeName || storedUser.shop_name || "Cultural Store",
    role: profile?.role || "Seller",
    avatar:
      profile?.avatar ||
      storedUser.profile_image ||
      "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(storedUser.name || "Seller") +
        "&background=7A1E2C&color=fff",
  };

  // 3. Handle Logout Logic
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_roles");
    localStorage.removeItem("user_info");
    navigate("/login");
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button className="icon-btn mobile-menu-toggle" onClick={toggleMobile}>
          <FiMenu />
        </button>
        <div className="navbar-page-title">
          <h1>Seller Dashboard</h1>
          <span className="navbar-date">{formattedDate}</span>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search orders, SKU, customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="navbar-right">
        <button className="action-icon-btn" aria-label="Messages">
          <FiMail />
          <span className="btn-badge">2</span>
        </button>

        <button className="action-icon-btn" aria-label="Notifications">
          <FiBell />
          {unreadCount > 0 && (
            <span className="btn-badge primary">{unreadCount}</span>
          )}
        </button>

        <div className="profile-menu-container">
          <button
            className="profile-trigger"
            onClick={() => setIsProfileOpen((prev) => !prev)}
          >
            <img
              src={userData.avatar}
              alt={userData.name}
              className="avatar-img"
              onError={(e) => {
                // Fallback avatar if local image link fails
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=7A1E2C&color=fff`;
              }}
            />
            <div className="profile-details">
              <span className="profile-name">{userData.name}</span>
              <span className="profile-store">{userData.storeName}</span>
            </div>
            <FiChevronDown
              className={`chevron-icon ${isProfileOpen ? "rotated" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                className="profile-dropdown-card"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <div className="dropdown-header">
                  <p className="dropdown-user">{userData.name}</p>
                  <p className="dropdown-role">{userData.role}</p>
                </div>
                <div className="dropdown-divider" />
                <ul>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/seller/profile")}
                    >
                      <FiUser /> View Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <FiSettings /> Account Settings
                    </button>
                  </li>
                  <div className="dropdown-divider" />
                  <li>
                    <button
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <FiLogOut /> Log Out
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
