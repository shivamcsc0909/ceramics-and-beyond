import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { COLLECTIONS } from '../data/collections';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const CollectionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    return <Navigate to="/404" replace />;
  }

  const related = COLLECTIONS.filter((c) => c.slug !== collection.slug).slice(0, 3);

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      {/* Top Banner & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-10">
        <Breadcrumbs
          items={[
            { label: 'Collections', href: '/collections' },
            { label: collection.title },
          ]}
        />

        <div className="mt-8 max-w-4xl">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
            {collection.category}
          </span>
          <h1 className="font-serif text-display-section font-light text-[#292824] leading-tight">
            {collection.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525049] font-light leading-relaxed max-w-2xl">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 sm:mb-24">
        <div className="relative aspect-[21/10] min-h-[320px] w-full overflow-hidden bg-[#ECE7DE] shadow-xl">
          <img
            src={collection.heroImage}
            alt={collection.imageAlt}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Specifications & Characteristics Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Characteristics Table */}
          <div className="lg:col-span-6 bg-[#FAF9F6] p-8 sm:p-10 border border-[#C9BDAA]/40 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <Layers className="w-4 h-4 text-[#A76F55]" />
              <h2 className="font-serif text-2xl font-light text-[#292824]">Material Specifications</h2>
            </div>

            <div className="divide-y divide-[#C9BDAA]/30">
              {collection.characteristics.map((c, i) => (
                <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-xs uppercase tracking-architectural text-[#77786B] font-mono">
                    {c.label}
                  </span>
                  <span className="text-sm font-medium text-[#292824] sm:text-right">
                    {c.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Finishes */}
            <div className="mt-8 pt-6 border-t border-[#C9BDAA]/40">
              <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-3">
                Curated Finishes
              </span>
              <div className="flex flex-wrap gap-2">
                {collection.finishes.map((f, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#F5F2EC] px-3.5 py-1.5 border border-[#C9BDAA]/50 text-[#292824]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Applications & Key Features */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#A76F55]" />
                <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76F55] font-semibold">
                  Architectural Applications
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#292824] mb-6">
                Recommended Environments
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {collection.applications.map((app, i) => (
                  <div key={i} className="p-4 bg-[#FAF9F6] border border-[#C9BDAA]/30 flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A76F55]" />
                    <span className="text-xs font-medium text-[#292824]">{app}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-serif text-xl font-light text-[#292824] mb-4">
                Signature Advantages
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-[#525049] font-light">
                {collection.features.map((feat, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-[#A76F55] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Enquiry Box */}
            <div className="mt-10 p-6 bg-[#292824] text-[#FAF9F6] rounded-sm shadow-md">
              <span className="text-[10px] tracking-architectural uppercase text-[#C9BDAA] block mb-2 font-mono">
                Atelier Sample Request
              </span>
              <p className="text-xs sm:text-sm text-[#ECE7DE]/90 font-light mb-4">
                Order full-size tactile swatches or schedule a live slab inspection on our factory floor.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase bg-[#FAF9F6] text-[#292824] px-5 py-2.5 font-medium hover:bg-[#C9BDAA] transition-colors"
              >
                <span>Request Sample Swatch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {collection.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28">
          <div className="mb-8">
            <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-1">
              Visual Reference
            </span>
            <h2 className="font-serif text-3xl font-light text-[#292824]">In Situ Installations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collection.gallery.map((g, i) => (
              <figure key={i} className="overflow-hidden bg-[#ECE7DE]">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={g.url}
                    alt={g.alt}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <figcaption className="p-4 bg-[#FAF9F6] text-xs text-[#525049] border-b border-x border-[#C9BDAA]/40 font-light">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Related Collections */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-t border-[#C9BDAA]/30 pt-16">
        <h3 className="font-serif text-2xl font-light text-[#292824] mb-8">
          Explore Complementary Collections
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map((col) => (
            <Link
              key={col.slug}
              to={`/collections/${col.slug}`}
              className="group block bg-[#FAF9F6] border border-[#C9BDAA]/40 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECE7DE]">
                <img
                  src={col.heroImage}
                  alt={col.imageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="text-[9px] tracking-wider uppercase text-[#A76F55] block mb-1">
                  {col.category}
                </span>
                <h4 className="font-serif text-lg font-light text-[#292824] group-hover:text-[#A76F55] transition-colors line-clamp-1">
                  {col.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
