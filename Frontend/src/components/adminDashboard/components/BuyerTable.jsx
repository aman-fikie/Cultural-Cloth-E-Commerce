import React from "react";
import { FiSlash, FiTrash2, FiUser } from "react-icons/fi";

export default function BuyerTable({ buyers = [], onToggleBlock, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Email</th>
            <th>Total Orders</th>
            <th>Joined Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buyers.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "#6E6E6E",
                }}
              >
                No buyer accounts registered yet.
              </td>
            </tr>
          ) : (
            buyers.map((buyer) => (
              <tr key={buyer.id}>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(122,30,44,0.1)",
                        color: "#7A1E2C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FiUser size={16} />
                    </div>
                    <span style={{ fontWeight: "600" }}>{buyer.name}</span>
                  </div>
                </td>
                <td>{buyer.email}</td>
                <td style={{ fontWeight: "600" }}>{buyer.orders_count || 0}</td>
                <td>
                  {buyer.created_at
                    ? new Date(buyer.created_at).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <span
                    className={`status-badge ${buyer.is_blocked ? "blocked" : "active"}`}
                  >
                    {buyer.is_blocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <button
                      onClick={() => onToggleBlock(buyer.id)}
                      style={{
                        border: "none",
                        background: buyer.is_blocked ? "#2E5D50" : "#D9534F",
                        color: "#FFF",
                        borderRadius: "4px",
                        padding: "0.4rem",
                        cursor: "pointer",
                      }}
                      title={buyer.is_blocked ? "Unblock Buyer" : "Block Buyer"}
                    >
                      <FiSlash size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(buyer.id)}
                      style={{
                        border: "none",
                        background: "rgba(217,83,79,0.15)",
                        color: "#D9534F",
                        borderRadius: "4px",
                        padding: "0.4rem",
                        cursor: "pointer",
                      }}
                      title="Delete Account"
                    >
                      <FiTrash2 size={15} />
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
