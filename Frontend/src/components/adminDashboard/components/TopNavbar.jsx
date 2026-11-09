import React from "react";
import { FiMenu, FiSearch, FiBell, FiMail } from "react-icons/fi";

export default function TopNavbar({ collapsed, setCollapsed }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="admin-navbar">
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="nav-toggle-btn"
        >
          <FiMenu size={20} />
        </button>

        <div className="search-bar-wrapper">
          <FiSearch color="#6E6E6E" size={16} />
          <input
            type="text"
            placeholder="Search marketplace..."
            className="search-bar-input"
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <span
          style={{ fontSize: "0.85rem", color: "#6E6E6E", fontWeight: "500" }}
        >
          {currentDate}
        </span>

        <div style={{ position: "relative", cursor: "pointer" }}>
          <FiBell size={20} color="#2B2B2B" />
          <span
            style={{
              position: "absolute",
              top: "-3px",
              right: "-3px",
              backgroundColor: "#7A1E2C",
              color: "#FFF",
              borderRadius: "50%",
              width: "14px",
              height: "14px",
              fontSize: "0.65rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            4
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            borderLeft: "1px solid #E8E2D5",
            paddingLeft: "1.25rem",
          }}
        >
          <div className="avatar-circle">
            {user.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <div style={{ fontWeight: "600", fontSize: "0.85rem" }}>
              {user.name || "System Admin"}
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "#2E5D50",
                fontWeight: "600",
              }}
            >
              Administrator
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
