import React from "react";
import {
  FiCheckCircle,
  FiEdit2,
  FiLock,
  FiCalendar,
  FiShield,
} from "react-icons/fi";

export default function LeftSidebarCard({
  profile,
  activeTab,
  setActiveTab,
  hasUnsavedChanges,
}) {
  const buildAvatarUrl = (path) => {
    if (!path) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || "Seller")}&background=7A1E2C&color=fff`;
    }
    return path.startsWith("http") || path.startsWith("blob:")
      ? path
      : `http://localhost:8000/${path}`;
  };

  return (
    <aside className="profile-sidebar-card">
      <div className="sidebar-avatar-wrapper">
        <img
          src={buildAvatarUrl(profile.profile_image)}
          alt={profile.name || "Seller"}
          className="sidebar-avatar-img"
        />
        <span className="verified-badge" title="Verified Seller">
          <FiCheckCircle />
        </span>
      </div>

      <div className="sidebar-seller-details">
        <h2 className="seller-name">{profile.name || "Seller Name"}</h2>
        <p className="seller-email">{profile.email || "seller@example.com"}</p>
        <span className="seller-shop-tag">
          {profile.shop_name || "Cultural Store"}
        </span>
      </div>

      <div className="sidebar-meta-info">
        <div className="meta-item">
          <FiShield className="meta-icon" />
          <span>
            Status: <strong className="status-active">Active</strong>
          </span>
        </div>
        <div className="meta-item">
          <FiCalendar className="meta-icon" />
          <span>
            Member Since: <strong>2026</strong>
          </span>
        </div>
      </div>

      <div className="sidebar-actions-menu">
        <button
          className={`sidebar-nav-btn ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          <FiEdit2 /> Profile Details{" "}
          {hasUnsavedChanges && <span className="dirty-indicator">•</span>}
        </button>

        <button
          className={`sidebar-nav-btn ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          <FiLock /> Change Password
        </button>
      </div>
    </aside>
  );
}
