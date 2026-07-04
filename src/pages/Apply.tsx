import { useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'react-router-dom';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../styles/phone-input.css';
import { AlertCircle, ArrowLeft, CheckCircle, FileText, Send, Upload, X } from 'lucide-react';
import { GlassCard, PageIntro, Section } from '../components/site/Enterprise';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { uploadToCloudinary, validateFile } from '../utils/fileUpload';
import { jobApplicationSchema, type JobApplicationData } from '../utils/validation';

const inputClass = 'w-full rounded-xl border border-white/10 bg-[#0B1633]/75 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-visly-cyan focus:ring-2 focus:ring-visly-cyan/20';
const errorInputClass = 'w-full rounded-xl border border-red-400/60 bg-red-950/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-red-300 focus:ring-2 focus:ring-red-500/20';

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

  const onSubmit = async (data: JobApplicationData) => {
    setIsSending(true);
    setUploadError('');

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
          data: {
            job_title: jobTitle,
            name: data.name,
            email: data.email,
            phone: phoneE164,
            phone_metadata: phoneMetadata,
            linkedin: data.linkedin || 'Not provided',
            message: data.message,
            resume_url: uploadedResumeUrl || 'No resume attached',
            _subject: `New Job Application: ${jobTitle} from ${data.name}`,
          },
        }),
      });

      if (!response.ok) throw new Error('Application failed');
      reset();
      setResumeFile(null);
      setResumeUrl('');
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setUploadError('Something went wrong. Please email hr@vislybluq.com directly or try again.');
    } finally {
      setIsSending(false);
      setIsUploading(false);
    }
  };

  return (
    <div>
      <PageIntro
        eyebrow="Application"
        title={<>Apply for <span className="text-visly-cyan">{jobTitle}</span></>}
        description="Send your details to the VislyBluq hiring team. Resume upload, phone formatting, validation, and protected submission remain wired into the existing backend flow."
      />
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl">
          <Link to="/careers" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-visly-cyan hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to careers
          </Link>
          <GlassCard className="p-6 md:p-8 lg:p-10">
            {isSubmitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-white">Application received</h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/60">We will review your application and respond within 3-5 business days.</p>
                <Link to="/careers" className="mt-8 inline-flex rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:border-visly-cyan/40">
                  View openings
                </Link>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6" noValidate>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full name" error={errors.name?.message}><input type="text" {...register('name')} className={errors.name ? errorInputClass : inputClass} placeholder="John Doe" /></Field>
                  <Field label="Email" error={errors.email?.message}><input type="email" {...register('email')} className={errors.email ? errorInputClass : inputClass} placeholder="john@example.com" /></Field>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Phone" error={errors.phone?.message}>
                    <Controller name="phone" control={control} render={({ field: { onChange, value } }) => (
                      <PhoneInput international countryCallingCodeEditable={false} defaultCountry="NG" value={value} onChange={onChange} placeholder="Enter phone number" className={errors.phone ? 'PhoneInput--error' : ''} limitMaxLength />
                    )} />
                  </Field>
                  <Field label="LinkedIn" error={errors.linkedin?.message}><input type="url" {...register('linkedin')} className={errors.linkedin ? errorInputClass : inputClass} placeholder="https://linkedin.com/in/..." /></Field>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white">Resume/CV</label>
                  {!resumeFile ? (
                    <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-6 text-sm text-white/60 hover:border-visly-cyan/40 hover:text-white">
                      <Upload className="mr-2 h-5 w-5 text-visly-cyan" /> Upload resume (PDF, DOC, DOCX - max 5MB)
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between rounded-2xl border border-visly-cyan/20 bg-visly-cyan/10 p-4">
                      <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-visly-cyan" /><span className="text-sm font-semibold text-white">{resumeFile.name}</span></div>
                      <button type="button" onClick={() => { setResumeFile(null); setResumeUrl(''); }} className="text-red-300 hover:text-red-200"><X className="h-5 w-5" /></button>
                    </div>
                  )}
                  {uploadError && <p className="mt-2 flex items-center gap-1 text-xs text-red-300"><AlertCircle className="h-3.5 w-3.5" /> {uploadError}</p>}
                </div>
                <Field label="Cover letter" error={errors.message?.message}>
                  <textarea {...register('message')} rows={6} className={`${errors.message ? errorInputClass : inputClass} resize-none`} placeholder="Tell us about your experience, strengths, and the kind of work you want to do." />
                </Field>
                <button type="submit" disabled={isSending || isUploading} className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-visly-blue px-7 py-4 text-sm font-bold text-white shadow-[0_0_28px_rgba(46,126,247,0.28)] transition hover:bg-[#3B8AFF] disabled:opacity-60">
                  {isUploading ? 'Uploading resume...' : isSending ? 'Sending application...' : 'Submit application'}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </Section>
    </div>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: ReactNode }) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-white">{label}</label>
    {children}
    {error && <p className="mt-2 flex items-center gap-1 text-xs text-red-300"><AlertCircle className="h-3.5 w-3.5" /> {error}</p>}
  </div>
);

export default Apply;

