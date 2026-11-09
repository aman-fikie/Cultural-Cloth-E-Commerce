import React from "react";
import { FiUser } from "react-icons/fi";

export default function PersonalInfoSection({
  profileData,
  handleChange,
  errors,
}) {
  return (
    <div className="profile-section-card">
      <div className="section-header">
        <FiUser className="section-header-icon" />
        <div>
          <h3>Personal Information</h3>
          <p>Update your personal credentials and contact details</p>
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name || ""}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email || ""}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">Phone Number *</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={profileData.phone_number || ""}
            onChange={handleChange}
            className={errors.phone_number ? "input-error" : ""}
          />
          {errors.phone_number && (
            <span className="error-text">{errors.phone_number}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={profileData.gender || "prefer_not_to_say"}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="location">Location / Address</label>
          <input
            type="text"
            id="location"
            name="location"
            value={profileData.location || ""}
            onChange={handleChange}
            placeholder="e.g. Addis Ababa, Ethiopia"
          />
        </div>
      </div>
    </div>
  );
}
