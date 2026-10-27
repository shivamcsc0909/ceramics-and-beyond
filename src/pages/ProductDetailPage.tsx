import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight, Check, FileDown, Layers, CheckCircle2, ShieldCheck, Mail, Phone } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { api } from '../api/client';

interface ProductDetailData {
  id: number;
  slug: string;
  name: string;
  category_name?: string;
  category_slug: string;
  product_code?: string;
  short_description: string;
  description: string;
  pattern_design?: string;
  material_finish?: string;
  dimensions?: string[];
  applications?: string[];
  technical_sheet_url?: string;
  cover_image_url: string;
  image_alt: string;
  gallery?: { image_url: string; alt_text?: string; caption?: string }[];
  related_products?: {
    id: number;
    slug: string;
    name: string;
    product_code?: string;
    cover_image_url: string;
    image_alt?: string;
    pattern_design?: string;
  }[];
}

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // In-page Enquiry Form State
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
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await api.get(`/api/public/products/${slug}`);
        setProduct(data);
        setActiveImage(data.cover_image_url);
      } catch (e) {
        console.error('Failed to load product details:', e);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
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
        productCategory: product?.category_name || product?.category_slug,
        estimatedQuantity: form.estimatedQuantity,
        message: `Product Specification Inquiry for: ${product?.name} (${product?.product_code || 'N/A'})\n\n${form.message}`,
      });
      setEnquirySuccess(true);
    } catch (err: any) {
      alert(err.message || 'Error submitting enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="pt-32 pb-24 text-center text-xs text-[#77786B] bg-[#FAF9F6]">Loading product specifications...</div>;
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center bg-[#FAF9F6] text-[#292824]">
        <h2 className="font-serif text-3xl mb-4">Product Not Found</h2>
        <p className="text-xs text-[#77786B] mb-6">The requested furniture design could not be found.</p>
        <Link to="/products" className="bg-[#292824] text-white text-xs px-6 py-3 uppercase tracking-wider">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const allImages = [
    { image_url: product.cover_image_url, alt_text: product.image_alt || product.name },
    ...(product.gallery || []),
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF9F6] text-[#292824]">
      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products' },
            { label: product.category_name || product.category_slug, href: `/category/${product.category_slug}` },
            { label: product.name, href: `/products/${product.slug}` },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Imagery & Gallery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-[#E8E4DC] border border-[#C9BDAA]/40 shadow-lg mb-4">
              <img
                src={activeImage || product.cover_image_url}
                alt={product.image_alt || product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              {product.product_code && (
                <span className="absolute top-4 left-4 bg-[#292824] text-[#FAF9F6] text-xs font-mono tracking-widest px-3 py-1">
                  {product.product_code}
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img.image_url)}
                    className={`w-20 h-20 shrink-0 border overflow-hidden transition-all ${
                      activeImage === img.image_url ? 'border-[#292824] ring-2 ring-[#292824]/20' : 'border-[#C9BDAA]/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.image_url} alt={img.alt_text || 'Furniture thumbnail'} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Contextual Application Note */}
            <div className="mt-8 p-4 bg-[#F5F2EC] border border-[#C9BDAA]/30 text-xs text-[#77786B] leading-relaxed">
              <strong>Contextual Application Notice:</strong> Photography displays actual furniture finishes and material detailing. Room settings represent contextual design potential. All dimensions, finishes, and configurations are customized to the last inch prior to in-house manufacturing.
            </div>
          </div>

          {/* Right Column: Verified Specifications & Enquiry Form */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-2">
                {product.category_name || product.category_slug.replace('-', ' ')}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#292824] font-light tracking-wide mb-4">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#77786B] font-light leading-relaxed mb-6">
                {product.description || product.short_description}
              </p>

              {/* Verified Technical Details Table */}
              <div className="border-t border-b border-[#C9BDAA]/40 py-6 my-6 space-y-3">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#292824] font-semibold block mb-2">
                  Verified Technical Specifications
                </span>

                {product.product_code && (
                  <div className="flex justify-between text-xs py-1 border-b border-[#C9BDAA]/20">
                    <span className="text-[#77786B]">Product Code</span>
                    <span className="font-mono font-medium text-[#292824]">{product.product_code}</span>
                  </div>
                )}

                {product.pattern_design && (
                  <div className="flex justify-between text-xs py-1 border-b border-[#C9BDAA]/20">
                    <span className="text-[#77786B]">Pattern / Motif</span>
                    <span className="text-[#292824] text-right font-medium">{product.pattern_design}</span>
                  </div>
                )}

                {product.material_finish && (
                  <div className="flex justify-between text-xs py-1 border-b border-[#C9BDAA]/20">
                    <span className="text-[#77786B]">Material &amp; Finish</span>
                    <span className="text-[#292824] text-right font-medium">{product.material_finish}</span>
                  </div>
                )}

                {product.dimensions && product.dimensions.length > 0 && (
                  <div className="text-xs py-1 border-b border-[#C9BDAA]/20">
                    <span className="text-[#77786B] block mb-1">Available Dimensions</span>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {product.dimensions.map((dim, dIdx) => (
                        <span key={dIdx} className="bg-[#E8E4DC] px-2 py-0.5 rounded text-[11px] font-mono">
                          {dim}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.applications && product.applications.length > 0 && (
                  <div className="text-xs py-1">
                    <span className="text-[#77786B] block mb-1">Suitable Applications</span>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {product.applications.map((app, aIdx) => (
                        <span key={aIdx} className="bg-[#FAF9F6] border border-[#C9BDAA]/50 px-2 py-0.5 rounded text-[11px]">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* B2B Enquiry Form Section */}
            <div className="bg-[#F5F2EC] border border-[#C9BDAA]/40 p-6 sm:p-7 mt-6">
              {enquirySuccess ? (
                <div className="text-center py-6">
                  <div className="w-10 h-10 rounded-full bg-[#A76F55]/20 text-[#A76F55] flex items-center justify-center mx-auto mb-3">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl font-normal mb-1">Trade Enquiry Received</h4>
                  <p className="text-xs text-[#77786B] max-w-xs mx-auto mb-4">
                    Our New Delhi sales desk will review your specifications for <strong>{product.name}</strong> and contact you with sample / export pricing.
                  </p>
                  <button
                    type="button"
                    onClick={() => setEnquirySuccess(false)}
                    className="text-xs uppercase tracking-wider text-[#A76F55] underline font-medium"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <span className="text-[10px] tracking-widest uppercase text-[#A76F55] font-semibold block mb-1">
                      Direct B2B Enquiry
                    </span>
                    <h4 className="font-serif text-xl font-light text-[#292824]">
                      Enquire About This Product
                    </h4>
                  </div>

                  <form onSubmit={handleEnquirySubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Company / Firm"
                          value={form.companyName}
                          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                          className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Business Email *"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          placeholder="Phone / WhatsApp *"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Country / City"
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Est. Units (e.g. 1 Kitchen, 2 Vanities)"
                          value={form.estimatedQuantity}
                          onChange={(e) => setForm({ ...form, estimatedQuantity: e.target.value })}
                          className="w-full text-xs p-2.5 bg-white border border-[#C9BDAA]/60 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <textarea
                        required
                        rows={2}
                        placeholder="Inquiry details, project timeline, port or delivery requirements..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full text-xs p-2 bg-white border border-[#C9BDAA]/60 outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#292824] text-[#FAF9F6] py-3 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors"
                    >
                      {submitting ? 'Submitting...' : 'Request Information & Pricing'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {product.related_products && product.related_products.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#C9BDAA]/40">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl font-light text-[#292824]">
                Related Designs in {product.category_name}
              </h3>
              <Link
                to={`/category/${product.category_slug}`}
                className="text-xs uppercase tracking-wider text-[#A76F55] hover:underline"
              >
                View Category
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.related_products.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/products/${rel.slug}`}
                  className="group bg-[#FAF9F6] border border-[#C9BDAA]/30 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="aspect-square bg-[#E8E4DC] overflow-hidden">
                    <img
                      src={rel.cover_image_url}
                      alt={rel.image_alt || rel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    {rel.product_code && (
                      <span className="text-[10px] font-mono text-[#A76F55] block mb-0.5">{rel.product_code}</span>
                    )}
                    <h4 className="font-serif text-base text-[#292824] group-hover:text-[#A76F55] transition-colors">
                      {rel.name}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
