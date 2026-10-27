import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface FinalCTAProps {
  content?: {
    headline?: string;
    supporting_text?: string;
    cta_primary_label?: string;
    cta_primary_url?: string;
    cta_secondary_label?: string;
    cta_secondary_url?: string;
  };
}

const isTileLegacy = (str?: string) => {
  if (!str) return false;
  return /ceramic|tile|bansal|1993|u00b7|biscuit|porcelain|collection/i.test(str);
};

const safeStr = (val: string | undefined, fallback: string) => {
  if (!val || isTileLegacy(val)) return fallback;
  return val;
};

export const FinalCTA: React.FC<FinalCTAProps> = ({ content }) => {
  const headline = safeStr(content?.headline, 'Making a house look good is one thing. Making it feel like home? That’s our job.');
  const supporting = safeStr(content?.supporting_text, 'Simple yet seen. Practical yet personal. Made for the way you live. Explore bespoke furniture and in-house modular manufacturing tailored around you.');
  const pLabel = safeStr(content?.cta_primary_label, 'EXPLORE WHAT WE MAKE');
  const pUrl = safeStr(content?.cta_primary_url, '/products');
  const sLabel = safeStr(content?.cta_secondary_label, 'TALK TO OUR TEAM');
  const sUrl = '/contact';

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6] text-[#292824] border-t border-[#C9BDAA]/30">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-4">
          Ceramics &amp; Beyond · New Delhi
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-[#292824] mb-6 leading-tight">
          {headline}
        </h2>
        <p className="text-sm sm:text-base text-[#77786B] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          {supporting}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-md sm:max-w-none mx-auto">
          <Link
            to={pUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#292824] text-[#FAF9F6] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors duration-300 shadow-lg text-center"
          >
            <span>{pLabel}</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </Link>

          <Link
            to={sUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 border border-[#292824] text-[#292824] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm tracking-architectural uppercase font-medium hover:bg-[#292824] hover:text-[#FAF9F6] transition-all duration-300 text-center"
          >
            <span>{sLabel}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
