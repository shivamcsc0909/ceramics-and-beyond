import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CollectionsCatalog } from "@/components/ui/CollectionsCatalog";

export const metadata: Metadata = {
  title: "Curated Collections | Large-Format Porcelain, Marble & Kitchens",
  description:
    "Explore our complete range of architectural surfaces: continuous porcelain slabs, Italian natural marble, bespoke live-crafted kitchens, and designer 3D tiles.",
};

export default function CollectionsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: "Collections" }]} />

        <div className="mt-8 mb-12 sm:mb-16 max-w-3xl">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
            Atelier Catalog
          </span>
          <h1 className="font-serif text-display-hero font-light text-[#292824] leading-tight">
            Curated Collections &amp;<br />
            <span className="italic font-normal">Architectural Surfaces.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
            From seamless 3200 × 1600mm porcelain slabs to live-manufactured cabinetry and rare European marble, filter and explore our complete catalog below.
          </p>
        </div>

        <CollectionsCatalog />
      </div>
    </div>
  );
}
