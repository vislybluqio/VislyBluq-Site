import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppWindow, Linkedin, Twitter, Github, ArrowRight, CheckCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;

    setIsSubscribing(true);
    try {
      // Using FormSubmit.co for direct newsletter alerts
      const response = await fetch("https://formsubmit.co/ajax/vislybluq5@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: newsEmail,
          _subject: "New VislyBluq Newsletter Subscription",
          message: `Activate newsletter for: ${newsEmail}`,
        }),
      });

      if (response.ok) {
        setSubscribed(true);
        setNewsEmail('');
        setTimeout(() => setSubscribed(false), 5000);
      }
    } catch (error) {
      console.error("Newsletter error:", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-visly-dark text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-visly-navy rounded-full opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-visly-teal rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-visly-blue rounded-full opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Newsletter Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-visly-navy to-visly-blue rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                  SUBSCRIBE TO OUR
                  <span className="block text-visly-cyan">NEWSLETTER.</span>
                </h3>
                <p className="text-white/80 font-medium">
                  Get the latest insights on technology, strategy, and sustainable growth.
                </p>
              </div>
              <div>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-visly-cyan"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="bg-visly-cyan text-white px-8 py-4 rounded-full font-bold hover:bg-visly-teal transition-colors inline-flex items-center justify-center transform hover:scale-105 duration-200 disabled:opacity-50"
                  >
                    {isSubscribing ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <ArrowRight className="h-5 w-5" />
                    )}
                  </button>
                </form>
                {subscribed && (
                  <p className="mt-3 text-visly-cyan font-bold flex items-center animate-fade-in">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Perfect! You're now subscribed.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-visly-navy to-visly-blue rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 shadow-lg border border-white/10">
                  <AppWindow className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-visly-cyan rounded-full border-2 border-visly-dark"></div>
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">VislyBluq</span>
                <div className="text-xs font-medium text-visly-blue uppercase tracking-wider">Digital Product Company</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Empowering businesses to grow through thoughtful, scalable, and well-engineered digital solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-visly-blue transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-visly-blue transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-visly-blue transition-all duration-300">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-visly-cyan transition-colors font-medium">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-visly-cyan transition-colors font-medium">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-gray-400 hover:text-visly-cyan transition-colors font-medium">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-visly-cyan transition-colors font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-black text-white mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-visly-cyan transition-colors font-medium">
                  FAQ's
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-visly-cyan transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-visly-cyan transition-colors font-medium">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-black text-white mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="text-gray-400 font-medium">
                <p>11 apaola street, ketu ikosi,</p>
                <p>lagos, nigeria</p>
              </div>
              <a
                href="mailto:vislybluq5@gmail.com"
                className="block text-white font-bold text-lg hover:text-visly-cyan transition-colors"
                title="Send us an email"
              >
                vislybluq5@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <span className="text-gray-400 text-sm font-medium hover:text-white cursor-pointer">Partners</span>
            <Link to="/careers" className="text-gray-400 text-sm font-medium hover:text-white cursor-pointer">Careers</Link>
          </div>

          <div className="text-center lg:text-right">
            <p className="text-gray-400 text-sm font-medium">
              © {currentYear} VislyBluq Digital Product Company.
              <span className="text-gray-500"> All Rights Reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;