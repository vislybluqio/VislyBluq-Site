import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../styles/phone-input.css';
import { AlertCircle, CheckCircle, Clock, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { GlassCard, PageIntro, Section } from '../components/site/Enterprise';
import { services } from '../data/services';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { contactFormSchema, type ContactFormData } from '../utils/validation';

const inputClass = 'w-full rounded-xl border border-white/10 bg-[#0B1633]/75 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-visly-cyan focus:ring-2 focus:ring-visly-cyan/20';
const errorInputClass = 'w-full rounded-xl border border-red-400/60 bg-red-950/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-red-300 focus:ring-2 focus:ring-red-500/20';
const officeAddress = '11 Apaola Street, Ketu Ikosi, Lagos, Nigeria';
const destination = encodeURIComponent(officeAddress);

const Contact = () => {
  const [searchParams] = useSearchParams();
  const { getRecaptchaToken } = useRecaptcha();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const { register, handleSubmit: handleFormSubmit, control, setValue, reset, watch, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', company: '', phone: '', service: '', message: '' },
  });

  const selectedService = watch('service');

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

  const onSubmit = async (data: ContactFormData) => {
    setIsSending(true);
    try {
      const recaptchaToken = await getRecaptchaToken('contact_form');
      const serviceLabel = services.find((service) => service.id === data.service)?.title || data.service || 'Digital Transformation Inquiry';
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
          formType: 'contact',
          recaptchaToken,
          data: { name: data.name, email: data.email, company: data.company || 'Not provided', phone: phoneE164, phone_metadata: phoneMetadata, service: serviceLabel, message: data.message, _subject: `New VislyBluq Contact: ${data.name}` },
        }),
      });
      if (!response.ok) throw new Error('Submission failed');
      reset();
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch {
      alert('Something went wrong. Please email hello@vislybluq.com directly or WhatsApp us at +234 701 505 5319.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <PageIntro eyebrow="Connect with Us" title={<>Let&apos;s Build What Matters.</>} description="Tell us about your product, data, automation, AI, or digital transformation goals. We are available online and respond as quickly as possible." />
      <Section className="pt-0">
        <div className="mb-10 grid gap-6 lg:grid-cols-3">
          <GlassCard className="p-7"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#77d8ff]">Office</p><h2 className="mt-4 text-2xl font-bold text-[#d7e3f9]">Lagos, Nigeria</h2><p className="mt-3 text-sm leading-6 text-[#c2c6d6]">{officeAddress}</p><button onClick={openDirections} className="mt-5 inline-flex text-sm font-bold text-[#adc6ff]">Get Directions ?</button></GlassCard>
          <GlassCard className="p-7"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#77d8ff]">Availability</p><h2 className="mt-4 text-2xl font-bold text-[#d7e3f9]">Online-first support</h2><p className="mt-3 text-sm leading-6 text-[#c2c6d6]">We are mostly available online and reachable for enquiries 24/7. Scheduled calls are arranged based on project needs.</p></GlassCard>
          <GlassCard className="p-7"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#77d8ff]">Quick Response</p><h2 className="mt-4 text-2xl font-bold text-[#d7e3f9]">WhatsApp or call</h2><p className="mt-3 text-sm leading-6 text-[#c2c6d6]">Use either +234 814 269 5808 or +234 701 505 5319 for direct communication.</p></GlassCard>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.85fr]">
          <GlassCard className="p-6 md:p-8 lg:p-10">
            <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6" noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid gap-4 md:grid-cols-2"><Field label="Full name" error={errors.name?.message}><input id="name" type="text" {...register('name')} className={errors.name ? errorInputClass : inputClass} placeholder="John Doe" /></Field><Field label="Work email" error={errors.email?.message}><input id="email" type="email" {...register('email')} className={errors.email ? errorInputClass : inputClass} placeholder="john@company.com" /></Field></div>
              <div className="grid gap-4 md:grid-cols-2"><Field label="Company" error={errors.company?.message}><input id="company" type="text" {...register('company')} className={errors.company ? errorInputClass : inputClass} placeholder="Company name" /></Field><Field label="Phone" error={errors.phone?.message}><Controller name="phone" control={control} render={({ field: { onChange, value } }) => <PhoneInput international countryCallingCodeEditable={false} defaultCountry="NG" value={value} onChange={onChange} placeholder="Enter phone number" className={errors.phone ? 'PhoneInput--error dark-phone-input' : 'dark-phone-input'} limitMaxLength />} /></Field></div>
              <div><label className="mb-3 block text-sm font-semibold text-white">Project type</label><div className="grid grid-cols-2 gap-3 md:grid-cols-3"><button type="button" onClick={() => setValue('service', '', { shouldValidate: true })} className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${!selectedService ? 'border-visly-cyan bg-visly-cyan text-[#071423]' : 'border-white/10 bg-white/5 text-white/65 hover:text-white'}`}>Digital Transformation</button>{services.map((service) => <button key={service.id} type="button" onClick={() => setValue('service', service.id, { shouldValidate: true })} className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${selectedService === service.id ? 'border-visly-cyan bg-visly-cyan text-[#071423]' : 'border-white/10 bg-white/5 text-white/65 hover:text-white'}`}>{service.shortTitle}</button>)}</div></div>
              <Field label="Message" error={errors.message?.message}><textarea id="message" {...register('message')} rows={7} className={`${errors.message ? errorInputClass : inputClass} resize-none`} placeholder="Tell us what you want to build, improve, automate, or understand." /></Field>
              {isSubmitted && <div className="flex gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-emerald-200"><CheckCircle className="h-5 w-5 shrink-0" /><p className="text-sm">Message sent successfully. We will respond as soon as possible.</p></div>}
              <button type="submit" disabled={isSending} className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-visly-blue px-7 py-4 text-sm font-bold text-white shadow-[0_0_28px_rgba(46,126,247,0.28)] transition hover:bg-[#3B8AFF] disabled:opacity-60">{isSending ? 'Sending...' : 'Send Inquiry'}<Send className="h-4 w-4" /></button>
              <p className="text-center text-xs text-white/45">By submitting, you agree to our <Link to="/privacy" className="text-visly-cyan hover:text-white">Privacy Policy</Link>.</p>
            </form>
          </GlassCard>
          <div className="space-y-5">
            <GlassCard className="p-7"><h2 className="text-2xl font-bold text-white">Support Channels</h2><div className="mt-6 space-y-4"><ContactLink icon={<Mail className="h-5 w-5" />} label="Email" value="hello@vislybluq.com" href="mailto:hello@vislybluq.com" /><ContactLink icon={<Phone className="h-5 w-5" />} label="Call" value="+234 814 269 5808" href="tel:+2348142695808" /><ContactLink icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value="+234 701 505 5319" href="https://wa.me/2347015055319?text=Hi%20VislyBluq,%20I'm%20interested%20in%20your%20services" /></div></GlassCard>
            <GlassCard className="p-7"><Clock className="mb-4 h-8 w-8 text-visly-cyan" /><h3 className="text-xl font-bold text-white">Direct Connection</h3><p className="mt-3 text-sm leading-6 text-white/60">Reach us online first. We can schedule discovery calls, technical reviews, and project scoping sessions around your availability.</p></GlassCard>
            <GlassCard className="overflow-hidden p-0"><iframe title="VislyBluq Lagos location" src={`https://www.google.com/maps?q=${destination}&output=embed`} className="h-72 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="p-5"><button onClick={openDirections} className="text-sm font-bold text-[#adc6ff]">Open directions from my location ?</button></div></GlassCard>
          </div>
        </div>
      </Section>
    </div>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: ReactNode }) => <div><label className="mb-2 block text-sm font-semibold text-white">{label}</label>{children}{error && <p className="mt-2 flex items-center gap-1 text-xs text-red-300"><AlertCircle className="h-3.5 w-3.5" /> {error}</p>}</div>;
const ContactLink = ({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href: string }) => <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-visly-cyan/30"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-visly-cyan/10 text-visly-cyan">{icon}</span><span><span className="block text-xs uppercase tracking-[0.18em] text-white/40">{label}</span><span className="mt-1 block text-sm font-bold text-white">{value}</span></span></a>;

export default Contact;

