import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, AppWindow, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const serviceItems = [
    { name: 'App Development', path: '/services#digital-product-development' },
    { name: 'Data Strategy', path: '/services#data-strategy' },
    { name: 'Machine Learning & AI', path: '/services#ml-ai' },
    { name: 'Business Intelligence', path: '/services#business-intelligence' },
    { name: 'Data Engineering', path: '/services#data-engineering' }
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-visly-navy to-visly-blue rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                <AppWindow className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-visly-cyan rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-visly-dark tracking-tight leading-none">VislyBluq</span>
              <span className="text-[0.65rem] font-bold text-visly-blue uppercase tracking-widest leading-none mt-1">Digital Product Company</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
                      className={`flex items-center space-x-1 font-semibold transition-colors ${location.pathname === '/services'
                        ? 'text-visly-blue'
                        : 'text-gray-700 hover:text-visly-blue'
                        }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Link>
                    {isServicesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden z-20">
                        <Link
                          to="/services"
                          className="block px-4 py-3 text-visly-blue hover:bg-visly-gray transition-colors font-bold border-l-4 border-visly-blue"
                        >
                          View All Services
                        </Link>
                        <div className="h-px bg-gray-100 mx-4 my-1"></div>
                        {serviceItems.map((service) => (
                          <Link
                            key={service.name}
                            to={service.path}
                            className="block px-4 py-3 text-gray-700 hover:bg-visly-gray hover:text-visly-blue transition-colors font-medium border-l-4 border-transparent hover:border-visly-blue"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`font-semibold transition-colors ${location.pathname === item.path
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

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/contact"
              className="bg-visly-navy text-white px-8 py-3 rounded-full font-bold hover:bg-visly-blue transition-colors transform hover:scale-105 duration-200 shadow-lg hover:shadow-visly-blue/30"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-visly-navy" /> : <Menu className="h-6 w-6 text-visly-navy" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white h-screen">
            <div className="space-y-2 px-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${location.pathname === item.path
                      ? 'text-visly-blue bg-visly-gray'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-6 space-y-1 mt-1">
                      {serviceItems.map((service) => (
                        <Link
                          key={service.name}
                          to={service.path}
                          className="block px-4 py-2 text-sm text-gray-500 hover:text-visly-blue transition-colors font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  to="/contact"
                  className="block bg-visly-navy text-white px-4 py-3 rounded-full font-bold hover:bg-visly-blue transition-colors text-center shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;