import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, step2Schema, step3Schema } from '../validation/registerSchema';

const schemas = [step1Schema, step2Schema, step3Schema];

export const useRegistrationForm = (onSubmit) => {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(schemas[currentStep]),
    defaultValues: {
      fullName: '', email: '', password: '', confirmPassword: '',
      phoneNumber: '', location: '', shopName: '',
      startTime: '09:00 AM', endTime: '06:00 PM', shopDescription: ''
    }
  });

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      if (currentStep < 2) {
        setCurrentStep((prev) => prev + 1);
      } else {
        methods.handleSubmit(onSubmit)();
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