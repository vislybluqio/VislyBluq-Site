import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const navItems = [
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Team', path: '/team' },
  { name: 'Careers', path: '/careers' },
  { name: 'FAQ', path: '/faq' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-current after:transition-transform after:duration-300 ${
      isActive ? 'text-ink-text after:scale-x-100' : 'text-ink-muted after:scale-x-0 hover:text-ink-text hover:after:scale-x-100'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled || isMenuOpen ? 'border-b border-ink-line bg-ink/90 backdrop-blur-md' : 'border-b border-transparent bg-ink'
      }`}
    >
      {/* Same padding and width as page sections, so the logo lines up with the content below. */}
      <div className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex h-16 max-w-page items-center justify-between lg:h-20">
          <Link to="/" aria-label="VislyBluq, home">
            <BrandLogo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkClass}>
                {item.name}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="hidden h-10 items-center rounded-full bg-white px-5 text-sm font-medium text-body transition-colors hover:bg-brand hover:text-white lg:inline-flex"
          >
            Contact us
          </Link>

          <button
            type="button"
            className="-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className={`h-px w-5 bg-ink-text transition-transform duration-200 ${isMenuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-ink-text transition-transform duration-200 ${isMenuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav aria-label="Mobile" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink-line bg-ink px-5 pb-10 pt-6 sm:px-8 lg:hidden">
          <ul className="divide-y divide-ink-line">
            {[...navItems, { name: 'Contact', path: '/contact' }].map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `block py-5 text-3xl font-normal tracking-display ${isActive ? 'text-ink-text' : 'text-ink-muted'}`}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
