// components/NavigationButtons.tsx
import React from 'react';
import styles from '../Registration.module.css';

export const NavigationButtons = ({
  onBack,
  onNext,
  isFirstStep,
  isLastStep,
  isValid
}) => {
  return (
    <div className={styles.navigationRow}>
      <button
        type="button"
        onClick={onBack}
        className={styles.backButton}
        disabled={isFirstStep}
        aria-disabled={isFirstStep}
      >
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className={styles.primaryButton}
      >
        {isLastStep ? 'Create Account' : 'Next Step'}
      </button>
    </div>
  );
};