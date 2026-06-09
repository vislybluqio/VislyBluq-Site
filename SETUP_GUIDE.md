# Setup Guide for Enhanced Form Features

This guide will help you set up the required services for file uploads, reCAPTCHA, and email automation.

## 🔧 Required Setup

### 1. Cloudinary Setup (File Uploads)

Cloudinary provides free cloud storage for resume uploads.

**Steps:**

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Create a free account
3. After login, go to Dashboard
4. Note your **Cloud Name** (visible in the dashboard)
5. Go to Settings → Upload → Upload presets
6. Click "Add upload preset"
7. Set:
   - **Preset name**: `vislybluq_resumes`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `job_applications`
   - **Allowed formats**: `pdf,doc,docx`
8. Save the preset

**Add to .env file:**
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=vislybluq_resumes
```

---

### 2. Google reCAPTCHA v3 Setup

reCAPTCHA v3 protects forms from spam without user interaction.

**Steps:**

1. Go to [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)
2. Sign in with Google account
3. Fill in the form:
   - **Label**: `VislyBluq Website`
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your domain (e.g., `vislybluq.com` and `localhost` for testing)
4. Accept terms and click **Submit**
5. Copy the **Site Key** (starts with `6L...`) - for frontend
6. Copy the **Secret Key** (starts with `6L...`) - for backend verification

**Add to .env file:**
```env
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Important Security Notes:**
- Site Key = Public (goes in frontend code)
- Secret Key = Private (only on backend/server, never expose in frontend)
- Secret Key verifies tokens and checks scores on the backend
- This implementation follows Google's official best practices

---

### 3. Email Configuration (Already Done!)

Email automation is configured via FormSubmit's `_autoresponse` feature.

✅ **Contact Form** → Sends auto-reply from `sales@vislybluq.com`
✅ **Job Applications** → Sends auto-reply from `hr@vislybluq.com`  
✅ **Newsletter** → Goes to `info@vislybluq.com`

**Important:** You need to verify these email addresses with FormSubmit:

1. First form submission to each email will receive a verification email
2. Click the verification link in that email
3. After verification, all future submissions will work automatically

---

## 🧪 Testing

### Local Testing

1. Update your `.env` file with the credentials above
2. Restart the development server:
   ```bash
   npm run dev
   ```

### Test Checklist

- [ ] Test file upload on job application (PDF, DOC, DOCX)
- [ ] Verify file size limit (max 5MB)
- [ ] Test contact form submission
- [ ] Check auto-response emails arrive
- [ ] Verify spam protection (honeypot + reCAPTCHA)
- [ ] Test WhatsApp links

---

## 🔒 Security Features Implemented

### 1. Honeypot Fields
- Invisible fields that bots fill out
- Real users can't see them
- Blocks 80-90% of spam

### 2. reCAPTCHA v3
- Invisible to users (no "I'm not a robot" checkbox)
- Analyzes user behavior
- Assigns risk score to each submission
- Blocks automated bots

### 3. File Validation
- Only PDF, DOC, DOCX allowed
- Maximum 5MB file size
- Prevents malicious file uploads

### 4. Rate Limiting
- Browser-level rate limiting via reCAPTCHA
- Prevents multiple spam submissions

---

## 📧 Email Auto-Response Feature

When users submit forms, they automatically receive:

### Contact Form Auto-Response:
```
Thank you for contacting VislyBluq! We've received your inquiry about [Service]. 
Our sales team will review your message and respond within 24 hours. 
For urgent matters, feel free to WhatsApp us at +234 701 505 5319.
```

### Job Application Auto-Response:
```
Thank you for applying to VislyBluq! We've received your application for [Job Title]. 
Our HR team will review your application and respond within 3-5 business days. 
If you have any questions, feel free to WhatsApp us at +234 701 505 5319.
```

---

## 🎯 Free Tier Limits

### Cloudinary Free Plan:
- ✅ 25 GB storage
- ✅ 25 GB bandwidth/month
- ✅ 25,000 transformations/month
- **Estimated capacity**: ~5,000 resumes (assuming 5MB each)

### Google reCAPTCHA:
- ✅ Completely free
- ✅ 1 million assessments/month

### FormSubmit:
- ✅ Completely free
- ✅ Unlimited submissions
- ✅ Auto-response included

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Set all environment variables in hosting platform (Vercel/Netlify)
- [ ] Add production domain to reCAPTCHA allowed domains
- [ ] Verify all three email addresses with FormSubmit
- [ ] Test file uploads in production
- [ ] Monitor Cloudinary storage usage
- [ ] Set up email forwarding (sales@, hr@, info@ → team emails)

---

## 🆘 Troubleshooting

### File Upload Not Working
- Check Cloudinary credentials in `.env`
- Verify upload preset is set to "Unsigned"
- Check browser console for errors

### reCAPTCHA Not Loading
- Verify site key in `.env`
- Check if domain is whitelisted in reCAPTCHA admin
- Look for console errors

### Auto-Response Emails Not Received
- Check spam/junk folder
- Verify email address with FormSubmit (first submission sends verification email)
- Ensure `_autoresponse` field is in the submission

### Resume Not Attached to Email
- File is uploaded to Cloudinary
- Email contains the download link (not the actual file)
- HR team clicks the link to download

---

## 📞 Support

If you need help:
- Email: info@vislybluq.com
- WhatsApp: +234 701 505 5319

---

## ✅ What's Been Implemented

1. ✅ File upload for job applications (resume/CV)
2. ✅ Google reCAPTCHA v3 spam protection
3. ✅ Email auto-responses for all forms
4. ✅ Honeypot spam protection
5. ✅ File validation (type and size)
6. ✅ Multiple email recipients (sales@, hr@, info@)
7. ✅ WhatsApp contact integration
8. ✅ Proper error handling
9. ✅ Loading states and user feedback
10. ✅ Mobile-responsive design

---

## 🎉 You're All Set!

Once you complete the setup steps above, your website will have:
- Professional file upload capability
- Advanced spam protection
- Automated email responses
- Multiple contact methods (Email, Phone, WhatsApp)
- Secure and scalable infrastructure

All on the free tier! 🚀
