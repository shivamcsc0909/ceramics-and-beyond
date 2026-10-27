import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Search, MessageSquare, Filter, Layers, Check } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { api } from '../api/client';

interface ProductItem {
  id: number;
  slug: string;
  name: string;
  category_name?: string;
  category_slug: string;
  product_code?: string;
  short_description: string;
  pattern_design?: string;
  material_finish?: string;
  dimensions?: string[];
  cover_image_url: string;
  image_alt: string;
}

interface CategoryItem {
  id: number;
  slug: string;
  name: string;
  subtitle?: string;
  product_count?: number;
}

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    slug: 'custom-modern-sofa-suite',
    name: 'Custom Living Room Sofa Suite',
    category_slug: 'bespoke-furniture',
    category_name: 'Bespoke Furniture',
    product_code: 'CB-SOFA-01',
    short_description: 'Handcrafted custom sofa made with durable solid wood framing and premium comfortable fabric.',
    material_finish: 'Solid Teak Wood & High-Density Comfort Upholstery',
    dimensions: ['Custom Sizes (3-Seater / L-Shape / Sectional)'],
    cover_image_url: '/images/sofa.jpeg',
    image_alt: 'Custom handcrafted sofa and living room seating by Ceramics and Beyond',
  },
  {
    id: 2,
    slug: 'designer-architectural-tiles',
    name: 'Designer Wall & Floor Tiles',
    category_slug: 'finishes-palette',
    category_name: 'Tiles & Finishes',
    product_code: 'CB-TILE-02',
    short_description: 'Premium architectural designer tiles for walls, floors, kitchen backsplashes, and bathrooms.',
    material_finish: 'Matte, Polished & Textured Finishes',
    dimensions: ['Multiple Standard & Large-Format Sizes'],
    cover_image_url: '/images/tiles.jpeg',
    image_alt: 'Designer wall and floor tiles collection by Ceramics and Beyond',
  },
  {
    id: 3,
    slug: 'bespoke-modular-kitchen-island',
    name: 'Modular Kitchen & Island',
    category_slug: 'modular-furniture',
    category_name: 'Modular Kitchens',
    product_code: 'CB-KIT-03',
    short_description: 'Modern modular kitchen with German Blum soft-close drawers, quartz countertop, and smooth PU finish.',
    material_finish: 'Specialty Matte PU Paint & Fluted Oak Wood',
    dimensions: ['Customized to your exact kitchen dimensions'],
    cover_image_url: '/images/contemporary-walnut-island-kitchen.jpeg',
    image_alt: 'Modular kitchen with seamless island and integrated German hardware',
  },
  {
    id: 4,
    slug: 'walk-in-wardrobe-closet',
    name: 'Glass & Wood Wardrobe Suite',
    category_slug: 'modular-furniture',
    category_name: 'Modular Wardrobes',
    product_code: 'CB-WRD-04',
    short_description: 'Floor-to-ceiling wardrobe with tinted glass doors, built-in sensor LED lights, and custom shelves.',
    material_finish: 'Tinted Glass, Natural Wood & Smooth PU Paint',
    dimensions: ['Floor-to-Ceiling Custom Built'],
    cover_image_url: '/images/translucent-glass-wardrobe.jpeg',
    image_alt: 'Floor-to-ceiling walk-in wardrobe closet suite with integrated lighting',
  },
  {
    id: 5,
    slug: 'statement-tv-unit-fluted-panel',
    name: 'Floating TV Panel & Console',
    category_slug: 'functional-statement',
    category_name: 'TV Units',
    product_code: 'CB-TV-05',
    short_description: 'Modern wall-hung TV panel with 100% hidden cables, fluted wood accents, and push-to-open drawers.',
    material_finish: 'Natural Wood & Smooth Satin Paint',
    dimensions: ['Custom Width to match your TV and living room'],
    cover_image_url: '/images/floating-tv-console.jpeg',
    image_alt: 'Floating modern TV unit console with fluted wood paneling',
  },
  {
    id: 6,
    slug: 'bespoke-pu-bathroom-vanity',
    name: 'Waterproof Bathroom Vanity',
    category_slug: 'functional-statement',
    category_name: 'Vanities',
    product_code: 'CB-VAN-06',
    short_description: 'Waterproof vanity built for wet bathrooms with seamless stone basin and soft-close drawers.',
    material_finish: '100% Waterproof PU Paint & Stone Countertop',
    dimensions: ['Single / Double Basin Formats'],
    cover_image_url: '/images/luxury-bathroom-vanity.jpeg',
    image_alt: 'Waterproof bathroom vanity with seamless undermount basin',
  },
  {
    id: 7,
    slug: 'contemporary-sanctuary-mandir',
    name: 'Contemporary Sacred Mandir',
    category_slug: 'functional-statement',
    category_name: 'Mandirs',
    product_code: 'CB-MDR-07',
    short_description: 'Handcrafted prayer mandir with warm lighting, jali carving, brass bells, and diya storage drawers.',
    material_finish: 'Solid Teak Wood & Brass Accents',
    dimensions: ['Custom Heights for your home'],
    cover_image_url: '/images/sanctum-mandir.jpeg',
    image_alt: 'Contemporary sanctum prayer mandir with warm lighting and jali paneling',
  },
  {
    id: 8,
    slug: 'sculptural-dining-table-chairs',
    name: 'Solid Wood Dining Table & Chairs',
    category_slug: 'bespoke-furniture',
    category_name: 'Dining Furniture',
    product_code: 'CB-DNG-08',
    short_description: 'Solid wood dining table and matching chairs, hand-finished to resist stains and daily family use.',
    material_finish: 'Solid Wood with Protective Clear Coat',
    dimensions: ['6-Seater / 8-Seater / 10-Seater'],
    cover_image_url: '/images/dining-hall.jpeg',
    image_alt: 'Bespoke wooden dining table and chairs handcrafted with organic edges',
  },
];

