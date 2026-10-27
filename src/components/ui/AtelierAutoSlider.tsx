import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Pause, Play } from 'lucide-react';

export interface SlideItem {
  id: number;
  title: string;
  category: string;
  detail: string;
  image: string;
  link: string;
  badge?: string;
}

export const SLIDES_DATA: SlideItem[] = [
  {
    id: 1,
    title: 'Atelier Contemporary Walnut Island Kitchen',
    category: 'Modular Kitchens',
    detail: 'Floor-to-ceiling cabinetry with seamless quartz waterfall counter and integrated appliance garaging.',
    image: '/images/contemporary-walnut-island-kitchen.jpeg',
    link: '/category/modular-furniture',
    badge: 'In-House Production',
  },
  {
    id: 2,
    title: 'Signature Walk-In Wardrobe Suite',
    category: 'Modular Wardrobes',
    detail: 'Floor-to-ceiling smoked glass shutters, warm internal timber veneer, and motion sensor LED lighting.',
    image: '/images/translucent-glass-wardrobe.jpeg',
    link: '/category/modular-furniture',
    badge: 'German Hardware',
  },
  {
    id: 3,
    title: 'Floating Organic TV Feature Console',
    category: 'Functional & Statement',
    detail: 'Curved wooden flutes, acoustic wall paneling, and concealed cable chases tailored around your room.',
    image: '/images/floating-tv-console.jpeg',
    link: '/category/functional-statement',
    badge: 'Bespoke Joinery',
  },
  {
    id: 4,
    title: 'Fluted Island with Champagne Metal Accents',
    category: 'Modular Kitchens',
    detail: 'Fluted walnut island profile with champagne metal accents and soft-close Blum lift-up systems.',
    image: '/images/fluted-island-kitchen.jpeg',
    link: '/category/modular-furniture',
    badge: 'Blum Motion',
  },
  {
    id: 5,
    title: 'Luxury Floating Bathroom Vanity',
    category: 'Statement Vanities',
    detail: 'High-density moisture-sealed polyurethane finish with seamless undermount stone basin and fluting.',
    image: '/images/luxury-bathroom-vanity.jpeg',
    link: '/category/functional-statement',
    badge: 'Waterproof PU',
  },
  {
    id: 6,
    title: 'Contemporary Sanctum Mandir',
    category: 'Sacred Spaces',
    detail: 'Precision CNC-carved jali details, warm backlit alabaster accents, and concealed prayer pull-outs.',
    image: '/images/sanctum-mandir.jpeg',
    link: '/category/functional-statement',
    badge: 'Handcrafted',
  },
  {
    id: 7,
    title: 'Monolithic Dining Table & Credenza',
    category: 'Bespoke Furniture',
    detail: 'Handcrafted solid wood dining centerpiece with organic chamfered edges and bespoke matching credenza.',
    image: '/images/dining-hall.jpeg',
    link: '/category/bespoke-furniture',
    badge: 'Solid Hardwood',
  },
  {
    id: 8,
    title: 'Artisan Platform Bed Suite',
    category: 'Bespoke Bedrooms',
    detail: 'Extended upholstered bouclé headboard panel with integrated wireless charging and floating nightstands.',
    image: '/images/bedroom.jpeg',
    link: '/category/bespoke-furniture',
    badge: 'Tailored to Inch',
  },
  {
    id: 9,
    title: 'In-House Panel Sizing & CNC Milling',
    category: 'The Live Counter',
    detail: 'Computerized panel sizing, zero-gap polyurethane edge-banding, and dust-free spray booths under one roof.',
    image: '/images/in-house-cnc.jpeg',
    link: '/craftsmanship',
    badge: 'Factory Floor',
  },
  {
    id: 10,
    title: 'Specialty PU & Finishes Swatch Palette',
    category: 'Finishes Palette',
    detail: 'Unlimited RAL and Pantone colour-matched PU paints, natural veneers, duco, glass, and woven rattan.',
    image: '/images/finishes-palette.jpeg',
    link: '/category/finishes-palette',
    badge: 'Custom Colours',
  },
  {
    id: 11,
    title: 'Sculptural Wooden Seating & Joinery',
    category: 'Master Joinery',
    detail: 'Curved organic wooden joinery and bespoke minimalist chairs handcrafted in our New Delhi facility.',
    image: '/images/designer-wooden-chair.jpeg',
    link: '/category/bespoke-furniture',
    badge: 'Artisanal Craft',
  },
  {
    id: 12,
    title: 'Experience Centre Walkthrough Lounge',
    category: 'Atelier Experience',
    detail: 'Walk directly from our design lounge to the live factory floor. Witness cabinetry taking shape in real time.',
    image: '/images/experience-centre.jpeg',
    link: '/craftsmanship',
    badge: 'New Delhi Studio',
  },
];

