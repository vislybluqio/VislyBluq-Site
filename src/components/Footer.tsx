import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_HREF, SOCIAL_LINKS } from '../config/contact';
import { servicePillars } from '../data/enterpriseServices';
import NewsletterSignup from './site/NewsletterSignup';

const columns = [
  {
    title: 'Services',
    links: servicePillars.slice(0, 4).map((service) => ({ to: `/services/${service.id}`, label: service.title })),
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/team', label: 'Team' },
      { to: '/careers', label: 'Careers' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
];

const socials = [
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
  { label: 'X', href: SOCIAL_LINKS.x },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram },
];

const linkClass = 'text-sm text-ink-muted transition-colors hover:text-ink-text';

const Footer = () => (
  <footer className="border-t border-ink-line bg-ink text-ink-text">
    <div className="px-5 pb-10 pt-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-page">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <div>
            <Link to="/" aria-label="VislyBluq, home">
              <BrandLogo />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-ink-muted">
              Technology consulting and product engineering. 11 Apaola Street, Ketu Ikosi, Lagos.
            </p>
            <div className="mt-6 space-y-1.5">
              <a href={`mailto:${CONTACT_EMAIL}`} className={`block ${linkClass}`}>{CONTACT_EMAIL}</a>
              <a href={PHONE_HREF} className={`block ${linkClass}`}>{PHONE_DISPLAY}</a>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-label text-ink-muted">{column.title}</p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-label text-ink-muted">Newsletter</p>
            <p className="mb-5 text-sm leading-6 text-ink-muted">Occasional notes on product, data and AI from our team.</p>
            <NewsletterSignup dark />
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ink-line pt-8 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} VislyBluq</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="hover:text-ink-text">{social.label}</a>
            ))}
            <Link to="/privacy" className="hover:text-ink-text">Privacy</Link>
            <Link to="/terms" className="hover:text-ink-text">Terms</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
