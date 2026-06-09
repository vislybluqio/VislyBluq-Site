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
        // If empty, it's valid (optional field)
        if (!val || val === '') return true;
        
        try {
          // Check if it's a valid phone number with proper format
          const isValid = isValidPhoneNumber(val);
          if (!isValid) return false;
          
          // Parse and check if number matches country length
          const phoneNumber = parsePhoneNumber(val);
          if (!phoneNumber) return false;
          
          // Get national number (libphonenumber automatically removes leading zeros)
          // For Nigeria: "08012345678" becomes "8012345678" (10 digits)
          // For Nigeria: "8012345678" stays "8012345678" (10 digits)
          const nationalNumber = phoneNumber.nationalNumber;
          const country = phoneNumber.country;
          
          // Country-specific validation (strict - EXACT digit count)
          const countryLengths: Record<string, number> = {
            'NG': 10, // Nigeria: exactly 10 digits (8012345678, libphonenumber removes leading 0)
            'US': 10, // USA: exactly 10 digits
            'GB': 10, // UK: exactly 10 digits
            'CA': 10, // Canada: exactly 10 digits
            'IN': 10, // India: exactly 10 digits
            'GH': 9,  // Ghana: exactly 9 digits
            'KE': 9,  // Kenya: exactly 9 digits
            'ZA': 9,  // South Africa: exactly 9 digits
            'AE': 9,  // UAE: exactly 9 digits
            'AU': 9,  // Australia: exactly 9 digits
            'FR': 9,  // France: exactly 9 digits
            'CN': 11, // China: exactly 11 digits
          };
          
          // Germany is special case with 10-11 digits
          if (country === 'DE') {
            return nationalNumber.length >= 10 && nationalNumber.length <= 11;
          }
          
          if (country && countryLengths[country]) {
            return nationalNumber.length === countryLengths[country];
          }
          
          // For countries not in the list, use general validation
          return nationalNumber.length >= 7 && nationalNumber.length <= 15;
        } catch (error) {
          return false;
        }
      },
      (val) => {
        if (!val || val === '') return { message: '' };
        
        try {
          const phoneNumber = parsePhoneNumber(val);
          if (!phoneNumber) {
            return { message: 'Please enter a valid phone number with country code' };
          }
          
          const country = phoneNumber.country;
          const nationalNumber = phoneNumber.nationalNumber;
          const digitCount = nationalNumber.length;
          
          // Provide specific error messages per country
          if (country === 'NG') {
            if (digitCount !== 10) {
              return { 
                message: `Nigerian phone numbers must be exactly 10 digits (you entered ${digitCount}). Example: 8012345678 or 08012345678` 
              };
            }
          }
          
          if (country === 'US') {
            if (digitCount !== 10) {
              return { 
                message: `US phone numbers must be exactly 10 digits (you entered ${digitCount})` 
              };
            }
          }
          
          if (country === 'CA') {
            if (digitCount !== 10) {
              return { 
                message: `Canadian phone numbers must be exactly 10 digits (you entered ${digitCount})` 
              };
            }
          }
          
          if (country === 'GB') {
            if (digitCount !== 10) {
              return { 
                message: `UK phone numbers must be exactly 10 digits (you entered ${digitCount})` 
              };
            }
          }
          
          if (country === 'IN') {
            if (digitCount !== 10) {
              return { 
                message: `Indian phone numbers must be exactly 10 digits (you entered ${digitCount})` 
              };
            }
          }
          
          if (country === 'GH') {
            if (digitCount !== 9) {
              return { 
                message: `Ghana phone numbers must be exactly 9 digits (you entered ${digitCount})` 
              };
            }
          }
          
          if (country === 'KE') {
            if (digitCount !== 9) {
              return { 
                message: `Kenya phone numbers must be exactly 9 digits (you entered ${digitCount})` 
              };
            }
          }
          
          if (country === 'ZA') {
            if (digitCount !== 9) {
              return { 
                message: `South African phone numbers must be exactly 9 digits (you entered ${digitCount})` 
              };
            }
          }
          
          if (country === 'DE') {
            if (digitCount < 10 || digitCount > 11) {
              return { 
                message: `German phone numbers must be 10-11 digits (you entered ${digitCount})` 
              };
            }
          }
          
          return { message: `Invalid phone number format for ${country}. Please check the digit count.` };
        } catch (error) {
          return { message: 'Invalid phone number format' };
        }
      }
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
        // Check for common typos in email domains
        const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
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
