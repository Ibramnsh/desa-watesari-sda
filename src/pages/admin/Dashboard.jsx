import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Newspaper, Package, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({ news: 0, products: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [newsRes, productsRes, contactsRes] = await Promise.all([
          api.get('/news'),
          api.get('/products'),
          api.get('/contact')
        ]);
        
        setStats({
          news: newsRes.data.length,
          products: productsRes.data.length,
          contacts: contactsRes.data.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="w-10 h-10 border-3 border-primary-orange border-t-transparent rounded-full animate-spin" />
        <p className="text-medium-text text-sm font-medium">Memuat dashboard...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Berita',
      value: stats.news,
      icon: <Newspaper size={32} />,
      color: 'bg-green-100',
      textColor: 'text-primary-green',
      link: '/admin/berita'
    },
    {
      title: 'Total Produk UMKM',
      value: stats.products,
      icon: <Package size={32} />,
      color: 'bg-orange-100',
      textColor: 'text-primary-orange',
      link: '/admin/produk'
    },
    {
      title: 'Pesan Masuk',
      value: stats.contacts,
      icon: <MessageSquare size={32} />,
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
      link: '#'
    }
  ];

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-text mb-1">Dashboard</h1>
        <p className="text-medium-text text-sm">Ringkasan statistik website Desa Watesari.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, i) => (
          <div key={i} className="card p-6 flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-medium-text text-xs font-semibold uppercase tracking-wider mb-1">{card.title}</p>
                <h3 className="text-4xl font-bold text-dark-text">{card.value}</h3>
              </div>
              <div className={`p-4 rounded-2xl ${card.color} ${card.textColor} transition-transform duration-300 group-hover:scale-110`}>
                {card.icon}
              </div>
            </div>
            {card.link !== '#' && (
              <Link 
                to={card.link}
                className={`inline-flex items-center text-sm font-semibold ${card.textColor} hover:underline`}
              >
                Kelola sekarang
                <ArrowRight size={16} className="ml-1.5" />
              </Link>
            )}
          </div>
        ))}
      </div>
      
      {/* Welcome Card */}
      <div className="card p-8 bg-gradient-to-br from-primary-green to-[#1e4a0d] border-none text-white relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-primary-orange/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-4">
            Sistem Informasi Desa
          </div>
          <h2 className="text-2xl font-bold mb-3">Selamat Datang di Panel Admin</h2>
          <p className="text-green-100 leading-relaxed max-w-2xl mb-6">
            Gunakan menu di sebelah kiri untuk mengelola konten website profil Desa Watesari. 
            Anda dapat menambah, mengedit, dan menghapus Berita, Kategori, maupun Produk UMKM untuk mendukung transparansi dan promosi potensi desa.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/berita" className="px-5 py-2.5 bg-white text-primary-green font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm">
              Tulis Berita Baru
            </Link>
            <Link to="/admin/produk" className="px-5 py-2.5 bg-primary-orange text-white font-semibold rounded-lg hover:bg-orange-hover transition-colors text-sm">
              Tambah Produk UMKM
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
