import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Lightbulb, TrendingUp, Leaf } from 'lucide-react';

const About = () => {
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
          <h1>Tentang Desa Watesari</h1>
          <p>Mengenal lebih dekat profil, sejarah, dan potensi Desa Watesari, Kecamatan Balongbendo, Sidoarjo.</p>
        </div>
      </section>

      {/* Profil Desa */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <span className="badge-green mb-4 inline-block">Profil Desa</span>
            <h2 className="section-title mb-4">Sejarah & Profil Desa</h2>
            <div className="section-divider mx-auto mb-8" />
            <p className="text-medium-text leading-relaxed text-lg">
              Desa Watesari terletak di Kecamatan Balongbendo, Kabupaten Sidoarjo. Desa ini dikenal dengan lingkungan yang asri dan masyarakat yang guyub rukun. Seiring berjalannya waktu, Watesari terus berkembang menjadi desa yang mandiri secara ekonomi melalui pemberdayaan UMKM lokal dan inovasi masyarakat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 md:py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-orange mb-4 inline-block">Arah Pembangunan</span>
            <h2 className="section-title">Visi & Misi</h2>
            <div className="section-divider mx-auto mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Visi */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-12 h-12 bg-green-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye size={24} className="text-primary-green" />
                </div>
                <h3 className="text-xl font-bold text-primary-green">Visi</h3>
              </div>
              <p className="text-medium-text leading-relaxed">
                Terwujudnya Desa Watesari yang Mandiri, Sejahtera, Asri, dan Berdaya Saing melalui Peningkatan Kualitas SDM dan Potensi Lokal.
              </p>
            </motion.div>

            {/* Misi */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="card p-8"
            >
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-12 h-12 bg-orange-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target size={24} className="text-primary-orange" />
                </div>
                <h3 className="text-xl font-bold text-primary-orange">Misi</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Meningkatkan perekonomian desa melalui pemberdayaan UMKM.',
                  'Mewujudkan lingkungan desa yang bersih, sehat, dan asri.',
                  'Meningkatkan pelayanan publik yang transparan.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-medium-text">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary-orange flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Potensi Desa */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-green mb-4 inline-block">Keunggulan</span>
            <h2 className="section-title">Potensi Desa</h2>
            <div className="section-divider mx-auto mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <TrendingUp size={28} />,
                title: 'UMKM Berkembang',
                desc: 'Berbagai produk lokal berkualitas yang terus berinovasi untuk menembus pasar yang lebih luas.',
                color: 'green',
              },
              {
                icon: <Lightbulb size={28} />,
                title: 'SDM Kreatif',
                desc: 'Masyarakat yang kreatif dan inovatif dalam mengembangkan potensi serta produk lokal desa.',
                color: 'orange',
              },
              {
                icon: <Leaf size={28} />,
                title: 'Lingkungan Asri',
                desc: 'Lingkungan desa yang bersih, hijau, dan nyaman sebagai penunjang kualitas hidup warga.',
                color: 'green',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="card p-7 text-center group hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    item.color === 'green'
                      ? 'bg-green-light text-primary-green'
                      : 'bg-orange-light text-primary-orange'
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="font-semibold text-dark-text text-lg mb-2">{item.title}</h3>
                <p className="text-medium-text text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lokasi / Maps */}
      <section className="py-16 md:py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="badge-orange mb-4 inline-block">Lokasi</span>
            <h2 className="section-title">Lokasi Desa Watesari</h2>
            <div className="section-divider mx-auto mt-3" />
            <p className="text-medium-text mt-4">Kunjungi kami di Desa Watesari, Kecamatan Balongbendo, Kabupaten Sidoarjo.</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card overflow-hidden"
          >
            <div className="w-full h-[400px] md:h-[480px]">
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
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
