import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelectionPage.css"; // Add styling as needed

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    if (role === "buyer") {
      navigate("/buyer/dashboard");
    } else if (role === "seller") {
      navigate("/seller/dashboard"); // Navigates directly to your dashboard
    }
  };

  return (
    <div className="role-selection-root">
      <div className="top-header-bar" aria-hidden="true" />
      <div className="role-selection-card">
        <header className="brand-header">
          <h1 className="brand-title">Cultural Cloth</h1>
          <h2 className="brand-subtitle">Choose Your Workspace</h2>
          <hr />
        </header>

        <p className="role-description">
          You have active access as both a <strong>Buyer</strong> and a{" "}
          <strong>Seller</strong>. Which dashboard would you like to visit?
        </p>

        <div className="role-buttons-container">
          <button
            type="button"
            className="role-btn buyer-btn"
            onClick={() => handleSelectRole("buyer")}
          >
            <span className="role-icon">🛍️</span>
            <div>
              <strong>Continue as Buyer</strong>
              <span>Browse and buy cultural garments</span>
            </div>
          </button>

          <button
            type="button"
            className="role-btn seller-btn"
            onClick={() => handleSelectRole("seller")}
          >
            <span className="role-icon">🏪</span>
            <div>
              <strong>Continue as Seller</strong>
              <span>Manage your shop and products</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
