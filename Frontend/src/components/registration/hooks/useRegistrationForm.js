import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, step2Schema, step3Schema } from '../validation/registerSchema';

const schemas = [step1Schema, step2Schema, step3Schema];

// Track exactly which fields belong to which step to trigger targeted trigger checks
const stepFields = [
  ['fullName', 'email', 'password', 'confirmPassword', 'gender'],
  ['businessLicense', 'phoneNumber', 'location', 'shopName'],
  ['profilePhoto', 'startTime', 'endTime', 'shopDescription']
];

export const useRegistrationForm = (onSubmit) => {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    mode: 'onChange',
    // 1. Resolve validation rules only for the CURRENT step to keep validation fast and simple
    resolver: zodResolver(schemas[currentStep]),
    // 2. CRITICAL: Prevents React Hook Form from purging hidden values when switching screens
    shouldUnregister: false, 
    defaultValues: {
      fullName: '', email: '', password: '', confirmPassword: '', gender: '',
      phoneNumber: '', location: '', shopName: '',
      startTime: '09:00 AM', endTime: '06:00 PM', shopDescription: ''
    }
  });

  const handleNext = async () => {
    // 3. Trigger manual validation only on active step inputs
    const currentStepFields = stepFields[currentStep];
    const isValid = await methods.trigger(currentStepFields);

    if (isValid) {
      if (currentStep < 2) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // 4. Force pull every single value out of state and fire submit
        const allFormValues = methods.getValues();
        onSubmit(allFormValues);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return {
    currentStep,
    methods,
    handleNext,
    handleBack,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === 2,
  };
};