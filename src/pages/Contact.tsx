import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PhoneInput, { getCountryCallingCode, parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../styles/phone-input.css';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { services } from '../data/services';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { contactFormSchema, type ContactFormData } from '../utils/validation';

const trustStats = [
  { label: 'Response time', value: '< 24h' },
  { label: 'Clients served', value: '50+' },
  { label: 'Consultation', value: 'Free at first' },
];

const nextSteps = [
  { step: '1', title: 'Submit', desc: 'Tell us about your project and goals.' },
  { step: '2', title: 'Review', desc: 'Our team reviews and responds within 24 hours.' },
  { step: '3', title: 'Discovery call', desc: 'We schedule a call to explore the best path forward.' },
];

const faqTeaser = [
  {
    q: 'What industries do you work with?',
    a: 'We partner with startups and SMEs across e-commerce, healthcare, fintech, and more.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Timelines vary by scope — from 4-week MVPs to multi-month enterprise builds.',
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes. We provide maintenance, monitoring, and iterative improvement packages.',
  },
];

const inputClass =
  'w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue focus:border-visly-blue bg-white transition-all placeholder-gray-400 text-visly-dark text-sm';

const errorInputClass =
  'w-full px-4 py-2.5 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-red-50 transition-all placeholder-gray-400 text-visly-dark text-sm';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const { getRecaptchaToken } = useRecaptcha();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const selectedService = watch('service');

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId && services.some((s) => s.id === serviceId)) {
      setValue('service', serviceId);
    }
  }, [searchParams, setValue]);

  const handleSubmit = async (data: ContactFormData) => {
    setIsSending(true);
    try {
      const serviceLabel =
        services.find((s) => s.id === data.service)?.title || data.service || 'General';
      
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken('contact_form');

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

      const response = await fetch('https://formsubmit.co/ajax/sales@vislybluq.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || 'Not provided',
          phone: phoneE164, // E.164 format stored
          phone_metadata: phoneMetadata,
          service: serviceLabel,
          message: data.message,
          recaptcha_token: recaptchaToken || 'reCAPTCHA not configured',
          _subject: `New VislyBluq Contact: ${data.name}`,
          _template: 'table',
          _autoresponse: `Thank you for contacting VislyBluq! We've received your inquiry about ${serviceLabel}. Our sales team will review your message and respond within 24 hours. For urgent matters, feel free to WhatsApp us at +234 701 505 5319.`,
          _honeypot: '', // Honeypot field
        }),
      });
      if (response.ok) {
        reset();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else throw new Error('Submission failed');
    } catch {
      alert('Something went wrong. Please email sales@vislybluq.com directly or WhatsApp us at +234 701 505 5319.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="pt-16 bg-white">
      <PageHero
        compact
        title={
          <>
            Consult, build, or <span className="text-visly-cyan">both</span> — let&apos;s talk
          </>
        }
        subtitle="Whether you need strategic advice, a full product build, or ongoing partnership — our experts respond within 24 hours."
      >
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {trustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <Section bg="white" className="!pt-10">
        <div className="max-w-5xl mx-auto">
          {/* Form Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-visly-dark mb-3">
              Let's start a conversation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share your project details and we'll connect you with the right expert within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            {/* Main Form */}
            <Card className="!p-8 md:!p-10">
              <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-6" noValidate>
                {/* Honeypot field for spam protection */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px' }}
                  aria-hidden="true"
                />

                {/* Personal Information Section */}
                <div>
                  <h3 className="text-lg font-semibold text-visly-dark mb-4 pb-2 border-b border-gray-200">
                    Your Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
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
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className={errors.email ? errorInputClass : inputClass}
                        placeholder="john@company.com"
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
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        {...register('company')}
                        className={errors.company ? errorInputClass : inputClass}
                        placeholder="Your Company"
                      />
                      {errors.company && (
                        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.company.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
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
                        Click the flag to select your country, then enter your number
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Selection Section */}
                <div>
                  <h3 className="text-lg font-semibold text-visly-dark mb-4 pb-2 border-b border-gray-200">
                    How Can We Help?
                  </h3>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select service(s) you're interested in
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setValue('service', '', { shouldValidate: true })}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                        !selectedService
                          ? 'bg-visly-navy text-white border-visly-navy shadow-md'
                          : 'border-gray-200 text-gray-600 hover:border-visly-blue hover:bg-gray-50'
                      }`}
                    >
                      General Inquiry
                    </button>
                    {services.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setValue('service', s.id, { shouldValidate: true })}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                          selectedService === s.id
                            ? 'bg-visly-navy text-white border-visly-navy shadow-md'
                            : 'border-gray-200 text-gray-600 hover:border-visly-blue hover:bg-gray-50'
                        }`}
                      >
                        {s.shortTitle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details Section */}
                <div>
                  <h3 className="text-lg font-semibold text-visly-dark mb-4 pb-2 border-b border-gray-200">
                    Tell Us About Your Project
                  </h3>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={6}
                    placeholder="Please describe your project goals, timeline, budget expectations, and any specific challenges you're facing..."
                    className={errors.message ? errorInputClass + ' resize-none' : inputClass + ' resize-none'}
                    aria-invalid={errors.message ? 'true' : 'false'}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.message.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    The more details you provide, the better we can tailor our response. (Minimum 10 characters, 5 words)
                  </p>
                </div>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="p-5 bg-green-50 border-2 border-green-200 text-green-700 rounded-xl flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Message sent successfully!</p>
                      <p className="text-sm text-green-600">
                        We've received your inquiry and will respond within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full bg-gradient-to-r from-visly-navy to-visly-blue text-white px-8 py-4 rounded-xl font-semibold text-base transition-all inline-flex items-center justify-center shadow-lg hover:shadow-xl ${
                      isSending ? 'opacity-70 cursor-not-allowed' : 'hover:from-visly-blue hover:to-visly-cyan transform hover:-translate-y-0.5'
                    }`}
                  >
                    {isSending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                        Sending your message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-3">
                    By submitting, you agree to our{' '}
                    <Link to="/privacy" className="text-visly-blue hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </form>
            </Card>

            {/* Sidebar - Contact Info & Trust Signals */}
            <div className="space-y-6">
              {/* Quick Contact Card */}
              <Card className="!p-6 bg-gradient-to-br from-visly-navy to-visly-blue text-white">
                <h3 className="text-xl font-bold mb-2">Prefer to talk directly?</h3>
                <p className="text-sm text-white/90 mb-6">
                  Our team is available during business hours to discuss your project.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:sales@vislybluq.com"
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80">Email us</p>
                      <p className="text-sm font-semibold">sales@vislybluq.com</p>
                    </div>
                  </a>
                  <a
                    href="tel:+2347015055319"
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80">Call us</p>
                      <p className="text-sm font-semibold">+234 701 505 5319</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/2347015055319?text=Hi%20VislyBluq,%20I'm%20interested%20in%20your%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80">WhatsApp us</p>
                      <p className="text-sm font-semibold">+234 701 505 5319</p>
                    </div>
                  </a>
                </div>
              </Card>

              {/* Response Time Card */}
              <Card className="!p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-visly-blue/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-visly-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-visly-dark mb-1">Quick Response</h4>
                    <p className="text-sm text-gray-600">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  {nextSteps.map((item) => (
                    <div key={item.step} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-visly-blue/10 text-visly-blue text-xs font-bold flex items-center justify-center shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-visly-dark">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Office Location Card */}
              <Card className="!p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-visly-blue/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-visly-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-visly-dark mb-1">Visit Our Office</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      11 Apaola Street<br />
                      Ketu Ikosi, Lagos<br />
                      Nigeria
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Mon–Fri, 9AM–6PM WAT</p>
                  </div>
                </div>
              </Card>

              {/* Trust Signal */}
              <Card className="!p-6 bg-visly-gray border-none">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed mb-3">
                  "Working with VislyBluq was a game-changer. Their technical expertise and strategic guidance helped us scale our platform 10x."
                </p>
                <p className="text-sm font-semibold text-visly-dark">Michael Chen</p>
                <p className="text-xs text-gray-500">CTO, TechStart Inc.</p>
              </Card>
            </div>
          </div>

          {/* Trust Badges Below Form */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {trustStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-visly-navy mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
              <div>
                <p className="text-3xl font-bold text-visly-navy mb-1">98%</p>
                <p className="text-sm text-gray-600">Client satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section bg="gray">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-visly-dark mb-2">Visit our office</h2>
          <p className="text-sm text-gray-600">Lagos, Nigeria</p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-64 md:h-80">
          <iframe
            title="VislyBluq Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5!2d3.38!3d6.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDAuMCJOIDPCsDIyJzQ4LjAiRQ!5e0!3m2!1sen!2sng!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          11 Apaola Street, Ketu Ikosi, Lagos, Nigeria ·{' '}
          <a
            href="https://maps.google.com/?q=Ketu+Ikosi+Lagos+Nigeria"
            target="_blank"
            rel="noreferrer"
            className="text-visly-blue font-medium hover:underline"
          >
            Open in Google Maps
          </a>
        </p>
      </Section>

      {/* FAQ teaser */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-visly-dark text-center mb-8">
            Common questions
          </h2>
          <div className="space-y-4 mb-8">
            {faqTeaser.map((item) => (
              <div key={item.q} className="border-b border-gray-100 pb-4">
                <p className="text-sm font-semibold text-visly-dark mb-1">{item.q}</p>
                <p className="text-sm text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button to="/faq" variant="secondary">
              View all FAQs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
