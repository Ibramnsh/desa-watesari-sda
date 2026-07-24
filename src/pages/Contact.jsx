import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });
    try {
      await api.post('/contact', formData);
      setStatus({ loading: false, error: null, success: true });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(s => ({ ...s, success: false })), 5000);
    } catch (error) {
      setStatus({ loading: false, error: error.response?.data?.message || 'Terjadi kesalahan saat mengirim pesan', success: false });
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Page Header */}
      <section className="page-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1>Hubungi Kami</h1>
          <p>Kami siap mendengarkan aspirasi, pertanyaan, dan masukan dari Anda.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
            
            {/* Contact Info (Left) */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-dark-text mb-2">Informasi Kontak</h2>
                <div className="w-12 h-1 bg-primary-green rounded-full mb-6"></div>
                <p className="text-medium-text leading-relaxed">
                  Silakan hubungi kami melalui formulir di samping atau melalui saluran kontak resmi Desa Watesari berikut ini.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-primary-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text">Alamat Kantor Desa</h3>
                    <p className="text-medium-text text-sm mt-1">Jl. Balai Desa Watesari No. 1, Kec. Balongbendo, Sidoarjo, Jawa Timur 61263</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-primary-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text">Telepon</h3>
                    <p className="text-medium-text text-sm mt-1">(031) 1234567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-primary-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text">Email</h3>
                    <p className="text-medium-text text-sm mt-1">info@watesari.desa.id</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-primary-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text">Jam Operasional</h3>
                    <p className="text-medium-text text-sm mt-1">Senin - Jumat: 08.00 - 15.00 WIB</p>
                    <p className="text-medium-text text-sm">Sabtu: 08.00 - 12.00 WIB</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form (Right) */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="lg:col-span-3"
            >
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-elevated border border-border-color">
                <h3 className="text-2xl font-bold text-dark-text mb-6">Kirim Pesan</h3>
                
                {status.success && (
                  <div className="flex items-start space-x-3 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6">
                    <CheckCircle size={20} className="mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium">Pesan Anda berhasil dikirim. Terima kasih telah menghubungi kami!</p>
                  </div>
                )}
                
                {status.error && (
                  <div className="flex items-start space-x-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
                    <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium">{status.error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label" htmlFor="name">Nama Lengkap</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Masukkan nama Anda"
                        required
                        className="form-input" 
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="email">Alamat Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="contoh@email.com"
                        required
                        className="form-input" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="message">Pesan</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5"
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Tuliskan pesan, saran, atau pertanyaan Anda di sini..."
                      required
                      className="form-input resize-none" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status.loading}
                    className="btn-primary w-full group"
                  >
                    {status.loading ? (
                      <span className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Mengirim...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send size={18} className="mr-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        Kirim Pesan
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Full Width Bottom */}
      <section className="h-[400px] w-full">
        <iframe 
          title="Peta Desa Watesari"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15830.400511526365!2d112.51139414596323!3d-7.42594612450849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e780dc9e7826315%3A0xc304ec2cefc13e28!2sWatesari%2C%20Balongbendo%2C%20Sidoarjo%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
};

export default Contact;
