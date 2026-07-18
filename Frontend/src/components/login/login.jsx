import { Link } from 'react-router-dom';
import React, { useState, useId, memo } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; // Ensure this points to your config containing withCredentials: true

// Reusable UI Sub-Components 
const FormInput = memo(({ label, type, icon, error, ...props }) => {
  const inputId = useId();
  const errorId = useId();
  const [showPassword, setShowPassword] = useState(false);
  
  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="form-group">
      <label htmlFor={inputId} className="form-label">{label}</label>
      <div className="input-wrapper">
        <span className="input-icon" aria-hidden="true">{icon}</span>
        <input
          id={inputId}
          type={currentType}
          className={`form-input ${icon ? 'has-icon' : ''} ${isPassword ? 'has-toggle' : ''} ${error ? 'has-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
        )}
      </div>
      {error && <p id={errorId} className="error-msg" role="alert">{error}</p>}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default function Login() {
  // Local UI State Management
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Form Client-side Validation Business Logic
  const validateForm = () => {
    const localErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      localErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      localErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      localErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      localErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  // Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clean up contextual error when user interacts
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  // UPDATED Submit Handler to connect to login.php
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError('');

    try {
      // UPDATE 1: Target '/login.php' instead of '/login'
      const res = await api.post('/login.php', {
        email: formData.email,
        password: formData.password,
      });

      // UPDATE 2: We save the user details returned by our backend response.
      // We do not save a JWT 'token' here because PHP session cookies are handled automatically by the browser.
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      // Safely extract PHP custom errors (like 'Invalid email or password.')
      setApiError(err.response?.data?.message || 'An unexpected error occurred. Please try again.');
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

          {apiError && (
            <div className="alert-error" role="alert" aria-live="assertive">
              {apiError}
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
              <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
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
              ) : 'Sign In'}
            </button>
          </form>

          <footer className="form-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="footer-link">
                Sign Up
              </Link>
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}