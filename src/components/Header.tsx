import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, AppWindow, ChevronDown } from 'lucide-react';
import Button from './ui/Button';
import { services } from '../data/services';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-visly-navy to-visly-blue rounded-lg flex items-center justify-center shadow-sm">
              <AppWindow className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-visly-dark tracking-tight leading-none">
                VislyBluq
              </span>
              <span className="text-[0.6rem] font-medium text-visly-blue uppercase tracking-widest leading-none mt-0.5">
                Build & Consult
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-7">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      to="/services"
                      className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                        location.pathname === '/services'
                          ? 'text-visly-blue'
                          : 'text-gray-700 hover:text-visly-blue'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Link>
                    {isServicesOpen && (
                      <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                        <Link
                          to="/services"
                          className="block px-4 py-2.5 text-visly-blue hover:bg-visly-gray text-sm font-semibold border-l-4 border-visly-blue"
                        >
                          View All Services
                        </Link>
                        <div className="h-px bg-gray-100 mx-3 my-1" />
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            to={`/services?service=${service.id}#${service.id}`}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-visly-gray hover:text-visly-blue border-l-4 border-transparent hover:border-visly-blue"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-visly-blue'
                        : 'text-gray-700 hover:text-visly-blue'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button to="/contact" size="sm">
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-visly-navy" />
            ) : (
              <Menu className="h-6 w-6 text-visly-navy" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                      location.pathname === item.path
                        ? 'text-visly-blue bg-visly-gray'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-4 space-y-0.5 mb-2">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services?service=${service.id}`}
                          className="block px-4 py-2 text-xs text-gray-500 hover:text-visly-blue"
                        >
                          {service.shortTitle}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 px-4">
                <Button to="/contact" size="sm" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
