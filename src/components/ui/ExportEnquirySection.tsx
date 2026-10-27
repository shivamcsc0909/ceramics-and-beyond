import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Home, Layers, Sparkles } from 'lucide-react';

interface ExportEnquirySectionProps {
  content?: {
    section_tag?: string;
    headline?: string;
    supporting_text?: string;
    cta_label?: string;
    cta_url?: string;
  };
}

const isTileLegacy = (str?: string) => {
  if (!str) return false;
  return /ceramic|tile|bansal|1993|u00b7|biscuit|porcelain|supplier|export|russia|petersburg/i.test(str);
};

const safeStr = (val: string | undefined, fallback: string) => {
  if (!val || isTileLegacy(val)) return fallback;
  return val;
};

export const ExportEnquirySection: React.FC<ExportEnquirySectionProps> = ({ content }) => {
  const tag = safeStr(content?.section_tag, 'Custom Furniture Consultation');
  const headline = safeStr(content?.headline, 'Want Custom Furniture for Your Home?');
  const supporting = safeStr(content?.supporting_text, 'Talk directly with our team. Whether you need a comfortable custom sofa, solid wood furniture, modular kitchen, wardrobes, or designer tiles, we make everything right here in our New Delhi workshop.');
  const ctaLabel = safeStr(content?.cta_label, 'TALK TO OUR TEAM');
  const ctaUrl = '/contact';

  return (
    <section className="py-20 sm:py-28 bg-[#292824] text-[#FAF9F6] border-t border-[#33312C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-[#1A1916] border border-[#C9BDAA]/30 p-6 sm:p-10 lg:p-16 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#A76F55]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
                {tag}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide text-[#FAF9F6] mb-4 sm:mb-6 leading-tight">
                {headline}
              </h2>
              <p className="text-sm sm:text-base text-[#C9BDAA] font-light leading-relaxed mb-8 max-w-2xl">
                {supporting}
              </p>

              {/* Advantages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#33312C]">
                <div className="flex items-start space-x-3">
                  <Compass className="w-5 h-5 text-[#A76F55] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#FAF9F6] font-medium mb-1">Custom Sizes</h4>
                    <p className="text-[11px] text-[#C9BDAA]/80 font-light">Made to fit your room perfectly with zero wasted space.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Home className="w-5 h-5 text-[#A76F55] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#FAF9F6] font-medium mb-1">Direct from Workshop</h4>
                    <p className="text-[11px] text-[#C9BDAA]/80 font-light">No dealers or middlemen. See your furniture being made.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-[#A76F55] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#FAF9F6] font-medium mb-1">Top Materials</h4>
                    <p className="text-[11px] text-[#C9BDAA]/80 font-light">Solid wood, PU paint, smooth soft-close hardware & tiles.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <Link
                to={ctaUrl}
                className="inline-flex items-center justify-center space-x-3 bg-[#A76F55] text-white px-8 py-4 text-xs sm:text-sm tracking-architectural uppercase font-medium hover:bg-[#8e5c45] transition-colors shadow-xl w-full sm:w-auto text-center"
              >
                <span>{ctaLabel}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
