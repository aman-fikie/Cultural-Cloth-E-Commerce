import React from "react";
import { FiCheck, FiTrash2 } from "react-icons/fi";

export default function SellerTable({ sellers = [], onApprove, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Seller</th>
            <th>Shop Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "#6E6E6E",
                }}
              >
                No active sellers found.
              </td>
            </tr>
          ) : (
            sellers.map((seller) => (
              <tr key={seller.id}>
                <td style={{ fontWeight: "600" }}>{seller.name}</td>
                <td>{seller.shop_name || "—"}</td>
                <td>{seller.email}</td>
                <td>
                  <span
                    className={`status-badge ${seller.status || "pending"}`}
                  >
                    {seller.status || "pending"}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {seller.status === "pending" && (
                      <button
                        onClick={() => onApprove(seller.id)}
                        style={{
                          border: "none",
                          background: "#2E5D50",
                          color: "#FFF",
                          borderRadius: "4px",
                          padding: "0.4rem",
                          cursor: "pointer",
                        }}
                        title="Approve Seller"
                      >
                        <FiCheck size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(seller.id)}
                      style={{
                        border: "none",
                        background: "#D9534F",
                        color: "#FFF",
                        borderRadius: "4px",
                        padding: "0.4rem",
                        cursor: "pointer",
                      }}
                      title="Delete Seller"
                    >
                      <FiTrash2 size={16} />
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
