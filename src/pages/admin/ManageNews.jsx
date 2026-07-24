import React, { useState, useEffect, useRef } from 'react';
import api, { getImageUrl } from '../../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Image as ImageIcon, Calendar, X } from 'lucide-react';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', content: '', author: '', kategori: '' });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef();

  const fetchNews = async () => {
    try {
      const res = await api.get('/news');
      setNews(res.data);
    } catch (err) {
      toast.error('Gagal memuat berita');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/kategori');
      setCategories(res.data);
    } catch (err) {
      console.error('Gagal memuat kategori', err);
    }
  };

  useEffect(() => { 
    fetchNews();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('author', formData.author);
    data.append('kategori', formData.kategori);
    if (image) data.append('image', image);

    try {
      if (editingId) {
        await api.put(`/news/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Berita berhasil diperbarui');
      } else {
        await api.post('/news', data, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Berita berhasil ditambahkan');
      }
      resetForm();
      fetchNews();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({ title: item.title, content: item.content, author: item.author, kategori: item.kategori || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const executeDelete = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    try {
      await api.delete(`/news/${deleteModal.id}`);
      toast.success('Berita berhasil dihapus');
      fetchNews();
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      toast.error('Gagal menghapus berita');
    } finally {
      setIsDeleting(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', content: '', author: '', kategori: '' });
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fade-in pb-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-text mb-1">Kelola Berita</h1>
          <p className="text-medium-text text-sm">Tambah, edit, atau hapus artikel berita desa.</p>
        </div>
      </div>
      
      {/* Form Card */}
      <div className="admin-form-card">
        <h2>{editingId ? 'Edit Artikel Berita' : 'Tulis Berita Baru'}</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="lg:col-span-2">
              <label className="form-label">Judul Berita</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="Masukkan judul artikel"
                required 
                className="form-input" 
              />
            </div>
            
            <div>
              <label className="form-label">Penulis</label>
              <input 
                type="text" 
                name="author" 
                value={formData.author} 
                onChange={handleInputChange} 
                placeholder="Nama penulis"
                required 
                className="form-input" 
              />
            </div>
            
            <div>
              <label className="form-label">Kategori Produk Terkait (Opsional)</label>
              <select 
                name="kategori" 
                value={formData.kategori} 
                onChange={handleInputChange} 
                className="form-input cursor-pointer"
              >
                <option value="">-- Tidak ada kaitan --</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div className="lg:col-span-2">
              <label className="form-label">Isi Berita</label>
              <textarea 
                name="content" 
                rows="6" 
                value={formData.content} 
                onChange={handleInputChange} 
                placeholder="Tulis konten berita di sini..."
                required 
                className="form-input resize-y"
              ></textarea>
            </div>
            
            <div className="lg:col-span-2">
              <label className="form-label">Gambar Thumbnail</label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    ref={fileInputRef} 
                    accept="image/*" 
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-primary-green hover:file:bg-green-100 transition-colors border border-border-color rounded-lg cursor-pointer" 
                    required={!editingId} 
                  />
                  <p className="mt-1.5 text-xs text-gray-400">Format yang didukung: JPG, PNG, WEBP (Max 2MB)</p>
                </div>
                {image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-border-color shrink-0">
                    <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4 border-t border-border-color mt-6">
            <button type="submit" className="btn-primary">
              <Plus size={18} className="mr-2" /> 
              {editingId ? 'Simpan Perubahan' : 'Terbitkan Berita'}
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
                <th className="w-24">Gambar</th>
                <th>Informasi Berita</th>
                <th className="w-40 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-10">
                    <div className="flex justify-center items-center space-x-2 text-medium-text">
                      <div className="w-5 h-5 border-2 border-primary-green border-t-transparent rounded-full animate-spin" />
                      <span>Memuat data...</span>
                    </div>
                  </td>
                </tr>
              ) : news.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-medium-text">
                    Belum ada artikel berita yang diterbitkan.
                  </td>
                </tr>
              ) : (
                news.map(item => (
                  <tr key={item._id} className="group">
                    <td>
                      <div className="w-20 h-14 rounded-lg overflow-hidden border border-border-color bg-gray-100 flex items-center justify-center">
                        {item.image ? (
                          <img src={getImageUrl(item.image)} alt="thumb" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={20} className="text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td>
                      <p className="font-semibold text-dark-text mb-1 line-clamp-1">{item.title}</p>
                      <div className="flex items-center space-x-4 text-xs text-medium-text">
                        <span className="flex items-center"><Calendar size={12} className="mr-1" /> {new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                        {item.kategori && <span className="bg-orange-light text-primary-orange px-2 py-0.5 rounded-md font-medium">{item.kategori}</span>}
                      </div>
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

export default ManageNews;
