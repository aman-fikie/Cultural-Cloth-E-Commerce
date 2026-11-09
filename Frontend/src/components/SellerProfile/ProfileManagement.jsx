import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiSave, FiX, FiAlertTriangle, FiCheck } from "react-icons/fi";

import LeftSidebarCard from "./components/LeftSidebarCard";
import PersonalInfoSection from "./components/PersonalInfoSection";
import ShopInfoSection from "./components/ShopInfoSection";
import ProfileImageSection from "./components/ProfileImageSection";
import BusinessLicenseSection from "./components/BusinessLicenseSection";
import ChangePasswordSection from "./components/ChangePasswordSection";
import ProfileSkeleton from "./components/ProfileSkeleton";

import {
  validateProfileForm,
  validatePasswordForm,
} from "./utils/profileValidation";
import "./ProfileManagement.css";

export default function ProfileManagement() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    gender: "prefer_not_to_say",
    phone_number: "",
    location: "",
    shop_name: "",
    start_time: "",
    end_time: "",
    shop_description: "",
    profile_image: null,
    business_license: null,
  });

  const [originalData, setOriginalData] = useState({});
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [licensePreview, setLicensePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedLicenseFile, setSelectedLicenseFile] = useState(null);

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const buildUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") || path.startsWith("blob:")
      ? path
      : `http://localhost:8000/${path}`;
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.get("/api/seller/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      setProfileData(data);
      setOriginalData(data);
      if (data.profile_image) setImagePreview(buildUrl(data.profile_image));
      if (data.business_license)
        setLicensePreview(buildUrl(data.business_license));
    } catch {
      // Fallback local storage sync
      const storedUser = JSON.parse(localStorage.getItem("user_info") || "{}");
      const fallback = {
        name: storedUser.name || "",
        email: storedUser.email || "",
        gender: storedUser.gender || "male",
        phone_number: storedUser.phone_number || "",
        location: storedUser.location || "",
        shop_name: storedUser.shop_name || "",
        start_time: storedUser.start_time || "08:00",
        end_time: storedUser.end_time || "18:00",
        shop_description: storedUser.shop_description || "",
        profile_image: storedUser.profile_image || null,
        business_license: storedUser.business_license || null,
      };
      setProfileData(fallback);
      setOriginalData(fallback);
      if (fallback.profile_image)
        setImagePreview(buildUrl(fallback.profile_image));
      if (fallback.business_license)
        setLicensePreview(buildUrl(fallback.business_license));
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => {
      const updated = { ...prev, [name]: value };
      setHasUnsavedChanges(
        JSON.stringify(updated) !== JSON.stringify(originalData),
      );
      return updated;
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          profile_image: "Only JPG, JPEG, PNG, and WEBP images allowed.",
        }));
        return;
      }
      setSelectedImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setHasUnsavedChanges(true);
      setErrors((prev) => ({ ...prev, profile_image: null }));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedImageFile(null);
    setProfileData((prev) => ({ ...prev, profile_image: null }));
    setHasUnsavedChanges(true);
  };

  const handleLicenseChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          business_license: "Only PDF, PNG, and JPG files allowed.",
        }));
        return;
      }
      setSelectedLicenseFile(file);
      setLicensePreview(file);
      setHasUnsavedChanges(true);
      setErrors((prev) => ({ ...prev, business_license: null }));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const validationErrors = validateProfileForm(profileData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showNotification(
        "error",
        "Please correct the highlighted errors before saving.",
      );
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("auth_token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.put("/api/seller/profile", profileData, { headers });

      if (selectedImageFile) {
        const imgData = new FormData();
        imgData.append("profile_image", selectedImageFile);
        await axios.post("/api/seller/profile/image", imgData, { headers });
      }

      if (selectedLicenseFile) {
        const licData = new FormData();
        licData.append("business_license", selectedLicenseFile);
        await axios.post("/api/seller/profile/license", licData, { headers });
      }

      const updatedUser = {
        ...JSON.parse(localStorage.getItem("user_info") || "{}"),
        ...profileData,
      };
      localStorage.setItem("user_info", JSON.stringify(updatedUser));

      setOriginalData(profileData);
      setHasUnsavedChanges(false);
      showNotification("success", "Profile updated successfully!");
    } catch (err) {
      showNotification(
        "error",
        err.response?.data?.message || "Failed to update profile.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    const validationErrors = validatePasswordForm(passwordData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("auth_token");
      await axios.put(
        "/api/seller/change-password",
        {
          current_password: passwordData.current_password,
          new_password: passwordData.new_password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
      showNotification("success", "Password updated successfully!");
    } catch (err) {
      showNotification(
        "error",
        err.response?.data?.message || "Incorrect current password.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setImagePreview(
      originalData.profile_image ? buildUrl(originalData.profile_image) : null,
    );
    setLicensePreview(
      originalData.business_license
        ? buildUrl(originalData.business_license)
        : null,
    );
    setSelectedImageFile(null);
    setSelectedLicenseFile(null);
    setHasUnsavedChanges(false);
    setErrors({});
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="profile-management-root">
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`toast-banner ${toast.type}`}
        >
          {toast.type === "success" ? <FiCheck /> : <FiAlertTriangle />}
          <span>{toast.message}</span>
        </motion.div>
      )}

      <div className="profile-management-container">
        <LeftSidebarCard
          profile={profileData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hasUnsavedChanges={hasUnsavedChanges}
        />

        <div className="profile-content-area">
          {activeTab === "general" ? (
            <form onSubmit={handleSaveProfile} noValidate>
              <PersonalInfoSection
                profileData={profileData}
                handleChange={handleChange}
                errors={errors}
              />

              <ShopInfoSection
                profileData={profileData}
                handleChange={handleChange}
                errors={errors}
              />

              <div className="form-grid-2">
                <ProfileImageSection
                  imagePreview={imagePreview}
                  handleImageChange={handleImageChange}
                  handleRemoveImage={handleRemoveImage}
                  error={errors.profile_image}
                />

                <BusinessLicenseSection
                  licensePreview={licensePreview}
                  handleLicenseChange={handleLicenseChange}
                  error={errors.business_license}
                />
              </div>

              <div className="floating-form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                  disabled={!hasUnsavedChanges || submitting}
                >
                  <FiX /> Cancel
                </button>
                <button
                  type="submit"
                  className="save-btn"
                  disabled={!hasUnsavedChanges || submitting}
                >
                  {submitting ? (
                    <div className="spinner" />
                  ) : (
                    <>
                      <FiSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <ChangePasswordSection
              passwordData={passwordData}
              handlePasswordChange={handlePasswordChange}
              handleSavePassword={handleSavePassword}
              submitting={submitting}
              errors={errors}
            />
          )}
        </div>
      </div>
    </div>
  );
}
