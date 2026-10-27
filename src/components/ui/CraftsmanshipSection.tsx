import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Eye, Layers } from 'lucide-react';

interface CraftsmanshipSectionProps {
  content?: {
    section_tag?: string;
    headline?: string;
    supporting_text?: string;
    feature_1_title?: string;
    feature_1_text?: string;
    feature_2_title?: string;
    feature_2_text?: string;
    feature_3_title?: string;
    feature_3_text?: string;
    cta_label?: string;
    cta_url?: string;
    image_url?: string;
    image_alt?: string;
  };
}

const isTileLegacy = (str?: string) => {
  if (!str) return false;
  return /ceramic|tile|bansal|1993|u00b7|biscuit|porcelain|pattern tells a story|hand-printed precision|sandblast/i.test(str);
};

const safeStr = (val: string | undefined, fallback: string) => {
  if (!val || isTileLegacy(val)) return fallback;
  return val;
};

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({ content }) => {
  const tag = safeStr(content?.section_tag, 'Factory & Experience Centre · New Delhi');
  const headline = safeStr(content?.headline, 'The Live Counter Concept: See Your Furniture Being Made.');
  const supporting = safeStr(
    content?.supporting_text,
    'Think of it as watching your paneer tikka being prepared fresh at a live counter — except this time, it is your kitchen, sofa, and bespoke furniture taking shape right in front of you. Total transparency from raw wood to final polish.'
  );
  const f1Title = safeStr(content?.feature_1_title, 'Custom Made For Your Home');
  const f1Text = safeStr(content?.feature_1_text, 'We make furniture according to your room dimensions with zero wasted corners.');
  const f2Title = safeStr(content?.feature_2_title, 'Made in Our Own Workshop');
  const f2Text = safeStr(content?.feature_2_text, 'Computer-controlled cutting, clean edge-banding, and dust-free spray painting booths.');
  const f3Title = safeStr(content?.feature_3_title, 'German Soft-Close Hardware');
  const f3Text = safeStr(content?.feature_3_text, 'Fitted with lifetime smooth Blum and Hettich hinges and soft-closing drawer runners.');
  const ctaLabel = safeStr(content?.cta_label, 'VISIT OUR EXPERIENCE CENTRE');
  const ctaUrl = safeStr(content?.cta_url, '/craftsmanship');
  const imgUrl = (content?.image_url && !isTileLegacy(content?.image_url)) ? content.image_url : '/images/in-house-cnc.jpeg';
  const imgAlt = safeStr(content?.image_alt, 'In-house panel sizing, CNC milling, and live furniture making at Ceramics & Beyond experience centre');

  return (
    <section className="py-24 sm:py-32 bg-[#1A1916] text-[#FAF9F6] border-t border-[#33312C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#292824] shadow-2xl border border-[#C9BDAA]/20">
              <img
                src={imgUrl}
                alt={imgAlt}
                className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Live Counter Badge */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:right-8 bg-[#292824] border border-[#C9BDAA]/30 p-4 sm:p-5 sm:max-w-sm shadow-xl">
              <div className="flex items-center space-x-2 text-[#A76F55] mb-1 font-semibold text-[10px] tracking-[0.2em] uppercase">
                <Eye className="w-3.5 h-3.5 shrink-0" />
                <span>The Live Counter Concept</span>
              </div>
              <p className="text-xs text-[#FAF9F6]/85 font-light leading-relaxed">
                Think of it as watching your paneer tikka being prepared fresh at a live counter — except this time, it’s your kitchen taking shape.
              </p>
            </div>
          </div>

          {/* Copy and Pillars */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
              {tag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-[#FAF9F6] mb-6 leading-tight">
              {headline}
            </h2>
            <p className="text-sm sm:text-base text-[#C9BDAA] font-light leading-relaxed mb-10">
              {supporting}
            </p>

            {/* Three Pillars */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full border border-[#C9BDAA]/30 flex items-center justify-center shrink-0 bg-[#292824] text-[#C9BDAA]">
                  <CheckCircle2 className="w-5 h-5 text-[#A76F55]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#FAF9F6] font-light mb-1">{f1Title}</h4>
                  <p className="text-xs text-[#C9BDAA]/80 font-light leading-relaxed">{f1Text}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full border border-[#C9BDAA]/30 flex items-center justify-center shrink-0 bg-[#292824] text-[#C9BDAA]">
                  <Layers className="w-5 h-5 text-[#A76F55]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#FAF9F6] font-light mb-1">{f2Title}</h4>
                  <p className="text-xs text-[#C9BDAA]/80 font-light leading-relaxed">{f2Text}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full border border-[#C9BDAA]/30 flex items-center justify-center shrink-0 bg-[#292824] text-[#C9BDAA]">
                  <ShieldCheck className="w-5 h-5 text-[#A76F55]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#FAF9F6] font-light mb-1">{f3Title}</h4>
                  <p className="text-xs text-[#C9BDAA]/80 font-light leading-relaxed">{f3Text}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[#33312C]">
              <Link
                to={ctaUrl}
                className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase text-[#FAF9F6] hover:text-[#A76F55] font-medium transition-colors"
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
