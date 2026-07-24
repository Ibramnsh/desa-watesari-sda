import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api, { getImageUrl } from '../services/api';
import { Newspaper, ShoppingBag, Users, ArrowRight, MapPin } from 'lucide-react';

const Home = () => {
  const [stats, setStats] = useState({ berita: 0, produk: 0 });
  const [latestNews, setLatestNews] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, newsRes, productsRes] = await Promise.all([
          api.get('/stats'),
          api.get('/news'),
          api.get('/products'),
        ]);
        setStats(statsRes.data);
        setLatestNews(newsRes.data.slice(0, 3));
        const active = productsRes.data.filter(p => p.isActive !== false);
        setFeaturedProducts(active.slice(0, 4));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
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
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[560px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1596700750796-015dc3dfa536?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            filter: 'brightness(0.35)',
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <MapPin size={16} className="text-primary-orange" />
            <span className="text-sm font-medium">Kecamatan Balongbendo, Sidoarjo, Jawa Timur</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Selamat Datang di{' '}
            <span className="text-primary-orange">Desa Watesari</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Membangun kemandirian melalui potensi lokal dan inovasi UMKM untuk kesejahteraan bersama.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/tentang"
              className="btn-secondary text-base px-8 py-3.5 shadow-lg"
            >
              Tentang Desa
            </Link>
            <Link
              to="/produk"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary-green font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg text-base"
            >
              Jelajahi Produk UMKM
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Newspaper size={28} />,
                value: stats.berita > 0 ? `${stats.berita}+` : '0',
                label: 'Berita & Pengumuman',
                color: 'green',
              },
              {
                icon: <ShoppingBag size={28} />,
                value: stats.produk > 0 ? `${stats.produk}+` : '0',
                label: 'Produk UMKM Lokal',
                color: 'orange',
              },
              {
                icon: <Users size={28} />,
                value: '100%',
                label: 'Dukungan Desa',
                color: 'green',
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="card p-8 text-center group hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    stat.color === 'green'
                      ? 'bg-green-light text-primary-green'
                      : 'bg-orange-light text-primary-orange'
                  }`}
                >
                  {stat.icon}
                </div>
                <h3
                  className={`text-4xl font-bold mb-2 ${
                    stat.color === 'green' ? 'text-primary-green' : 'text-primary-orange'
                  }`}
                >
                  {stat.value}
                </h3>
                <p className="text-medium-text font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="badge-green mb-4 inline-block">Tentang Desa</span>
              <h2 className="section-title mb-4">Mengenal Desa Watesari Lebih Dekat</h2>
              <div className="section-divider mb-6" />
              <p className="text-medium-text leading-relaxed mb-6">
                Desa Watesari terletak di Kecamatan Balongbendo, Kabupaten Sidoarjo. Desa ini dikenal dengan lingkungan yang asri dan masyarakat yang guyub rukun. Seiring berjalannya waktu, Watesari terus berkembang menjadi desa yang mandiri secara ekonomi melalui pemberdayaan UMKM lokal dan inovasi masyarakat.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/tentang" className="btn-secondary text-sm">
                  Selengkapnya
                  <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link to="/kontak" className="btn-outline text-sm">
                  Hubungi Kami
                </Link>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-primary-green text-white p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-2">Visi</h4>
                <p className="text-green-200 text-sm leading-relaxed">
                  Terwujudnya Desa Watesari yang Mandiri, Sejahtera, Asri, dan Berdaya Saing.
                </p>
              </div>
              <div className="bg-primary-orange text-white p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-2">Misi</h4>
                <p className="text-orange-100 text-sm leading-relaxed">
                  Pemberdayaan UMKM dan peningkatan kualitas SDM untuk kesejahteraan bersama.
                </p>
              </div>
              <div className="col-span-2 bg-white border border-border-color p-6 rounded-xl">
                <h4 className="font-bold text-dark-text mb-2">Potensi Desa</h4>
                <p className="text-medium-text text-sm leading-relaxed">
                  Desa Watesari memiliki potensi UMKM yang beragam serta masyarakat yang kreatif dan inovatif dalam mengembangkan produk lokal.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10"
            >
              <div>
                <span className="badge-orange mb-3 inline-block">Terbaru</span>
                <h2 className="section-title">Kabar Desa Watesari</h2>
                <div className="section-divider mt-3" />
              </div>
              <Link
                to="/berita"
                className="mt-4 sm:mt-0 inline-flex items-center text-primary-orange font-semibold text-sm hover:text-orange-hover transition-colors duration-200"
              >
                Lihat Semua Berita
                <ArrowRight size={16} className="ml-1.5" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {latestNews.map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className="h-full"
                >
                  <Link
                    to={`/berita/${item._id}`}
                    className="card group flex flex-col h-full cursor-pointer hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] transition-all duration-300"
                  >
                  <div className="relative h-48 overflow-hidden">
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
                    <p className="text-xs text-medium-text mb-2">
                      {new Date(item.createdAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <h3 className="text-lg font-semibold text-dark-text mb-2 line-clamp-2 group-hover:text-primary-orange transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-sm text-medium-text mb-4 line-clamp-2 flex-grow">
                      {item.content}
                    </p>
                    <span className="inline-flex items-center text-sm text-primary-orange font-semibold group-hover:text-orange-hover transition-colors duration-200">
                      Baca Selengkapnya
                      <ArrowRight size={14} className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-20 bg-light-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10"
            >
              <div>
                <span className="badge-green mb-3 inline-block">Produk Unggulan</span>
                <h2 className="section-title">Produk UMKM Desa</h2>
                <div className="section-divider mt-3" />
              </div>
              <Link
                to="/produk"
                className="mt-4 sm:mt-0 inline-flex items-center text-primary-green font-semibold text-sm hover:text-green-hover transition-colors duration-200"
              >
                Lihat Semua Produk
                <ArrowRight size={16} className="ml-1.5" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((item, index) => {
                const imageSrc = item.images && item.images.length > 0 ? item.images[0] : item.image;
                const waText = encodeURIComponent(`Halo, saya tertarik dengan produk ${item.name} yang ada di website desa.`);
                return (
                  <motion.div
                    key={item._id}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={index}
                    className="card group flex flex-col"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={getImageUrl(imageSrc)}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 badge-orange text-[11px]">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-semibold text-dark-text mb-1 line-clamp-1">{item.name}</h3>
                      {item.price > 0 && (
                        <p className="text-primary-green font-bold mb-3">
                          Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      )}
                      <div className="mt-auto">
                        <a
                          href={`https://wa.me/${item.whatsapp}?text=${waText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 text-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                          </svg>
                          <span>Hubungi via WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-24 bg-primary-green text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Ingin tahu lebih lanjut tentang Desa Watesari?
            </h2>
            <p className="text-lg mb-10 text-green-200 leading-relaxed">
              Kami terbuka untuk berbagai pertanyaan, kritik, saran, maupun kolaborasi demi kemajuan bersama.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontak" className="btn-primary text-base px-8 py-3.5 shadow-lg">
                Hubungi Kami
              </Link>
              <Link
                to="/berita"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-green transition-all duration-200 text-base"
              >
                Baca Berita Desa
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
