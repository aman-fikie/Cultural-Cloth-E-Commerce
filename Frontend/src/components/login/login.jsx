import { Link } from "react-router-dom";
import React, { useState, useId, memo, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

// Reusable UI Sub-Components
const FormInput = memo(({ label, type, icon, error, ...props }) => {
  const inputId = useId();
  const errorId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const currentType = isPassword && showPassword ? "text" : type;

  return (
    <div className="form-group">
      <label htmlFor={inputId} className="form-label">
        {label}
      </label>
      <div className="input-wrapper">
        <span className="input-icon" aria-hidden="true">
          {icon}
        </span>
        <input
          id={inputId}
          type={currentType}
          className={`form-input ${icon ? "has-icon" : ""} ${isPassword ? "has-toggle" : ""} ${error ? "has-error" : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "👁️" : "🙈"}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} className="error-msg" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

FormInput.displayName = "FormInput";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-dismiss API error notification
  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => {
        setApiError("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [apiError]);

  const validateForm = () => {
    const localErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      localErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      localErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      localErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      localErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      const res = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data && res.data.access_token) {
        // 1. Save Token, User Roles, and User Info
        localStorage.setItem("auth_token", res.data.access_token);
        localStorage.setItem(
          "user_roles",
          JSON.stringify(res.data.roles || []),
        );

        // --- SAVE USER DATA FOR THE DASHBOARD ---
        if (res.data.user) {
          localStorage.setItem("user_info", JSON.stringify(res.data.user));
        }

        // 2. Perform Role-Based Routing
        const targetRoute = res.data.redirect_to || "/";
        navigate(targetRoute);
      } else {
        throw new Error("Authentication parameters not found from backend.");
      }
    } catch (err) {
      console.error(
        "Login verification failed:",
        err.response?.data || err.message,
      );
      setApiError(
        err.response?.data?.message ||
          "Invalid email or password verification context.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="login-container">
        <div className="top-header-bar" aria-hidden="true"></div>
        <article className="login-card">
          <header className="brand-header">
            <div className="brand-logo" aria-hidden="true"></div>
            <h1 className="brand-title">Cultural Cloth</h1>
            <h2 className="brand-subtitle">Login</h2>
            <hr />
          </header>

          {/* ERROR POPUP NOTIFICATION */}
          {apiError && (
            <div
              style={{
                position: "fixed",
                top: "24px",
                right: "24px",
                backgroundColor: "#ef4444",
                color: "#ffffff",
                padding: "16px 24px",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyInContent: "space-between",
                gap: "24px",
                zIndex: 9999,
                fontFamily: "system-ui, sans-serif",
                minWidth: "280px",
              }}
              role="alert"
              aria-live="assertive"
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span style={{ fontSize: "20px" }}>❌</span>
                <div>
                  <strong style={{ display: "block", fontSize: "15px" }}>
                    Authentication Error
                  </strong>
                  <span style={{ fontSize: "13px", opacity: 0.9 }}>
                    {apiError}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setApiError("")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  padding: "0",
                  opacity: 0.8,
                  lineHeight: 1,
                }}
              >
                &times;
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              icon=""
              error={errors.email}
              required
            />

            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              icon=""
              error={errors.password}
              required
            />

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <a href="/forgot-password" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  Connecting securely...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* DUAL ACTION BUYER / SELLER FOOTER */}
          {/* DUAL ACTION BUYER / SELLER FOOTER */}
          <footer
            className="form-footer"
            style={{
              marginTop: "24px",
              paddingTop: "16px",
              borderTop: "1px solid #E5E7EB",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#6B7280",
                marginBottom: "14px",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              Don't have an account? Join as:
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {/* Buyer Button -> Direct to /signup/buyer */}
              <Link
                to="/signup/buyer"
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px 14px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#7A1E2C",
                  backgroundColor: "#FFF8F8",
                  border: "1.5px solid #7A1E2C",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "all 0.2s ease-in-out",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#7A1E2C";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFF8F8";
                  e.currentTarget.style.color = "#7A1E2C";
                }}
              >
                <span>🛍️</span> As a Buyer
              </Link>

              {/* Seller Button -> 3-step registration */}
              <Link
                to="/signup"
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px 14px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#C8A44D",
                  backgroundColor: "#FFFCF3",
                  border: "1.5px solid #C8A44D",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "all 0.2s ease-in-out",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#C8A44D";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFCF3";
                  e.currentTarget.style.color = "#C8A44D";
                }}
              >
                <span>🏪</span> As a Seller
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}
