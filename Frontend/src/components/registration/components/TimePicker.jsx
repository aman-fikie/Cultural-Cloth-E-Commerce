// components/TimePicker.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../Registration.module.css';

export const TimePicker = () => {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <div className={styles.fieldContainer}>
      <span className={styles.fieldLabel}>Working time</span>
      <div className={styles.timePickerRow}>
        <div className={styles.timeInputWrapper}>
          <input 
            type="text" 
            placeholder="09:00 AM" 
            className={`${styles.inputElement} ${errors.startTime ? styles.inputErrorBorder : ''}`}
            {...register('startTime')}
          />
        </div>
        <span className={styles.timeToText}>to</span>
        <div className={styles.timeInputWrapper}>
          <input 
            type="text" 
            placeholder="06:00 PM" 
            className={`${styles.inputElement} ${errors.endTime ? styles.inputErrorBorder : ''}`}
            {...register('endTime')}
          />
        </div>
      </div>
      {(errors.startTime || errors.endTime) && (
        <p className={styles.errorMessage} role="alert">
          {errors.startTime?.message || errors.endTime?.message}
        </p>
      )}
    </div>
  );
};