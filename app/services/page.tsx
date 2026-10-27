import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SERVICES_DATA } from "@/data/services";

export const metadata: Metadata = {
  title: "Our Services | Live Kitchen Manufacturing & Surface Curation",
  description:
    "Explore our architectural capabilities: live bespoke kitchen manufacturing, direct quarry surface curation, 5-axis CNC water-jet fabrication, and white-glove installation.",
};

export default function ServicesPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: "Our Services" }]} />

        <div className="mt-8 mb-16 sm:mb-24 max-w-3xl">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
            Atelier Capabilities
          </span>
          <h1 className="font-serif text-display-hero font-light text-[#292824] leading-tight">
            Our Architectural<br />
            <span className="italic font-normal">Services &amp; Craft.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
            Bridging material curation, live factory fabrication, and on-site engineering to realize visionary residential and commercial interiors.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-20 sm:space-y-28">
          {SERVICES_DATA.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={service.id}
                id={service.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Service Image */}
                <div className={`lg:col-span-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#ECE7DE] shadow-xl">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover-zoom"
                    />
                    <div className="absolute top-4 left-4 bg-[#292824]/90 backdrop-blur-sm text-[#FAF9F6] px-3 py-1 font-mono text-xs">
                      {service.number}
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className={`lg:col-span-6 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                  <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-1">
                    {service.tagline}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#292824] mb-4">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#525049] font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="pt-4 border-t border-[#C9BDAA]/40 mb-8">
                    <span className="text-[10px] tracking-wider uppercase text-[#77786B] block mb-3 font-mono">
                      Core Deliverables:
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#525049] font-light">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#A76F55] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase px-6 py-3.5 bg-[#292824] text-[#FAF9F6] hover:bg-[#A76F55] transition-colors"
                    >
                      <span>Inquire for Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>

                    {service.id === "bespoke-kitchen-craft" && (
                      <Link
                        href="/experience"
                        className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase px-6 py-3.5 border border-[#292824]/30 text-[#292824] hover:bg-white transition-colors"
                      >
                        <span>The Live Experience</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
