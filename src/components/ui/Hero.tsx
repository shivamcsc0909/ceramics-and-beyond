import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface HeroProps {
  content?: {
    eyebrow?: string;
    headline?: string;
    headline_accent?: string;
    supporting_text?: string;
    cta_primary_label?: string;
    cta_primary_url?: string;
    cta_secondary_label?: string;
    cta_secondary_url?: string;
  };
}

// Authentic client work images covering Sofas, Wooden Furniture & Joinery, and Designer Tiles
const HERO_SLIDES = [
  {
    url: '/images/sofa.jpeg',
    label: 'Custom Sofas & Seating',
    alt: 'Handcrafted luxury sofa and bespoke living room furniture',
  },
  {
    url: '/images/wooden-furniture-of-luxury-kitchens.jpeg',
    label: 'Wooden Furniture & Kitchens',
    alt: 'Solid wood furniture and modular luxury kitchen joinery',
  },
  {
    url: '/images/tiles.jpeg',
    label: 'Designer Architectural Tiles',
    alt: 'Designer wall and floor tiles collection',
  },
  {
    url: '/images/living-hall.jpeg',
    label: 'Living Spaces & Sofas',
    alt: 'Living hall featuring bespoke sofas and timber feature walls',
  },
  {
    url: '/images/wooden-closet.jpeg',
    label: 'Solid Wood Closets & Wardrobes',
    alt: 'Custom handcrafted wooden closet and wardrobes',
  },
  {
    url: '/images/multiple-tiles-varir-eities-sample.jpeg',
    label: 'Tiles & Surface Finishes',
    alt: 'Multiple designer tiles varieties and surface texture samples',
  },
  {
    url: '/images/contemporary-walnut-island-kitchen.jpeg',
    label: 'Modern Modular Kitchens',
    alt: 'Contemporary walnut island kitchen with seamless cabinets',
  },
  {
    url: '/images/designer-wooden-chair.jpeg',
    label: 'Handcrafted Wooden Seating',
    alt: 'Handcrafted solid wood designer chair and precision joinery',
  },
  {
    url: '/images/marbel-tiles-coating-or-paint-.jpeg',
    label: 'Marble Tiles Coating & Finishes',
    alt: 'Marble tiles coating, paint, and surface treatments',
  },
  {
    url: '/images/dining-hall.jpeg',
    label: 'Bespoke Wooden Dining Tables',
    alt: 'Solid wood dining hall table and handcrafted chairs',
  },
];

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slides smoothly every 3.8 seconds without any buttons or indicators
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const eyebrow = content?.eyebrow || 'Factory & Experience Centre · New Delhi';
  const headline = content?.headline || 'We manufacture Furniture';
  const accent = content?.headline_accent || 'Thoughtfully Made. Entirely Yours.';
  const supporting =
    content?.supporting_text && !content.supporting_text.includes('/export-enquiries') && !content.supporting_text.includes('1993') && !content.supporting_text.includes('Founded by a NIFT')
      ? content.supporting_text
      : 'Custom Sofas, Wooden Furniture, Modular Kitchens, Wardrobes & Designer Tiles. Handcrafted in our New Delhi workshop for your home.';
  const primaryLabel = content?.cta_primary_label || 'EXPLORE WHAT WE MAKE';
  const primaryUrl = (content?.cta_primary_url && content.cta_primary_url !== '/export-enquiries') ? content.cta_primary_url : '/products';
  const secondaryLabel = (content?.cta_secondary_label && content?.cta_secondary_url !== '/export-enquiries' && content?.cta_secondary_label !== 'BOOK CONSULTATION') ? content.cta_secondary_label : 'CONTACT US';
  const secondaryUrl = '/contact';

  return (
    <section className="relative w-full min-h-[100svh] flex items-end justify-start overflow-hidden bg-[#1A1916] pt-24 sm:pt-28 md:pt-32">
      {/* Full Size Auto-Appearing Background Images (Plain, No Buttons or Indicators) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.url}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
            >
              <img
                src={slide.url}
                alt={slide.alt}
                className="w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out scale-105"
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
              />
            </div>
          );
        })}

        {/* Clean subtle caption tag displaying current craft being shown */}
        <div className="absolute top-28 right-6 sm:right-12 z-20 hidden sm:block">
          <span className="text-[11px] tracking-[0.25em] uppercase text-white/80 bg-black/40 backdrop-blur-md px-3.5 py-1.5 border border-white/15">
            {HERO_SLIDES[currentIndex].label}
          </span>
        </div>

        {/* Cinematic gradient overlays for high text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center space-x-2.5 mb-3 sm:mb-5">
            <span className="w-6 sm:w-8 h-[1px] bg-[#C9BDAA]" />
            <span className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#C9BDAA] font-medium">
              {eyebrow}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-display-hero text-[#FAF9F6] font-light tracking-wide mb-4 sm:mb-6">
            <span className="block">{headline}</span>
            <span className="italic font-normal text-[#C9BDAA] block sm:inline text-[0.85em] sm:text-[0.9em] mt-1 sm:mt-0">
              {accent}
            </span>
          </h1>

          {/* Supporting Copy - Simple and Clear Language */}
          <p className="text-sm sm:text-base md:text-lg text-[#F5F2EC]/90 font-light leading-relaxed max-w-xl mb-6 sm:mb-10">
            {supporting}
          </p>

          {/* Dual Simple CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
            <Link
              to={primaryUrl}
              className="inline-flex items-center justify-center space-x-3 bg-[#FAF9F6] text-[#1A1916] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm tracking-architectural uppercase font-medium hover:bg-[#C9BDAA] transition-colors duration-300 shadow-lg text-center"
            >
              <span>{primaryLabel}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </Link>

            <Link
              to={secondaryUrl}
              className="inline-flex items-center justify-center space-x-3 border border-[#FAF9F6]/40 text-[#FAF9F6] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm tracking-architectural uppercase font-medium hover:bg-[#FAF9F6]/10 hover:border-[#FAF9F6] transition-all duration-300 text-center"
            >
              <span>{secondaryLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
