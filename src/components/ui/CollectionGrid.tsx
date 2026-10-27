import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface CollectionItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  cover_image_url: string;
  image_alt: string;
}

interface CollectionGridProps {
  collections?: CollectionItem[];
}

const DEFAULT_FURNITURE_COLLECTIONS: CollectionItem[] = [
  {
    id: 1,
    slug: 'modular-furniture',
    title: 'Modular Kitchens, Wardrobes & Doors',
    category: 'Modular Systems',
    description: 'Precision-engineered modular kitchens, walk-in closets, and architectural flush doors fitted exclusively with German Blum, Hettich, and Hafele hardware.',
    cover_image_url: '/images/signature-kitchen.jpeg',
    image_alt: 'Bespoke modular kitchen island with seamless finishes and integrated German hardware',
  },
  {
    id: 2,
    slug: 'functional-statement',
    title: 'Functional & Statement Pieces',
    category: 'Living & Accent Joinery',
    description: 'TV panels, bathroom vanities, bars, mandirs, consoles, shoe racks, and bookshelves tailored to your space.',
    cover_image_url: '/images/luxury-bathroom-vanity.jpeg',
    image_alt: 'Luxury fluted bathroom vanity and bespoke living room millwork',
  },
  {
    id: 3,
    slug: 'bespoke-furniture',
    title: 'Bespoke & Customised Furniture',
    category: 'Master Joinery',
    description: 'Beds, coffee tables, dining tables, centre tables, and side tables crafted with precision in-house manufacturing.',
    cover_image_url: '/images/bedroom.jpeg',
    image_alt: 'Handcrafted bespoke platform bed suite and custom furniture',
  },
  {
    id: 4,
    slug: 'finishes-palette',
    title: 'Finishes & Mixed-Material Palette',
    category: 'Surface Finishes & Accents',
    description: 'PU paint, veneer, duco, glass, laminate, acrylic, raw wood, rattan cane inlays, wallpaper inlays, and premium louvers.',
    cover_image_url: '/images/cane-rattan-weave.jpeg',
    image_alt: 'Premium veneer, PU paint, and rattan inlay material library',
  },
];

const isLegacyTile = (item: CollectionItem) => {
  return /ceramic|tile|porcelain|marble-natural-stone|flooring-solutions|bathroom-surfaces/i.test(item.slug) ||
         /ceramic|tile|porcelain/i.test(item.title) ||
         /ceramic|tile|porcelain/i.test(item.category);
};

export const CollectionGrid: React.FC<CollectionGridProps> = ({ collections = [] }) => {
  const filteredCollections = collections.filter(c => !isLegacyTile(c));
  const displayCollections = filteredCollections.length > 0 ? filteredCollections : DEFAULT_FURNITURE_COLLECTIONS;

  return (
    <section id="collections" className="py-24 sm:py-32 bg-[#FAF9F6] text-[#292824] border-t border-[#C9BDAA]/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-6 h-[1px] bg-[#A76F55]" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76F55] font-semibold">
                What We Make
              </span>
            </div>
            <h2 className="font-serif text-display-section font-light text-[#292824] leading-tight">
              Featured Furniture Collections
            </h2>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center space-x-2 text-xs sm:text-sm tracking-architectural uppercase text-[#292824] font-medium hover:text-[#A76F55] transition-colors self-start md:self-end pb-1 border-b border-[#292824]/30 hover:border-[#A76F55]"
          >
            <span>Explore Lookbook</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          {/* Card 1: Large Featured (8 cols) */}
          {displayCollections[0] && (
            <div className="md:col-span-8 group">
              <Link to={`/products`} className="block relative overflow-hidden bg-[#ECE7DE] shadow-md">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] min-h-[340px] sm:min-h-0 w-full overflow-hidden">
                  <img
                    src={displayCollections[0].cover_image_url}
                    alt={displayCollections[0].image_alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-[#A76F55] text-white px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold">
                    In-House Manufacturing
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-[#FAF9F6]">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9BDAA] block mb-1">
                    {displayCollections[0].category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-light mb-1.5 sm:mb-2">
                    {displayCollections[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#ECE7DE]/90 font-light line-clamp-2 max-w-xl">
                    {displayCollections[0].description}
                  </p>
                  <span className="inline-flex items-center space-x-1 mt-3 sm:mt-4 text-xs tracking-architectural uppercase text-[#C9BDAA] group-hover:text-white transition-colors">
                    <span>Explore Systems</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* Card 2: 4 cols */}
          {displayCollections[1] && (
            <div className="md:col-span-4 group">
              <Link to={`/products`} className="block relative overflow-hidden bg-[#ECE7DE] shadow-md h-full">
                <div className="relative aspect-[4/5] min-h-[340px] md:h-full md:min-h-[380px] w-full overflow-hidden">
                  <img
                    src={displayCollections[1].cover_image_url}
                    alt={displayCollections[1].image_alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-[#FAF9F6]">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9BDAA] block mb-1">
                      {displayCollections[1].category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-light mb-1.5 sm:mb-2">
                      {displayCollections[1].title}
                    </h3>
                    <p className="text-xs text-[#ECE7DE]/90 font-light line-clamp-2">
                      {displayCollections[1].description}
                    </p>
                    <span className="inline-flex items-center space-x-1 mt-3 sm:mt-4 text-xs tracking-architectural uppercase text-[#C9BDAA] group-hover:text-white transition-colors">
                      <span>View Statement Pieces</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Cards 3 & 4: 6 cols each */}
          {displayCollections.slice(2, 4).map((col) => (
            <div key={col.slug} className="md:col-span-6 group">
              <Link to={`/products`} className="block relative overflow-hidden bg-[#ECE7DE] shadow-md">
                <div className="relative aspect-[4/3] sm:aspect-[16/9] min-h-[300px] sm:min-h-0 w-full overflow-hidden">
                  <img
                    src={col.cover_image_url}
                    alt={col.image_alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-[#FAF9F6]">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9BDAA] block mb-1">
                      {col.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-light mb-1.5 sm:mb-2">
                      {col.title}
                    </h3>
                    <p className="text-xs text-[#ECE7DE]/90 font-light line-clamp-2 max-w-md">
                      {col.description}
                    </p>
                    <span className="inline-flex items-center space-x-1 mt-3 text-xs tracking-architectural uppercase text-[#C9BDAA] group-hover:text-white transition-colors">
                      <span>Discover Details</span>
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
