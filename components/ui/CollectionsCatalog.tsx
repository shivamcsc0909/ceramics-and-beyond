"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { COLLECTIONS, CollectionItem } from "@/data/collections";

export const CollectionsCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Kitchen Architecture", "Large-Format Slabs", "Natural Quarried Stone", "Ceramic Architecture", "Sculptural Surfaces", "Flooring Systems", "Wellness & Bath"];

  const filtered = COLLECTIONS.filter((col) => {
    const matchesCategory = activeCategory === "All" || col.category === activeCategory;
    const matchesSearch =
      col.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      col.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      col.finishes.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="bg-[#FAF9F6] p-4 sm:p-6 border border-[#C9BDAA]/40 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#77786B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search surfaces, stone types, or finishes..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F2EC] border border-[#C9BDAA]/60 text-xs sm:text-sm text-[#292824] placeholder-[#77786B]/60 focus:outline-none focus:border-[#292824] transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#77786B] flex-shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-full transition-all ${
                  activeCategory === cat
                    ? "bg-[#292824] text-[#FAF9F6] font-medium"
                    : "bg-[#F5F2EC] text-[#525049] hover:bg-[#ECE7DE]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF9F6] border border-[#C9BDAA]/30">
          <p className="font-serif text-2xl text-[#292824] font-light">No collections match your filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 inline-flex items-center text-xs tracking-architectural uppercase text-[#A76F55] border-b border-[#A76F55] pb-0.5"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((col) => (
            <div
              key={col.slug}
              className="group bg-[#FAF9F6] border border-[#C9BDAA]/40 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <Link href={`/collections/${col.slug}`} className="block relative aspect-[16/11] w-full overflow-hidden bg-[#ECE7DE]">
                  <Image
                    src={col.heroImage}
                    alt={col.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  <div className="absolute top-4 left-4 bg-[#292824]/90 backdrop-blur-sm text-white px-3 py-1 text-[9px] tracking-widest uppercase">
                    {col.category}
                  </div>
                </Link>

                <div className="p-6 sm:p-8">
                  <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] block mb-1 font-semibold">
                    {col.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#292824] mb-3 group-hover:text-[#A76F55] transition-colors">
                    <Link href={`/collections/${col.slug}`}>{col.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525049] font-light leading-relaxed mb-6 line-clamp-3">
                    {col.description}
                  </p>

                  <div className="space-y-1 pt-4 border-t border-[#C9BDAA]/30">
                    <span className="text-[10px] tracking-wider uppercase text-[#77786B] block">Available Finishes:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {col.finishes.slice(0, 3).map((f) => (
                        <span key={f} className="text-[10px] bg-[#F5F2EC] px-2 py-0.5 text-[#525049]">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:px-8 pt-0">
                <Link
                  href={`/collections/${col.slug}`}
                  className="w-full inline-flex items-center justify-between text-xs tracking-architectural uppercase text-[#292824] font-medium py-3 border-t border-[#C9BDAA]/30 group-hover:text-[#A76F55] transition-colors"
                >
                  <span>Explore Collection</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
