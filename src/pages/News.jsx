import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api, { getImageUrl } from '../services/api';
import { ArrowRight, Calendar, User } from 'lucide-react';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/news');
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="page-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1>Kabar Desa Watesari</h1>
          <p>Informasi terkini seputar kegiatan, program, dan perkembangan Desa Watesari.</p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 md:py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-10 h-10 border-3 border-primary-orange border-t-transparent rounded-full animate-spin" />
              <p className="text-medium-text text-sm">Memuat berita...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border-color">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={28} className="text-medium-text" />
              </div>
              <h3 className="text-lg font-semibold text-dark-text mb-2">Belum Ada Berita</h3>
              <p className="text-medium-text text-sm">Berita dan pengumuman desa akan ditampilkan di sini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {news.map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index % 3}
                  className="h-full"
                >
                  <Link 
                    to={`/berita/${item._id}`}
                    className="card group flex flex-col h-full cursor-pointer hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] transition-all duration-300"
                  >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.kategori && (
                      <span className="absolute top-3 left-3 badge-orange text-[11px]">
                        {item.kategori}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center space-x-4 text-xs text-medium-text mb-3">
                      <span className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{new Date(item.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <User size={12} />
                        <span>{item.author}</span>
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-dark-text mb-2 line-clamp-2 group-hover:text-primary-orange transition-colors duration-200">
                      {item.title}
                    </h2>
                    <p className="text-sm text-medium-text mb-4 line-clamp-3 flex-grow">{item.content}</p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center text-sm text-primary-orange font-semibold group-hover:text-orange-hover transition-colors duration-200">
                        Baca Selengkapnya
                        <ArrowRight size={14} className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
