import React, { useState } from "react";
import { FiLock, FiSave, FiEye, FiEyeOff } from "react-icons/fi";

export default function ChangePasswordSection({
  passwordData,
  handlePasswordChange,
  handleSavePassword,
  submitting,
  errors,
}) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="profile-section-card">
      <div className="section-header">
        <FiLock className="section-header-icon" />
        <div>
          <h3>Change Password</h3>
          <p>Ensure your seller account is secured with a strong password</p>
        </div>
      </div>

      <form onSubmit={handleSavePassword} className="password-form" noValidate>
        <div className="form-group">
          <label htmlFor="current_password">Current Password *</label>
          <div className="password-input-wrapper">
            <input
              type={showCurrent ? "text" : "password"}
              id="current_password"
              name="current_password"
              value={passwordData.current_password}
              onChange={handlePasswordChange}
              className={errors.current_password ? "input-error" : ""}
            />
            <button
              type="button"
              className="visibility-toggle"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.current_password && (
            <span className="error-text">{errors.current_password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="new_password">New Password *</label>
          <div className="password-input-wrapper">
            <input
              type={showNew ? "text" : "password"}
              id="new_password"
              name="new_password"
              value={passwordData.new_password}
              onChange={handlePasswordChange}
              className={errors.new_password ? "input-error" : ""}
            />
            <button
              type="button"
              className="visibility-toggle"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.new_password && (
            <span className="error-text">{errors.new_password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirm_password">Confirm New Password *</label>
          <div className="password-input-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              value={passwordData.confirm_password}
              onChange={handlePasswordChange}
              className={errors.confirm_password ? "input-error" : ""}
            />
            <button
              type="button"
              className="visibility-toggle"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.confirm_password && (
            <span className="error-text">{errors.confirm_password}</span>
          )}
        </div>

        <div className="form-actions-right">
          <button type="submit" className="save-btn" disabled={submitting}>
            {submitting ? (
              <div className="spinner" />
            ) : (
              <>
                <FiSave /> Update Password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
