"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PROJECTS } from "@/data/projects";

export const ProjectGallery: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#F5F2EC] text-[#292824] border-t border-[#C9BDAA]/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-6 h-[1px] bg-[#A76F55]" />
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76F55] font-semibold">
                Portfolio of Works
              </span>
            </div>
            <h2 className="font-serif text-display-section font-light text-[#292824] leading-tight">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center space-x-2 text-xs sm:text-sm tracking-architectural uppercase text-[#292824] font-medium hover:text-[#A76F55] transition-colors self-start md:self-end pb-1 border-b border-[#292824]/30 hover:border-[#A76F55]"
          >
            <span>View Full Portfolio</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* 2-Column Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {PROJECTS.map((project, index) => (
            <div key={project.slug} className={`group ${index % 2 === 1 ? "md:translate-y-12" : ""}`}>
              <Link href={`/projects/${project.slug}`} className="block overflow-hidden bg-[#ECE7DE] shadow-sm">
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
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                    <span className="text-[10px] text-[#77786B] font-mono">
                      {project.materialsUsed.length} Materials Specified
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
