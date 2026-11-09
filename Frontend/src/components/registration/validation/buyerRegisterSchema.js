/**
 * Buyer Registration Form Validation Schema
 */

export const validateBuyerForm = (formData) => {
  const errors = {};

  // Full Name Validation
  if (!formData.fullName || !formData.fullName.trim()) {
    errors.fullName = 'Full Name is required.';
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = 'Full Name must be at least 3 characters.';
  } else if (formData.fullName.trim().length > 100) {
    errors.fullName = 'Full Name cannot exceed 100 characters.';
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email Address is required.';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  // Local Phone Number Validation (Numeric only, minimum 9–10 digits)
  const phoneRegex = /^[0-9]{9,10}$/;
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!phoneRegex.test(formData.phone.trim())) {
    errors.phone = 'Please enter a valid local phone number (9–10 digits).';
  }

  // Password Validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!formData.password) {
    errors.password = 'Password is required.';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  } else if (!passwordRegex.test(formData.password)) {
    errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number.';
  }

  // Confirm Password Validation
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};