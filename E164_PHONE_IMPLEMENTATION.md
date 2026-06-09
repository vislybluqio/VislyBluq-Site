# E.164 Phone Number Implementation

## Overview

All forms on the VislyBluq website now store phone numbers in the **E.164 international format**, which is the global standard for telephone numbering defined by the International Telecommunication Union (ITU).

**E.164 Format:** `+[country code][national number]`

**Example:** `+2348012345678` (Nigerian number)

## Why E.164?

1. **Global Standard**: Universally recognized format across all telecommunications systems
2. **Database Consistency**: Single format for all phone numbers regardless of country
3. **API Integration**: Most SMS/calling APIs (Twilio, Vonage, etc.) require E.164 format
4. **Future-Proof**: Easy to migrate data between systems and services
5. **No Ambiguity**: Country code included eliminates confusion about number origin

## Implementation Libraries

We use Google's official phone number handling libraries:

### Primary Libraries
- **`libphonenumber-js`**: JavaScript port of Google's libphonenumber
- **`react-phone-number-input`**: React UI component with country selector
- **`country-flag-icons`**: Country flag icons for the dropdown

### Installation
```bash
npm install react-phone-number-input libphonenumber-js country-flag-icons
```

## Forms with E.164 Implementation

### 1. Contact Form (`src/pages/Contact.tsx`)
- **Field:** Phone Number (optional)
- **Storage Format:** E.164
- **Validation:** Country-specific digit length validation
- **Metadata Stored:**
  - E.164 formatted number
  - Country code
  - National number
  - Format confirmation

**Example Submission:**
```json
{
  "phone": "+2348012345678",
  "phone_metadata": "Country: NG, National: 08012345678, Format: E.164"
}
```

### 2. Job Application Form (`src/pages/Apply.tsx`)
- **Field:** Phone Number (optional)
- **Storage Format:** E.164
- **Validation:** Country-specific digit length validation
- **Metadata Stored:** Same as Contact form

**Example Submission:**
```json
{
  "phone": "+2348012345678",
  "phone_metadata": "Country: NG, National: 08012345678, Format: E.164"
}
```

### 3. Newsletter Forms (Blog & Footer)
- **No phone input**: Newsletter forms only collect email addresses
- **Not applicable**: E.164 implementation not needed

## Country-Specific Validation Rules

The validation schema enforces digit length requirements per country:

| Country | Country Code | Min Digits | Max Digits | Example |
|---------|--------------|------------|------------|---------|
| Nigeria (NG) | +234 | 10 | 11 | +2348012345678 |
| USA (US) | +1 | 10 | 10 | +12025551234 |
| UK (GB) | +44 | 10 | 10 | +447911123456 |
| Canada (CA) | +1 | 10 | 10 | +14165551234 |
| India (IN) | +91 | 10 | 10 | +919876543210 |
| Ghana (GH) | +233 | 9 | 10 | +233241234567 |
| Kenya (KE) | +254 | 9 | 10 | +254712345678 |
| South Africa (ZA) | +27 | 9 | 9 | +27821234567 |
| UAE (AE) | +971 | 9 | 9 | +971501234567 |
| Australia (AU) | +61 | 9 | 9 | +61412345678 |
| France (FR) | +33 | 9 | 9 | +33612345678 |
| Germany (DE) | +49 | 10 | 11 | +4915112345678 |
| China (CN) | +86 | 11 | 11 | +8613812345678 |

**Note:** Countries not listed use general validation (7-15 digits).

## Implementation Details

### Phone Input Component

```tsx
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
```

### Key Props:
- **`international`**: Displays country code in the input
- **`countryCallingCodeEditable={false}`**: Prevents manual editing of country code
- **`defaultCountry="NG"`**: Default to Nigeria
- **`limitMaxLength={true}`**: Enforces max length based on country

### E.164 Conversion in Form Submission

```tsx
const handleSubmit = async (data: ContactFormData) => {
  // Normalize phone to E.164 format
  let phoneE164 = data.phone || '';
  let phoneMetadata = '';
  
  if (data.phone) {
    try {
      const phoneNumber = parsePhoneNumber(data.phone);
      if (phoneNumber) {
        phoneE164 = phoneNumber.number; // E.164: +234801234567
        phoneMetadata = `Country: ${phoneNumber.country}, National: ${phoneNumber.nationalNumber}, Format: E.164`;
      }
    } catch (error) {
      console.error('Phone parsing error:', error);
    }
  }

  // Submit with E.164 format
  await fetch('https://formsubmit.co/ajax/sales@vislybluq.com', {
    method: 'POST',
    body: JSON.stringify({
      phone: phoneE164,
      phone_metadata: phoneMetadata,
      // ... other fields
    }),
  });
};
```

## Validation Schema

Located in `src/utils/validation.ts`:

