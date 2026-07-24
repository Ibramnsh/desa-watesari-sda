import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Desa', path: '/tentang' },
    { name: 'Berita', path: '/berita' },
    { name: 'Produk UMKM', path: '/produk' },
    { name: 'Hubungi Kami', path: '/kontak' },
  ];

  return (
    <footer className="bg-primary-green text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7V10H22V7L12 2Z" fill="white" opacity="0.9"/>
                  <path d="M4 10V20H8V14H10V20H14V14H16V20H20V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 20H22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold">Desa Watesari</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Mewujudkan desa yang mandiri, asri, dan mendukung penuh potensi UMKM lokal demi kesejahteraan bersama.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-white/15">
              Tautan Cepat
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center text-sm text-green-200 hover:text-white transition-colors duration-200 group"
                  >
                    <ChevronRight size={14} className="mr-1.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-white/15">
              Kontak Kami
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start space-x-3 text-sm text-green-200">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-primary-orange" />
                <span>Kec. Balongbendo, Sidoarjo, Jawa Timur</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-green-200">
                <Phone size={16} className="flex-shrink-0 text-primary-orange" />
                <span>(031) 123456</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-green-200">
                <Mail size={16} className="flex-shrink-0 text-primary-orange" />
                <span>info@watesari.desa.id</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-white/15">
              Jam Layanan
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start space-x-3 text-sm text-green-200">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-primary-orange" />
                <div>
                  <p className="font-medium text-white">Senin - Jumat</p>
                  <p>08.00 - 15.00 WIB</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-green-200">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-primary-orange" />
                <div>
                  <p className="font-medium text-white">Sabtu</p>
                  <p>08.00 - 12.00 WIB</p>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-green-200 hover:text-white border border-white/20 hover:border-white/40 rounded-lg px-4 py-2 transition-all duration-200"
              >
                Login Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between text-sm text-green-200/70">
          <p>&copy; {new Date().getFullYear()} Desa Watesari. Seluruh hak cipta dilindungi.</p>
          <p className="mt-2 sm:mt-0">Kecamatan Balongbendo, Kabupaten Sidoarjo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
