import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

interface BrandIntroProps {
  content?: {
    tag?: string;
    headline?: string;
    paragraph_1?: string;
    paragraph_2?: string;
    heritage_note?: string;
    metric_1_val?: string;
    metric_1_lbl?: string;
    metric_2_val?: string;
    metric_2_lbl?: string;
    metric_3_val?: string;
    metric_3_lbl?: string;
    image_url?: string;
    image_alt?: string;
  };
}

const isTileLegacy = (str?: string) => {
  if (!str) return false;
  return /ceramic|tile|bansal|1993|u00b7|biscuit|porcelain|legacy of ceramic/i.test(str);
};

const safeStr = (val: string | undefined, fallback: string) => {
  if (!val || isTileLegacy(val)) return fallback;
  return val;
};

export const BrandIntro: React.FC<BrandIntroProps> = ({ content }) => {
  const tag = safeStr(content?.tag, 'Founder Story · A Creative Instinct, A Passion for Making');
  const headline = safeStr(content?.headline, 'Designed Around You. Tailored to the Last Inch.');
  const p1 = safeStr(content?.paragraph_1, 'I have always been drawn to the art of making things beautiful. As a NIFT graduate, design has always been a part of who I am — from the smallest details to the way an entire space comes together. Over time, that creative instinct found its way into furniture, and what began as a love for design grew into a passion for creating things that are as practical as they are beautiful. That passion became Ceramics & Beyond.');
  const p2 = safeStr(content?.paragraph_2, 'As a woman entrepreneur in a traditionally male-dominated, manufacturing-intensive industry, I wanted to build something that reflected my own beliefs: thoughtful design, practical solutions, complete customisation and a personal involvement in every detail. I believe a home should be designed around the people living in it, not the other way around. Every corner should have a purpose, every detail should feel intentional, and every piece should make everyday living a little more effortless.');
  const heritageNote = safeStr(content?.heritage_note, '“Because making a house look good is one thing. Making it feel like home? That’s our job.”');
  const m1Val = content?.metric_1_val || '100%';
  const m1Lbl = content?.metric_1_lbl || 'In-House Production';
  const m2Val = content?.metric_2_val || '1-Roof';
  const m2Lbl = content?.metric_2_lbl || 'Factory & Studio';
  const m3Val = content?.metric_3_val || 'Bespoke';
  const m3Lbl = content?.metric_3_lbl || 'To The Last Inch';
  const imgUrl = (content?.image_url && !isTileLegacy(content?.image_url)) ? content.image_url : '/images/founder-story.jpeg';
  const imgAlt = content?.image_alt || 'NIFT graduate designer at work designing bespoke furniture at Ceramics & Beyond studio';

  return (
    <section className="py-24 sm:py-32 bg-[#F5F2EC] text-[#292824] border-b border-[#C9BDAA]/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-4">
              {tag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-tight mb-8">
              {headline}
            </h2>

            <div className="space-y-6 text-sm sm:text-base text-[#292824]/85 font-light leading-relaxed">
              <p>{p1}</p>
              <p>{p2}</p>
            </div>

            {/* Verification & Heritage Note */}
            <div className="mt-8 p-5 bg-[#FAF9F6] border-l-2 border-[#A76F55] text-sm text-[#292824] font-serif italic leading-relaxed">
              {heritageNote}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-[#C9BDAA]/40">
              <div>
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#292824] block font-light">
                  {m1Val}
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#77786B] mt-1 block">
                  {m1Lbl}
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#292824] block font-light">
                  {m2Val}
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#77786B] mt-1 block">
                  {m2Lbl}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#292824] block font-light">
                  {m3Val}
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#77786B] mt-1 block">
                  {m3Lbl}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Component */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#292824] shadow-2xl border border-[#C9BDAA]/40">
              <img
                src={imgUrl}
                alt={imgAlt}
                className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating Experience Box */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-left-8 bg-[#FAF9F6] border border-[#C9BDAA]/60 p-5 sm:p-6 sm:max-w-xs shadow-xl">
              <div className="flex items-center space-x-2 text-[#A76F55] mb-1.5 sm:mb-2">
                <HeartHandshake className="w-4 h-4 shrink-0" />
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">
                  Founder-Led Attention
                </span>
              </div>
              <p className="text-xs text-[#292824]/90 font-light leading-relaxed">
                Personal involvement from conceptual 3D layouts to finishing audits and white-glove site delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
