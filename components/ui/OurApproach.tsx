"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, ShieldCheck, Cpu, SlidersHorizontal } from "lucide-react";

export const OurApproach: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6] text-[#292824] border-t border-[#C9BDAA]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Strong Architectural Workshop / Material Image */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE7DE] shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85"
                alt="Artisan craftsperson precisely calibrating joinery and architectural stone"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover-zoom"
              />
              <div className="absolute inset-0 border border-[#C9BDAA]/30 pointer-events-none" />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -top-6 -right-4 sm:right-6 bg-[#A76F55] text-white p-5 shadow-2xl max-w-xs">
              <span className="text-[10px] tracking-widest uppercase block mb-1 font-mono">
                Factory Integrity
              </span>
              <p className="font-serif text-lg font-light leading-snug">
                German Blum Motion &amp; Sintered Slabs Hand-Finished in India
              </p>
            </div>
          </div>

          {/* Right Column: Concise Approach Text Block */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-6 h-[1px] bg-[#A76F55]" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76F55] font-semibold">
                Rigorous Methodology
              </span>
            </div>

            <h2 className="font-serif text-display-section font-light text-[#292824] leading-tight mb-6">
              Our Architectural<br />
              <span className="italic font-normal">Approach.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#525049] font-light leading-relaxed mb-8">
              We reject the opacity of traditional interior supply chains. By uniting rare material curation with our own live manufacturing floor, we provide complete creative authority to architects, interior designers, and discerning homeowners.
            </p>

            {/* Four Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 pb-8 border-t border-[#C9BDAA]/40">
              <div>
                <div className="w-8 h-8 rounded-full bg-[#F5F2EC] flex items-center justify-center mb-3 text-[#A76F55]">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#292824] mb-1">01. Curation</h4>
                <p className="text-xs text-[#77786B] font-light leading-relaxed">
                  Quarry-direct inspection of natural stone and certified non-porous porcelain slabs.
                </p>
              </div>

              <div>
                <div className="w-8 h-8 rounded-full bg-[#F5F2EC] flex items-center justify-center mb-3 text-[#A76F55]">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#292824] mb-1">02. Engineering</h4>
                <p className="text-xs text-[#77786B] font-light leading-relaxed">
                  5-axis CNC router accuracy to 0.1mm for invisible mitres and continuous veining.
                </p>
              </div>

              <div>
                <div className="w-8 h-8 rounded-full bg-[#F5F2EC] flex items-center justify-center mb-3 text-[#A76F55]">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#292824] mb-1">03. Transparency</h4>
                <p className="text-xs text-[#77786B] font-light leading-relaxed">
                  Live factory walkthroughs; watch your cabinetry cut, assembled, and dry-run pre-fitted.
                </p>
              </div>

              <div>
                <div className="w-8 h-8 rounded-full bg-[#F5F2EC] flex items-center justify-center mb-3 text-[#A76F55]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#292824] mb-1">04. Longevity</h4>
                <p className="text-xs text-[#77786B] font-light leading-relaxed">
                  10-year structural warranty on bespoke cabinetry and lifetime surface durability.
                </p>
              </div>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center space-x-2 text-xs sm:text-sm tracking-architectural uppercase text-[#292824] font-medium hover:text-[#A76F55] transition-colors"
            >
              <span>Explore Our Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
