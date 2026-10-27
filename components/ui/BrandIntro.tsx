"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const BrandIntro: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#F5F2EC] text-[#292824] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="w-6 h-[1px] bg-[#A76F55]" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76F55] font-semibold">
                Our Editorial Philosophy
              </span>
            </div>

            <h2 className="font-serif text-display-section font-light text-[#292824] leading-tight mb-6">
              Materials That<br />
              <span className="italic font-normal">Shape Experiences.</span>
            </h2>

            <div className="space-y-5 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
              <p>
                At Ceramics &amp; Beyond, we perceive architectural surfaces not as passive cladding, but as tactile canvases that orchestrate light, acoustic resonance, and human connection.
              </p>
              <p>
                From continuous, monolithic porcelain slabs that erase indoor-outdoor boundaries to hand-quarried European marble and precision German-engineered cabinetry, our curation unites geological authenticity with uncompromising industrial craft.
              </p>
            </div>

            {/* Metrics / Key highlights */}
            <div className="grid grid-cols-3 gap-6 py-8 my-6 border-y border-[#C9BDAA]/40">
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#292824] block font-light">3.2m</span>
                <span className="text-[10px] tracking-wider uppercase text-[#77786B]">Continuous Slabs</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#292824] block font-light">100%</span>
                <span className="text-[10px] tracking-wider uppercase text-[#77786B]">Live Transparency</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#292824] block font-light">0.1mm</span>
                <span className="text-[10px] tracking-wider uppercase text-[#77786B]">CNC Precision</span>
              </div>
            </div>

            <div>
              <Link
                href="/about"
                className="group inline-flex items-center space-x-2 text-xs sm:text-sm tracking-architectural uppercase text-[#292824] font-medium hover:text-[#A76F55] transition-colors"
              >
                <span>Discover Our Story</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] overflow-hidden bg-[#ECE7DE] shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
                alt="Architectural space with minimalist stone surfaces and natural illumination"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover-zoom"
              />
              <div className="absolute inset-0 border border-[#C9BDAA]/30 pointer-events-none" />
            </div>

            {/* Floating Editorial Quote Tag */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-[#292824] text-[#FAF9F6] p-5 sm:p-6 max-w-xs shadow-2xl border-l-2 border-[#A76F55]">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#C9BDAA] block mb-1">
                Atelier Perspective
              </span>
              <p className="font-serif text-sm italic font-light leading-snug">
                “Architecture begins where the surface meets human touch.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
