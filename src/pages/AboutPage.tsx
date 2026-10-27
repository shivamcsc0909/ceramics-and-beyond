import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Sparkles, CheckCircle2, ShieldCheck, Factory, Heart, Eye } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FAF9F6] text-[#292824]">
      {/* Hero Header */}
      <div className="bg-[#1A1916] text-[#FAF9F6] py-20 sm:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <Breadcrumbs items={[{ label: 'About Us', href: '/about' }]} />
          <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-4">
            Our Story · A Creative Instinct, A Passion for Making
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide max-w-4xl leading-tight">
            Thoughtfully Made.<br />
            <span className="italic font-normal text-[#C9BDAA]">Entirely Yours.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#C9BDAA] font-light max-w-2xl leading-relaxed">
            Founded by a NIFT graduate and woman entrepreneur in a traditionally male-dominated, manufacturing-intensive industry — creating modular and bespoke furniture that is as practical as it is beautiful.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Founder Narrative & Origin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pb-20 border-b border-[#C9BDAA]/30">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76F55] font-semibold block">
              1. Our Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light leading-snug">
              A Creative Instinct, A Passion for Making
            </h2>
            <p className="text-sm text-[#292824]/85 leading-relaxed font-light">
              I have always been drawn to the art of making things beautiful. As a <strong>NIFT graduate</strong>, design has always been a part of who I am — from the smallest details to the way an entire space comes together.
            </p>
            <p className="text-sm text-[#292824]/85 leading-relaxed font-light">
              Over time, that creative instinct found its way into furniture, and what began as a love for design grew into a passion for creating things that are as practical as they are beautiful. That passion became <strong>Ceramics &amp; Beyond</strong>.
            </p>
            <p className="text-sm text-[#292824]/85 leading-relaxed font-light">
              As a woman entrepreneur in a traditionally male-dominated, manufacturing-intensive industry, I wanted to build something that reflected my own beliefs: thoughtful design, practical solutions, complete customisation and a personal involvement in every detail.
            </p>
            <p className="text-sm text-[#292824]/85 leading-relaxed font-light">
              I believe a home should be designed around the people living in it, not the other way around. Every corner should have a purpose. Every piece should feel like it belongs. And the process of creating it should be honest, transparent and joyful.
            </p>

            <div className="p-5 bg-[#F5F2EC] border-l-2 border-[#A76F55] text-xs text-[#525049] italic leading-relaxed">
              "Because making a house look good is one thing. Making it feel like home? That's our job."
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden shadow-xl bg-[#E8E4DC]">
              <img
                src="/images/founder-story.jpeg"
                alt="NIFT graduate designer at work designing bespoke furniture at Ceramics & Beyond studio"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Why Ceramics & Beyond? The Live Counter Experience */}
        <div className="py-20 border-b border-[#C9BDAA]/30">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76F55] font-semibold block mb-2">
              4. Why Ceramics &amp; Beyond?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light">
              Factory &amp; Experience Centre Under One Roof
            </h2>
            <p className="text-xs sm:text-sm text-[#77786B] font-light mt-3">
              Think of it like watching your paneer tikka being prepared fresh at a live counter — except this time, it's your kitchen taking shape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#F5F2EC] border border-[#C9BDAA]/30 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#A76F55] tracking-widest block mb-3">01 / TRANSPARENCY</span>
                <h3 className="font-serif text-xl mb-3">The "Live Counter" Concept</h3>
                <p className="text-xs text-[#77786B] leading-relaxed font-light">
                  No hidden subcontracts, no mysterious delays. Walk right from our design lounge onto the live production floor and watch your pieces being crafted with your own eyes.
                </p>
              </div>
            </div>

            <div className="p-8 bg-[#F5F2EC] border border-[#C9BDAA]/30 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#A76F55] tracking-widest block mb-3">02 / FINISHES</span>
                <h3 className="font-serif text-xl mb-3">Unlimited Palette &amp; Finishes</h3>
                <p className="text-xs text-[#77786B] leading-relaxed font-light">
                  Specialty PU Paint with limitless RAL &amp; Pantone colour matching, natural wood veneer, duco, glass, laminates, acrylic, raw wood, rattan inlays, and custom louvers.
                </p>
              </div>
            </div>

            <div className="p-8 bg-[#F5F2EC] border border-[#C9BDAA]/30 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#A76F55] tracking-widest block mb-3">03 / PRECISION</span>
                <h3 className="font-serif text-xl mb-3">German Engineered Hardware</h3>
                <p className="text-xs text-[#77786B] leading-relaxed font-light">
                  Every drawer, hinge, and lift-up system is fitted exclusively with genuine Blum, Hettich, or Hafele hardware for smooth, silent operation that lasts decades.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Our Philosophy & 6 Pillars */}
        <div className="py-20 border-b border-[#C9BDAA]/30">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76F55] font-semibold block mb-2">
              5. Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light">
              Simple yet seen. Practical yet personal. Made for the way you live.
            </h2>
            <p className="text-xs sm:text-sm text-[#77786B] font-light mt-3 leading-relaxed">
              We approach every home as a living canvas. Here are the core principles that guide our work:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-[#C9BDAA]/30">
              <span className="text-[11px] font-mono text-[#A76F55] font-semibold block mb-1">PILLAR 01</span>
              <h4 className="font-serif text-lg mb-2">Live Counter Transparency</h4>
              <p className="text-xs text-[#77786B] font-light leading-relaxed">
                Watch raw boards transform into finished cabinetry. Total openness with no middleman markups.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#C9BDAA]/30">
              <span className="text-[11px] font-mono text-[#A76F55] font-semibold block mb-1">PILLAR 02</span>
              <h4 className="font-serif text-lg mb-2">True Customisation</h4>
              <p className="text-xs text-[#77786B] font-light leading-relaxed">
                No templates, no standard catalog compromises. Every dimension is tailored to your exact architectural space.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#C9BDAA]/30">
              <span className="text-[11px] font-mono text-[#A76F55] font-semibold block mb-1">PILLAR 03</span>
              <h4 className="font-serif text-lg mb-2">In-House Manufacturing</h4>
              <p className="text-xs text-[#77786B] font-light leading-relaxed">
                Factory and experience centre under one roof ensure precision edge-banding, dust-free PU booths, and strict QC.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#C9BDAA]/30">
              <span className="text-[11px] font-mono text-[#A76F55] font-semibold block mb-1">PILLAR 04</span>
              <h4 className="font-serif text-lg mb-2">Specialty PU &amp; Finishes</h4>
              <p className="text-xs text-[#77786B] font-light leading-relaxed">
                Bespoke PU paint in matte, satin, or high-gloss with custom colour mixing, alongside warm veneers and rattan.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#C9BDAA]/30">
              <span className="text-[11px] font-mono text-[#A76F55] font-semibold block mb-1">PILLAR 05</span>
              <h4 className="font-serif text-lg mb-2">Personal Involvement</h4>
              <p className="text-xs text-[#77786B] font-light leading-relaxed">
                From first sketch to final installation, our founder and design team personally oversee every detail.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#C9BDAA]/30">
              <span className="text-[11px] font-mono text-[#A76F55] font-semibold block mb-1">PILLAR 06</span>
              <h4 className="font-serif text-lg mb-2">German Hardware Standard</h4>
              <p className="text-xs text-[#77786B] font-light leading-relaxed">
                Fitted exclusively with Blum, Hettich, and Hafele concealed hinges, drawers, and soft-close mechanisms.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="pt-20">
          <div className="p-8 sm:p-12 bg-[#292824] text-[#FAF9F6] border border-[#C9BDAA]/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-widest text-[#A76F55] block mb-2">
                Experience It Live
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mb-3">
                Visit Our Factory &amp; Experience Centre
              </h3>
              <p className="text-xs sm:text-sm text-[#C9BDAA] font-light leading-relaxed">
                Step onto the production floor, touch sample panels, and discuss your bespoke living space with our founder.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center space-x-2 bg-[#A76F55] text-white px-6 py-3.5 text-xs uppercase tracking-wider font-medium hover:bg-[#8E5B43] transition-colors"
            >
              <span>Book Design Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
