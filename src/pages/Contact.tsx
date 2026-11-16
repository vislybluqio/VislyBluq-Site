import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../styles/phone-input.css';
import { AlertCircle, ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';
import { Label, PageIntro, Section } from '../components/site/Enterprise';
import { servicePillars as services } from '../data/enterpriseServices';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_DISPLAY, whatsappLink } from '../config/contact';
import { contactFormSchema, type ContactFormData } from '../utils/validation';
import { pageMeta } from '../config/seo';

export const meta = () => pageMeta({ title: 'Contact', description: 'Contact VislyBluq by form, email, phone or WhatsApp. Office: 11 Apaola Street, Ketu Ikosi, Lagos, Nigeria.', path: '/contact' });

const inputClass = 'w-full rounded-lg border border-paper-line bg-paper px-4 py-3 text-base text-body outline-none transition-colors placeholder:text-body-faint focus:border-body focus-visible:ring-0';
const errorInputClass = 'w-full rounded-lg border border-red-400 bg-paper px-4 py-3 text-base text-body outline-none placeholder:text-body-faint focus:border-red-600 focus-visible:ring-0';
const officeAddress = '11 Apaola Street, Ketu Ikosi, Lagos, Nigeria';
const destination = encodeURIComponent(officeAddress);


const Contact = () => {
  const [searchParams] = useSearchParams();
  const { getRecaptchaToken } = useRecaptcha();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  const { register, handleSubmit: handleFormSubmit, control, setValue, reset, watch, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', company: '', phone: '', service: '', message: '' },
  });

  const selectedService = watch('service');

  const createWhatsAppMessage = (data: ContactFormData, service: string, phone: string) =>
    [
      'Hello VislyBluq team, I would like to make an inquiry.',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company || 'Not provided'}`,
      `Phone: ${phone || 'Not provided'}`,
      `Project type: ${service}`,
      '',
      `Message: ${data.message}`,
    ].join('\n');

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId && services.some((service) => service.id === serviceId)) setValue('service', serviceId);
  }, [searchParams, setValue]);

  const openDirections = () => {
    const fallback = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    if (!navigator.geolocation) {
      window.open(fallback, '_blank', 'noopener,noreferrer');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`, '_blank', 'noopener,noreferrer');
      },
      () => window.open(fallback, '_blank', 'noopener,noreferrer'),
      { enableHighAccuracy: true, timeout: 7000 }
    );
  };

  const onSubmit = async (data: ContactFormData, event?: React.BaseSyntheticEvent) => {
    const honeypot = (event?.target as HTMLFormElement | undefined)?.elements.namedItem('website') as HTMLInputElement | null;
    setIsSending(true);
    setSubmitError(null);
    try {
      const recaptchaToken = await getRecaptchaToken('contact_form');
      const serviceLabel = services.find((service) => service.id === data.service)?.title || 'Not sure yet';
      let phoneE164 = data.phone || '';
      let phoneMetadata = '';
      if (data.phone) {
        const phoneNumber = parsePhoneNumber(data.phone);
        if (phoneNumber) {
          phoneE164 = phoneNumber.number;
          phoneMetadata = `Country: ${phoneNumber.country}, National: ${phoneNumber.nationalNumber}, Format: E.164`;
        }
      }
      setWhatsAppMessage(createWhatsAppMessage(data, serviceLabel, phoneE164));
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          recaptchaToken,
          website: honeypot?.value,
          data: { name: data.name, email: data.email, company: data.company || 'Not provided', phone: phoneE164, phone_metadata: phoneMetadata, service: serviceLabel, message: data.message, source: 'Contact page' },
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(result.error || 'We could not send your message right now.');
      reset();
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'We could not send your message right now. Please use WhatsApp or email us directly.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <PageIntro
        title="Tell us what you’re building."
        description="We usually reply within one working day. Prefer to talk? Call or message us on WhatsApp."
      />
      <Section>
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-8" noValidate>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="grid gap-8 md:grid-cols-2">
              <Field id="name" label="Full name" error={errors.name?.message}><input id="name" type="text" autoComplete="name" {...register('name')} className={errors.name ? errorInputClass : inputClass} /></Field>
              <Field id="email" label="Work email" error={errors.email?.message}><input id="email" type="email" autoComplete="email" {...register('email')} className={errors.email ? errorInputClass : inputClass} /></Field>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Field id="company" label="Company (optional)" error={errors.company?.message}><input id="company" type="text" autoComplete="organization" {...register('company')} className={errors.company ? errorInputClass : inputClass} /></Field>
              <Field id="phone" label="Phone (optional)" error={errors.phone?.message}><Controller name="phone" control={control} render={({ field: { onChange, value } }) => <PhoneInput id="phone" international countryCallingCodeEditable={false} defaultCountry="NG" value={value} onChange={onChange} className={errors.phone ? 'PhoneInput--error' : ''} limitMaxLength />} /></Field>
            </div>
            <fieldset>
              <legend className="mb-4 text-sm font-medium">What do you need help with?</legend>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setValue('service', '', { shouldValidate: true })} aria-pressed={!selectedService} className={chipClass(!selectedService)}>Not sure yet</button>
                {services.map((service) => (
                  <button key={service.id} type="button" onClick={() => setValue('service', service.id, { shouldValidate: true })} aria-pressed={selectedService === service.id} className={chipClass(selectedService === service.id)}>{service.title}</button>
                ))}
              </div>
            </fieldset>
            <Field id="message" label="Message" error={errors.message?.message}><textarea id="message" {...register('message')} rows={6} className={`${errors.message ? errorInputClass : inputClass} resize-none`} placeholder="What are you trying to build, fix or understand?" /></Field>
            {isSubmitted && <div role="status" className="flex gap-3 rounded-xl bg-paper-tint p-4 text-sm"><CheckCircle className="h-5 w-5 shrink-0 text-brand" aria-hidden />Message sent. We’ll be in touch shortly.</div>}
            {submitError && <div role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"><AlertCircle className="h-5 w-5 shrink-0" aria-hidden />{submitError}</div>}
            {whatsAppMessage && <WhatsAppHandoff message={whatsAppMessage} />}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" disabled={isSending} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-body px-7 text-sm font-medium text-white transition-colors hover:bg-brand disabled:opacity-60">{isSending ? 'Sending…' : 'Send message'}<ArrowRight className="h-4 w-4" aria-hidden /></button>
              <p className="text-xs text-body-faint">By sending, you agree to our <Link to="/privacy" className="underline underline-offset-2 hover:text-body">privacy policy</Link>.</p>
            </div>
          </form>

          <aside className="space-y-12">
            <div>
              <Label className="mb-5">Direct</Label>
              <ul className="border-t border-paper-line">
                <ContactRow label="Email" value={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} />
                <ContactRow label="Phone" value={PHONE_DISPLAY} href={PHONE_HREF} />
                <ContactRow label="WhatsApp" value={WHATSAPP_DISPLAY} href={whatsappLink("Hi VislyBluq, I'm interested in your services")} />
              </ul>
            </div>
            <div>
              <Label className="mb-5">Office</Label>
              <p className="text-base leading-7">{officeAddress}</p>
              <button type="button" onClick={openDirections} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium hover:text-brand">Get directions <ArrowRight className="h-4 w-4" aria-hidden /></button>
              <iframe title="VislyBluq office location" src={`https://www.google.com/maps?q=${destination}&output=embed`} className="mt-6 h-56 w-full rounded-xl border border-paper-line grayscale" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
};

const chipClass = (active: boolean) =>
  `h-10 rounded-full border px-4 text-sm transition-colors ${active ? 'border-body bg-body text-white' : 'border-paper-line text-body-muted hover:border-body hover:text-body'}`;

const WhatsAppHandoff = ({ message }: { message: string }) => (
  <div className="flex flex-col gap-4 rounded-xl border border-paper-line p-5 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-sm text-body-muted">Want a faster reply? Send the same message on WhatsApp.</p>
    <a href={whatsappLink(message)} target="_blank" rel="noreferrer" className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-body px-5 text-sm font-medium hover:bg-body hover:text-white">
      <MessageCircle className="h-4 w-4" aria-hidden /> Send on WhatsApp
    </a>
  </div>
);

const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
    {children}
    {error && <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600"><AlertCircle className="h-3.5 w-3.5" aria-hidden /> {error}</p>}
  </div>
);

const ContactRow = ({ label, value, href }: { label: string; value: string; href: string }) => (
  <li className="border-b border-paper-line">
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="flex items-center justify-between gap-4 py-4 hover:text-brand">
      <span className="text-sm text-body-muted">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </a>
  </li>
);

export default Contact;