export const AllProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<ProductItem[]>(FALLBACK_PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: 1, slug: 'modular-furniture', name: 'Modular Kitchens & Wardrobes' },
    { id: 2, slug: 'functional-statement', name: 'TV Panels & Vanities' },
    { id: 3, slug: 'bespoke-furniture', name: 'Custom Sofas & Dining' },
    { id: 4, slug: 'finishes-palette', name: 'Finishes & Tiles' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Quick Enquiry Modal State
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    estimatedQuantity: '',
    message: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catData, prodData] = await Promise.all([
          api.get('/api/public/categories'),
          api.get(`/api/public/products${currentCategory !== 'all' ? `?category=${currentCategory}` : ''}`),
        ]);
        if (Array.isArray(catData)) {
          const cleanCats = catData.filter((c: any) => !c.slug?.includes('bansal'));
          if (cleanCats.length > 0) setCategories(cleanCats);
        }
        if (Array.isArray(prodData) && prodData.length > 0) {
          const cleanProds = prodData.filter((p: any) => {
            const str = JSON.stringify(p).toLowerCase();
            return !str.includes('bansal') && !str.includes('floreale') && !str.includes('damasco');
          });
          if (cleanProds.length > 0) {
            setProducts(cleanProds);
          }
        }
      } catch (e) {
        console.warn('Using default furniture products:', e);
      }
    };
    loadData();
  }, [currentCategory]);

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  const filteredProducts = products.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.product_code && p.product_code.toLowerCase().includes(q)) ||
      (p.pattern_design && p.pattern_design.toLowerCase().includes(q)) ||
      p.short_description.toLowerCase().includes(q)
    );
  });

  const handleEnquireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/api/public/enquiry', {
        fullName: form.fullName,
        companyName: form.companyName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        enquiryType: 'Product Information',
        productCategory: selectedProduct?.category_name || selectedProduct?.category_slug,
        estimatedQuantity: form.estimatedQuantity,
        message: `Product Inquiry for: ${selectedProduct?.name} (${selectedProduct?.product_code || 'N/A'})\n\n${form.message}`,
      });
      setEnquirySuccess(true);
    } catch (err: any) {
      alert(err.message || 'Error submitting enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF9F6] text-[#292824]">
      {/* Header */}
      <div className="bg-[#1A1916] text-[#FAF9F6] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'All Products', href: '/products' }]} />
          <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
            Bespoke Furniture &amp; Tiles
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-tight">
            Thoughtfully Made. Entirely Yours.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#C9BDAA] font-light max-w-2xl leading-relaxed">
            From comfortable custom sofas, solid wood dining tables, and beds to modular kitchens, wardrobes, and designer tiles — explore everything we make in our New Delhi workshop.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Controls: Search & Category Pills */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-[#C9BDAA]/40">
          {/* Category Filter Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                currentCategory === 'all'
                  ? 'bg-[#292824] text-[#FAF9F6]'
                  : 'bg-[#F5F2EC] text-[#292824] hover:bg-[#C9BDAA]/40'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                  currentCategory === cat.slug
                    ? 'bg-[#292824] text-[#FAF9F6]'
                    : 'bg-[#F5F2EC] text-[#292824] hover:bg-[#C9BDAA]/40'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#77786B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sofa, kitchen, tile, wood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#77786B] mb-8 font-light">
          <span>Showing {filteredProducts.length} creations</span>
          <Link to="/contact" className="text-[#A76F55] hover:underline font-medium">
            Looking for custom sizes or studio visit? Contact us →
          </Link>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-24 text-xs text-[#77786B]">Loading catalog...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-[#F5F2EC] border border-[#C9BDAA]/30 p-8">
            <h3 className="font-serif text-xl mb-2">No matching products found</h3>
            <p className="text-xs text-[#77786B] mb-4">Try clearing your search query or choosing another category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('all');
              }}
              className="text-xs bg-[#292824] text-white px-4 py-2 uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod.slug}
                className="group bg-[#FAF9F6] border border-[#C9BDAA]/30 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-[#C9BDAA]"
              >
                <div>
                  <Link to={`/products/${prod.slug}`} className="block relative aspect-square overflow-hidden bg-[#E8E4DC]">
                    <img
                      src={prod.cover_image_url}
                      alt={prod.image_alt || prod.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {prod.product_code && (
                      <span className="absolute top-3 left-3 bg-[#292824]/90 text-[#FAF9F6] text-[10px] font-mono tracking-wider px-2 py-0.5">
                        {prod.product_code}
                      </span>
                    )}
                  </Link>

                  <div className="p-5">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#A76F55] block mb-1">
                      {prod.category_name || prod.category_slug.replace('-', ' ')}
                    </span>
                    <Link to={`/products/${prod.slug}`}>
                      <h3 className="font-serif text-lg text-[#292824] font-normal leading-snug hover:text-[#A76F55] transition-colors mb-2">
                        {prod.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#77786B] font-light leading-relaxed mb-4 line-clamp-2">
                      {prod.short_description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-[#C9BDAA]/30 text-[11px] text-[#292824]/80">
                      {prod.pattern_design && (
                        <p className="truncate">
                          <span className="text-[#77786B]">Pattern:</span> {prod.pattern_design}
                        </p>
                      )}
                      {prod.material_finish && (
                        <p className="truncate">
                          <span className="text-[#77786B]">Finish:</span> {prod.material_finish}
                        </p>
                      )}
                      {prod.dimensions && prod.dimensions.length > 0 && (
                        <p className="truncate">
                          <span className="text-[#77786B]">Size:</span> {prod.dimensions[0]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(prod);
                      setEnquirySuccess(false);
                    }}
                    className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-[#292824] text-[#FAF9F6] py-2 px-3 text-[11px] tracking-wider uppercase font-medium hover:bg-[#A76F55] transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Enquire</span>
                  </button>
                  <Link
                    to={`/products/${prod.slug}`}
                    className="p-2 border border-[#C9BDAA]/50 text-[#292824] hover:bg-[#292824] hover:text-[#FAF9F6] transition-colors"
                    aria-label={`View details for ${prod.name}`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Enquiry Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FAF9F6] text-[#292824] max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 border border-[#C9BDAA] shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-[#77786B] hover:text-[#292824] p-1"
              aria-label="Close"
            >
              ✕
            </button>

            {enquirySuccess ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#77786B]/20 text-[#292824] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-[#A76F55]" />
                </div>
                <h4 className="font-serif text-2xl mb-2">Enquiry Registered</h4>
                <p className="text-xs text-[#77786B] max-w-sm mx-auto mb-6">
                  Thank you for your interest in <strong>{selectedProduct.name}</strong>. Our commercial trade team in New Delhi will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="bg-[#292824] text-[#FAF9F6] text-xs uppercase tracking-wider px-6 py-2.5 hover:bg-[#A76F55]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#A76F55] block mb-1">
                    Product Specification Enquiry
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#292824]">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-[#77786B] font-mono mt-1">
                    Code: {selectedProduct.product_code || 'Standard'} · {selectedProduct.category_name}
                  </p>
                </div>

                <form onSubmit={handleEnquireSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Company / Firm</label>
                      <input
                        type="text"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                        placeholder="Nordic Surfaces Ltd"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Country</label>
                      <input
                        type="text"
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                        placeholder="India"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Est. Quantity</label>
                      <input
                        type="text"
                        value={form.estimatedQuantity}
                        onChange={(e) => setForm({ ...form, estimatedQuantity: e.target.value })}
                        className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                        placeholder="e.g. 1 Modular Kitchen, 2 Wardrobes"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">Message / Requirements *</label>
                    <textarea
                      required
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                      placeholder="Please specify target delivery timeframe, port or delivery location, sample requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#292824] text-[#FAF9F6] py-3 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Send Product Enquiry'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
