import { useState } from 'react';
import { validateBuyerForm } from '../validation/buyerRegisterSchema';

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
};

export const useBuyerRegistrationForm = (onSuccess) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const { isValid, errors: validationErrors } = validateBuyerForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setApiError('');

    // Payload formatted for Laravel backend
    const laravelPayload = {
      full_name: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      password: formData.password,
      password_confirmation: formData.confirmPassword
    };

    try {
      console.log('Sending payload to Laravel:', laravelPayload);

      // Simulated latency
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onSuccess) {
        onSuccess(laravelPayload);
      }
    } catch (err) {
      console.error('Buyer Registration API Error:', err);
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    apiError,
    handleChange,
    handleSubmit,
    setApiError
  };
};