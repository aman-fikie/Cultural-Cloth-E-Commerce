import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="profile-skeleton-wrapper">
      <div className="skeleton-card sidebar-skeleton">
        <div className="skeleton-avatar" />
        <div className="skeleton-line title" />
        <div className="skeleton-line subtitle" />
        <div className="skeleton-line btn" />
      </div>

      <div className="skeleton-main-content">
        <div className="skeleton-card section-skeleton">
          <div className="skeleton-line heading" />
          <div className="skeleton-grid">
            <div className="skeleton-input" />
            <div className="skeleton-input" />
            <div className="skeleton-input" />
            <div className="skeleton-input" />
          </div>
        </div>
      </div>
    </div>
  );
}
