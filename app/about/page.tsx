import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, Compass, Shield, Sparkles, Hammer } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Us | Brand Philosophy & Heritage",
  description:
    "Learn about Ceramics & Beyond — our commitment to curated architectural surfaces, European stone curation, and live factory-floor kitchen craftsmanship.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      {/* Top Banner & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        <Breadcrumbs items={[{ label: "About Us" }]} />

        <div className="mt-8 max-w-4xl">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
            Our Story &amp; Heritage
          </span>
          <h1 className="font-serif text-display-hero font-light text-[#292824] leading-tight">
            Where Geological Grandeur<br />
            <span className="italic font-normal">Meets Master Joinery.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#525049] font-light leading-relaxed max-w-2xl">
            Ceramics &amp; Beyond was founded upon a clear architectural conviction: surfaces and cabinetry are not cosmetic veneers, but the sensorial soul of any inhabited volume.
          </p>
        </div>
      </div>

      {/* Hero Panoramic Image */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28">
        <div className="relative aspect-[21/9] min-h-[300px] w-full overflow-hidden bg-[#ECE7DE] shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85"
            alt="Panoramic architectural interior by Ceramics & Beyond"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Narrative Section 1: Vision & Values */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] block mb-2 font-semibold">
              The Guiding Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#292824] leading-snug">
              An Architectural Atelier Built on Absolute Transparency.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
            <p>
              In a marketplace historically dominated by middleman markups, unverified imports, and secretive factory practices, Ceramics &amp; Beyond champions radical honesty.
            </p>
            <p>
              We curate our porcelain slabs and natural marble blocks directly from prestigious deposits across Europe and select artisan ceramic houses. Concurrently, our dedicated kitchen manufacturing floor operates with open doors: inviting architects, interior decorators, and homeowners to step inside, touch raw timber substrates, inspect German soft-motion hardware, and witness their kitchens assembled live.
            </p>
            <div className="p-6 bg-[#FAF9F6] border-l-2 border-[#A76F55] text-xs text-[#77786B]">
              <strong className="text-[#292824] block uppercase tracking-wider mb-1">
                Editable Client Specification Notice
              </strong>
              Factory statistics, specific proprietary workshop square footage, and certifications will be populated here with verified client credentials prior to production deployment.
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="bg-[#FAF9F6] border-y border-[#C9BDAA]/30 py-20 sm:py-28 my-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] block mb-2 font-semibold">
              Foundational Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#292824]">
              Values That Anchor Every Commission
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-[#F5F2EC] border border-[#C9BDAA]/40">
              <Compass className="w-6 h-6 text-[#A76F55] mb-4" />
              <h3 className="font-serif text-xl font-medium text-[#292824] mb-2">Authentic Provenance</h3>
              <p className="text-xs text-[#525049] font-light leading-relaxed">
                Zero deceptive faux prints. If it is marble, it was hewn from the earth; if it is porcelain, it was fired under immense pressure.
              </p>
            </div>

            <div className="p-6 bg-[#F5F2EC] border border-[#C9BDAA]/40">
              <Hammer className="w-6 h-6 text-[#A76F55] mb-4" />
              <h3 className="font-serif text-xl font-medium text-[#292824] mb-2">Live Craftsmanship</h3>
              <p className="text-xs text-[#525049] font-light leading-relaxed">
                No secret ingredients. From the first CNC water-jet cut to hand-fitted joinery, every stage can be inspected on our factory floor.
              </p>
            </div>

            <div className="p-6 bg-[#F5F2EC] border border-[#C9BDAA]/40">
              <Sparkles className="w-6 h-6 text-[#A76F55] mb-4" />
              <h3 className="font-serif text-xl font-medium text-[#292824] mb-2">Architectural Dialogue</h3>
              <p className="text-xs text-[#525049] font-light leading-relaxed">
                We speak the language of blueprints, load-bearing considerations, sub-floor tolerances, and raking light angles.
              </p>
            </div>

            <div className="p-6 bg-[#F5F2EC] border border-[#C9BDAA]/40">
              <Shield className="w-6 h-6 text-[#A76F55] mb-4" />
              <h3 className="font-serif text-xl font-medium text-[#292824] mb-2">Built for Decades</h3>
              <p className="text-xs text-[#525049] font-light leading-relaxed">
                Marine-grade carcasses, Blum soft-motion mechanisms, and non-porous sintered surfaces engineered to endure generation after generation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Storytelling Split: The Live Factory Floor */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden bg-[#ECE7DE] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85"
              alt="Artisan craftsperson at work in workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          <div className="lg:col-span-6">
            <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] block mb-2 font-semibold">
              The Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#292824] leading-tight mb-6">
              “Come for the kitchen. Stay for the show.”
            </h2>
            <p className="text-sm sm:text-base text-[#525049] font-light leading-relaxed mb-6">
              Like watching your favourite chef prepare a delicacy at a live counter, watching your dream kitchen take shape on our factory floor gives you unshakeable pride in what you own.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="/experience"
                className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase px-6 py-3.5 bg-[#292824] text-[#FAF9F6] hover:bg-[#A76F55] transition-colors"
              >
                <span>Read The Live Story</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase px-6 py-3.5 border border-[#292824]/30 text-[#292824] hover:bg-[#292824] hover:text-white transition-colors"
              >
                <span>Explore Collections</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
