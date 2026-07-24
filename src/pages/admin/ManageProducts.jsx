import React, { useState, useEffect, useRef } from 'react';
import api, { getImageUrl } from '../../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({ 
    name: '', price: '', description: '', category: '', whatsapp: '', isActive: true 
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);
  
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef();

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      toast.error('Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/kategori');
      setCategories(res.data);
      if (res.data.length > 0 && !editingId) {
        setFormData(prev => ({ ...prev, category: res.data[0].name }));
      }
    } catch (err) {
      console.error('Gagal memuat kategori', err);
    }
  };

  useEffect(() => { 
    fetchProducts();
    fetchCategories(); 
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (images.length + existingImages.length + selectedFiles.length > 5) {
      toast.error('Maksimal 5 gambar per produk');
      return;
    }
    setImages(prev => [...prev, ...selectedFiles]);
  };

  const removeNewImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imgUrl) => {
    setExistingImages(prev => prev.filter(img => img !== imgUrl));
    setRemoveImages(prev => [...prev, imgUrl]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0 && existingImages.length === 0) {
      toast.error('Minimal satu gambar harus ada.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('whatsapp', formData.whatsapp);
    data.append('isActive', formData.isActive);
    
    images.forEach(img => {
      data.append('images', img);
    });

    removeImages.forEach(img => {
      data.append('removeImages', img);
    });

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Produk berhasil diperbarui');
      } else {
        await api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Produk berhasil ditambahkan');
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({ 
      name: item.name, 
      price: item.price || '', 
      description: item.description, 
      category: item.category, 
      whatsapp: item.whatsapp,
      isActive: item.isActive !== undefined ? item.isActive : true
    });
    setExistingImages(item.images || (item.image ? [item.image] : []));
    setImages([]);
    setRemoveImages([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const executeDelete = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    try {
      await api.delete(`/products/${deleteModal.id}`);
      toast.success('Produk berhasil dihapus');
      fetchProducts();
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      toast.error('Gagal menghapus produk');
    } finally {
      setIsDeleting(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', description: '', category: categories.length > 0 ? categories[0].name : '', whatsapp: '', isActive: true });
    setImages([]);
    setExistingImages([]);
    setRemoveImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fade-in pb-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-text mb-1">Kelola Produk UMKM</h1>
          <p className="text-medium-text text-sm">Manajemen katalog produk lokal unggulan desa.</p>
        </div>
      </div>
      
      {/* Form Card */}
      <div className="admin-form-card">
        <h2>{editingId ? 'Edit Data Produk' : 'Tambah Produk Baru'}</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="form-label">Nama Produk</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Cth: Keripik Pisang Asli" required className="form-input" />
            </div>
            
            <div>
              <label className="form-label">Harga (Rp) <span className="text-gray-400 font-normal text-xs ml-1">(Opsional)</span></label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Cth: 15000" className="form-input" />
            </div>
            
            <div>
              <label className="form-label">Kategori</label>
              <select name="category" value={formData.category} onChange={handleInputChange} required className="form-input cursor-pointer">
                <option value="" disabled>-- Pilih Kategori --</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="form-label">No WhatsApp Penjual</label>
              <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="Cth: 628123456789" required className="form-input" />
            </div>
          </div>
          
          <div>
            <label className="form-label">Deskripsi Produk</label>
            <textarea name="description" rows="4" value={formData.description} onChange={handleInputChange} placeholder="Jelaskan detail tentang produk ini..." required className="form-input resize-y"></textarea>
          </div>
          
          <div>
            <label className="flex items-center space-x-3 cursor-pointer p-4 border border-border-color rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-5 h-5 text-primary-orange rounded focus:ring-primary-orange" />
              <div>
                <span className="block font-medium text-dark-text">Status Produk Aktif</span>
                <span className="block text-xs text-medium-text mt-0.5">Produk yang tidak aktif akan disembunyikan dari halaman publik Warga.</span>
              </div>
            </label>
          </div>
          
          <div>
            <label className="form-label">Gambar Produk <span className="text-gray-400 font-normal text-xs ml-1">(Maks 5 Gambar, disarankan rasio 1:1)</span></label>
            <input type="file" multiple onChange={handleFileChange} ref={fileInputRef} accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-primary-orange hover:file:bg-orange-100 transition-colors border border-border-color rounded-lg cursor-pointer mb-3" />
            
            <div className="flex flex-wrap gap-3 mt-3">
              {/* Existing Images */}
              {existingImages.map((img, idx) => (
                <div key={`exist-${idx}`} className="relative group w-24 h-24 rounded-lg border border-border-color overflow-hidden bg-gray-100 shrink-0">
                  <img src={getImageUrl(img)} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeExistingImage(img)} className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transform scale-75 group-hover:scale-100 transition-all"><X size={16} /></button>
                  </div>
                </div>
              ))}
              {/* New Images */}
              {images.map((img, idx) => (
                <div key={`new-${idx}`} className="relative group w-24 h-24 rounded-lg border-2 border-primary-green border-dashed overflow-hidden bg-green-50 shrink-0">
                  <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeNewImage(idx)} className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transform scale-75 group-hover:scale-100 transition-all"><X size={16} /></button>
                  </div>
                </div>
              ))}
              {existingImages.length === 0 && images.length === 0 && (
                <div className="w-24 h-24 rounded-lg border border-border-color border-dashed bg-gray-50 flex flex-col items-center justify-center text-gray-400">
                  <ImageIcon size={24} className="mb-1 opacity-50" />
                  <span className="text-[10px] uppercase font-medium">Kosong</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4 border-t border-border-color mt-6">
            <button type="submit" className="btn-primary">
              <Plus size={18} className="mr-2" /> 
              {editingId ? 'Simpan Perubahan' : 'Tambah Produk'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-outline border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-dark-text">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table Card */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-20">Foto</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Status</th>
                <th className="w-40 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    <div className="flex justify-center items-center space-x-2 text-medium-text">
                      <div className="w-5 h-5 border-2 border-primary-orange border-t-transparent rounded-full animate-spin" />
                      <span>Memuat data...</span>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-medium-text">
                    Belum ada produk yang ditambahkan.
                  </td>
                </tr>
              ) : (
                products.map(item => (
                  <tr key={item._id} className="group">
                    <td>
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-border-color bg-gray-100 flex items-center justify-center">
                        <img src={getImageUrl(item.images?.[0] || item.image)} alt="thumb" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="font-semibold text-dark-text">{item.name}</td>
                    <td>
                      <span className="badge bg-gray-100 text-gray-700 border border-gray-200">{item.category}</span>
                    </td>
                    <td>
                      {item.isActive !== false ? (
                        <span className="flex items-center text-xs font-semibold text-green-600"><span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>Aktif</span>
                      ) : (
                        <span className="flex items-center text-xs font-semibold text-gray-400"><span className="w-2 h-2 rounded-full bg-gray-300 mr-1.5"></span>Sembunyi</span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center justify-center space-x-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(item)} 
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => confirmDelete(item._id)} 
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={executeDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ManageProducts;
