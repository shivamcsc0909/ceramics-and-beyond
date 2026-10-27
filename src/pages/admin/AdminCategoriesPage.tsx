import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Edit2, Plus, Trash2, Layers, ExternalLink, X } from 'lucide-react';

interface CategoryItem {
  id: number;
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
  cover_image_url: string;
  image_alt?: string;
  sort_order: number;
  status: string;
  product_count?: number;
}

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    subtitle: '',
    description: '',
    cover_image_url: '',
    image_alt: '',
    sort_order: 0,
    status: 'published',
  });

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await api.get('/api/admin/categories');
      if (Array.isArray(data)) setCategories(data);
    } catch (e) {
      console.error('Failed to load categories:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setForm({
      name: '',
      slug: '',
      subtitle: '',
      description: '',
      cover_image_url: '/images/finishes-palette.jpeg',
      image_alt: '',
      sort_order: categories.length + 1,
      status: 'published',
    });
    setModalOpen(true);
  };

  const openEditModal = (c: CategoryItem) => {
    setEditingCategory(c);
    setForm({
      name: c.name,
      slug: c.slug,
      subtitle: c.subtitle || '',
      description: c.description || '',
      cover_image_url: c.cover_image_url || '',
      image_alt: c.image_alt || '',
      sort_order: c.sort_order || 0,
      status: c.status || 'published',
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCategory) {
        await api.put(`/api/admin/categories/${editingCategory.id}`, form);
      } else {
        await api.post('/api/admin/categories', form);
      }
      setModalOpen(false);
      await loadCategories();
    } catch (err: any) {
      alert(err.message || 'Error saving category.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      await api.delete(`/api/admin/categories/${id}`);
      await loadCategories();
    } catch (err: any) {
      alert(err.message || 'Error deleting category.');
    }
  };

  return (
    <div className="p-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#C9BDAA]/40">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-[#A76F55] font-semibold block mb-1">
            Product Family Hierarchy
          </span>
          <h1 className="font-serif text-3xl font-light text-[#292824]">
            Product Categories ({categories.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center space-x-2 bg-[#292824] text-[#FAF9F6] px-4 py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-[#A76F55] transition-colors rounded-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="bg-white border border-[#C9BDAA]/40 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] bg-[#E8E4DC] overflow-hidden">
                <img src={cat.cover_image_url} alt={cat.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#292824]/90 text-white text-[10px] font-mono px-2 py-0.5">
                  Order: {cat.sort_order}
                </span>
                <span className={`absolute top-3 right-3 text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                  cat.status === 'published' ? 'bg-emerald-800 text-white' : 'bg-amber-800 text-white'
                }`}>
                  {cat.status}
                </span>
              </div>

              <div className="p-5">
                <span className="text-[10px] tracking-wider uppercase text-[#A76F55] block mb-1">
                  {cat.subtitle || 'Category Line'}
                </span>
                <h3 className="font-serif text-xl font-normal text-[#292824] mb-2">{cat.name}</h3>
                <p className="text-xs text-[#77786B] font-light leading-relaxed mb-4 line-clamp-3">
                  {cat.description}
                </p>
                <div className="text-[11px] font-mono text-[#77786B] pt-3 border-t border-[#C9BDAA]/20">
                  Route: /category/{cat.slug}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F5F2EC] border-t border-[#C9BDAA]/30 flex items-center justify-between">
              <a
                href={`/category/${cat.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-wider text-[#292824] hover:text-[#A76F55] inline-flex items-center"
              >
                <span>View Live</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>

              <div className="space-x-2">
                <button
                  type="button"
                  onClick={() => openEditModal(cat)}
                  className="p-1.5 text-[#77786B] hover:text-[#292824]"
                  title="Edit category"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-1.5 text-[#77786B] hover:text-red-600"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white max-w-xl w-full p-6 sm:p-8 border border-[#C9BDAA] shadow-2xl relative my-8">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#77786B] hover:text-[#292824]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-light mb-6 text-[#292824]">
              {editingCategory ? 'Edit Product Category' : 'Add Product Category'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setForm({ ...form, name, slug: editingCategory ? form.slug : slug });
                    }}
                    className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none"
                    placeholder="Modular Kitchens"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none font-mono"
                    placeholder="modular-furniture"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Subtitle / Highlight</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none"
                  placeholder="Floral, Traditional &amp; Contemporary Motifs"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none"
                  placeholder="Describe the carcass joinery, hardware fittings, finish details..."
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Cover Image URL *</label>
                <input
                  type="text"
                  required
                  value={form.cover_image_url}
                  onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                  className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none font-mono"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                    className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-[#C9BDAA]/40">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-[#C9BDAA] text-[#292824] uppercase tracking-wider hover:bg-[#F5F2EC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-[#292824] text-white uppercase tracking-wider hover:bg-[#A76F55] disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
