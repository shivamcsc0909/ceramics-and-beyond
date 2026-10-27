"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[100svh] min-h-[640px] flex items-end justify-start overflow-hidden bg-[#1A1916]">
      {/* Background Architectural Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2400&q=90"
          alt="Luxury architectural interior and bespoke kitchen with monolithic stone surfaces"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-100 animate-[fade-in_1.2s_ease-out]"
        />
        {/* Subtle cinematic gradient overlays for depth and contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center space-x-2.5 mb-4 sm:mb-6">
            <span className="w-8 h-[1px] bg-[#C9BDAA]" />
            <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#C9BDAA] font-medium">
              Architectural Surfaces · Live Kitchen Atelier
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-display-hero text-[#FAF9F6] font-light tracking-wide capitalize mb-4 sm:mb-6">
            Beyond Surfaces.<br />
            <span className="italic font-normal text-[#C9BDAA]">Beyond Ordinary.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base md:text-lg text-[#F5F2EC]/90 font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
            Thoughtfully curated surfaces and materials for spaces that inspire. Witness your bespoke kitchen crafted live on our factory floor.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/collections"
              className="inline-flex items-center space-x-3 bg-[#FAF9F6] text-[#1A1916] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm tracking-architectural uppercase font-medium hover:bg-[#C9BDAA] transition-colors duration-300 shadow-lg"
            >
              <span>Explore Our World</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/experience"
              className="inline-flex items-center space-x-3 border border-[#C9BDAA]/70 text-[#FAF9F6] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm tracking-architectural uppercase font-medium hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              <span>The Live Experience</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute right-6 sm:right-12 bottom-8 z-20 hidden md:flex flex-col items-center space-y-2 text-[#C9BDAA]">
        <span className="text-[10px] tracking-[0.25em] uppercase [writing-mode:vertical-lr] text-[#FAF9F6]/70">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-[#C9BDAA]/30 relative overflow-hidden">
          <div className="w-full h-1/2 bg-[#C9BDAA] animate-[scroll-drop_2s_infinite]" />
        </div>
      </div>
    </section>
  );
};
