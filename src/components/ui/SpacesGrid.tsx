import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SPACES_DATA } from '../../data/spaces';

export const SpacesGrid: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F6] text-[#292824] border-t border-[#C9BDAA]/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-6 h-[1px] bg-[#A76F55]" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76F55] font-semibold">
                Spatial Versatility
              </span>
            </div>
            <h2 className="font-serif text-display-section font-light text-[#292824] leading-tight">
              Designed for Every Space
            </h2>
          </div>
          <Link
            to="/applications"
            className="group inline-flex items-center space-x-2 text-xs sm:text-sm tracking-architectural uppercase text-[#292824] font-medium hover:text-[#A76F55] transition-colors self-start md:self-end pb-1 border-b border-[#292824]/30 hover:border-[#A76F55]"
          >
            <span>Explore All Applications</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* 6-Card Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPACES_DATA.map((space) => (
            <Link
              key={space.id}
              to="/applications"
              className="group block relative overflow-hidden bg-[#ECE7DE] shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={space.image}
                  alt={space.imageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-[#FAF9F6]">
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#C9BDAA] block mb-1">
                  {space.tag}
                </span>
                <h3 className="font-serif text-2xl font-light mb-2 text-white group-hover:text-[#C9BDAA] transition-colors">
                  {space.title}
                </h3>
                <p className="text-xs text-[#ECE7DE]/80 font-light line-clamp-2 mb-4 leading-relaxed">
                  {space.description}
                </p>
                <span className="inline-flex items-center space-x-1 text-xs tracking-architectural uppercase text-white font-medium">
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
