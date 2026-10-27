import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface CategoryItem {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  cover_image_url: string;
  features: string[];
}

const CATEGORIES: CategoryItem[] = [
  {
    slug: 'modular-furniture',
    name: 'Modular Kitchens & Wardrobes',
    subtitle: 'Kitchens, Wardrobes & Doors',
    description: 'Modern kitchens and spacious wardrobes made to fit your room perfectly with smooth German soft-close drawers and zero wasted space.',
    cover_image_url: '/images/fluted-island-kitchen.jpeg',
    features: ['Custom Modular Kitchens', 'Walk-in & Sliding Wardrobes', 'Flush & Wooden Doors'],
  },
  {
    slug: 'functional-statement',
    name: 'TV Units & Vanities',
    subtitle: 'TV Panels, Vanities & Mandirs',
    description: 'Floating TV wall panels with hidden wires, waterproof bathroom vanities, beautiful sacred mandirs, and stylish storage.',
    cover_image_url: '/images/floating-tv-console.jpeg',
    features: ['Modern TV Panels & Consoles', 'Waterproof Bathroom Vanities', 'Handcrafted Sacred Mandirs'],
  },
  {
    slug: 'bespoke-furniture',
    name: 'Custom Sofas & Wooden Furniture',
    subtitle: 'Sofas, Beds & Dining Tables',
    description: 'Comfortable custom sofas, solid wood dining tables, beds with easy hydraulic storage, and designer wooden chairs.',
    cover_image_url: '/images/sofa.jpeg',
    features: ['Custom Fabric & Leather Sofas', 'Solid Wood Dining Tables', 'Hydraulic Storage Beds'],
  },
  {
    slug: 'finishes-palette',
    name: 'Finishes, PU Paint & Tiles',
    subtitle: 'PU Paint, Wood Veneer & Tiles',
    description: 'Smooth PU paint in any color you like, natural wood textures, and designer architectural wall and floor tiles.',
    cover_image_url: '/images/tiles.jpeg',
    features: ['Smooth PU Paint (Any Colour)', 'Natural Wood Veneer', 'Designer Tiles & Rattan'],
  },
];

export const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] text-[#292824]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#C9BDAA]/40">
          <div>
            <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-2">
              What We Make
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-[#292824]">
              Custom Furniture &amp; Finishes
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#77786B] max-w-md font-light leading-relaxed">
            From comfortable sofas and solid wood dining to modular kitchens, wardrobes, and tiles — we make everything in our New Delhi workshop.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products`}
              className="group flex flex-col bg-[#F5F2EC] border border-[#C9BDAA]/40 hover:border-[#A76F55] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl"
            >
              {/* Media Preview */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#292824]">
                <img
                  src={cat.cover_image_url}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#A76F55] block mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#292824] font-light mb-3 group-hover:text-[#A76F55] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#525049] leading-relaxed mb-6 font-light">
                    {cat.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-4 border-t border-[#C9BDAA]/40">
                  <ul className="space-y-1.5 mb-4">
                    {cat.features.map((f, i) => (
                      <li key={i} className="text-[11px] text-[#77786B] flex items-center space-x-2">
                        <span className="w-1 h-1 rounded-full bg-[#A76F55]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center space-x-2 text-xs font-medium tracking-architectural uppercase text-[#292824] group-hover:text-[#A76F55] transition-colors">
                    <span>Explore Collection</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
