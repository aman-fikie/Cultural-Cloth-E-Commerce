import React from "react";
import { FiEye, FiRefreshCw, FiXCircle } from "react-icons/fi";

export default function OrdersTable({ orders = [], onUpdateStatus, onRefund }) {
  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Order Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "#6E6E6E",
                }}
              >
                No recent orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontWeight: "700", color: "#7A1E2C" }}>
                  #{order.order_number || order.id}
                </td>
                <td>{order.buyer_name || "Guest Buyer"}</td>
                <td>{order.seller_name || "Marketplace"}</td>
                <td style={{ fontWeight: "600" }}>
                  ${order.total_amount?.toFixed(2)}
                </td>
                <td>
                  <span
                    className={`status-badge ${order.payment_status || "completed"}`}
                  >
                    {order.payment_status || "Paid"}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${order.status || "pending"}`}>
                    {order.status || "Processing"}
                  </span>
                </td>
                <td>
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button
                      onClick={() => onUpdateStatus(order.id, "shipped")}
                      style={{
                        border: "none",
                        background: "#2E5D50",
                        color: "#FFF",
                        borderRadius: "4px",
                        padding: "0.4rem",
                        cursor: "pointer",
                      }}
                      title="Mark as Shipped"
                    >
                      <FiEye size={15} />
                    </button>
                    <button
                      onClick={() => onRefund(order.id)}
                      style={{
                        border: "none",
                        background: "#C8A44D",
                        color: "#000",
                        borderRadius: "4px",
                        padding: "0.4rem",
                        cursor: "pointer",
                      }}
                      title="Issue Refund"
                    >
                      <FiRefreshCw size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
