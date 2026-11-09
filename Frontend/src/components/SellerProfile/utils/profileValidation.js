export const validateProfileForm = (formData) => {
  const errors = {};

  // Name
  if (!formData.name || formData.name.trim().length < 3) {
    errors.name = 'Full name must be at least 3 characters.';
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  // Phone Number
  const phoneRegex = /^[0-9+\s\-()]{7,15}$/;
  if (!formData.phone_number || !phoneRegex.test(formData.phone_number)) {
    errors.phone_number = 'Please enter a valid phone number.';
  }

  // Shop Name
  if (!formData.shop_name || !formData.shop_name.trim()) {
    errors.shop_name = 'Shop name is required.';
  }

  // Shop Description
  if (!formData.shop_description || !formData.shop_description.trim()) {
    errors.shop_description = 'Shop description is required.';
  } else if (formData.shop_description.length > 500) {
    errors.shop_description = 'Description cannot exceed 500 characters.';
  }

  // Opening & Closing Times
  if (!formData.start_time) {
    errors.start_time = 'Opening time is required.';
  }

  if (!formData.end_time) {
    errors.end_time = 'Closing time is required.';
  } else if (formData.start_time && formData.end_time) {
    if (formData.start_time >= formData.end_time) {
      errors.end_time = 'Closing time must be after opening time.';
    }
  }

  return errors;
};

export const validatePasswordForm = (passData) => {
  const errors = {};

  if (!passData.current_password) {
    errors.current_password = 'Current password is required.';
  }

  if (!passData.new_password || passData.new_password.length < 8) {
    errors.new_password = 'New password must be at least 8 characters long.';
  }

  if (passData.new_password !== passData.confirm_password) {
    errors.confirm_password = 'Passwords do not match.';
  }

  return errors;
};