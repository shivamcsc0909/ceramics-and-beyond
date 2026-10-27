import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Palette, Sparkles, Layers, ShieldCheck, CheckCircle2, Factory, Eye, Wrench } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const CraftsmanshipPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF9F6] text-[#292824]">
      {/* Hero Banner */}
      <div className="bg-[#1A1916] text-[#FAF9F6] py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <Breadcrumbs items={[{ label: 'Craftsmanship & Factory', href: '/craftsmanship' }]} />
          <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-4">
            Factory &amp; Experience Centre Under One Roof
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide max-w-3xl leading-tight">
            The Live Counter of Furniture Craft.
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#C9BDAA] font-light max-w-2xl leading-relaxed">
            Think of it like watching your paneer tikka being prepared fresh at a live counter — except this time, it's your kitchen taking shape. Total transparency from raw boards to precision assembly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Method 01: In-House Factory & Live Counter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pb-20 border-b border-[#C9BDAA]/30">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76F55] font-semibold block">
              Facility 01
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light leading-snug">
              Complete In-House Manufacturing
            </h2>
            <p className="text-sm text-[#292824]/85 leading-relaxed font-light">
              We don't outsource our fabrication to third-party workshops or mystery vendors. Our state-of-the-art machinery handles high-precision panel sizing, seamless edge-banding, multi-spindle drilling, and computerized joinery.
            </p>
            <div className="space-y-2 text-xs text-[#77786B]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0" />
                <span>Zero-gap seamless polyurethane edge-banding for waterproof cabinetry</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0" />
                <span>Computerized sizing and CNC milling calibrated to fractions of a millimeter</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0" />
                <span>Factory &amp; Experience Centre under one roof for full live inspection</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden shadow-xl bg-[#E8E4DC]">
              <img
                src="/images/in-house-cnc.jpeg"
                alt="Precision automated woodworking and factory assembly floor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Method 02: Specialty PU Paint & Custom Finishes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-20 border-b border-[#C9BDAA]/30">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden shadow-xl bg-[#E8E4DC]">
              <img
                src="/images/wooden-furniture-working-process.jpeg"
                alt="Specialty PU Paint spray booth and hand-finished lacquer surfaces"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76F55] font-semibold block">
              Facility 02
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light leading-snug">
              Specialty PU Paint &amp; Custom Colour Matching
            </h2>
            <p className="text-sm text-[#292824]/85 leading-relaxed font-light">
              Our enclosed, pressurized PU paint booth allows us to achieve flawless matte, satin, and high-gloss finishes with infinite RAL and Pantone colour matching. Alongside PU, we specialize in natural wood veneers, duco, glass, laminates, acrylic, raw wood, and artisanal rattan inlays.
            </p>
            <div className="space-y-2 text-xs text-[#77786B]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0" />
                <span>Unlimited RAL &amp; Pantone custom colour matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0" />
                <span>Multi-coat polyurethane sanding, buffing, and UV-cured durability</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0" />
                <span>Natural open-pore veneers and cane/rattan artisanal panel inlays</span>
              </div>
            </div>
          </div>
        </div>

        {/* Method 03: Premium German Hardware */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-20 border-b border-[#C9BDAA]/30">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76F55] font-semibold block">
              Facility 03
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light leading-snug">
              German Hardware Excellence (Blum, Hettich, Hafele)
            </h2>
            <p className="text-sm text-[#292824]/85 leading-relaxed font-light">
              A luxury cabinet is only as good as its movement. We install exclusively genuine German-engineered hardware: Blum soft-close runners, Hettich concealed Sensys hinges, and Hafele architectural fittings designed for silent motion and lifetime performance.
            </p>
            <div className="space-y-2 text-xs text-[#77786B]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0" />
                <span>Tested for 200,000+ flawless opening and closing cycles</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0" />
                <span>Seamless soft-close dampers and push-to-open servo systems</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A76F55] shrink-0" />
                <span>Heavy-load pantry pullouts and corner carousel mechanisms</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden shadow-xl bg-[#E8E4DC]">
              <img
                src="/images/precision-hardware.jpeg"
                alt="German Blum hardware fitting inside bespoke modular cabinetry"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Live Counter CTA Banner */}
        <div className="pt-16">
          <div className="p-8 sm:p-12 bg-[#292824] text-[#FAF9F6] border border-[#C9BDAA]/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#A76F55] block mb-2 font-mono">
                Open Doors Policy
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mb-2">
                Experience the Live Counter in Person
              </h3>
              <p className="text-xs sm:text-sm text-[#C9BDAA] font-light max-w-xl">
                Come visit our integrated facility. See our machines in action, examine joinery mockups, and watch cabinetry take shape before it arrives at your home.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center space-x-2 bg-[#A76F55] text-white px-6 py-3.5 text-xs uppercase tracking-wider font-medium hover:bg-[#8E5B43] transition-colors"
            >
              <span>Schedule Factory Tour</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
