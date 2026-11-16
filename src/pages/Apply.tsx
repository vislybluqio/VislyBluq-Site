import { useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'react-router-dom';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../styles/phone-input.css';
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, FileText, Upload, X } from 'lucide-react';
import { PageIntro, Section } from '../components/site/Enterprise';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { uploadToCloudinary, validateFile } from '../utils/fileUpload';
import { CONTACT_EMAIL } from '../config/contact';
import { jobApplicationSchema, type JobApplicationData } from '../utils/validation';
import { pageMeta } from '../config/seo';

export const meta = () => pageMeta({ title: 'Apply', description: 'Apply for a volunteer role at VislyBluq.', path: '/apply' });

const inputClass = 'w-full rounded-lg border border-paper-line bg-paper px-4 py-3 text-base text-body outline-none transition-colors placeholder:text-body-faint focus:border-body focus-visible:ring-0';
const errorInputClass = 'w-full rounded-lg border border-red-400 bg-paper px-4 py-3 text-base text-body outline-none placeholder:text-body-faint focus:border-red-600 focus-visible:ring-0';

const Apply = () => {
  const location = useLocation();
  const jobTitle = new URLSearchParams(location.search).get('job') || 'General Application';
  const { getRecaptchaToken } = useRecaptcha();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<JobApplicationData>({
    resolver: zodResolver(jobApplicationSchema),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', phone: '', linkedin: '', message: '' },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const validation = validateFile(file, 5);
    if (!validation.isValid) {
      setUploadError(validation.error || 'Invalid file');
      return;
    }
    setUploadError('');
    setResumeFile(file);
  };

  const onSubmit = async (data: JobApplicationData, event?: React.BaseSyntheticEvent) => {
    const honeypot = (event?.target as HTMLFormElement | undefined)?.elements.namedItem('website') as HTMLInputElement | null;
    setIsSending(true);
    setUploadError('');
    setSubmitError('');

    try {
      const recaptchaToken = await getRecaptchaToken('job_application');
      let uploadedResumeUrl = resumeUrl;

      if (resumeFile && !resumeUrl) {
        setIsUploading(true);
        uploadedResumeUrl = await uploadToCloudinary(resumeFile);
        setResumeUrl(uploadedResumeUrl);
        setIsUploading(false);
      }

      let phoneE164 = data.phone || '';
      let phoneMetadata = '';
      if (data.phone) {
        const phoneNumber = parsePhoneNumber(data.phone);
        if (phoneNumber) {
          phoneE164 = phoneNumber.number;
          phoneMetadata = `Country: ${phoneNumber.country}, National: ${phoneNumber.nationalNumber}, Format: E.164`;
        }
      }

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'application',
          recaptchaToken,
          website: honeypot?.value,
          data: {
            job_title: jobTitle,
            name: data.name,
            email: data.email,
            phone: phoneE164,
            phone_metadata: phoneMetadata,
            linkedin: data.linkedin || 'Not provided',
            message: data.message,
            resume_url: uploadedResumeUrl || 'No resume attached',
          },
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(result.error || 'Application failed');
      }
      reset();
      setResumeFile(null);
      setResumeUrl('');
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitError(`Your application could not be sent. Please try again, or email it to ${CONTACT_EMAIL}.`);
    } finally {
      setIsSending(false);
      setIsUploading(false);
    }
  };

  return (
    <div>
      <PageIntro
        label="Careers · Application"
        title={jobTitle === 'General Application' ? 'Apply to VislyBluq' : `Apply: ${jobTitle}`}
        description="Tell us a little about yourself. We read every application and reply within 3 to 5 business days."
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <Link to="/careers" className="mb-10 inline-flex items-center gap-2 text-sm text-body-muted hover:text-body">
            <ArrowLeft className="h-4 w-4" aria-hidden /> All openings
          </Link>
          <div>
            {isSubmitted ? (
              <div className="py-10 text-center">
                <CheckCircle className="mx-auto mb-6 h-8 w-8 text-brand" aria-hidden />
                <h2 className="text-3xl font-normal tracking-display">Application received.</h2>
                <p className="mx-auto mt-4 max-w-md text-base leading-7 text-body-muted">Thank you. We’ll review it and reply within 3 to 5 business days.</p>
                <Link to="/careers" className="mt-8 inline-flex h-12 items-center rounded-full border border-paper-line px-6 text-sm font-medium hover:border-body">
                  View other openings
                </Link>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-8" noValidate>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="grid gap-8 md:grid-cols-2">
                  <Field label="Full name" error={errors.name?.message}><input type="text" {...register('name')} className={errors.name ? errorInputClass : inputClass} autoComplete="name" /></Field>
                  <Field label="Email" error={errors.email?.message}><input type="email" {...register('email')} className={errors.email ? errorInputClass : inputClass} autoComplete="email" /></Field>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  <Field label="Phone (optional)" error={errors.phone?.message}>
                    <Controller name="phone" control={control} render={({ field: { onChange, value } }) => (
                      <PhoneInput international countryCallingCodeEditable={false} defaultCountry="NG" value={value} onChange={onChange} className={errors.phone ? 'PhoneInput--error' : ''} limitMaxLength />
                    )} />
                  </Field>
                  <Field label="LinkedIn (optional)" error={errors.linkedin?.message}><input type="url" {...register('linkedin')} className={errors.linkedin ? errorInputClass : inputClass} placeholder="https://linkedin.com/in/..." /></Field>
                </div>
                <div>
                  <p className="mb-2 block text-sm font-medium">CV or résumé (optional)</p>
                  {!resumeFile ? (
                    <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-paper-line px-4 py-8 text-sm text-body-muted transition-colors hover:border-body hover:text-body">
                      <Upload className="mr-2 h-4 w-4" aria-hidden /> Upload a PDF or Word file, up to 5 MB
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between rounded-lg border border-paper-line bg-paper-tint p-4">
                      <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-body-muted" aria-hidden /><span className="text-sm font-medium">{resumeFile.name}</span></div>
                      <button type="button" onClick={() => { setResumeFile(null); setResumeUrl(''); }} className="text-body-muted hover:text-body" aria-label="Remove file"><X className="h-5 w-5" /></button>
                    </div>
                  )}
                  {uploadError && <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600"><AlertCircle className="h-3.5 w-3.5" aria-hidden /> {uploadError}</p>}
                </div>
                <Field label="About you" error={errors.message?.message}>
                  <textarea {...register('message')} rows={6} className={`${errors.message ? errorInputClass : inputClass} resize-none`} placeholder="Your experience, what you’re good at, and the kind of work you want to do." />
                </Field>
                {submitError && <p role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"><AlertCircle className="h-5 w-5 shrink-0" aria-hidden />{submitError}</p>}
                <button type="submit" disabled={isSending || isUploading} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-body px-7 text-sm font-medium text-white transition-colors hover:bg-brand disabled:opacity-60">
                  {isUploading ? 'Uploading CV…' : isSending ? 'Sending…' : 'Submit application'}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: ReactNode }) => (
  <div>
    <label className="mb-2 block text-sm font-medium">{label}</label>
    {children}
    {error && <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600"><AlertCircle className="h-3.5 w-3.5" aria-hidden /> {error}</p>}
  </div>
);

export default Apply;

