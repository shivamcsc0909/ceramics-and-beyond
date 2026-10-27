"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-28 sm:py-36 bg-[#1A1916] text-[#FAF9F6] overflow-hidden">
      {/* Background Architectural Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
          alt="Monolithic architectural surfaces and curated interior space"
          fill
          sizes="100vw"
          className="object-cover object-center scale-100"
        />
        <div className="absolute inset-0 bg-[#1A1916]/85 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#C9BDAA]/20 bg-[#22211D]/80 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A76F55]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9BDAA]">
            Atelier Consultation
          </span>
        </div>

        <h2 className="font-serif text-display-section text-[#FAF9F6] font-light leading-tight mb-6">
          Let’s Shape Your<br />
          <span className="italic font-normal text-[#C9BDAA]">Next Space.</span>
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#C9BDAA] font-light leading-relaxed max-w-xl mx-auto mb-10">
          Whether you are an architect designing a coastal villa, an interior studio specifying continuous porcelain slabs, or a homeowner ready to watch your bespoke kitchen crafted live.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/contact"
            className="inline-flex items-center space-x-3 bg-[#FAF9F6] text-[#1A1916] px-8 py-4 text-xs sm:text-sm tracking-architectural uppercase font-medium hover:bg-[#C9BDAA] transition-colors duration-300 shadow-xl"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/experience"
            className="inline-flex items-center space-x-3 border border-[#C9BDAA]/60 text-[#FAF9F6] px-8 py-4 text-xs sm:text-sm tracking-architectural uppercase font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            <span>Tour The Factory Floor</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
