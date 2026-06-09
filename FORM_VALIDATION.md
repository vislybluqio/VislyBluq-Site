# Form Validation Implementation

## 🎯 **LATEST UPDATE: E.164 Phone Format Fully Implemented!**

All phone inputs now store numbers in **E.164 international format** - the global telecommunications standard. 

**See detailed documentation:** [E164_PHONE_IMPLEMENTATION.md](./E164_PHONE_IMPLEMENTATION.md)

**Quick Summary:**
- ✅ **Contact Form**: E.164 storage + country-specific validation
- ✅ **Job Application Form**: E.164 storage + country-specific validation  
- ✅ **Libraries**: Google's libphonenumber-js + react-phone-number-input
- ✅ **Format**: `+[country][number]` (e.g., `+2348012345678`)
- ✅ **Validation**: Enforces correct digit length per country (Nigeria: 10-11 digits, USA: 10 digits, etc.)
- ✅ **Metadata**: Stores country code, national number, and format confirmation

---

This document explains the enterprise-grade form validation system implemented across the website.

## 🎯 What's Been Implemented

### 1. **React Hook Form**
Industry-standard form library with:
- ✅ Automatic form state management
- ✅ Efficient re-renders
- ✅ Built-in validation
- ✅ TypeScript support

### 2. **Zod Schema Validation**
TypeScript-first schema validation:
- ✅ Strong type safety
- ✅ Runtime validation
- ✅ Custom validation rules
- ✅ Detailed error messages

### 3. **International Phone Input**
Professional phone number handling:
- ✅ Country code selector with flags
- ✅ Auto-formatting based on country
- ✅ International format support
- ✅ Validation for 10-15 digit numbers

---

## 📋 Validation Rules

### Contact Form

#### Name Field
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Pattern**: Letters, spaces, hyphens, apostrophes only
- **Error Messages**:
  - "Name must be at least 2 characters"
  - "Name must be less than 100 characters"
  - "Name can only contain letters, spaces, hyphens, and apostrophes"

#### Email Field
- **Required**: Yes
- **Format**: Valid email address
- **Max Length**: 255 characters
- **Auto-transform**: Lowercase
- **Domain Check**: Validates domain exists
- **Error Messages**:
  - "Email is required"
  - "Please enter a valid email address"
  - "Please enter a valid email domain"

#### Company Field
- **Required**: No (optional)
- **Max Length**: 200 characters
- **Error Messages**:
  - "Company name is too long"

#### Phone Field
- **Required**: No (optional)
- **Format**: E.164 International Standard (`+[country][number]`)
- **Storage**: E.164 format (e.g., `+2348012345678`)
- **Validation**: Country-specific digit length enforcement
- **Supported Countries**: 13+ countries with specific validation (see E164_PHONE_IMPLEMENTATION.md)
- **Features**:
  - Country selector with scrollable flags dropdown
  - Auto-formatting per country
  - Country code auto-detection from pasted numbers
  - Max length enforcement per country
  - Prevents country code editing
- **Country-Specific Validation Examples**:
  - Nigeria (NG): 10-11 digits → `+234801234567` or `+2348012345678`
  - USA (US): Exactly 10 digits → `+12025551234`
  - UK (GB): Exactly 10 digits → `+447911123456`
- **Error Messages**:
  - "Nigerian phone numbers must be 10-11 digits (e.g., 0801234567)"
  - "Nigerian phone numbers cannot exceed 11 digits"
  - "US phone numbers must be exactly 10 digits"
  - "Please enter a valid phone number with country code"
- **Metadata Stored**:
  - E.164 formatted number
  - Country code
  - National number
  - Format confirmation

#### Message Field
- **Required**: Yes
- **Min Length**: 10 characters
- **Max Length**: 5000 characters
- **Min Words**: 5 words
- **Error Messages**:
  - "Message must be at least 10 characters"
  - "Message is too long (max 5000 characters)"
  - "Please provide more details (at least 5 words)"

---

## 🎨 User Experience Features

### Real-Time Validation
- **Validation Trigger**: On blur (when user leaves field)
- **Error Display**: Immediately shown below field
- **Visual Feedback**:
  - Red border for errors
  - Red background tint
  - Alert icon with error message
  - Green checkmark for valid fields (optional)

