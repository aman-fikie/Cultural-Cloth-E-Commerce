import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];

// --- Step 1: base object (no .refine yet) ---
const step1Base = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Please select your gender' }) }),
});

// Step 1 schema used for per-step validation (WITH the password match check)
export const step1Schema = step1Base.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// --- Step 2 ---
export const step2Schema = z.object({
  businessLicense: z
    .any()
    .refine((files) => files && files.length > 0, 'Business license is required')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .pdf, .png, and .jpeg formats are supported."
    ),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid international phone number'),
  location: z.string().min(3, 'Location is required'),
  shopName: z.string().optional(),
});

// --- Step 3 ---
export const step3Schema = z.object({
  profilePhoto: z
    .any()
    .optional()
    .refine((files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine(
      (files) => !files || files.length === 0 || ['image/png', 'image/jpeg'].includes(files[0].type),
      'Only .png and .jpeg Formats are supported'
    ),
  startTime: z.string().regex(/^(0[1-9]|1[0-2]):[0-5]\d\s(AM|PM)$/i, 'Format must be HH:MM AM/PM'),
  endTime: z.string().regex(/^(0[1-9]|1[0-2]):[0-5]\d\s(AM|PM)$/i, 'Format must be HH:MM AM/PM'),
  shopDescription: z.string().max(300, 'Description cannot exceed 300 characters').optional(),
});

// --- Combined schema for final submit (uses .merge on real objects, not .shape spread) ---
export const registrationSchema = step1Base
  .merge(step2Schema)
  .merge(step3Schema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const RegistrationFormData = registrationSchema;