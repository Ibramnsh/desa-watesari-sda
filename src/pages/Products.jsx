import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api, { getImageUrl } from '../services/api';
import { Search, ShoppingBag } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/kategori')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsAndCategories();
  }, []);

  const activeProducts = products.filter(product => product.isActive !== false);
  
  const filteredProducts = activeProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1>Produk UMKM Desa</h1>
          <p>Mendukung kemandirian desa melalui produk-produk unggulan karya warga Watesari.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search & Filter */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border-color mb-10">
            <div className="max-w-3xl mx-auto">
              <div className="relative mb-8">
                <input 
                  type="text" 
                  placeholder="Cari nama produk atau kategori..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-light-gray border-none rounded-xl text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green/20 transition-shadow"
                />
                <Search className="absolute left-4 top-4 text-gray-400" size={24} />
              </div>

              <div className="flex flex-wrap justify-center gap-2.5">
                <button 
                  onClick={() => setSelectedCategory('Semua')}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === 'Semua' 
                      ? 'bg-primary-green text-white shadow-md' 
                      : 'bg-light-gray text-dark-text hover:bg-green-light hover:text-primary-green'
                  }`}
                >
                  Semua
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedCategory === cat.name 
                        ? 'bg-primary-green text-white shadow-md' 
                        : 'bg-light-gray text-dark-text hover:bg-green-light hover:text-primary-green'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-10 h-10 border-3 border-primary-orange border-t-transparent rounded-full animate-spin" />
              <p className="text-medium-text text-sm">Memuat produk...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border-color">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={28} className="text-medium-text" />
              </div>
              <h3 className="text-lg font-semibold text-dark-text mb-2">Produk Tidak Ditemukan</h3>
              <p className="text-medium-text text-sm">Coba cari dengan kata kunci atau kategori lain.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((item, index) => {
                const imageSrc = item.images && item.images.length > 0 ? item.images[0] : item.image;
                const waText = encodeURIComponent(`Halo, saya tertarik dengan produk ${item.name} yang ada di website desa.`);
                return (
                  <motion.div 
                    key={item._id}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={index % 4}
                    className="card group flex flex-col"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={getImageUrl(imageSrc)} 
                        alt={item.name} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 badge-orange text-[11px] font-semibold backdrop-blur-md bg-white/90 shadow-sm">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-dark-text mb-1 line-clamp-1">{item.name}</h3>
                      {item.price > 0 && (
                        <p className="text-primary-green font-bold text-lg mb-3">
                          Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      )}
                      <p className="text-medium-text text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
                        {item.description}
                      </p>
                      
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
