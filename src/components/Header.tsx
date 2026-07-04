import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppWindow, ChevronDown, Menu, Search, X } from 'lucide-react';
import { servicePillars } from '../data/enterpriseServices';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services', hasDropdown: true },
  { name: 'Insights', path: '/insights' },
  { name: 'Projects', path: '/projects' },
  { name: 'Team', path: '/team' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/faq' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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
    setIsServicesOpen(false);
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
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-visly-cyan/20 bg-visly-surface/70 text-visly-cyan shadow-[0_0_24px_rgba(32,198,247,0.16)]">
            <AppWindow className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-white">VislyBluq</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-visly-cyan/75">
              Enterprise Tech
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:gap-7 md:flex">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setIsServicesOpen(true)}
              onMouseLeave={() => item.hasDropdown && setIsServicesOpen(false)}
            >
              <Link
                to={item.path}
                className={`inline-flex items-center gap-1 text-sm font-medium transition ${
                  location.pathname === item.path
                    ? 'text-visly-cyan'
                    : 'text-white/68 hover:text-white'
                }`}
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>

              {item.hasDropdown && isServicesOpen && (
                <div className="absolute left-0 top-full w-80 pt-5">
                  <div className="rounded-2xl border border-white/10 bg-[#101f3f]/95 p-3 shadow-2xl backdrop-blur-2xl">
                    <Link
                      to="/services"
                      className="block rounded-xl bg-white/5 px-4 py-3 text-sm font-bold text-white hover:bg-white/10"
                    >
                      View all capabilities
                    </Link>
                    <div className="my-2 h-px bg-white/10" />
                    {servicePillars.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.id}`}
                        className="block rounded-xl px-4 py-3 text-sm text-white/65 hover:bg-white/5 hover:text-visly-cyan"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
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
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-visly-navy/98 px-6 py-5 backdrop-blur-2xl md:hidden">
          <div className="space-y-2">
            {navItems.map((item) => (
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



