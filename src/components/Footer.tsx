import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppWindow, ArrowRight, CheckCircle, Github, Linkedin, Twitter } from 'lucide-react';
import { services } from '../data/services';
import { useRecaptcha } from '../hooks/useRecaptcha';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { getRecaptchaToken } = useRecaptcha();

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newsEmail) return;

    const formElement = e.currentTarget;
    const honeypot = formElement.elements.namedItem('website') as HTMLInputElement | null;
    if (honeypot?.value) return;

    setIsSubscribing(true);
    try {
      const recaptchaToken = await getRecaptchaToken('newsletter_subscription');
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'newsletter',
          recaptchaToken,
          data: {
            email: newsEmail,
            source: 'Footer',
            _subject: 'New VislyBluq Newsletter Subscription',
          },
        }),
      });

      if (!response.ok) throw new Error('Newsletter subscription failed');
      setSubscribed(true);
      setNewsEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (error) {
      console.error('Newsletter error:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="border-t border-white/5 bg-[#071423] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="mb-16 rounded-3xl border border-visly-cyan/10 bg-visly-surface/45 p-8 backdrop-blur-xl lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-visly-cyan">
                Technical signals
              </p>
              <h3 className="mt-3 text-3xl font-bold text-white">Receive enterprise build notes.</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                Strategy, AI, architecture, and product engineering insights from the VislyBluq team.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder="Email address"
                  className="min-h-12 flex-1 rounded-xl border border-white/10 bg-[#0B1633]/75 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-visly-cyan focus:ring-2 focus:ring-visly-cyan/20"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-visly-cyan px-5 text-sm font-bold text-[#071423] transition hover:bg-white disabled:opacity-60"
                >
                  {isSubscribing ? 'Joining...' : 'Join'}
                  {!isSubscribing && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="flex items-center gap-2 text-sm font-medium text-visly-cyan">
                  <CheckCircle className="h-4 w-4" /> You are subscribed. Thank you.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-visly-cyan/20 bg-visly-surface/70 text-visly-cyan">
                <AppWindow className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">VislyBluq</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
              High-performance technology consulting and product engineering for the next generation of industry leaders.
            </p>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Twitter, Github].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/55 hover:border-visly-cyan/40 hover:text-visly-cyan"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold text-white">Company</h4>
            <ul className="space-y-3 text-sm text-white/55">
              {[
                { to: '/team', label: 'Team' },
                { to: '/services', label: 'Services' },
                { to: '/projects', label: 'Projects' },
                { to: '/insights', label: 'Insights' },
                { to: '/careers', label: 'Careers' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-visly-cyan">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold text-white">Capabilities</h4>
            <ul className="space-y-3 text-sm text-white/55">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link to={`/services?service=${service.id}#${service.id}`} className="hover:text-visly-cyan">
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li>11 Apaola Street, Ketu Ikosi, Lagos</li>
              <li>
                <a href="mailto:info@vislybluq.com" className="hover:text-visly-cyan">
                  info@vislybluq.com
                </a>
              </li>
              <li>
                <a href="tel:+2347015055319" className="hover:text-visly-cyan">
                  +234 701 505 5319
                </a>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-visly-cyan">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-visly-cyan">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7 text-xs text-white/38">
          © {currentYear} VislyBluq Enterprise Technology Consulting. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

