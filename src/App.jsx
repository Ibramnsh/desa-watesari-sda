import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Products from './pages/Products';
import Contact from './pages/Contact';

// Admin
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageNews from './pages/admin/ManageNews';
import ManageProducts from './pages/admin/ManageProducts';
import ManageCategories from './pages/admin/ManageCategories';

const Placeholder = ({ title }) => <div className="min-h-[60vh] flex items-center justify-center text-2xl font-bold text-primary-green">{title}</div>;

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            success: {
              style: {
                background: '#2E6417',
                color: '#fff',
              },
            },
            error: {
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            },
            style: {
              background: '#FF751F',
              color: '#fff',
            }
          }}
        />
        {/* User Routes */}
        <Routes>
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tentang" element={<About />} />
                  <Route path="/berita" element={<News />} />
                  <Route path="/berita/:id" element={<NewsDetail />} />
                  <Route path="/produk" element={<Products />} />
                  <Route path="/kontak" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="berita" element={<ManageNews />} />
            <Route path="produk" element={<ManageProducts />} />
            <Route path="kategori" element={<ManageCategories />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