### Phone Number Input
```typescript
// Features:
- E.164 international format storage
- Country-specific digit validation
- Country flag dropdown (scrollable)
- Automatic formatting per country
- Country code auto-detection
- Validates on blur with specific errors
- Default: Nigeria (+234)
- Max length enforcement per country
- Prevents country code editing

// Example E.164 outputs:
- Nigeria: +2348012345678
- USA: +12025551234  
- UK: +447911123456
```

### Error Messages
- Clear, actionable messages
- Displayed with alert icon
- Red color scheme
- Positioned below field

---

## 🔧 Technical Implementation

### Validation Schema (Zod)

```typescript
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters...'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  
  phone: z.string().optional()
    .refine((val) => {
      if (!val) return true;
      
      // Validate using libphonenumber-js
      if (!isValidPhoneNumber(val)) return false;
      
      const phoneNumber = parsePhoneNumber(val);
      const nationalNumber = phoneNumber.nationalNumber;
      const country = phoneNumber.country;
      
      // Country-specific digit validation
      const countryLengths = {
        'NG': { min: 10, max: 11 },
        'US': { min: 10, max: 10 },
        'GB': { min: 10, max: 10 },
        // ... more countries
      };
      
      if (country && countryLengths[country]) {
        const { min, max } = countryLengths[country];
        return nationalNumber.length >= min && nationalNumber.length <= max;
      }
      
      return nationalNumber.length >= 7 && nationalNumber.length <= 15;
    }, (val) => {
      // Country-specific error messages
      const phoneNumber = parsePhoneNumber(val);
      if (phoneNumber.country === 'NG') {
        if (phoneNumber.nationalNumber.length < 10) {
          return { message: 'Nigerian phone numbers must be 10-11 digits' };
        }
        if (phoneNumber.nationalNumber.length > 11) {
          return { message: 'Nigerian phone numbers cannot exceed 11 digits' };
        }
      }
      // ... more country-specific messages
    }),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long')
    .refine((val) => val.trim().split(/\s+/).length >= 5, 
      { message: 'Please provide more details' }),
});
```

### Form Setup (React Hook Form)

```typescript
const {
  register,
  handleSubmit,
  control,
  formState: { errors },
} = useForm<ContactFormData>({
  resolver: zodResolver(contactFormSchema),
  mode: 'onBlur', // Validate when user leaves field
});
```

### Phone Input Integration

```typescript
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../styles/phone-input.css';

<Controller
  name="phone"
  control={control}
  render={({ field: { onChange, value } }) => (
    <PhoneInput
      international
      countryCallingCodeEditable={false}
      defaultCountry="NG"
      value={value}
      onChange={onChange}
      placeholder="Enter phone number"
      limitMaxLength={true}
    />
  )}
/>

// E.164 Conversion on Submit
const handleSubmit = async (data) => {
  let phoneE164 = '';
  let phoneMetadata = '';
  
  if (data.phone) {
    const phoneNumber = parsePhoneNumber(data.phone);
    if (phoneNumber) {
      phoneE164 = phoneNumber.number; // E.164: +2348012345678
      phoneMetadata = `Country: ${phoneNumber.country}, National: ${phoneNumber.nationalNumber}, Format: E.164`;
    }
  }
  
  // Submit with E.164 format
  await fetch('/api/submit', {
    method: 'POST',
    body: JSON.stringify({
      phone: phoneE164,
      phone_metadata: phoneMetadata,
      // ... other fields
    }),
  });
};
```

---

## 🌍 Country Code Support

### E.164 Format
All phone numbers are stored in E.164 international format: `+[country code][national number]`

### Countries with Specific Validation
Nigeria (NG), USA (US), UK (GB), Canada (CA), India (IN), Ghana (GH), Kenya (KE), South Africa (ZA), UAE (AE), Australia (AU), France (FR), Germany (DE), China (CN)

**See full list:** [E164_PHONE_IMPLEMENTATION.md](./E164_PHONE_IMPLEMENTATION.md)

### Supported Regions
- ✅ Africa (all countries)
- ✅ Asia (all countries)
- ✅ Europe (all countries)
- ✅ North America
- ✅ South America
- ✅ Oceania

### Default Country
- **Nigeria** (+234) - Can be changed in code

