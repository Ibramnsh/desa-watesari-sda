import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { getImageUrl } from '../services/api';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await api.get(`/news/${id}`);
        setNews(response.data);

        // Fetch related products if news has category
        if (response.data.kategori) {
          const prodRes = await api.get(`/products?category=${encodeURIComponent(response.data.kategori)}&isActive=true`);
          setRelatedProducts(prodRes.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching news detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-light-gray space-y-4">
        <div className="w-10 h-10 border-3 border-primary-orange border-t-transparent rounded-full animate-spin" />
        <p className="text-medium-text text-sm">Memuat artikel...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-text mb-3">Berita tidak ditemukan</h2>
          <p className="text-medium-text mb-6">Artikel yang Anda cari tidak tersedia.</p>
          <Link to="/berita" className="btn-secondary text-sm">
            <ArrowLeft size={16} className="mr-2" />
            Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Page Header */}
      <section className="page-header py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/berita"
            className="inline-flex items-center text-green-200 hover:text-white text-sm font-medium transition-colors duration-200 mb-4 relative z-10"
          >
            <ArrowLeft size={16} className="mr-1.5" />
            Kembali ke Daftar Berita
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl leading-tight">{news.title}</h1>
        </div>
      </section>

      {/* Article */}
      <section className="py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="card overflow-hidden">
            <img
              src={getImageUrl(news.image)}
              alt={news.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="p-6 md:p-10">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border-color">
                {news.kategori && (
                  <span className="badge-orange">{news.kategori}</span>
                )}
                <span className="flex items-center space-x-1.5 text-sm text-medium-text">
                  <Calendar size={14} />
                  <span>
                    {new Date(news.createdAt).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </span>
                <span className="flex items-center space-x-1.5 text-sm text-medium-text">
                  <User size={14} />
                  <span>Oleh <span className="font-semibold text-primary-green">{news.author}</span></span>
                </span>
              </div>

              {/* Content */}
              <div className="text-dark-text leading-relaxed whitespace-pre-line text-base md:text-lg">
                {news.content}
              </div>
            </div>
          </article>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-14">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
                <div>
                  <span className="badge-green mb-2 inline-block">Produk Terkait</span>
                  <h2 className="section-title text-2xl">Dukung UMKM Desa</h2>
                  <p className="text-medium-text text-sm mt-1">Produk lokal dari kategori yang sama dengan berita ini.</p>
                </div>
                <Link
                  to="/produk"
                  className="hidden sm:inline-flex items-center text-primary-green font-semibold text-sm hover:text-green-hover transition-colors duration-200 mt-3 sm:mt-0"
                >
                  Lihat Semua Produk
                  <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedProducts.map((item, index) => {
                  const imageSrc = item.images && item.images.length > 0 ? item.images[0] : item.image;
                  const waText = encodeURIComponent(`Halo, saya tertarik dengan produk ${item.name} yang saya lihat di artikel desa.`);
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="card group flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={getImageUrl(imageSrc)}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-dark-text text-sm mb-1 line-clamp-1">{item.name}</h3>
                        {item.price > 0 && (
                          <p className="text-primary-green font-bold text-sm mb-3">
                            Rp {item.price.toLocaleString('id-ID')}
                          </p>
                        )}
                        <div className="mt-auto">
                          <a
                            href={`https://wa.me/${item.whatsapp}?text=${waText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors duration-200 text-xs"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                            </svg>
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 text-center sm:hidden">
                <Link to="/produk" className="btn-outline text-sm">
                  Lihat Semua Produk
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;
