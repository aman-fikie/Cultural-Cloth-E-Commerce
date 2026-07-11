// components/InputField.tsx
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../Registration.module.css';

export const InputField = ({ name, label, type = 'text', icon, ...props }) => {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const error = errors[name]?.message ;

  const isPassword = type === 'password';
  const computedType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={styles.fieldContainer}>
      <label htmlFor={name} className={styles.fieldLabel}>{label}</label>
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}
        <input
          id={name}
          type={computedType}
          className={`${styles.inputElement} ${error ? styles.inputErrorBorder : ''} ${icon ? styles.hasIcon : ''}`}
          {...register(name)}
          {...props}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && <p id={`${name}-error`} className={styles.errorMessage} role="alert">{error}</p>}
    </div>
  );
};