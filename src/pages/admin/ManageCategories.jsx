import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/kategori');
      setCategories(res.data);
    } catch (err) {
      toast.error('Gagal memuat kategori');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/kategori/${editingId}`, formData);
        toast.success('Kategori berhasil diperbarui');
      } else {
        await api.post('/kategori', formData);
        toast.success('Kategori berhasil ditambahkan');
      }
      resetForm();
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({ name: item.name });
  };

  const confirmDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const executeDelete = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    try {
      await api.delete(`/kategori/${deleteModal.id}`);
      toast.success('Kategori berhasil dihapus');
      fetchCategories();
      setDeleteModal({ isOpen: false, id: null });
    } catch (err) {
      toast.error('Gagal menghapus kategori');
    } finally {
      setIsDeleting(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '' });
  };

  return (
    <div className="fade-in pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark-text mb-1">Kelola Kategori Produk</h1>
        <p className="text-medium-text text-sm">Organisasi pengelompokan produk UMKM.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Card */}
        <div className="lg:col-span-1">
          <div className="admin-form-card mb-0">
            <h2>{editingId ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="form-label">Nama Kategori</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Cth: Makanan Ringan"
                  required 
                  className="form-input" 
                />
              </div>
              
              <div className="flex flex-col space-y-3 pt-2">
                <button type="submit" className="btn-primary w-full">
                  <Plus size={18} className="mr-2" /> 
                  {editingId ? 'Simpan' : 'Tambah Baru'}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="btn-outline w-full border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-dark-text py-2.5">
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table Card */}
        <div className="lg:col-span-2">
          <div className="card h-full">
            <div className="p-5 border-b border-border-color bg-gray-50/50">
              <h3 className="font-semibold text-dark-text flex items-center">
                <Tag size={18} className="mr-2 text-primary-green" />
                Daftar Kategori Tersedia
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nama Kategori</th>
                    <th className="w-32 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="2" className="text-center py-10">
                        <div className="flex justify-center items-center space-x-2 text-medium-text">
                          <div className="w-5 h-5 border-2 border-primary-green border-t-transparent rounded-full animate-spin" />
                          <span>Memuat data...</span>
                        </div>
                      </td>
                    </tr>
                  ) : categories.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="text-center py-10 text-medium-text">
                        Belum ada kategori yang dibuat.
                      </td>
                    </tr>
                  ) : (
                    categories.map(item => (
                      <tr key={item._id} className="group">
                        <td className="font-medium text-dark-text">{item.name}</td>
                        <td>
                          <div className="flex items-center justify-center space-x-2">
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

export default ManageCategories;
