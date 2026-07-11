import { Link } from 'react-router-dom';
import React, { useState, useId, memo } from 'react';
import './login.css';

// Reusable UI Sub-Components 
const FormInput = memo(({ label, type, icon, error, ...props }) => {
  const inputId = useId();
  const errorId = useId();
  const [showPassword, setShowPassword] = useState(false);
  
  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;

  return (
    <div class="form-group">
      <label htmlFor={inputId} class="form-label">{label}</label>
      <div class="input-wrapper">
        <span class="input-icon" aria-hidden="true">{icon}</span>
        <input
          id={inputId}
          type={currentType}
          class={`form-input ${icon ? 'has-icon' : ''} ${isPassword ? 'has-toggle' : ''} ${error ? 'has-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            class="password-toggle"
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
        )}
      </div>
      {error && <p id={errorId} class="error-msg" role="alert">{error}</p>}
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

  // Submit Handler imitating asynchronous backend handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError('');

    try {
      // Mimicking real-world Secure network latency
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mocking test condition for bad response
          if (formData.email === 'error@culturalcloth.com') {
            reject(new Error('Invalid credentials. Please verify your information.'));
          } else {
            resolve();
          }
        }, 1500);
      });
      alert('Authentication Successful!');
    } catch (err) {
      setApiError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
      <main className="login-container">
        <div class="top-header-bar" aria-hidden="true"></div>
      <article class="login-card">
        <header class="brand-header">
          <div class="brand-logo" aria-hidden="true"></div>
          <h1 class="brand-title">Cultural Cloth</h1>
          <h2 class="brand-subtitle">Login</h2>
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
                <span class="spinner" aria-hidden="true"></span>
                Connecting securely...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <footer class="form-footer">
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