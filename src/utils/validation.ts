import { z } from 'zod';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

// Shared phone validation logic
const createPhoneValidation = () => {
  return z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
      (val) => {
        if (!val) return true;
        try {
          const phoneNumber = parsePhoneNumber(val);
          return Boolean(phoneNumber && isValidPhoneNumber(val));
        } catch {
          return false;
        }
      },
      { message: 'Invalid phone number format. Please check the country code and digit count.' }
    );
};

// Contact Form Validation Schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long')
    .toLowerCase()
    .refine(
      (email) => {
        const domain = email.split('@')[1];
        return domain && domain.length > 3;
      },
      { message: 'Please enter a valid email domain' }
    ),
  
  company: z
    .string()
    .max(200, 'Company name is too long')
    .optional()
    .or(z.literal('')),
  
  phone: createPhoneValidation(),
  
  service: z.string().optional(),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long (max 5000 characters)')
    .refine(
      (val) => val.trim().split(/\s+/).length >= 5,
      { message: 'Please provide more details (at least 5 words)' }
    ),
});

// Job Application Validation Schema
export const jobApplicationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  
  phone: createPhoneValidation(),
  
  linkedin: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
      (val) => {
        if (!val || val === '') return true;
        return (
          val.includes('linkedin.com/in/') ||
          val.includes('linkedin.com/pub/') ||
          /^https?:\/\/(www\.)?linkedin\.com\/.+/.test(val)
        );
      },
      { message: 'Please enter a valid LinkedIn URL' }
    ),
  
  message: z
    .string()
    .min(50, 'Cover letter must be at least 50 characters')
    .max(5000, 'Cover letter is too long (max 5000 characters)'),
});

// Newsletter Validation Schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
});

// Type exports for TypeScript
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type JobApplicationData = z.infer<typeof jobApplicationSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;


