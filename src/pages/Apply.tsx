import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../styles/phone-input.css';
import { ArrowLeft, Send, CheckCircle, Briefcase, Upload, X, FileText, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { uploadToCloudinary, validateFile } from '../utils/fileUpload';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { jobApplicationSchema, type JobApplicationData } from '../utils/validation';

const inputClass =
  'w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue focus:border-visly-blue bg-white text-sm';

const errorInputClass =
  'w-full px-4 py-2.5 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-red-50 text-sm';

const Apply = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobTitle = queryParams.get('job') || 'General Application';
  const { getRecaptchaToken } = useRecaptcha();

  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<JobApplicationData>({
    resolver: zodResolver(jobApplicationSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      message: '',
    },
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    
    // Validate file
    const validation = validateFile(file, 5);
    if (!validation.isValid) {
      setUploadError(validation.error || 'Invalid file');
      return;
    }

    setResumeFile(file);
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setResumeUrl('');
    setUploadError('');
  };

  const handleSubmit = async (data: JobApplicationData) => {
    setIsSending(true);
    setUploadError('');

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken('job_application');

      // Upload resume if provided
      let uploadedResumeUrl = resumeUrl;
      if (resumeFile && !resumeUrl) {
        setIsUploading(true);
        try {
          uploadedResumeUrl = await uploadToCloudinary(resumeFile);
          setResumeUrl(uploadedResumeUrl);
        } catch (error) {
          setUploadError('Failed to upload resume. Please try again.');
          setIsSending(false);
          setIsUploading(false);
          return;
        }
        setIsUploading(false);
      }

      // Normalize phone to E.164 format for storage
      let phoneE164 = data.phone || '';
      let phoneMetadata = '';
      
      if (data.phone) {
        try {
          const phoneNumber = parsePhoneNumber(data.phone);
          if (phoneNumber) {
            phoneE164 = phoneNumber.number; // E.164 format: +234801234567
            phoneMetadata = `Country: ${phoneNumber.country}, National: ${phoneNumber.nationalNumber}, Format: E.164`;
          }
        } catch (error) {
          console.error('Phone parsing error:', error);
        }
      }

      const response = await fetch('https://formsubmit.co/ajax/hr@vislybluq.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          job_title: jobTitle,
          name: data.name,
          email: data.email,
          phone: phoneE164, // E.164 format stored
          phone_metadata: phoneMetadata,
          linkedin: data.linkedin || 'Not provided',
          message: data.message,
          resume_url: uploadedResumeUrl || 'No resume attached',
          recaptcha_token: recaptchaToken || 'reCAPTCHA not configured',
          _subject: `New Job Application: ${jobTitle} from ${data.name}`,
          _template: 'table',
          _autoresponse: `Thank you for applying to VislyBluq! We've received your application for ${jobTitle}. Our HR team will review your application and respond within 3-5 business days. If you have any questions, feel free to WhatsApp us at +234 701 505 5319.`,
          _honeypot: '', // Honeypot field
        }),
      });
      if (response.ok) {
        reset();
        setResumeFile(null);
        setResumeUrl('');
        setIsSubmitted(true);
      } else throw new Error('Application failed');
    } catch {
      alert('Something went wrong. Please email hr@vislybluq.com directly or WhatsApp us at +234 701 505 5319.');
    } finally {
      setIsSending(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="pt-16 pb-16 bg-visly-gray min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/careers"
          className="inline-flex items-center text-visly-blue font-medium text-sm mb-6 hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Careers
        </Link>

        <Card className="!p-6 md:!p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-visly-blue mb-2">
            Application
          </p>
          <h1 className="text-2xl font-semibold text-visly-dark mb-2">
            Apply for <span className="text-visly-blue">{jobTitle}</span>
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Join VislyBluq and help build the next generation of digital products.
          </p>

          {isSubmitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-semibold text-visly-dark mb-2">Application received</h2>
              <p className="text-sm text-gray-600 mb-6">
                We&apos;ll review your application and respond within 3–5 business days.
              </p>
              <Button to="/careers" variant="secondary">
                View other openings
              </Button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-4" noValidate>
              {/* Honeypot field for spam protection */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px' }}
                aria-hidden="true"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={errors.name ? errorInputClass : inputClass}
                    placeholder="John Doe"
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={errors.email ? errorInputClass : inputClass}
                    placeholder="john@example.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                    Phone
                  </label>
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
                        className={errors.phone ? 'PhoneInput--error' : ''}
                        limitMaxLength={true}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.phone.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Click the flag to select your country
                  </p>
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium mb-1.5">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    {...register('linkedin')}
                    className={errors.linkedin ? errorInputClass : inputClass}
                    placeholder="https://linkedin.com/in/..."
                  />
                  {errors.linkedin && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.linkedin.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium mb-1.5">
                  Resume/CV *
                </label>
                <div className="space-y-2">
                  {!resumeFile ? (
                    <label
                      htmlFor="resume"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-visly-blue transition-colors bg-gray-50"
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Upload className="h-5 w-5" />
                        <span>Upload Resume (PDF, DOC, DOCX - Max 5MB)</span>
                      </div>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl bg-blue-50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-visly-blue" />
                        <div>
                          <p className="text-sm font-medium text-visly-dark">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                  {uploadError && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <X className="h-4 w-4" />
                      {uploadError}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                  Cover letter *
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className={errors.message ? errorInputClass + ' resize-none' : inputClass + ' resize-none'}
                  placeholder="Tell us about yourself..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                />
                {errors.message && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.message.message}
                  </p>
                )}
              </div>
              <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-xs text-gray-600">
                <Briefcase className="h-5 w-5 text-visly-blue shrink-0" />
                <p>
                  Your application is sent to our hiring team at hr@vislybluq.com. Response
                  within 3–5 business days. Need faster response? WhatsApp us at +234 701 505 5319.
                </p>
              </div>
              <button
                type="submit"
                disabled={isSending || isUploading}
                className={`w-full bg-visly-navy text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center ${
                  isSending || isUploading ? 'opacity-70' : 'hover:bg-visly-blue'
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Uploading resume...
                  </>
                ) : isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Apply;
