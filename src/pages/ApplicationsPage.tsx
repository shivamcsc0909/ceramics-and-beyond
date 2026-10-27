import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SPACES_DATA } from '../data/spaces';

export const ApplicationsPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: 'Applications' }]} />

        <div className="mt-8 mb-16 sm:mb-24 max-w-3xl">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
            Spatial Context
          </span>
          <h1 className="font-serif text-display-hero font-light text-[#292824] leading-tight">
            Designed for Every<br />
            <span className="italic font-normal">Architectural Space.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
            Every environment poses unique physical and sensorial demands. Explore our curated material recommendations tailored for private residences, luxury hospitality, and public architecture.
          </p>
        </div>

        {/* Space by Space Editorial Rows */}
        <div className="space-y-20 sm:space-y-28">
          {SPACES_DATA.map((space, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={space.id}
                id={space.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Image */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#ECE7DE] shadow-xl">
                    <img
                      src={space.image}
                      alt={space.imageAlt}
                      className="w-full h-full object-cover object-center group-hover-zoom"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#292824]/90 backdrop-blur-sm text-white px-3 py-1 text-[9px] tracking-widest uppercase">
                      {space.tag}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-2">
                    0{index + 1} / Environment
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#292824] mb-4">
                    {space.title}
                  </h2>
                  <p className="text-sm text-[#525049] font-light leading-relaxed mb-6">
                    {space.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-[10px] tracking-wider uppercase text-[#77786B] block mb-2 font-mono">
                      Recommended Materials:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {space.recommendedMaterials.map((mat, i) => (
                        <span key={i} className="text-xs bg-[#FAF9F6] border border-[#C9BDAA]/50 px-3 py-1 text-[#292824]">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#C9BDAA]/40 mb-6">
                    <span className="text-[10px] tracking-wider uppercase text-[#77786B] block mb-2 font-mono">
                      Key Technical Strengths:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#525049]">
                      {space.keyBenefits.map((b, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A76F55]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase text-[#292824] font-medium border-b border-[#292824] hover:text-[#A76F55] hover:border-[#A76F55] transition-colors pb-1"
                  >
                    <span>Consult on {space.title} Specification</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
