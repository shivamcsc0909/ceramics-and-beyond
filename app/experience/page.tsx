import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, Eye, ShieldCheck, Sparkles, UtensilsCrossed, Calendar } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EXPERIENCE_STORY } from "@/data/experience";

export const metadata: Metadata = {
  title: "The Live Experience | Watch Your Kitchen Made Live on Our Factory Floor",
  description:
    "Ever watched your paneer tikka being made live? Experience the same thrill with your bespoke kitchen. Complete transparency from raw timber cores to final CNC mitres.",
};

export default function ExperiencePage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#1A1916] text-[#FAF9F6]">
      {/* Breadcrumbs with dark styling */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-10">
        <Breadcrumbs items={[{ label: "The Live Experience" }]} />
      </div>

      {/* Hero Narrative Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 sm:mb-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#C9BDAA]/20 bg-[#22211D] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#A76F55] animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9BDAA] font-semibold">
              {EXPERIENCE_STORY.sectionTag}
            </span>
          </div>

          <h1 className="font-serif text-display-hero font-light text-[#FAF9F6] leading-tight mb-8">
            “{EXPERIENCE_STORY.mainHeadline}”
          </h1>

          <p className="text-base sm:text-xl text-[#C9BDAA] font-light leading-relaxed max-w-2xl">
            {EXPERIENCE_STORY.supportingCopy}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#stages"
              className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase bg-[#FAF9F6] text-[#1A1916] px-7 py-3.5 font-medium hover:bg-[#C9BDAA] transition-colors"
            >
              <span>See The 5-Step Process</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase border border-[#C9BDAA]/50 text-[#FAF9F6] px-7 py-3.5 font-medium hover:bg-white/10 transition-colors"
            >
              <Calendar className="w-4 h-4 mr-1 text-[#A76F55]" />
              <span>Book A Factory Tour</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Full-Bleed Workshop Showcase Image */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 sm:mb-32">
        <div className="relative aspect-[21/10] min-h-[340px] w-full overflow-hidden bg-[#22211D] border border-[#33312C] shadow-2xl">
          <Image
            src={EXPERIENCE_STORY.signatureCard.workshopImage}
            alt={EXPERIENCE_STORY.signatureCard.workshopImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1916] via-transparent to-black/40" />

          {/* Overlaid Quotes */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] tracking-widest uppercase font-mono text-[#A76F55] block mb-1">
                Atelier Philosophy
              </span>
              <p className="font-serif text-2xl sm:text-3xl text-white font-light">
                “{EXPERIENCE_STORY.signatureCard.headline}”
              </p>
            </div>
            <div className="bg-[#1A1916]/80 backdrop-blur-md px-5 py-3 border border-[#C9BDAA]/20">
              <p className="font-serif text-base italic text-[#C9BDAA]">
                “{EXPERIENCE_STORY.signatureCard.closingPunchline}”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Food-Inspired Concepts Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 sm:mb-32">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <UtensilsCrossed className="w-5 h-5 text-[#A76F55] mx-auto mb-3" />
          <span className="text-[10px] tracking-architectural uppercase text-[#C9BDAA] block mb-2 font-mono">
            Gastronomy Meets Joinery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#FAF9F6]">
            Why Making a Kitchen Feels Like Fine Dining
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Concept A Card */}
          <div className="p-8 sm:p-10 bg-[#22211D] border border-[#33312C] rounded-sm relative overflow-hidden">
            <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-3">
              {EXPERIENCE_STORY.conceptA.badge}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mb-4">
              “{EXPERIENCE_STORY.conceptA.headline}”
            </h3>
            <p className="text-sm text-[#C9BDAA] font-light leading-relaxed mb-6">
              When you dine at a premier restaurant, the greatest chefs invite you to witness the kitchen. There are no secret fillers or hidden shortcuts. We apply that exact same philosophy to kitchen joinery: you inspect the raw moisture-resistant marine substrates, touch the European stone slabs, and examine every Blum soft-motion hinge before assembly.
            </p>
            <div className="p-4 bg-[#1A1916] border-l border-[#A76F55] text-xs text-[#77786B]">
              Complete material provenance — zero unverified claims.
            </div>
          </div>

          {/* Concept B Card */}
          <div className="p-8 sm:p-10 bg-[#22211D] border border-[#33312C] rounded-sm relative overflow-hidden">
            <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-3">
              {EXPERIENCE_STORY.conceptB.badge}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mb-4">
              “{EXPERIENCE_STORY.conceptB.headline}”
            </h3>
            <p className="text-sm text-[#C9BDAA] font-light leading-relaxed mb-6">
              Dynamic, precision-driven, and mesmerizing to behold. Instead of waiting months in suspense looking at static 2D computer renders, you step onto our manufacturing floor. You watch high-speed diamond water-jet cutters slice 45-degree mitred edges and hear the satisfying click of master craftsmen calibrating concealed drawer runners.
            </p>
            <div className="p-4 bg-[#1A1916] border-l border-[#A76F55] text-xs text-[#77786B]">
              Witnessing craftsmanship builds lasting emotional pride in your home.
            </div>
          </div>
        </div>
      </div>

      {/* 5-Step Process Section */}
      <div id="stages" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 sm:mb-32">
        <div className="mb-16">
          <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-2">
            Chronology of Craft
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF9F6]">
            The Live Manufacturing Journey
          </h2>
          <p className="mt-3 text-sm text-[#C9BDAA] font-light max-w-xl">
            From raw slab extraction to your complete factory floor dry-run mockup.
          </p>
        </div>

        <div className="space-y-12">
          {EXPERIENCE_STORY.stages.map((stage, idx) => (
            <div
              key={stage.step}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 bg-[#22211D] border border-[#33312C]"
            >
              <div className="lg:col-span-1 flex lg:flex-col items-center justify-between lg:justify-center">
                <span className="font-mono text-3xl sm:text-4xl text-[#A76F55] font-bold">
                  {stage.step}
                </span>
                <span className="text-[10px] text-[#77786B] font-mono tracking-widest uppercase">
                  Stage
                </span>
              </div>

              <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden bg-[#1A1916]">
                <Image
                  src={stage.image}
                  alt={stage.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="lg:col-span-6">
                <span className="text-[10px] tracking-architectural uppercase text-[#C9BDAA] block mb-1">
                  {stage.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mb-3">
                  {stage.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#C9BDAA] font-light leading-relaxed mb-4">
                  {stage.description}
                </p>
                <div className="flex items-center space-x-2 text-xs text-[#A76F55] font-mono pt-2 border-t border-[#33312C]">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{stage.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Factory Floor Visit CTA Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="p-8 sm:p-14 bg-[#292824] border border-[#C9BDAA]/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#A76F55] block mb-3 font-semibold">
              Live Factory Floor Invitation
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white mb-4">
              Schedule Your Factory Walkthrough
            </h3>
            <p className="text-sm text-[#C9BDAA] font-light leading-relaxed mb-8">
              Experience the machinery, meet the master craftspeople, and watch other bespoke kitchens take shape in real time.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-[#FAF9F6] text-[#1A1916] px-8 py-4 text-xs tracking-architectural uppercase font-medium hover:bg-[#C9BDAA] transition-colors"
            >
              <span>Schedule Atelier Appointment</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
