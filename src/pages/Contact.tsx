import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { services } from '../data/services';

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

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId && services.some((s) => s.id === serviceId)) {
      setFormData((prev) => ({ ...prev, service: serviceId }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const serviceLabel =
        services.find((s) => s.id === formData.service)?.title || formData.service || 'General';
      const response = await fetch('https://formsubmit.co/ajax/vislybluq5@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          service: serviceLabel,
          message: formData.message,
          _subject: `New VislyBluq Contact: ${formData.name}`,
          _template: 'table',
        }),
      });
      if (response.ok) {
        setFormData({ name: '', email: '', company: '', phone: '', service: '', message: '' });
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else throw new Error('Submission failed');
    } catch {
      alert('Something went wrong. Please email vislybluq5@gmail.com directly.');
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-12">
          {/* Form */}
          <Card className="!p-6 md:!p-8">
            <h2 className="text-2xl font-semibold text-visly-dark mb-2">Start your project</h2>
            <p className="text-sm text-gray-600 mb-6">
              Fill out the form and we'll get back to you with a customized proposal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-visly-dark mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-visly-dark mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-visly-dark mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Company Ltd."
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-visly-dark mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+234 ..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-visly-dark mb-2">
                  Service of interest
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, service: '' }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      !formData.service
                        ? 'bg-visly-navy text-white border-visly-navy'
                        : 'border-gray-200 text-gray-600 hover:border-visly-blue'
                    }`}
                  >
                    General
                  </button>
                  {services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, service: s.id }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        formData.service === s.id
                          ? 'bg-visly-navy text-white border-visly-navy'
                          : 'border-gray-200 text-gray-600 hover:border-visly-blue'
                      }`}
                    >
                      {s.shortTitle}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-visly-dark mb-1.5">
                  Project description *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="Tell us about your project, goals, and timeline..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {isSubmitted && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center text-sm">
                  <CheckCircle className="h-5 w-5 mr-2 shrink-0" />
                  Thank you! We'll be in touch within 24 hours.
                </div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className={`w-full bg-visly-navy text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center text-sm ${
                  isSending ? 'opacity-70 cursor-not-allowed' : 'hover:bg-visly-blue'
                }`}
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </Card>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-20 space-y-6 h-fit">
            <Card>
              <h3 className="text-lg font-semibold text-visly-dark mb-4">Get in touch</h3>
              <div className="space-y-4">
                <a
                  href="mailto:vislybluq5@gmail.com"
                  className="flex items-start gap-3 group"
                >
                  <Mail className="h-5 w-5 text-visly-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-visly-dark">Email</p>
                    <p className="text-sm text-visly-blue group-hover:underline">vislybluq5@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-visly-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-visly-dark">Phone</p>
                    <p className="text-sm text-gray-600">Mon–Fri, 9AM–6PM WAT</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-visly-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-visly-dark">Office</p>
                    <p className="text-sm text-gray-600">
                      11 Apaola Street, Ketu Ikosi, Lagos, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-visly-dark mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-visly-blue" />
                What happens next
              </h3>
              <ol className="space-y-4">
                {nextSteps.map((item) => (
                  <li key={item.step} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-visly-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-visly-dark">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="bg-visly-gray border-none">
              <p className="text-sm text-gray-600 italic mb-3">
                "VislyBluq transformed our outdated internal tools into a sleek, modern platform. The
                efficiency gains were immediate."
              </p>
              <p className="text-sm font-semibold text-visly-dark">Jessica Williams</p>
              <p className="text-xs text-gray-500">Chief Operations Officer</p>
            </Card>
          </aside>
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
