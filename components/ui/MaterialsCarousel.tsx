"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { MATERIALS_IN_FOCUS } from "@/data/materials";

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
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 340;
      const scrollAmount = direction === "left" ? -cardWidth * 1.5 : cardWidth * 1.5;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  // Mouse drag implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    checkScroll();
  };

  return (
    <section className="py-24 sm:py-32 bg-[#F5F2EC] text-[#292824] overflow-hidden border-t border-[#C9BDAA]/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3">
              <Layers className="w-3.5 h-3.5 text-[#A76F55]" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76F55] font-semibold">
                Finishes &amp; Slabs
              </span>
            </div>
            <h2 className="font-serif text-display-section font-light text-[#292824] leading-tight">
              Materials in Focus
            </h2>
            <p className="mt-2 text-sm text-[#77786B] font-light max-w-lg">
              Explore the tactile nuances of our hand-selected natural marble, compact porcelain, fluted reliefs, and smoked timber veneers.
            </p>
          </div>

          {/* Prev/Next Buttons */}
          <div className="flex items-center space-x-3 self-start sm:self-end">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous material"
              className={`w-11 h-11 rounded-full border border-[#292824]/30 flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "hover:bg-[#292824] hover:text-[#FAF9F6] text-[#292824] cursor-pointer"
                  : "opacity-30 cursor-not-allowed text-[#77786B]"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Next material"
              className={`w-11 h-11 rounded-full border border-[#292824]/30 flex items-center justify-center transition-all ${
                canScrollRight
                  ? "hover:bg-[#292824] hover:text-[#FAF9F6] text-[#292824] cursor-pointer"
                  : "opacity-30 cursor-not-allowed text-[#77786B]"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className={`flex space-x-6 overflow-x-auto pb-8 pt-2 scrollbar-none cursor-grab active:cursor-grabbing select-none -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {MATERIALS_IN_FOCUS.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] group bg-[#FAF9F6] border border-[#C9BDAA]/40 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE7DE]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 290px, 380px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute top-4 left-4 bg-[#292824]/90 backdrop-blur-sm text-white px-2.5 py-1 text-[9px] tracking-widest uppercase">
                  {item.category}
                </div>
              </div>

              <div className="p-6">
                <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] block mb-1 font-semibold">
                  Finish: {item.finish}
                </span>
                <h3 className="font-serif text-xl font-light text-[#292824] mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-[#525049] font-light leading-relaxed mb-4">
                  {item.tactileNote}
                </p>
                <div className="pt-3 border-t border-[#C9BDAA]/30 text-[11px] text-[#77786B]">
                  <span className="font-medium text-[#292824]">Ideal application:</span> {item.bestFor}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