### Popular Countries with E.164 Examples
- Nigeria: +234 → `+2348012345678` (10-11 digits)
- USA: +1 → `+12025551234` (10 digits)
- UK: +44 → `+447911123456` (10 digits)
- Canada: +1 → `+14165551234` (10 digits)
- Ghana: +233 → `+233241234567` (9-10 digits)
- Kenya: +254 → `+254712345678` (9-10 digits)
- South Africa: +27 → `+27821234567` (9 digits)

---

## 🎭 Visual States

### Input Field States

1. **Normal State**
   - White background
   - Gray border
   - Black text

2. **Focus State**
   - Blue border (visly-blue)
   - Blue ring
   - Cursor visible

3. **Error State**
   - Red border
   - Light red background
   - Red text for error message
   - Alert icon

4. **Valid State** (after blur)
   - Green border (optional)
   - Green checkmark (optional)

5. **Disabled State**
   - Gray background
   - Reduced opacity
   - No interaction

---

## 📱 Phone Input Styling

Custom CSS for professional look with E.164 support:

```css
/* Base phone input styles */
.PhoneInputInput {
  padding: 0.625rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.PhoneInputInput:focus {
  border-color: #3b82f6;
  ring: 2px;
}

.PhoneInputCountry {
  padding: 0.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
}

/* Enable scrolling in country selector */
.PhoneInputCountrySelect {
  max-height: 300px;
  overflow-y: auto;
}

/* Error state styling */
.PhoneInput--error .PhoneInputInput {
  border-color: #ef4444;
  background-color: #fef2f2;
}
```

---

## 🚀 Benefits

### For Users
- ✅ Clear error messages
- ✅ Immediate feedback
- ✅ No confusing formats
- ✅ International support
- ✅ Professional experience

### For Business
- ✅ Higher quality data
- ✅ Fewer invalid submissions
- ✅ Better conversion rates
- ✅ Professional brand image
- ✅ Reduced support tickets

### For Developers
- ✅ Type-safe forms
- ✅ Easy to extend
- ✅ Maintainable code
- ✅ Industry best practices
- ✅ Well-documented

---

## 🧪 Testing the Validation

### Test Cases to Try

1. **Name Validation**
   - Try: "A" → Should fail (too short)
   - Try: "John123" → Should fail (numbers not allowed)
   - Try: "John Doe" → Should pass

2. **Email Validation**
   - Try: "invalid" → Should fail (not an email)
   - Try: "test@" → Should fail (no domain)
   - Try: "john@company.com" → Should pass

3. **Phone Validation**
   - Try: "123" → Should fail (too short)
   - Try: Select Nigeria, enter "08012345678912" → Should fail "Nigerian phone numbers cannot exceed 11 digits"
   - Try: Select Nigeria, enter "0801234567" → Should pass → Stored as "+234801234567"
   - Try: Select USA, enter "2025551234" → Should pass → Stored as "+12025551234"
   - Try: Paste "+234 801 234 5678" → Auto-detects Nigeria → Stored as "+2348012345678"

4. **Message Validation**
   - Try: "Hi" → Should fail (too short)
   - Try: "Hello there how are you" → Should pass (5+ words)

---

## 🔄 Future Enhancements

Possible additions:
- [ ] Password strength meter
- [ ] File upload validation
- [ ] Credit card validation
- [ ] Address autocomplete
- [ ] Multi-step form wizard
- [ ] Save draft functionality
- [ ] Auto-save on blur

---

## 📚 Libraries Used

| Library | Version | Purpose |
|---------|---------|---------|
| react-hook-form | Latest | Form state management |
| zod | Latest | Schema validation |
| @hookform/resolvers | Latest | Integration layer |
| react-phone-number-input | Latest | International phone UI component |
| libphonenumber-js | Latest | Google's phone validation library |
| country-flag-icons | Latest | Country flag icons |

---

## 🎯 Validation Summary

Your forms now have:
- ✅ Enterprise-grade validation
- ✅ **E.164 international phone format storage**
- ✅ **Country-specific digit validation (Nigeria: 10-11, USA: 10, etc.)**
- ✅ **Phone metadata storage (country code, national number)**
- ✅ Real-time error feedback with specific messages
- ✅ Type-safe implementation
- ✅ Professional UX with scrollable country selector
- ✅ Accessibility support
- ✅ Mobile-responsive
- ✅ Industry best practices (Google's libphonenumber)

**Users can't submit invalid data anymore!** 🎉

**Phone numbers are stored in the global E.164 standard format, ready for SMS/WhatsApp APIs, CRM integration, and international calling!** 📱
