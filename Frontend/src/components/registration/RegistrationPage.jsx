import React, { useState, useEffect } from "react"; // Added useEffect for the timer
import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegistrationForm } from "./hooks/useRegistrationForm";
import { StepIndicator } from "./components/StepIndicator";
import { InputField } from "./components/InputField";
import { SelectField } from "./components/SelectField";
import { FileUpload } from "./components/FileUpload";
import { TimePicker } from "./components/TimePicker";
import { NavigationButtons } from "./components/NavigationButtons";
import styles from "./Registration.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export const RegistrationPage = () => {
  const [profilePreview, setProfilePreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // --- NEW: AUTO DISAPPEAR AFTER 5 SECONDS ---
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000); // 5000ms = 5 seconds

      return () => clearTimeout(timer); // Clear timeout if component rerenders
    }
  }, [errorMessage]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      const formData = new FormData();

      const formValues = methods.getValues();

      // Append all text values explicitly targeting Laravel validator rules
      formData.append("fullName", formValues.fullName);
      formData.append("email", formValues.email);
      formData.append("password", formValues.password);
      formData.append("confirmPassword", formValues.confirmPassword);

      if (formValues.gender) formData.append("gender", formValues.gender);
      if (formValues.phoneNumber)
        formData.append("phoneNumber", formValues.phoneNumber);
      if (formValues.location) formData.append("location", formValues.location);
      if (formValues.shopName) formData.append("shopName", formValues.shopName);
      if (formValues.startTime)
        formData.append("startTime", formValues.startTime);
      if (formValues.endTime) formData.append("endTime", formValues.endTime);
      if (formValues.shopDescription)
        formData.append("shopDescription", formValues.shopDescription);

      // Append Business License File (Check backend validation key if this fails)
      if (data.businessLicense && data.businessLicense[0]) {
        formData.append("businessLicense", data.businessLicense[0]);
      }

      // Append Profile Photo File (Check backend validation key if this fails)
      if (data.profilePhoto && data.profilePhoto[0]) {
        formData.append("profilePhoto", data.profilePhoto[0]);
      }

      console.log(
        "Data sent to Laravel:",
        Object.fromEntries(formData.entries()),
      );

      const response = await api.post("/register/seller", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // FIXED: Laravel returns a HTTP Status code of 201 Created on successful resource generation
      if (response.status === 201 || response.status === 200) {
        setShowSuccess(true);

        // Wait 1.5 seconds before popping over to login secure layout
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);

      // Pull validation error messaging cleanly out from Laravel's error bag structure
      const errorBag = err.response?.data?.errors;
      if (errorBag) {
        const firstErrorKey = Object.keys(errorBag)[0];
        setErrorMessage(errorBag[firstErrorKey][0]);
      } else {
        setErrorMessage(
          err.response?.data?.message ||
            "Registration failed. Please check your fields.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    currentStep,
    methods,
    handleNext,
    handleBack,
    isFirstStep,
    isLastStep,
  } = useRegistrationForm(onSubmit);
  const {
    formState: { isValid },
    register,
    watch,
    setValue,
  } = methods;

  const handleProfilePhotoChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setValue("profilePhoto", files, { shouldValidate: true });
      setProfilePreview(URL.createObjectURL(files[0]));
    }
  };

  const textDescription = watch("shopDescription") || "";

  return (
    <div className={styles.pageWrapper}>
      <div className="top-header-bar" aria-hidden="true"></div>

      {/* SUCCESS POPUP NOTIFICATION */}
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            backgroundColor: "#10b981",
            color: "#ffffff",
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 9999,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span style={{ fontSize: "20px" }}>✅</span>
          <div>
            <strong style={{ display: "block", fontSize: "15px" }}>
              Registration Successful!
            </strong>
            <span style={{ fontSize: "13px", opacity: 0.9 }}>
              Redirecting you to login...
            </span>
          </div>
        </div>
      )}

      {/* ERROR POPUP NOTIFICATION WITH AUTO-CLOSE TIMER AND MANUAL "X" DISMISS */}
      {errorMessage && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            backgroundColor: "#ef4444",
            color: "#ffffff",
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            zIndex: 9999,
            fontFamily: "system-ui, sans-serif",
            minWidth: "280px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>❌</span>
            <div>
              <strong style={{ display: "block", fontSize: "15px" }}>
                Error Encountered
              </strong>
              <span style={{ fontSize: "13px", opacity: 0.9 }}>
                {errorMessage}
              </span>
            </div>
          </div>
          {/* MANUAL "X" CLOSE BUTTON */}
          <button
            type="button"
            onClick={() => setErrorMessage("")}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              padding: "0",
              opacity: 0.8,
              lineHeight: 1,
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "1")}
            onMouseLeave={(e) => (e.target.style.opacity = "0.8")}
          >
            &times;
          </button>
        </div>
      )}

      <main className={styles.cardContainer}>
        <header className={styles.formHeader}>
          <h1 className={styles.brandTitle}>Cultural Cloth</h1>
          <h2 className={styles.brandSubtitle}>Create your account</h2>
          <div className={styles.elegantDivider} />
        </header>

        <StepIndicator currentStep={currentStep} />

        <FormProvider {...methods}>
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            className={styles.formBody}
          >
            {currentStep === 0 && (
              <div className={styles.stepFadeAnimation}>
                <InputField
                  name="fullName"
                  label="Full Name"
                  placeholder="E.g Amanuel Abaynew"
                  required
                />
                <InputField
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="amanabay@gmail.com"
                  required
                />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
                <InputField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
                <SelectField
                  name="gender"
                  label="Gender :"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
              </div>
            )}

            {currentStep === 1 && (
              <div className={styles.stepFadeAnimation}>
                <FileUpload />
                <InputField
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="+251 911 111 111"
                  required
                />
                <InputField
                  name="location"
                  label="Location"
                  placeholder="BDR, Warkaw "
                  required
                />
                <InputField
                  name="shopName"
                  label="Shop Name (Optional)"
                  placeholder="Aman cultural cloth"
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className={styles.stepFadeAnimation}>
                <div className={styles.profileSectionContainer}>
                  <span className={styles.fieldLabel}>
                    Profile Photo (Optional)
                  </span>
                  <div className={styles.avatarFlexRow}>
                    <div className={styles.avatarCircularFrame}>
                      {profilePreview ? (
                        <img
                          src={profilePreview}
                          alt="Avatar Preview"
                          className={styles.avatarImage}
                        />
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
                      <button
                        type="button"
                        className={styles.avatarBrowseBtn}
                        onClick={() =>
                          document.getElementById("profilePhoto")?.click()
                        }
                      >
                        Upload Portrait
                      </button>
                      {profilePreview && (
                        <button
                          type="button"
                          className={styles.avatarRemoveBtn}
                          onClick={() => {
                            setProfilePreview(null);
                            setValue("profilePhoto", null);
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <TimePicker />

                <div className={styles.fieldContainer}>
                  <label
                    htmlFor="shopDescription"
                    className={styles.fieldLabel}
                  >
                    Shop Description (Optional)
                  </label>
                  <textarea
                    id="shopDescription"
                    maxLength={300}
                    className={styles.textareaElement}
                    placeholder="Describe about your shop and products..."
                    {...register("shopDescription")}
                  />
                  <div className={styles.charCounter}>
                    {textDescription.length} / 300 Characters
                  </div>
                </div>
              </div>
            )}

            <NavigationButtons
              onBack={handleBack}
              onNext={handleNext}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              isValid={isValid}
              disabled={isSubmitting}
            />
          </form>
        </FormProvider>
        <p className={styles.loginRedirectText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.loginLink}>
            Login
          </Link>
        </p>
      </main>
    </div>
  );
};

export default RegistrationPage;
