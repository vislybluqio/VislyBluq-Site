import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppWindow, Linkedin, Twitter, Github, ArrowRight, CheckCircle } from 'lucide-react';
import { services } from '../data/services';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    
    // Check honeypot field
    const formElement = e.target as HTMLFormElement;
    const honeypot = formElement.elements.namedItem('website') as HTMLInputElement;
    if (honeypot && honeypot.value) {
      // Likely a bot, silently fail
      return;
    }

    setIsSubscribing(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/info@vislybluq.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: newsEmail,
          _subject: 'New VislyBluq Newsletter Subscription',
          message: `New newsletter subscription from: ${newsEmail}`,
          source: 'Footer',
        }),
      });
      if (response.ok) {
        setSubscribed(true);
        setNewsEmail('');
        setTimeout(() => setSubscribed(false), 5000);
      }
    } catch (error) {
      console.error('Newsletter error:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-visly-dark text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-12">
          <div className="bg-gradient-to-r from-visly-navy to-visly-blue rounded-2xl p-6 lg:p-8">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Subscribe to our newsletter
                </h3>
                <p className="text-white/80 text-sm">
                  Insights on technology, strategy, and sustainable growth.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                {/* Honeypot field for spam protection */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px' }}
                  aria-hidden="true"
                />
                <input
                  type="email"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-visly-cyan"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-visly-cyan text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-visly-teal transition-colors disabled:opacity-50 inline-flex items-center justify-center"
                >
                  {isSubscribing ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>
              </form>
              {subscribed && (
                <p className="lg:col-span-2 text-visly-cyan text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  You&apos;re subscribed. Thank you!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-gradient-to-br from-visly-navy to-visly-blue rounded-lg flex items-center justify-center">
                <AppWindow className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">VislyBluq</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Expert technology consultation and hands-on product development for startups, businesses, and enterprises.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-visly-blue transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/about', label: 'About' },
                { to: '/services', label: 'Services' },
                { to: '/case-studies', label: 'Case Studies' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-visly-cyan">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services?service=${s.id}`}
                    className="text-sm text-gray-400 hover:text-visly-cyan"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 mb-6">
              {[
                { to: '/faq', label: "FAQ's" },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
                { to: '/careers', label: 'Careers' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-visly-cyan">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mb-1">11 Apaola Street, Ketu Ikosi, Lagos</p>
            <a
              href="mailto:info@vislybluq.com"
              className="text-sm text-white font-medium hover:text-visly-cyan"
            >
              info@vislybluq.com
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {currentYear} VislyBluq Digital Product Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
