import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RevenueChart({ data }) {
  return (
    <div
      style={{
        background: "#FFF",
        border: "1px solid #E8E2D5",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1.05rem",
            color: "#7A1E2C",
            fontFamily: "serif",
          }}
        >
          Marketplace Revenue Analytics
        </h3>
        <span
          style={{
            fontSize: "0.8rem",
            color: "#2E5D50",
            fontWeight: "600",
            backgroundColor: "rgba(46,93,80,0.1)",
            padding: "0.25rem 0.6rem",
            borderRadius: "4px",
          }}
        >
          Real-time API Sync
        </span>
      </div>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7A1E2C" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#7A1E2C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D5" />
            <XAxis dataKey="month" stroke="#6E6E6E" fontSize={12} />
            <YAxis stroke="#6E6E6E" fontSize={12} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#7A1E2C"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
