import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { User, Lock, LogIn, ArrowLeft, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('adminToken', response.data.token);
      toast.success('Login berhasil');
      navigate('/admin');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Gagal login. Silakan coba lagi.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full"
      >
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-elevated border border-border-color">
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-green rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V10H22V7L12 2Z" fill="white" opacity="0.9"/>
                <path d="M4 10V20H8V14H10V20H14V14H16V20H20V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 20H22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark-text mb-1">Admin Panel</h2>
            <p className="text-medium-text text-sm">Masuk untuk mengelola profil Desa Watesari</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6"
            >
              <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={20} className="text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-input pl-11"
                  placeholder="Masukkan username"
                />
              </div>
            </div>
            
            <div>
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input pl-11"
                  placeholder="Masukkan password"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Memeriksa...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn size={18} className="mr-2" />
                  Masuk ke Dashboard
                </span>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-medium text-medium-text hover:text-primary-green transition-colors duration-200"
          >
            <ArrowLeft size={16} className="mr-2" />
            Kembali ke Halaman Utama
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
