import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LayoutDashboard, Newspaper, Package, LogOut, Menu, X, Tags } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('adminToken');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const confirmLogout = () => {
    setLogoutModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const executeLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('adminToken');
      toast.success('Logout berhasil');
      setIsLoggingOut(false);
      setLogoutModalOpen(false);
      navigate('/login');
    }, 500); // slight delay for smooth animation
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Kelola Berita', path: '/admin/berita', icon: <Newspaper size={20} /> },
    { name: 'Kelola Kategori', path: '/admin/kategori', icon: <Tags size={20} /> },
    { name: 'Kelola Produk', path: '/admin/produk', icon: <Package size={20} /> }
  ];

  return (
    <div className="flex h-screen bg-light-gray overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-border-color shadow-sm z-20">
        <div className="p-6 border-b border-border-color flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V10H22V7L12 2Z" fill="white" opacity="0.9"/>
              <path d="M4 10V20H8V14H10V20H14V14H16V20H20V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 20H22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-dark-text leading-tight">Admin Panel</h2>
            <p className="text-xs text-medium-text font-medium">Desa Watesari</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-2">Menu Utama</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-orange text-white shadow-sm' 
                    : 'text-dark-text hover:bg-orange-light hover:text-primary-orange'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border-color bg-gray-50/50">
          <button
            onClick={confirmLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-xl hover:bg-red-50 text-dark-text hover:text-red-600 font-medium transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-border-color px-4 py-3 flex items-center justify-between z-20 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V10H22V7L12 2Z" fill="white" opacity="0.9"/>
                <path d="M4 10V20H8V14H10V20H14V14H16V20H20V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 20H22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-lg font-bold text-dark-text">Admin Panel</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-dark-text hover:bg-light-gray transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-10 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Mobile Sidebar */}
        <div className={`md:hidden fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-20 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 border-b border-border-color flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-dark-text">Admin Watesari</h2>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-light-gray rounded-lg">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive ? 'bg-primary-orange text-white' : 'text-dark-text hover:bg-orange-light hover:text-primary-orange'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="p-4 border-t border-border-color">
            <button
              onClick={confirmLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-xl hover:bg-red-50 text-red-600 font-medium transition-colors"
            >
              <LogOut size={20} />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <ConfirmationModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={executeLogout}
        isLoading={isLoggingOut}
        title="Konfirmasi Keluar"
        message="Apakah Anda yakin ingin keluar dari Admin Panel?"
        confirmText="Keluar"
      />
    </div>
  );
};

export default AdminLayout;
