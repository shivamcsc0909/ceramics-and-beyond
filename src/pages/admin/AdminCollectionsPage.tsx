import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Plus, Edit, Trash2, Save, X, Layers, Check } from 'lucide-react';

export const AdminCollectionsPage: React.FC = () => {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchCollections = async () => {
    try {
      const data = await api.get('/api/admin/collections');
      setCollections(data);
    } catch (e) {
      console.warn('Could not load collections:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleEdit = (col: any) => {
    setEditingItem(JSON.parse(JSON.stringify(col)));
    setIsNew(false);
  };

  const handleCreateNew = () => {
    setEditingItem({
      slug: '',
      title: '',
      subtitle: '',
      category: 'Large-Format Slabs',
      description: '',
      cover_image_url: '/images/fluted-island-kitchen.jpeg',
      image_alt: 'Ceramics & Beyond Architectural Surface',
      status: 'published',
      sort_order: collections.length + 1,
      characteristics: [{ label: 'Format', value: '3200 × 1600 mm' }],
      finishes: ['Honed', 'Polished'],
      applications: ['Backsplash Feature Walls', 'Living Floors'],
      features: ['Zero Water Absorption', 'Heat Resistant'],
    });
    setIsNew(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this collection?')) return;
    try {
      await api.delete(`/api/admin/collections/${id}`);
      await fetchCollections();
    } catch (e: any) {
      alert(e.message || 'Delete failed');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isNew) {
        await api.post('/api/admin/collections', editingItem);
      } else {
        await api.put(`/api/admin/collections/${editingItem.id}`, editingItem);
      }
      setEditingItem(null);
      await fetchCollections();
    } catch (e: any) {
      alert(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16">
        <div className="w-8 h-8 border-2 border-[#292824] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="bg-[#FAF9F6] p-6 border border-[#C9BDAA]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-1">
            Catalog Database
          </span>
          <h2 className="font-serif text-2xl font-light text-[#292824]">
            Curated Collections ({collections.length})
          </h2>
          <p className="text-xs text-[#77786B] mt-1">
            Changes are versioned and immediately synchronized to public filters.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center space-x-2 bg-[#292824] text-[#FAF9F6] px-4 py-2.5 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#C9BDAA]/50 shadow-2xl w-full max-w-2xl my-8 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#C9BDAA]/20">
              <h3 className="font-serif text-xl text-[#292824]">
                {isNew ? 'Create New Collection' : `Edit: ${editingItem.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-[#77786B] hover:text-[#292824]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={editingItem.slug || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60 font-mono"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={editingItem.subtitle || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editingItem.category || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Cover Image URL</label>
                <input
                  type="text"
                  required
                  value={editingItem.cover_image_url || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, cover_image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#C9BDAA]/20">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-[#C9BDAA]/50 text-[#77786B] hover:text-[#292824]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center space-x-1.5 bg-[#292824] text-white px-5 py-2 font-medium hover:bg-[#A76F55] transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Collection'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Collections List Table */}
      <div className="bg-white border border-[#C9BDAA]/40 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#FAF9F6] border-b border-[#C9BDAA]/30 text-[#77786B] font-mono">
              <th className="p-4">Visual</th>
              <th className="p-4">Title &amp; Slug</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9BDAA]/10">
            {collections.map((col) => (
              <tr key={col.id} className="hover:bg-[#FAF9F6]">
                <td className="p-4 w-16">
                  <img
                    src={col.cover_image_url}
                    alt={col.image_alt || col.title}
                    className="w-12 h-10 object-cover border border-[#C9BDAA]/30"
                  />
                </td>
                <td className="p-4">
                  <span className="font-serif text-sm font-medium text-[#292824] block">{col.title}</span>
                  <span className="font-mono text-[11px] text-[#77786B]">/collections/{col.slug}</span>
                </td>
                <td className="p-4 text-[#525049]">{col.category}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {col.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(col)}
                    className="inline-flex items-center space-x-1 text-[#292824] hover:text-[#A76F55]"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(col.id)}
                    className="inline-flex items-center space-x-1 text-red-600 hover:text-red-800 ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
