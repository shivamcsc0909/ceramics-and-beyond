"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Eye, Sparkles } from "lucide-react";
import { EXPERIENCE_STORY } from "@/data/experience";

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#1A1916] text-[#FAF9F6] relative overflow-hidden">
      {/* Subtle ambient lighting accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#A76F55]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header with Food-Inspired Narrative */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#C9BDAA]/20 bg-[#22211D] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#A76F55] animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9BDAA] font-semibold">
              {EXPERIENCE_STORY.sectionTag}
            </span>
          </div>

          <h2 className="font-serif text-display-section font-light text-[#FAF9F6] leading-tight mb-6">
            “{EXPERIENCE_STORY.mainHeadline}”
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#C9BDAA] font-light leading-relaxed max-w-2xl mx-auto">
            {EXPERIENCE_STORY.supportingCopy}
          </p>

          {/* Supporting Creative Concepts Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
            {/* Concept A */}
            <div className="p-6 bg-[#22211D] border border-[#33312C] rounded-sm relative overflow-hidden">
              <span className="text-[9px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-2">
                {EXPERIENCE_STORY.conceptA.badge}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-white mb-2">
                “{EXPERIENCE_STORY.conceptA.headline}”
              </h3>
              <p className="text-xs sm:text-sm text-[#C9BDAA]/80 font-light leading-relaxed">
                {EXPERIENCE_STORY.conceptA.subtext}
              </p>
            </div>

            {/* Concept B */}
            <div className="p-6 bg-[#22211D] border border-[#33312C] rounded-sm relative overflow-hidden">
              <span className="text-[9px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-2">
                {EXPERIENCE_STORY.conceptB.badge}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-white mb-2">
                “{EXPERIENCE_STORY.conceptB.headline}”
              </h3>
              <p className="text-xs sm:text-sm text-[#C9BDAA]/80 font-light leading-relaxed">
                {EXPERIENCE_STORY.conceptB.subtext}
              </p>
            </div>
          </div>
        </div>

        {/* The Signature Feature Card */}
        <div className="studio-glass rounded-sm border border-[#C9BDAA]/20 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left/Top: Large Workshop Photograph */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] bg-[#292824]">
              <Image
                src={EXPERIENCE_STORY.signatureCard.workshopImage}
                alt={EXPERIENCE_STORY.signatureCard.workshopImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center scale-100 group-hover-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#22211D] via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-[#22211D]" />

              {/* Live Badge Overlay */}
              <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] tracking-widest uppercase font-mono text-white">
                  Live Factory Floor
                </span>
              </div>
            </div>

            {/* Right/Bottom: Editorial Text & Narrative */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-[#22211D]">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
                  {EXPERIENCE_STORY.signatureCard.sectionLabel}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
                  {EXPERIENCE_STORY.signatureCard.headline}
                </h3>

                <p className="text-sm sm:text-base text-[#C9BDAA] font-light leading-relaxed mb-6">
                  {EXPERIENCE_STORY.signatureCard.supportingParagraph}
                </p>

                {/* Key Experience Checkpoints */}
                <div className="space-y-3 py-6 border-y border-[#33312C] text-xs text-[#FAF9F6] font-light">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-[#A76F55] flex-shrink-0" />
                    <span>Watch laser-guided CNC cutting of your continuous porcelain worktops</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-[#A76F55] flex-shrink-0" />
                    <span>Witness master joiners hand-tune German soft-motion cabinetry runners</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-[#A76F55] flex-shrink-0" />
                    <span>Step into a complete dry-assembled mock-up before delivery to your residence</span>
                  </div>
                </div>
              </div>

              {/* Punchline & CTA */}
              <div className="pt-8">
                <p className="font-serif text-xl sm:text-2xl text-[#C9BDAA] italic mb-6">
                  “{EXPERIENCE_STORY.signatureCard.closingPunchline}”
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={EXPERIENCE_STORY.signatureCard.ctaHref}
                    className="inline-flex items-center space-x-3 bg-[#FAF9F6] text-[#1A1916] px-7 py-3.5 text-xs tracking-architectural uppercase font-medium hover:bg-[#C9BDAA] transition-colors duration-300"
                  >
                    <span>{EXPERIENCE_STORY.signatureCard.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase text-[#C9BDAA] hover:text-white transition-colors py-3.5 px-4"
                  >
                    <Eye className="w-4 h-4 mr-1 text-[#A76F55]" />
                    <span>Book Factory Visit</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
