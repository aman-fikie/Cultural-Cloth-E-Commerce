// Registration.tsx
import React, { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useRegistrationForm } from './hooks/useRegistrationForm';
import { StepIndicator } from './components/StepIndicator';
import { InputField } from './components/InputField';
import { SelectField } from './components/SelectField';
import { FileUpload } from './components/FileUpload';
import { TimePicker } from './components/TimePicker';
import { NavigationButtons } from './components/NavigationButtons';
import styles from './Registration.module.css';

export const RegistrationPage = () => {
  const [profilePreview, setProfilePreview] = useState(null);

  const onSubmit = (data) => {
    console.log('Production Payload standard payload structural validation complete:', data);
    // Execute production unified API post sequence here
  };

  const { currentStep, methods, handleNext, handleBack, isFirstStep, isLastStep } = useRegistrationForm(onSubmit);
  const { formState: { isValid }, register, watch, setValue } = methods;

  const handleProfilePhotoChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setValue('profilePhoto', files, { shouldValidate: true });
      setProfilePreview(URL.createObjectURL(files[0]));
    }
  };

  const textDescription = watch('shopDescription') || '';

  return (
    <div className={styles.pageWrapper}>
      <div class="top-header-bar" aria-hidden="true"></div>
      <main className={styles.cardContainer}>
        <header className={styles.formHeader}>
          <h1 className={styles.brandTitle}>Cultural Cloth</h1>
          <h2 className={styles.brandSubtitle}>Create your account</h2>
          <div className={styles.elegantDivider} />
        </header>

        <StepIndicator currentStep={currentStep} />

        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} noValidate className={styles.formBody}>
            
            {currentStep === 0 && (
              <div className={styles.stepFadeAnimation}>
                <InputField name="fullName" label="Full Name" placeholder="E.g Amanuel Abaynew" required />
                <InputField name="email" label="Email Address" type="email" placeholder="amanabay@gmail.com" required />
                <InputField name="password" label="Password" type="password" placeholder="••••••••" required />
                <InputField name="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" required />
                <SelectField 
                  name="gender" 
                  label="Gender Description Preference" 
                  options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} 
                />
              </div>
            )}

            {currentStep === 1 && (
              <div className={styles.stepFadeAnimation}>
                <FileUpload />
                <InputField name="phoneNumber" label="Phone Number" placeholder="+251 911 111 111" required />
                <InputField name="location" label="Location" placeholder="BDR, Warkaw " required />
                <InputField name="shopName" label="Shop Name (Optional)" placeholder="Aman cultural cloth" />
              </div>
            )}

            {currentStep === 2 && (
              <div className={styles.stepFadeAnimation}>
                <div className={styles.profileSectionContainer}>
                  <span className={styles.fieldLabel}>Profile Photo (Optional)</span>
                  <div className={styles.avatarFlexRow}>
                    <div className={styles.avatarCircularFrame}>
                      {profilePreview ? (
                        <img src={profilePreview} alt="Avatar Preview" className={styles.avatarImage} />
                      ) : (
                        <span className={styles.avatarCameraIcon}>📷</span>
                      )}
                    </div>
                    <div className={styles.avatarActionColumn}>
                      <input 
                        type="file" 
                        id="profilePhoto" 
                        accept=".png,.jpeg,.jpg" 
                        className={styles.hiddenInput} 
                        onChange={handleProfilePhotoChange}
                      />
                      <button type="button" className={styles.avatarBrowseBtn} onClick={() => document.getElementById('profilePhoto')?.click()}>
                        Upload Portrait
                      </button>
                      {profilePreview && (
                        <button type="button" className={styles.avatarRemoveBtn} onClick={() => { setProfilePreview(null); setValue('profilePhoto', null); }}>
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <TimePicker />

                <div className={styles.fieldContainer}>
                  <label htmlFor="shopDescription" className={styles.fieldLabel}>Shop Description (Optional)</label>
                  <textarea 
                    id="shopDescription" 
                    maxLength={300}
                    className={styles.textareaElement}
                    placeholder="Describe about your shop and products..."
                    {...register('shopDescription')}
                  />
                  <div className={styles.charCounter}>{textDescription.length} / 300 Characters</div>
                </div>
              </div>
            )}

            <NavigationButtons 
              onBack={handleBack} 
              onNext={handleNext} 
              isFirstStep={isFirstStep} 
              isLastStep={isLastStep} 
              isValid={isValid}
            />
          </form>
        </FormProvider>
        <p className={styles.loginRedirectText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.loginLink}>Login</Link>
      </p>
      </main>
      
    </div>
  );
};
export default RegistrationPage;