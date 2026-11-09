import React from "react";
import { FiShoppingBag } from "react-icons/fi";

export default function ShopInfoSection({ profileData, handleChange, errors }) {
  return (
    <div className="profile-section-card">
      <div className="section-header">
        <FiShoppingBag className="section-header-icon" />
        <div>
          <h3>Shop Information</h3>
          <p>Manage your cultural storefront details and business hours</p>
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group full-width">
          <label htmlFor="shop_name">Shop Name *</label>
          <input
            type="text"
            id="shop_name"
            name="shop_name"
            value={profileData.shop_name || ""}
            onChange={handleChange}
            className={errors.shop_name ? "input-error" : ""}
          />
          {errors.shop_name && (
            <span className="error-text">{errors.shop_name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="start_time">Opening Time *</label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            value={profileData.start_time || ""}
            onChange={handleChange}
            className={errors.start_time ? "input-error" : ""}
          />
          {errors.start_time && (
            <span className="error-text">{errors.start_time}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="end_time">Closing Time *</label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            value={profileData.end_time || ""}
            onChange={handleChange}
            className={errors.end_time ? "input-error" : ""}
          />
          {errors.end_time && (
            <span className="error-text">{errors.end_time}</span>
          )}
        </div>

        <div className="form-group full-width">
          <label htmlFor="shop_description">
            Shop Description *{" "}
            <span className="char-count">
              ({(profileData.shop_description || "").length}/500)
            </span>
          </label>
          <textarea
            id="shop_description"
            name="shop_description"
            rows="4"
            value={profileData.shop_description || ""}
            onChange={handleChange}
            className={errors.shop_description ? "input-error" : ""}
            placeholder="Describe your authentic traditional clothing line..."
          />
          {errors.shop_description && (
            <span className="error-text">{errors.shop_description}</span>
          )}
        </div>
      </div>
    </div>
  );
}