```tsx
import { z } from 'zod';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

phone: z
  .string()
  .optional()
  .or(z.literal(''))
  .refine(
    (val) => {
      if (!val || val === '') return true;
      
      try {
        const isValid = isValidPhoneNumber(val);
        if (!isValid) return false;
        
        const phoneNumber = parsePhoneNumber(val);
        if (!phoneNumber) return false;
        
        const nationalNumber = phoneNumber.nationalNumber;
        const country = phoneNumber.country;
        
        // Country-specific validation
        const countryLengths: Record<string, { min: number; max: number }> = {
          'NG': { min: 10, max: 11 },
          // ... other countries
        };
        
        if (country && countryLengths[country]) {
          const length = nationalNumber.length;
          const { min, max } = countryLengths[country];
          return length >= min && length <= max;
        }
        
        return nationalNumber.length >= 7 && nationalNumber.length <= 15;
      } catch {
        return false;
      }
    },
    (val) => {
      // Custom error messages per country
      // ...
    }
  )
```

## Error Handling

### Country-Specific Error Messages

**Nigeria:**
- Too few digits: "Nigerian phone numbers must be 10-11 digits (e.g., 0801234567)"
- Too many digits: "Nigerian phone numbers cannot exceed 11 digits"

**USA/Canada:**
- Wrong length: "US phone numbers must be exactly 10 digits"

**UK:**
- Wrong length: "UK phone numbers must be exactly 10 digits"

**General:**
- Invalid format: "Please enter a valid phone number with country code"

## User Experience Features

1. **Country Selector**: Scrollable dropdown with country flags
2. **Auto-Formatting**: Phone number formats automatically as user types
3. **Country Detection**: Detects country code when pasting numbers
4. **Flag Icons**: Visual country identification
5. **Real-Time Validation**: Validates on blur with specific error messages
6. **Max Length Enforcement**: Prevents over-entry based on country

## Styling

Custom styles in `src/styles/phone-input.css`:

```css
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

## Backend/Email Integration

### FormSubmit.co Payload

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+2348012345678",
  "phone_metadata": "Country: NG, National: 08012345678, Format: E.164",
  "message": "Hello...",
  "_subject": "New Contact Form Submission"
}
```

### Database Storage Recommendations

**Recommended Structure:**
```sql
CREATE TABLE contacts (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone_e164 VARCHAR(20),  -- Store E.164 format: +2348012345678
  phone_country CHAR(2),    -- Store country code: NG
  phone_national VARCHAR(20), -- Store national number: 08012345678
  created_at TIMESTAMP
);
```

**Benefits:**
- Easy filtering by country: `WHERE phone_country = 'NG'`
- SMS/API integration: Use `phone_e164` directly
- Display formatting: Can format `phone_national` for local display
- Search: Can search both E.164 and national formats

## Testing

### Test Cases

1. **Valid Nigerian Number:**
   - Input: User selects NG, enters "0801234567"
   - Stored: "+234801234567"
   - Metadata: "Country: NG, National: 0801234567, Format: E.164"

2. **Valid US Number:**
   - Input: User selects US, enters "2025551234"
   - Stored: "+12025551234"
   - Metadata: "Country: US, National: 2025551234, Format: E.164"

3. **Invalid Nigerian Number (too many digits):**
   - Input: User selects NG, enters "08012345678912345"
   - Error: "Nigerian phone numbers cannot exceed 11 digits"
   - Not submitted

4. **Empty Phone (optional field):**
   - Input: User leaves phone blank
   - Stored: "" (empty string)
   - Valid: Form submits successfully

5. **Copy-Paste Full International Number:**
   - Input: User pastes "+234 801 234 5678"
   - Detected: Country auto-selected as NG
   - Stored: "+2348012345678"

## Migration Guide

If you have existing phone numbers in different formats:

### Convert to E.164

```javascript
import { parsePhoneNumber } from 'libphonenumber-js';

function convertToE164(phoneNumber, defaultCountry = 'NG') {
  try {
    const parsed = parsePhoneNumber(phoneNumber, defaultCountry);
    if (parsed && parsed.isValid()) {
      return parsed.number; // E.164 format
    }
  } catch (error) {
    console.error('Failed to convert:', phoneNumber, error);
  }
  return null;
}

// Examples:
convertToE164('0801234567', 'NG')        // +234801234567
convertToE164('08012345678', 'NG')       // +2348012345678
convertToE164('+234 801 234 5678', 'NG') // +2348012345678
convertToE164('(202) 555-1234', 'US')    // +12025551234
```

## Future Enhancements

1. **SMS Verification**: Use E.164 format directly with Twilio/Vonage
2. **WhatsApp Integration**: E.164 required for WhatsApp Business API
3. **Call Tracking**: Pass E.164 to analytics and CRM systems
4. **International Expansion**: Add more countries to validation list
5. **Phone Type Detection**: Identify mobile vs. landline

## References

- [E.164 Standard (ITU)](https://www.itu.int/rec/T-REC-E.164/)
- [libphonenumber-js Documentation](https://gitlab.com/catamphetamine/libphonenumber-js)
- [react-phone-number-input Documentation](https://catamphetamine.gitlab.io/react-phone-number-input/)
- [Google libphonenumber](https://github.com/google/libphonenumber)

## Support

For questions about the E.164 implementation:
- Check validation errors in browser console
- Review phone parsing logs during development
- Test with multiple countries to ensure validation works
- Contact dev team if encountering edge cases

---

**Last Updated:** June 9, 2026  
**Implemented By:** VislyBluq Development Team  
**Status:** ✅ Complete - All forms updated
