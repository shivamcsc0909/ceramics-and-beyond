import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { MATERIALS } from '../../data/materials';

export const MaterialsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (direction === 'right' && scrollLeft >= scrollWidth - clientWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  // Auto-swiping timer every 4 seconds when not hovered/dragging
  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      scroll('right');
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeftState(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6] text-[#292824] border-t border-[#C9BDAA]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3">
              <Layers className="w-4 h-4 text-[#A76F55]" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76F55] font-semibold">
                Finishes &amp; Materials Palette
              </span>
            </div>
            <h2 className="font-serif text-display-section font-light text-[#292824] leading-tight">
              Tactile Palette &amp; Surface Library
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#77786B] font-light max-w-xl">
              We specialise in PU paint finishes and offer a versatile palette—from natural veneers, duco, and back-painted glass to rattan inlays and premium louvers.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center space-x-2 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous material"
              className={`p-3 border border-[#292824]/20 rounded-full transition-all ${
                canScrollLeft
                  ? 'hover:border-[#292824] hover:bg-[#292824] hover:text-[#FAF9F6] text-[#292824]'
                  : 'opacity-30 cursor-not-allowed text-[#292824]/40'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next material"
              className={`p-3 border border-[#292824]/20 rounded-full transition-all ${
                canScrollRight
                  ? 'hover:border-[#292824] hover:bg-[#292824] hover:text-[#FAF9F6] text-[#292824]'
                  : 'opacity-30 cursor-not-allowed text-[#292824]/40'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Reel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseUp();
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className={`flex space-x-4 sm:space-x-6 overflow-x-auto pb-6 sm:pb-8 select-none cursor-grab active:cursor-grabbing snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          {MATERIALS.map((item) => (
            <div
              key={item.id}
              className="snap-start flex-shrink-0 w-[260px] sm:w-[320px] md:w-[340px] bg-[#ECE7DE] border border-[#C9BDAA]/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Material Texture Preview */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#292824]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 text-[9px] tracking-[0.25em] uppercase font-mono bg-[#1A1916]/80 text-[#FAF9F6] px-2.5 py-1 backdrop-blur-sm">
                  {item.category}
                </span>
                <span className="absolute bottom-4 left-4 text-[10px] tracking-wider uppercase text-[#C9BDAA] font-medium">
                  {item.finish}
                </span>
              </div>

              {/* Material Specs */}
              <div className="p-5 sm:p-6 bg-[#FAF9F6]">
                <h3 className="font-serif text-lg sm:text-xl font-light text-[#292824] mb-2 group-hover:text-[#A76F55] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-[#77786B] font-light leading-relaxed mb-4 line-clamp-2">
                  {item.tactileNote}
                </p>

                <div className="pt-3 border-t border-[#C9BDAA]/30 text-[10px] uppercase tracking-wider text-[#A76F55] font-medium">
                  Best For: <span className="text-[#292824] normal-case tracking-normal">{item.bestFor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
