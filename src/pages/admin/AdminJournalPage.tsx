import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Plus, Edit, Trash2, Save, X, BookOpen } from 'lucide-react';

export const AdminJournalPage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchArticles = async () => {
    try {
      const data = await api.get('/api/admin/articles');
      setArticles(data);
    } catch (e) {
      console.warn('Could not load articles:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleEdit = (a: any) => {
    setEditingItem(JSON.parse(JSON.stringify(a)));
    setIsNew(false);
  };

  const handleCreateNew = () => {
    setEditingItem({
      slug: '',
      title: '',
      category: 'Atelier Reflections',
      author: 'Materials Specialist',
      excerpt: '',
      read_time: '4 min read',
      featured_image_url: '/images/experience-centre.jpeg',
      image_alt: 'Ceramics & Beyond Architectural Essay',
      status: 'published',
      content: [
        {
          heading: 'Sensorial Permanence',
          paragraphs: [
            'Architectural volume begins with authentic material honesty.',
          ],
        },
      ],
    });
    setIsNew(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.delete(`/api/admin/articles/${id}`);
      await fetchArticles();
    } catch (e: any) {
      alert(e.message || 'Delete failed');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isNew) {
        await api.post('/api/admin/articles', editingItem);
      } else {
        await api.put(`/api/admin/articles/${editingItem.id}`, editingItem);
      }
      setEditingItem(null);
      await fetchArticles();
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
            Editorial Publications
          </span>
          <h2 className="font-serif text-2xl font-light text-[#292824]">
            Journal Articles ({articles.length})
          </h2>
          <p className="text-xs text-[#77786B] mt-1">
            Publish architectural thought-leadership, material provenance guides, and essays.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center space-x-2 bg-[#292824] text-[#FAF9F6] px-4 py-2.5 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#C9BDAA]/50 shadow-2xl w-full max-w-2xl my-8 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#C9BDAA]/20">
              <h3 className="font-serif text-xl text-[#292824]">
                {isNew ? 'Create New Article' : `Edit: ${editingItem.title}`}
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
                  <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={editingItem.author || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingItem.read_time || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, read_time: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60 font-mono"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    required
                    value={editingItem.featured_image_url || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, featured_image_url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#C9BDAA]/60 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#292824] font-medium mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.excerpt || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
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
                  <span>{saving ? 'Saving...' : 'Save Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Articles List Table */}
      <div className="bg-white border border-[#C9BDAA]/40 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#FAF9F6] border-b border-[#C9BDAA]/30 text-[#77786B] font-mono">
              <th className="p-4">Visual</th>
              <th className="p-4">Title &amp; Excerpt</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9BDAA]/10">
            {articles.map((a) => (
              <tr key={a.id} className="hover:bg-[#FAF9F6]">
                <td className="p-4 w-16">
                  <img
                    src={a.featured_image_url}
                    alt={a.image_alt || a.title}
                    className="w-12 h-10 object-cover border border-[#C9BDAA]/30"
                  />
                </td>
                <td className="p-4 max-w-xs">
                  <span className="font-serif text-sm font-medium text-[#292824] block">{a.title}</span>
                  <span className="text-[11px] text-[#77786B] line-clamp-1">{a.excerpt}</span>
                </td>
                <td className="p-4 text-[#525049]">{a.category}</td>
                <td className="p-4 font-mono text-[#77786B]">{a.author}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(a)}
                    className="inline-flex items-center space-x-1 text-[#292824] hover:text-[#A76F55]"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(a.id)}
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
