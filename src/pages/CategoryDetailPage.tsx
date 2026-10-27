import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, Check, X, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { api } from '../api/client';

interface ProductItem {
  id: number;
  slug: string;
  name: string;
  product_code?: string;
  short_description: string;
  pattern_design?: string;
  material_finish?: string;
  dimensions?: string[];
  cover_image_url: string;
  image_alt: string;
}

interface CategoryData {
  id: number;
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
  cover_image_url: string;
  image_alt?: string;
  products?: ProductItem[];
}

export const CategoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);

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
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const data = await api.get(`/api/public/categories/${slug}`);
        setCategory(data);
      } catch (e) {
        console.error('Failed to load category:', e);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchCategory();
  }, [slug]);

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
        productCategory: category?.name,
        estimatedQuantity: form.estimatedQuantity,
        message: `Category Product Enquiry: ${selectedProduct?.name} (${selectedProduct?.product_code || 'N/A'})\nCategory: ${category?.name}\n\n${form.message}`,
      });
      setEnquirySuccess(true);
    } catch (err: any) {
      alert(err.message || 'Error submitting enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center text-xs text-[#77786B] bg-[#FAF9F6]">
        Loading category information...
      </div>
    );
  }

  if (!category) {
    return (
      <div className="pt-32 pb-24 text-center bg-[#FAF9F6] text-[#292824]">
        <h2 className="font-serif text-3xl mb-4">Category Not Found</h2>
        <p className="text-xs text-[#77786B] mb-6">The furniture category you are looking for does not exist.</p>
        <Link to="/products" className="bg-[#292824] text-white text-xs px-6 py-3 uppercase tracking-wider">
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF9F6] text-[#292824]">
      {/* Category Hero Banner */}
      <div className="bg-[#1A1916] text-[#FAF9F6] py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Products', href: '/products' },
              { label: category.name, href: `/category/${category.slug}` },
            ]}
          />
          <div className="max-w-3xl">
            {category.subtitle && (
              <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
                {category.subtitle}
              </span>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-6">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-[#C9BDAA] font-light leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Products in Category */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#C9BDAA]/40">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#292824]">
              Available Designs &amp; Formats
            </h2>
            <p className="text-xs text-[#77786B] font-light mt-1">
              Manufactured with verified dimensions, glazing, and material finishes.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-1.5 text-xs text-[#A76F55] hover:underline uppercase tracking-wider font-medium"
          >
            <span>Ask About Pricing & Customisation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards */}
        {(!category.products || category.products.length === 0) ? (
          <div className="text-center py-16 bg-[#F5F2EC] p-8 border border-[#C9BDAA]/30">
            <p className="text-xs text-[#77786B]">No published products currently listed under this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {category.products.map((prod) => (
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
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Category Consultation Box */}
        <div className="mt-16 p-8 bg-[#F5F2EC] border border-[#C9BDAA]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-2xl font-light text-[#292824]">
              Have questions about {category.name}?
            </h4>
            <p className="text-xs text-[#77786B] font-light mt-1 max-w-xl">
              Talk to our design team to discuss custom sizing, finishes, or to visit our Delhi experience centre.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 bg-[#292824] text-[#FAF9F6] px-6 py-3 text-xs tracking-architectural uppercase hover:bg-[#A76F55] transition-colors"
          >
            <span>Contact Us</span>
          </Link>
        </div>
      </div>

      {/* Quick Product Enquiry Modal */}
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
                    Code: {selectedProduct.product_code || 'Standard'} · {category.name}
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