export const AtelierAutoSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = SLIDES_DATA.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-advancing slider every 3.8 seconds
  useEffect(() => {
    if (isPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        nextSlide();
      }, 3800);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, nextSlide]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentItem = SLIDES_DATA[currentIndex];

  return (
    <section className="py-20 sm:py-28 bg-[#1A1916] text-[#FAF9F6] border-t border-[#33312C] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A76F55]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C9BDAA]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-6 border-b border-[#33312C] gap-6">
          <div>
            <div className="inline-flex items-center space-x-2.5 mb-2.5">
              <Sparkles className="w-4 h-4 text-[#A76F55]" />
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold">
                Living Gallery in Motion
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide text-[#FAF9F6] leading-tight">
              Craftsmanship Across Every Space
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#C9BDAA] font-light max-w-xl">
              From modular kitchens and floor-to-ceiling wardrobes to architectural living panels and factory floor precision.
            </p>
          </div>

          {/* Slider Control Toolbar */}
          <div className="flex items-center space-x-3 self-start md:self-end">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="p-2.5 rounded-full border border-[#C9BDAA]/30 text-[#C9BDAA] hover:text-white hover:border-[#FAF9F6] transition-all"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              title={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full border border-[#C9BDAA]/30 text-[#C9BDAA] hover:text-white hover:border-[#FAF9F6] transition-all"
              aria-label="Previous creation"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-[#C9BDAA] px-2 select-none">
              <span className="text-white font-semibold">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="opacity-50"> / {String(totalSlides).padStart(2, '0')}</span>
            </span>

            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full border border-[#C9BDAA]/30 text-[#C9BDAA] hover:text-white hover:border-[#FAF9F6] transition-all"
              aria-label="Next creation"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Interactive Carousel Stage */}
        <div
          className="relative group select-none"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Visual Frame */}
          <div className="relative aspect-[16/10] sm:aspect-[21/9] min-h-[380px] sm:min-h-[440px] md:min-h-[500px] w-full overflow-hidden bg-[#22211D] border border-[#33312C] shadow-2xl">
            <img
              key={currentItem.id}
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-full object-cover object-center animate-fadeIn"
              loading="eager"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent" />

            {/* Badge */}
            {currentItem.badge && (
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-[#A76F55] text-white px-3 py-1 text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold">
                {currentItem.badge}
              </div>
            )}

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 text-[#FAF9F6] max-w-3xl">
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#C9BDAA] block mb-1.5 sm:mb-2">
                {currentItem.category}
              </span>

              <h3 className="font-serif text-xl sm:text-3xl md:text-4xl font-light text-white mb-2 sm:mb-3 leading-tight">
                {currentItem.title}
              </h3>

              <p className="text-xs sm:text-sm md:text-base text-[#ECE7DE]/90 font-light leading-relaxed mb-4 sm:mb-6 max-w-2xl line-clamp-2 sm:line-clamp-none">
                {currentItem.detail}
              </p>

              <Link
                to={currentItem.link}
                className="inline-flex items-center space-x-2 text-xs sm:text-sm tracking-architectural uppercase text-[#C9BDAA] hover:text-white font-medium transition-colors border-b border-[#C9BDAA]/40 pb-1"
              >
                <span>Explore Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Thumbnails Strip (Scrollable on small, grid on medium) */}
          <div className="mt-4 sm:mt-6 flex space-x-2.5 sm:space-x-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SLIDES_DATA.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative shrink-0 w-16 sm:w-20 md:w-24 aspect-[4/3] overflow-hidden border transition-all duration-300 ${
                  currentIndex === idx
                    ? 'border-[#A76F55] ring-2 ring-[#A76F55]/40 opacity-100 scale-105'
                    : 'border-[#33312C] opacity-50 hover:opacity-90'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              >
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
