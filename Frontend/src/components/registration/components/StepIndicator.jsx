// components/StepIndicator.jsx
import React from 'react';
import styles from '../Registration.module.css';

export const StepIndicator = ({ currentStep }) => {
  const steps = ['Account Info', 'Business Details', 'Profile Settings'];
  
  return (
    <div className={styles.indicatorContainer} role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={3}>
      <div className={styles.stepText}>Step {currentStep + 1} of 3</div>
      <div className={styles.progressTrack}>
        {steps.map((_, index) => {
          let stepClass = styles.stepDotPending;
          if (index === currentStep) stepClass = styles.stepDotActive;
          if (index < currentStep) stepClass = styles.stepDotCompleted;

          return (
            <React.Fragment key={index}>
              <div className={`${styles.stepDot} ${stepClass}`} aria-current={index === currentStep ? 'step' : undefined} />
              {index < steps.length - 1 && (
                <div className={`${styles.stepLine} ${index < currentStep ? styles.stepLineCompleted : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};