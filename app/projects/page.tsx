import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects Portfolio | Architectural Case Studies",
  description:
    "Explore built architectural projects specified with Ceramics & Beyond surfaces and live-manufactured kitchens across luxury residences, penthouses, and boutiques.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: "Projects" }]} />

        <div className="mt-8 mb-16 sm:mb-20 max-w-3xl">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
            Selected Works
          </span>
          <h1 className="font-serif text-display-hero font-light text-[#292824] leading-tight">
            Architectural Projects &amp;<br />
            <span className="italic font-normal">Living Realities.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
            Every project represents a singular collaboration with architects and homeowners. Explore how our stone surfaces and live-fabricated kitchens come together in built form.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {PROJECTS.map((project, index) => (
            <div key={project.slug} className={`group ${index % 2 === 1 ? "md:translate-y-8" : ""}`}>
              <Link href={`/projects/${project.slug}`} className="block overflow-hidden bg-[#ECE7DE] shadow-md">
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <Image
                    src={project.heroImage}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] tracking-widest uppercase text-white font-mono">
                    {project.year}
                  </div>
                </div>

                <div className="p-6 sm:p-8 bg-[#FAF9F6] border-b border-x border-[#C9BDAA]/40">
                  <div className="flex items-center space-x-2 text-xs text-[#77786B] mb-2 font-mono uppercase tracking-wider">
                    <span>{project.category}</span>
                    <span>·</span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-[#A76F55]" />
                      {project.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#292824] mb-3 group-hover:text-[#A76F55] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#525049] font-light leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#C9BDAA]/30">
                    <span className="text-xs tracking-architectural uppercase text-[#292824] font-medium group-hover:text-[#A76F55] transition-colors inline-flex items-center space-x-1">
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] text-[#77786B] font-mono">
                      {project.materialsUsed.length} Key Materials
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
