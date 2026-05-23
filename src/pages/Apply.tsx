import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle, Briefcase } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const inputClass =
  'w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue focus:border-visly-blue bg-white text-sm';

const Apply = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobTitle = queryParams.get('job') || 'General Application';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/vislybluq5@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          job_title: jobTitle,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          linkedin: formData.linkedin,
          message: formData.message,
          _subject: `New Job Application: ${jobTitle} from ${formData.name}`,
          _template: 'table',
        }),
      });
      if (response.ok) {
        setFormData({ name: '', email: '', phone: '', linkedin: '', message: '' });
        setIsSubmitted(true);
      } else throw new Error('Application failed');
    } catch {
      alert('Something went wrong. Please email vislybluq5@gmail.com directly.');
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">
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
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                    Email *
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
                  <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+234..."
                  />
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium mb-1.5">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                  Cover letter *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-xs text-gray-600">
                <Briefcase className="h-5 w-5 text-visly-blue shrink-0" />
                <p>
                  Your application is sent to our hiring team at vislybluq5@gmail.com. Response
                  within 3–5 business days.
                </p>
              </div>
              <button
                type="submit"
                disabled={isSending}
                className={`w-full bg-visly-navy text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center ${
                  isSending ? 'opacity-70' : 'hover:bg-visly-blue'
                }`}
              >
                {isSending ? (
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
