"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/data/collections";

export const CollectionGrid: React.FC = () => {
  return (
    <section id="collections" className="py-24 sm:py-32 bg-[#FAF9F6] text-[#292824] border-t border-[#C9BDAA]/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-6 h-[1px] bg-[#A76F55]" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76F55] font-semibold">
                Curated Materials
              </span>
            </div>
            <h2 className="font-serif text-display-section font-light text-[#292824] leading-tight">
              Featured Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="group inline-flex items-center space-x-2 text-xs sm:text-sm tracking-architectural uppercase text-[#292824] font-medium hover:text-[#A76F55] transition-colors self-start md:self-end pb-1 border-b border-[#292824]/30 hover:border-[#A76F55]"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Card 1: Featured Kitchens (Large 8 cols) */}
          <div className="md:col-span-8 group">
            <Link href={`/collections/${COLLECTIONS[0].slug}`} className="block relative overflow-hidden bg-[#ECE7DE] shadow-md">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={COLLECTIONS[0].heroImage}
                  alt={COLLECTIONS[0].imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6 bg-[#A76F55] text-white px-3 py-1 text-[10px] tracking-widest uppercase font-semibold">
                  Live Factory Craft
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-[#FAF9F6]">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9BDAA] block mb-1">
                  {COLLECTIONS[0].category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light mb-2">
                  {COLLECTIONS[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#ECE7DE]/90 font-light line-clamp-2 max-w-xl">
                  {COLLECTIONS[0].description}
                </p>
                <span className="inline-flex items-center space-x-1 mt-4 text-xs tracking-architectural uppercase text-[#C9BDAA] group-hover:text-white transition-colors">
                  <span>Explore Atelier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>

          {/* Card 2: Porcelain Surfaces (4 cols) */}
          <div className="md:col-span-4 group">
            <Link href={`/collections/${COLLECTIONS[1].slug}`} className="block relative overflow-hidden bg-[#ECE7DE] shadow-md h-full">
              <div className="relative aspect-[4/5] md:h-full min-h-[380px] w-full overflow-hidden">
                <Image
                  src={COLLECTIONS[1].heroImage}
                  alt={COLLECTIONS[1].imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-[#FAF9F6]">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9BDAA] block mb-1">
                    {COLLECTIONS[1].category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light mb-2">
                    {COLLECTIONS[1].title}
                  </h3>
                  <p className="text-xs text-[#ECE7DE]/90 font-light line-clamp-2">
                    {COLLECTIONS[1].description}
                  </p>
                  <span className="inline-flex items-center space-x-1 mt-4 text-xs tracking-architectural uppercase text-[#C9BDAA] group-hover:text-white transition-colors">
                    <span>View Slabs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Row 2: 3 Cards of 4 cols each */}
          {COLLECTIONS.slice(2, 5).map((col) => (
            <div key={col.slug} className="md:col-span-4 group">
              <Link href={`/collections/${col.slug}`} className="block relative overflow-hidden bg-[#ECE7DE] shadow-md">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={col.heroImage}
                    alt={col.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-[#FAF9F6]">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9BDAA] block mb-1">
                      {col.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-light mb-2">
                      {col.title}
                    </h3>
                    <p className="text-xs text-[#ECE7DE]/90 font-light line-clamp-2">
                      {col.description}
                    </p>
                    <span className="inline-flex items-center space-x-1 mt-3 text-xs tracking-architectural uppercase text-[#C9BDAA] group-hover:text-white transition-colors">
                      <span>Discover Collection</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* Row 3: 2 Cards of 6 cols each */}
          {COLLECTIONS.slice(5, 7).map((col) => (
            <div key={col.slug} className="md:col-span-6 group">
              <Link href={`/collections/${col.slug}`} className="block relative overflow-hidden bg-[#ECE7DE] shadow-md">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={col.heroImage}
                    alt={col.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-[#FAF9F6]">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9BDAA] block mb-1">
                      {col.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-light mb-2">
                      {col.title}
                    </h3>
                    <p className="text-xs text-[#ECE7DE]/90 font-light line-clamp-2 max-w-md">
                      {col.description}
                    </p>
                    <span className="inline-flex items-center space-x-1 mt-3 text-xs tracking-architectural uppercase text-[#C9BDAA] group-hover:text-white transition-colors">
                      <span>View Specifications</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
