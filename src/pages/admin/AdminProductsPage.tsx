import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { Plus, Edit2, Trash2, Check, X, Search, Package, ExternalLink } from 'lucide-react';

interface ProductItem {
  id: number;
  slug: string;
  name: string;
  category_id?: number;
  category_slug: string;
  category_name?: string;
  product_code?: string;
  short_description: string;
  description?: string;
  pattern_design?: string;
  material_finish?: string;
  dimensions?: string[];
  applications?: string[];
  cover_image_url: string;
  image_alt?: string;
  is_featured: boolean | number;
  status: string;
  sort_order: number;
}

interface CategoryItem {
  id: number;
  slug: string;
  name: string;
}

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Edit / Create Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    category_slug: 'modular-furniture',
    product_code: '',
    short_description: '',
    description: '',
    pattern_design: '',
    material_finish: '',
    dimensions: '',
    applications: '',
    cover_image_url: '',
    image_alt: '',
    is_featured: false,
    status: 'published',
    sort_order: 0,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodData, catData] = await Promise.all([
        api.get('/api/admin/products'),
        api.get('/api/admin/categories'),
      ]);
      if (Array.isArray(prodData)) setProducts(prodData);
      if (Array.isArray(catData)) setCategories(catData);
    } catch (e) {
      console.error('Failed to load products:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      slug: '',
      category_slug: categories[0]?.slug || 'modular-furniture',
      product_code: '',
      short_description: '',
      description: '',
      pattern_design: '',
      material_finish: '',
      dimensions: '150mm × 150mm × 9mm',
      applications: 'Interior Walls, Splashbacks',
      cover_image_url: '/images/contemporary-walnut-island-kitchen.jpeg',
      image_alt: '',
      is_featured: true,
      status: 'published',
      sort_order: products.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: ProductItem) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      slug: p.slug,
      category_slug: p.category_slug,
      product_code: p.product_code || '',
      short_description: p.short_description || '',
      description: p.description || p.short_description || '',
      pattern_design: p.pattern_design || '',
      material_finish: p.material_finish || '',
      dimensions: Array.isArray(p.dimensions) ? p.dimensions.join(', ') : '',
      applications: Array.isArray(p.applications) ? p.applications.join(', ') : '',
      cover_image_url: p.cover_image_url || '',
      image_alt: p.image_alt || '',
      is_featured: !!p.is_featured,
      status: p.status || 'published',
      sort_order: p.sort_order || 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        category_slug: form.category_slug,
        product_code: form.product_code,
        short_description: form.short_description,
        description: form.description,
        pattern_design: form.pattern_design,
        material_finish: form.material_finish,
        dimensions: form.dimensions.split(',').map((s) => s.trim()).filter(Boolean),
        applications: form.applications.split(',').map((s) => s.trim()).filter(Boolean),
        cover_image_url: form.cover_image_url,
        image_alt: form.image_alt || form.name,
        is_featured: form.is_featured,
        status: form.status,
        sort_order: Number(form.sort_order),
      };

      if (editingProduct) {
        await api.put(`/api/admin/products/${editingProduct.id}`, payload);
      } else {
        await api.post('/api/admin/products', payload);
      }
      setModalOpen(false);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Error saving product.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await api.delete(`/api/admin/products/${id}`);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Error deleting product.');
    }
  };

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.product_code && p.product_code.toLowerCase().includes(q)) ||
      (p.category_name && p.category_name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-6 sm:p-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#C9BDAA]/40">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-[#A76F55] font-semibold block mb-1">
            Furniture Inventory Management
          </span>
          <h1 className="font-serif text-3xl font-light text-[#292824]">
            Furniture Creations ({products.length})
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center space-x-2 bg-[#292824] text-[#FAF9F6] px-4 py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-[#A76F55] transition-colors rounded-sm shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 max-w-md relative">
        <Search className="w-4 h-4 text-[#77786B] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter products by code, name, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs pl-9 pr-4 py-2 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#C9BDAA]/40 overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-16 text-xs text-[#77786B]">Loading products...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#77786B]">No ceramic products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#292824]">
              <thead className="bg-[#F5F2EC] border-b border-[#C9BDAA]/40 uppercase tracking-wider text-[10px] text-[#77786B]">
                <tr>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Pattern / Finish</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9BDAA]/20">
                {filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 bg-[#E8E4DC] overflow-hidden border border-[#C9BDAA]/40">
                        <img src={prod.cover_image_url} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-[11px] text-[#A76F55]">
                      {prod.product_code || '—'}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      <div className="flex items-center space-x-1.5">
                        <span>{prod.name}</span>
                        {prod.is_featured ? (
                          <span className="bg-[#A76F55]/10 text-[#A76F55] text-[9px] px-1.5 py-0.5 rounded font-mono">Featured</span>
                        ) : null}
                      </div>
                      <span className="text-[10px] text-[#77786B] font-mono block mt-0.5">/{prod.slug}</span>
                    </td>
                    <td className="py-3 px-4 text-[#77786B]">
                      {prod.category_name || prod.category_slug}
                    </td>
                    <td className="py-3 px-4 text-[#77786B] max-w-xs truncate">
                      {prod.pattern_design || prod.material_finish || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider rounded ${
                        prod.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {prod.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(prod)}
                        className="p-1 text-[#77786B] hover:text-[#292824]"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-1 text-[#77786B] hover:text-red-600"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <a
                        href={`/products/${prod.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-[#77786B] hover:text-[#A76F55]"
                        title="View live product"
                      >
                        <ExternalLink className="w-4 h-4 inline" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white max-w-2xl w-full p-6 sm:p-8 border border-[#C9BDAA] shadow-2xl relative my-8">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#77786B] hover:text-[#292824]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-light mb-6 text-[#292824]">
              {editingProduct ? 'Edit Furniture Creation' : 'Add New Furniture Creation'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setForm({ ...form, name, slug: editingProduct ? form.slug : slug });
                    }}
                    className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none"
                    placeholder="e.g. Minimalist Handleless Kitchen Island"
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
                    placeholder="minimalist-handleless-kitchen-island"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Category *</label>
                  <select
                    value={form.category_slug}
                    onChange={(e) => setForm({ ...form, category_slug: e.target.value })}
                    className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Product Code</label>
                  <input
                    type="text"
                    value={form.product_code}
                    onChange={(e) => setForm({ ...form, product_code: e.target.value })}
                    className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none font-mono"
                    placeholder="CB-HP-101"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={form.short_description}
                  onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                  className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none"
                  placeholder="Summary for catalog cards and search preview..."
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Full Technical Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none"
                  placeholder="Detailed carcass joinery, hardware specifications, finish applications..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Pattern / Motif</label>
                  <input
                    type="text"
                    value={form.pattern_design}
                    onChange={(e) => setForm({ ...form, pattern_design: e.target.value })}
                    className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none"
                    placeholder="e.g. Classical Botanical Floral Motif"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Material &amp; Finish</label>
                  <input
                    type="text"
                    value={form.material_finish}
                    onChange={(e) => setForm({ ...form, material_finish: e.target.value })}
                    className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none"
                    placeholder="e.g. Matte PU Paint with Natural Oak Veneer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Dimensions (Comma Separated)</label>
                  <input
                    type="text"
                    value={form.dimensions}
                    onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                    className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none font-mono"
                    placeholder="150mm × 150mm × 9mm, 200mm × 200mm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Applications (Comma Separated)</label>
                  <input
                    type="text"
                    value={form.applications}
                    onChange={(e) => setForm({ ...form, applications: e.target.value })}
                    className="w-full p-2.5 border border-[#C9BDAA]/60 outline-none"
                    placeholder="Feature Walls, Splashbacks, Bathrooms"
                  />
                </div>
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

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                    className="rounded border-[#C9BDAA]"
                  />
                  <span>Featured on Homepage Showcase</span>
                </label>

                <div className="flex items-center space-x-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#77786B]">Status:</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="p-1 border border-[#C9BDAA]/60 outline-none bg-white"
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
                  {saving ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
