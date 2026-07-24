import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Desa', path: '/tentang' },
    { name: 'Berita', path: '/berita' },
    { name: 'Produk UMKM', path: '/produk' },
    { name: 'Kontak', path: '/kontak' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-navbar' : 'shadow-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-[76px]">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center space-x-2">
              <img src="/logo-kkn.png" alt="Logo KKN" className="w-15 h-20 object-contain rounded-md" />
            </div>
            <div>
              <span className="text-xl font-bold text-primary-green leading-tight block">
                Desa Watesari
              </span>
              <span className="text-[11px] text-medium-text font-medium leading-tight hidden sm:block">
                Kec. Balongbendo, Sidoarjo
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-[15px] font-medium rounded-lg transition-all duration-200 ${isActive(link.path)
                  ? 'text-primary-orange'
                  : 'text-dark-text hover:text-primary-orange hover:bg-orange-light/50'
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-primary-orange rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Login Button */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-primary-orange text-white text-sm font-semibold rounded-[11px] hover:bg-orange-hover transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <LogIn size={16} strokeWidth={2.5} />
              <span>Login Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-dark-text hover:bg-light-gray transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-white border-t border-border-color px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200 ${isActive(link.path)
                ? 'text-primary-orange bg-orange-light'
                : 'text-dark-text hover:bg-light-gray'
                }`}
            >
              {isActive(link.path) && (
                <span className="w-1 h-5 bg-primary-orange rounded-full mr-3" />
              )}
              {link.name}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-primary-orange text-white font-semibold rounded-[11px] hover:bg-orange-hover transition-all duration-200"
            >
              <LogIn size={16} strokeWidth={2.5} />
              <span>Login Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
