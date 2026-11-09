import React from "react";
import { FiTrendingUp } from "react-icons/fi";

export default function StatsCards({ title, value, percentage, icon: Icon }) {
  return (
    <div className="stat-card-box">
      <div>
        <span
          style={{ color: "#6E6E6E", fontSize: "0.825rem", fontWeight: "500" }}
        >
          {title}
        </span>
        <h2
          style={{
            margin: "0.25rem 0",
            fontSize: "1.65rem",
            color: "#2B2B2B",
            fontWeight: "700",
          }}
        >
          {value}
        </h2>
        {percentage && (
          <span className="trend-badge up">
            <FiTrendingUp size={12} /> {percentage}
          </span>
        )}
      </div>
      <div className="stat-icon-wrapper">
        <Icon />
      </div>
    </div>
  );
}
