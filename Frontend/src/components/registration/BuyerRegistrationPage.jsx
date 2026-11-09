import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import { InputField } from "./components/InputField";
import { useBuyerRegistrationForm } from "./hooks/useBuyerRegistrationForm";
import api from "../../api/api";
import "./BuyerRegistration.css";

export default function BuyerRegistrationPage({ onRegistrationSuccess }) {
  const methods = useForm({ mode: "onTouched" });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    formData,
    errors,
    handleChange,
    setApiError: setHookApiError,
  } = useBuyerRegistrationForm(onRegistrationSuccess);

  // Auto-dismiss API error notification after 5 seconds
  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => setApiError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError("");

    try {
      const response = await api.post("/register/buyer", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.status === 201 || response.status === 200) {
        setShowSuccess(true);
        if (onRegistrationSuccess) onRegistrationSuccess(response.data);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error(
        "Buyer registration error:",
        err.response?.data || err.message,
      );

      const errorBag = err.response?.data?.errors;
      if (errorBag) {
        const firstErrorKey = Object.keys(errorBag)[0];
        setApiError(errorBag[firstErrorKey][0]);
      } else {
        setApiError(
          err.response?.data?.message ||
            "Registration failed. Please try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="buyer-registration-root">
      <div className="top-header-bar" aria-hidden="true" />

      {/* SUCCESS POPUP NOTIFICATION */}
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            backgroundColor: "#10b981",
            color: "#ffffff",
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 9999,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span style={{ fontSize: "20px" }}>✅</span>
          <div>
            <strong style={{ display: "block", fontSize: "15px" }}>
              Buyer Account Created!
            </strong>
            <span style={{ fontSize: "13px", opacity: 0.9 }}>
              Redirecting to login...
            </span>
          </div>
        </div>
      )}

      {/* Main Card Container */}
      <div className="buyer-registration-card">
        <header className="buyer-brand-header">
          <span className="buyer-brand-badge">Cultural Cloth</span>
          <h1 className="buyer-title">Buyer Registration</h1>
          <p className="buyer-subtitle">
            Explore and purchase exclusive, handcrafted cultural garments.
          </p>
          <div className="buyer-header-divider" />
        </header>

        {/* API Error Notification */}
        {apiError && (
          <div className="buyer-api-error-alert" role="alert">
            <span>⚠️ {apiError}</span>
            <button
              type="button"
              onClick={() => setApiError("")}
              className="buyer-alert-close"
              aria-label="Close error message"
            >
              &times;
            </button>
          </div>
        )}

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} className="buyer-form" noValidate>
            <InputField
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Abebe Bikila"
              error={errors.fullName}
              required
            />

            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. abebe@example.com"
              error={errors.email}
              required
            />

            <InputField
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0912345678"
              error={errors.phone}
              required
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              required
            />

            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.confirmPassword}
              required
            />

            <div className="buyer-action-container">
              <button
                type="submit"
                className="buyer-submit-btn"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <span className="buyer-btn-loader">
                    <span className="buyer-spinner" aria-hidden="true" />
                    Processing...
                  </span>
                ) : (
                  <span className="buyer-btn-text">Create Account</span>
                )}
              </button>
            </div>
          </form>
        </FormProvider>

        <footer className="buyer-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="buyer-link">
              Sign In
            </Link>
          </p>
          <div className="buyer-footer-divider" />
          <p>
            Want to sell your cultural garments?{" "}
            <Link to="/signup" className="buyer-seller-link">
              Register as Seller
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
