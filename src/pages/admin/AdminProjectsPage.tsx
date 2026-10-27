import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Plus, Edit, Trash2, Save, X, Briefcase } from 'lucide-react';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await api.get('/api/admin/projects');
      setProjects(data);
    } catch (e) {
      console.warn('Could not load projects:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (p: any) => {
    setEditingItem(JSON.parse(JSON.stringify(p)));
    setIsNew(false);
  };

  const handleCreateNew = () => {
    setEditingItem({
      slug: '',
      title: '',
      category: 'Residential Pavilion',
      location: 'Goa, India',
      year: '2025',
      description: '',
      brief: '',
      cover_image_url: '/images/living-hall.jpeg',
      image_alt: 'Ceramics & Beyond Architectural Project',
      status: 'published',
      sort_order: projects.length + 1,
      materials: ['Continuous Porcelain Slabs', 'Custom Blum Joinery'],
    });
    setIsNew(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/api/admin/projects/${id}`);
      await fetchProjects();
    } catch (e: any) {
      alert(e.message || 'Delete failed');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isNew) {
        await api.post('/api/admin/projects', editingItem);
      } else {
        await api.put(`/api/admin/projects/${editingItem.id}`, editingItem);
      }
      setEditingItem(null);
      await fetchProjects();
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
            Portfolio Management
          </span>
          <h2 className="font-serif text-2xl font-light text-[#292824]">
            Built Projects &amp; Case Studies ({projects.length})
          </h2>
          <p className="text-xs text-[#77786B] mt-1">
            Showcase commissioned residences, modular kitchens, and custom furniture projects.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center space-x-2 bg-[#292824] text-[#FAF9F6] px-4 py-2.5 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#C9BDAA]/50 shadow-2xl w-full max-w-2xl my-8 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#C9BDAA]/20">
              <h3 className="font-serif text-xl text-[#292824]">
                {isNew ? 'Create New Case Study' : `Edit: ${editingItem.title}`}
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
                  <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editingItem.category || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={editingItem.location || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Year</label>
                  <input
                    type="text"
                    value={editingItem.year || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60 font-mono"
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
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Design Brief &amp; Solution</label>
                <textarea
                  rows={3}
                  value={editingItem.brief || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, brief: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60"
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
                  <span>{saving ? 'Saving...' : 'Save Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List Table */}
      <div className="bg-white border border-[#C9BDAA]/40 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#FAF9F6] border-b border-[#C9BDAA]/30 text-[#77786B] font-mono">
              <th className="p-4">Visual</th>
              <th className="p-4">Title &amp; Location</th>
              <th className="p-4">Category</th>
              <th className="p-4">Year</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9BDAA]/10">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-[#FAF9F6]">
                <td className="p-4 w-16">
                  <img
                    src={p.cover_image_url}
                    alt={p.image_alt || p.title}
                    className="w-12 h-10 object-cover border border-[#C9BDAA]/30"
                  />
                </td>
                <td className="p-4">
                  <span className="font-serif text-sm font-medium text-[#292824] block">{p.title}</span>
                  <span className="font-mono text-[11px] text-[#77786B]">{p.location}</span>
                </td>
                <td className="p-4 text-[#525049]">{p.category}</td>
                <td className="p-4 font-mono text-[#77786B]">{p.year}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(p)}
                    className="inline-flex items-center space-x-1 text-[#292824] hover:text-[#A76F55]"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
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
