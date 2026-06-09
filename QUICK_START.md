# Quick Start Guide

## ⚡ Get Started in 3 Steps

### Step 1: Set Up Cloudinary (5 minutes)

1. Sign up: [cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Get your **Cloud Name** from dashboard
3. Create upload preset:
   - Name: `vislybluq_resumes`
   - Signing Mode: **Unsigned**
   - Save

### Step 2: Set Up reCAPTCHA (3 minutes)

1. Sign up: [google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)
2. Choose **reCAPTCHA v3**
3. Add domains: `localhost`, `vislybluq.com`
4. Copy the **Site Key**

### Step 3: Update .env File

```env
# Replace these values with your actual credentials
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=vislybluq_resumes
VITE_RECAPTCHA_SITE_KEY=your_site_key_here

# These are already configured
VITE_FORMSUBMIT_SALES_EMAIL=sales@vislybluq.com
VITE_FORMSUBMIT_HR_EMAIL=hr@vislybluq.com
VITE_FORMSUBMIT_INFO_EMAIL=info@vislybluq.com
```

### Step 4: Restart Dev Server

```bash
npm run dev
```

---

## 📧 Email Verification

The first time someone submits to each email, FormSubmit will send a verification link:

1. Submit a test form
2. Check inbox for verification email
3. Click verification link
4. Done! Future submissions will work automatically

Do this for:
- sales@vislybluq.com (Contact form)
- hr@vislybluq.com (Job applications)
- info@vislybluq.com (Newsletter)

---

## ✅ What's Working Now

### Forms with Auto-Response:
- ✅ Contact Form → auto-reply from sales@vislybluq.com
- ✅ Job Applications → auto-reply from hr@vislybluq.com (with resume link)
- ✅ Newsletter → confirmation to info@vislybluq.com

### Spam Protection:
- ✅ Honeypot fields (invisible to users, catches bots)
- ✅ reCAPTCHA v3 (invisible, scores user behavior)

### File Uploads:
- ✅ Resume/CV upload on job applications
- ✅ Supports PDF, DOC, DOCX (max 5MB)
- ✅ Uploaded to Cloudinary cloud storage
- ✅ Download link sent in email

### Contact Options:
- ✅ Email: sales@, hr@, info@
- ✅ Phone: +234 701 505 5319
- ✅ WhatsApp: Direct link with pre-filled message
- ✅ Office address with map

---

## 🧪 Test It

1. Go to `/apply?job=Software Engineer`
2. Fill out the form
3. Upload a PDF resume
4. Submit
5. Check your email for auto-response
6. Check hr@vislybluq.com inbox for application with resume link

---

## 🆘 Having Issues?

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed troubleshooting.

Quick fixes:
- **File upload fails**: Check Cloudinary credentials
- **reCAPTCHA not loading**: Verify site key and domain
- **No auto-response**: Check spam folder, verify email with FormSubmit

---

## 🚀 Deploy to Production

When deploying (Vercel, Netlify, etc.):

1. Add environment variables in hosting dashboard
2. Add production domain to reCAPTCHA whitelist
3. Test all forms after deployment
4. Monitor Cloudinary usage

---

That's it! Your forms are now production-ready with enterprise-level features on the free tier. 🎉
