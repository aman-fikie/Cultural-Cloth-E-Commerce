// components/SelectField.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../Registration.module.css';

export const SelectField = ({ name, label, options, ...props }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors?.[name]?.message;

  return (
    <div className={styles.fieldContainer}>
      <label htmlFor={name} className={styles.fieldLabel}>{label}</label>
      <select
        id={name}
        className={`${styles.selectElement} ${error ? styles.inputErrorBorder : ''}`}
        {...register(name)}
        {...props}
        aria-invalid={!!error}
      >
        <option value="">Select options...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className={styles.errorMessage} role="alert">{error}</p>}
    </div>
  );
};