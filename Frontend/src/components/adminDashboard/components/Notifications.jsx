import React from "react";
import {
  FiBell,
  FiCheckCircle,
  FiAlertCircle,
  FiUserPlus,
  FiShoppingBag,
} from "react-icons/fi";

const notificationIcons = {
  seller: <FiUserPlus color="#C8A44D" size={18} />,
  order: <FiShoppingBag color="#2E5D50" size={18} />,
  alert: <FiAlertCircle color="#D9534F" size={18} />,
  default: <FiBell color="#7A1E2C" size={18} />,
};

export default function Notifications({ notifications = [], onMarkRead }) {
  return (
    <div
      style={{
        background: "#FFF",
        border: "1px solid #E8E2D5",
        borderRadius: "12px",
        padding: "1.25rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: "serif",
            color: "#7A1E2C",
            fontSize: "1.1rem",
          }}
        >
          Marketplace Alerts
        </h3>
        <span
          style={{ fontSize: "0.75rem", color: "#2E5D50", fontWeight: "700" }}
        >
          Live Updates
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {notifications.length === 0 ? (
          <p style={{ margin: 0, color: "#6E6E6E", fontSize: "0.875rem" }}>
            No new notifications.
          </p>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: item.is_read
                  ? "#FAF6EF"
                  : "rgba(200, 164, 77, 0.08)",
                borderLeft: item.is_read
                  ? "3px solid transparent"
                  : "3px solid #7A1E2C",
              }}
            >
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <div style={{ marginTop: "0.1rem" }}>
                  {notificationIcons[item.type] || notificationIcons.default}
                </div>
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#2B2B2B",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      margin: "0.2rem 0 0",
                      fontSize: "0.78rem",
                      color: "#6E6E6E",
                    }}
                  >
                    {item.message}
                  </p>
                </div>
              </div>
              {!item.is_read && (
                <button
                  onClick={() => onMarkRead(item.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#2E5D50",
                  }}
                  title="Mark as Read"
                >
                  <FiCheckCircle size={16} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
