import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';
import { services } from '../data/services';
import BrandLogo from './BrandLogo';
import { SOCIAL_LINKS } from '../config/contact';
import NewsletterSignup from './site/NewsletterSignup';

// lucide's Twitter icon is the old bird, so X gets its own mark.
const XIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socials = [
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, Icon: Linkedin },
  { label: 'X', href: SOCIAL_LINKS.x, Icon: XIcon },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: Instagram },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#071423] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="mb-16 rounded-3xl border border-visly-cyan/10 bg-visly-surface/45 p-8 backdrop-blur-xl lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-visly-cyan">
                Technical signals
              </p>
              <h3 className="mt-3 text-3xl font-bold text-white">Get our build notes.</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                Strategy, AI, architecture, and product engineering insights from the VislyBluq team.
              </p>
            </div>
            <NewsletterSignup />
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center" aria-label="VislyBluq home">
              <BrandLogo imageClassName="h-12 w-12" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
              Technology consulting and product engineering.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/55 hover:border-visly-cyan/40 hover:text-visly-cyan"
                  aria-label={`VislyBluq on ${label}`}
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
                <a href="tel:+2348142695808" className="hover:text-visly-cyan">
                  +234 814 269 5808
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



