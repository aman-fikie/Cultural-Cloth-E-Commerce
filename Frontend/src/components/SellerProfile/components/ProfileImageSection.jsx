import React from "react";
import { FiCamera, FiUser } from "react-icons/fi";

export default function ProfileImageSection({
  imagePreview,
  handleImageChange,
  handleRemoveImage,
  error,
}) {
  return (
    <div className="profile-section-card">
      <div className="section-header">
        <FiCamera className="section-header-icon" />
        <div>
          <h3>Profile Picture</h3>
          <p>JPG, PNG, JPEG, or WEBP</p>
        </div>
      </div>

      <div className="media-upload-box">
        <div className="avatar-preview-container">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="preview-img"
            />
          ) : (
            <div className="placeholder-avatar">
              <FiUser />
            </div>
          )}
        </div>

        <div className="upload-controls">
          <label htmlFor="profile_image_input" className="upload-btn">
            Upload Image
          </label>
          <input
            type="file"
            id="profile_image_input"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={handleImageChange}
            hidden
          />
          {imagePreview && (
            <button
              type="button"
              className="remove-btn"
              onClick={handleRemoveImage}
            >
              Remove
            </button>
          )}
        </div>
      </div>
      {error && <span className="error-text mt-2">{error}</span>}
    </div>
  );
}
