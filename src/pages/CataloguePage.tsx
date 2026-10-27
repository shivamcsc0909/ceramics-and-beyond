import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ArrowUpRight, FileDown, BookOpen, Layers, CheckCircle2, Mail, Sparkles } from 'lucide-react';
import { api } from '../api/client';

export const CataloguePage: React.FC = () => {
  const [downloadRequested, setDownloadRequested] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleCatalogueRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/public/enquiry', {
        fullName: name,
        companyName: company,
        email: email,
        phone: 'Catalogue Download Request',
        country: 'India',
        enquiryType: 'Product Information',
        productCategory: 'Product Catalogue',
        message: `Digital bespoke furniture catalogue access requested by ${name} (${company || 'Individual'}).`,
      });
      setDownloadRequested(true);
    } catch (e) {
      setDownloadRequested(true);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF9F6] text-[#292824]">
      {/* Header */}
      <div className="bg-[#1A1916] text-[#FAF9F6] py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <Breadcrumbs items={[{ label: 'Product Catalogue', href: '/catalogue' }]} />
          <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-4">
            Bespoke Edition · 2026/2027
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide max-w-3xl leading-tight">
            Ceramics &amp; Beyond Lookbook
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#C9BDAA] font-light max-w-2xl leading-relaxed">
            Thoughtfully made. Entirely yours. Explore modular kitchens, bespoke wardrobes, living consoles, and our full specialty PU &amp; veneer finish palettes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Catalogue Mockup Preview */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-12 bg-[#292824] text-[#FAF9F6] border border-[#C9BDAA]/30 relative shadow-2xl">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76F55] block mb-2 font-mono">
                Official Studio Edition
              </span>
              <h2 className="font-serif text-3xl font-light mb-4">
                Bespoke &amp; Modular Living Lookbook
              </h2>
              <p className="text-xs text-[#C9BDAA] font-light leading-relaxed mb-8">
                Modular kitchens, walk-in closets, bespoke dining &amp; beds, and specialty PU paint shade cards.
              </p>

              <div className="space-y-3 border-t border-[#33312C] pt-6 text-xs text-[#FAF9F6]/85">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A76F55]" />
                  <span>Modular Kitchens (Island, L-Shape, Parallel) with Blum Motion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A76F55]" />
                  <span>Modular Wardrobes, Walk-in Closets &amp; Fluted Doors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A76F55]" />
                  <span>Functional TV Consoles, Mandirs, Vanities &amp; Bar Units</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A76F55]" />
                  <span>Specialty PU Paint (Unlimited RAL/Pantone) &amp; Natural Veneers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Download Access Form */}
          <div className="lg:col-span-6 bg-[#F5F2EC] p-8 sm:p-10 border border-[#C9BDAA]/40">
            {downloadRequested ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#A76F55]/20 text-[#A76F55] flex items-center justify-center mx-auto mb-4">
                  <FileDown className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-light mb-2">Lookbook Access Granted</h3>
                <p className="text-xs text-[#77786B] max-w-sm mx-auto mb-6">
                  Thank you, <strong>{name || 'Valued Client'}</strong>. Our full digital lookbook and finishes palette has been made available.
                </p>
                <div className="space-y-3">
                  <Link
                    to="/products"
                    className="block bg-[#292824] text-[#FAF9F6] text-xs uppercase tracking-wider py-3.5 hover:bg-[#A76F55] transition-colors"
                  >
                    Explore Product Showcase
                  </Link>
                  <Link
                    to="/export-enquiries"
                    className="block border border-[#292824] text-[#292824] text-xs uppercase tracking-wider py-3 hover:bg-[#292824] hover:text-white transition-colors"
                  >
                    Book In-Person Consultation
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCatalogueRequest} className="space-y-5">
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#A76F55] font-mono block mb-1">
                    Complimentary Digital Access
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#292824]">
                    Request Digital Lookbook
                  </h3>
                  <p className="text-xs text-[#77786B] mt-1">
                    Receive immediate digital access to our curated furniture lookbook and finishes specifications.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                    placeholder="e.g. Priya Kapoor"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">
                    Design Firm or Homeowner
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                    placeholder="e.g. Studio Vista / Homeowner"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#77786B] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-[#C9BDAA]/60 focus:border-[#292824] outline-none"
                    placeholder="priya@example.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#292824] text-[#FAF9F6] py-3.5 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors"
                >
                  Access Digital Lookbook
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
