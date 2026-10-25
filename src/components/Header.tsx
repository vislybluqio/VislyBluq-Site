import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { servicePillars } from '../data/enterpriseServices';
import { industries } from '../data/industries';
import BrandLogo from './BrandLogo';

type Dropdown = 'services' | 'industries';

const navItems: Array<{ name: string; path: string; dropdown?: Dropdown }> = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services', dropdown: 'services' },
  { name: 'Industries', path: '/industries', dropdown: 'industries' },
  { name: 'Insights', path: '/insights' },
  { name: 'Projects', path: '/projects' },
  { name: 'Team', path: '/team' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/faq' },
];

const quickLinks = [
  { name: 'Case studies', path: '/case-studies' },
  { name: 'Insights', path: '/insights' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
];

const dropdownLinkClass = 'block rounded-xl px-4 py-3 text-sm text-white/65 hover:bg-white/5 hover:text-visly-cyan';

const DropdownPanel = ({ dropdown }: { dropdown: Dropdown }) => (
  <div className="absolute left-0 top-full w-80 pt-5">
    <div className="rounded-2xl border border-white/10 bg-[#101f3f]/95 p-3 shadow-2xl backdrop-blur-2xl">
      {dropdown === 'services' ? (
        <>
          <Link to="/services" className="block rounded-xl bg-white/5 px-4 py-3 text-sm font-bold text-white hover:bg-white/10">
            View all capabilities
          </Link>
          <div className="my-2 h-px bg-white/10" />
          {servicePillars.map((service) => (
            <Link key={service.id} to={`/services/${service.id}`} className={dropdownLinkClass}>
              {service.title}
            </Link>
          ))}
        </>
      ) : (
        industries.map((industry) => (
          <Link key={industry.id} to={`/industries/${industry.id}`} className={dropdownLinkClass}>
            {industry.title}
          </Link>
        ))
      )}
    </div>
  </div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Dropdown | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'border-white/10 bg-visly-navy/90 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-2xl'
          : 'border-white/5 bg-visly-navy/72 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-16">
        <Link to="/" className="group flex items-center" aria-label="VislyBluq home">
          <BrandLogo imageClassName="h-11 w-11 transition duration-300 group-hover:scale-[1.04] sm:h-12 sm:w-12" />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) => {
            const isActive = item.dropdown === 'industries' ? location.pathname.startsWith('/industries') : location.pathname === item.path;
            const linkClass = `inline-flex items-center gap-1 text-sm font-medium transition ${isActive ? 'text-visly-cyan' : 'text-white/68 hover:text-white'}`;
            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.dropdown)}
                onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
                onBlur={(e) => {
                  if (item.dropdown && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenDropdown(null);
                }}
              >
                {item.dropdown === 'industries' ? (
                  <button
                    type="button"
                    className={linkClass}
                    aria-expanded={openDropdown === 'industries'}
                    aria-haspopup="true"
                    onClick={() => setOpenDropdown((open) => (open === 'industries' ? null : 'industries'))}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <Link to={item.path} className={linkClass} onFocus={() => item.dropdown && setOpenDropdown(item.dropdown)}>
                    {item.name}
                    {item.dropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                )}

                {item.dropdown && openDropdown === item.dropdown && <DropdownPanel dropdown={item.dropdown} />}
              </div>
            );
          })}
        </nav>

        <div className="ml-auto mr-4 hidden items-center gap-4 md:flex xl:ml-0 xl:mr-0">
          <button
            type="button"
            className="rounded-full p-2 text-white/55 transition hover:bg-white/5 hover:text-visly-cyan"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/contact"
            className="rounded-full bg-visly-blue px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(46,126,247,0.26)] transition hover:-translate-y-0.5 hover:bg-[#3B8AFF]"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white xl:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {location.pathname === '/' && (
        <div className="hidden border-t border-white/5 xl:block">
          <nav aria-label="Quick links" className="mx-auto flex h-10 max-w-7xl items-center justify-end gap-8 px-16">
            {quickLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55 transition hover:text-visly-cyan">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {isMenuOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 bg-visly-navy/98 px-6 py-5 backdrop-blur-2xl xl:hidden">
          <div className="space-y-2">
            {navItems.map((item) => item.dropdown === 'industries' ? (
              <div key={item.name} className="px-4 pt-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">{item.name}</p>
                {industries.map((industry) => (
                  <Link
                    key={industry.id}
                    to={`/industries/${industry.id}`}
                    className={`block rounded-xl py-3 pl-3 text-sm font-semibold ${location.pathname === `/industries/${industry.id}` ? 'text-visly-cyan' : 'text-white/72 hover:text-white'}`}
                  >
                    {industry.title}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                  location.pathname === item.path
                    ? 'bg-white/10 text-visly-cyan'
                    : 'text-white/72 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;





