import React from "react";
import { FiFileText, FiDownload } from "react-icons/fi";

export default function BusinessLicenseSection({
  licensePreview,
  handleLicenseChange,
  error,
}) {
  const getLicenseFileName = () => {
    if (!licensePreview) return "No document uploaded";
    if (typeof licensePreview === "string") {
      return licensePreview.split("/").pop();
    }
    return licensePreview.name || "Selected Document";
  };

  return (
    <div className="profile-section-card">
      <div className="section-header">
        <FiFileText className="section-header-icon" />
        <div>
          <h3>Business License</h3>
          <p>Upload official document (PDF, PNG, JPG)</p>
        </div>
      </div>

      <div className="license-upload-box">
        <div className="license-info">
          <FiFileText className="license-file-icon" />
          <span className="file-name">{getLicenseFileName()}</span>
        </div>

        <div className="upload-controls">
          {typeof licensePreview === "string" &&
            licensePreview.startsWith("http") && (
              <a
                href={licensePreview}
                target="_blank"
                rel="noopener noreferrer"
                className="download-link-btn"
                title="View/Download Document"
              >
                <FiDownload />
              </a>
            )}

          <label htmlFor="business_license_input" className="upload-btn">
            Replace File
          </label>
          <input
            type="file"
            id="business_license_input"
            accept=".pdf, image/png, image/jpeg, image/jpg"
            onChange={handleLicenseChange}
            hidden
          />
        </div>
      </div>
      {error && <span className="error-text mt-2">{error}</span>}
    </div>
  );
}
