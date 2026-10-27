import React from "react";
import { Hero } from "@/components/ui/Hero";
import { BrandIntro } from "@/components/ui/BrandIntro";
import { CollectionGrid } from "@/components/ui/CollectionGrid";
import { MaterialsCarousel } from "@/components/ui/MaterialsCarousel";
import { ExperienceSection } from "@/components/ui/ExperienceSection";
import { SpacesGrid } from "@/components/ui/SpacesGrid";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { OurApproach } from "@/components/ui/OurApproach";
import { JournalPreview } from "@/components/ui/JournalPreview";
import { FinalCTA } from "@/components/ui/FinalCTA";

export default function HomePage() {
  return (
    <>
      {/* Section A: Full-Screen Hero */}
      <Hero />

      {/* Section B: Brand Introduction */}
      <BrandIntro />

      {/* Section C: Featured Collections Grid */}
      <CollectionGrid />

      {/* Section D: Materials in Focus Interactive Carousel */}
      <MaterialsCarousel />

      {/* Section E: Signature Experience (Live Kitchen Manufacturing) */}
      <ExperienceSection />

      {/* Section F: Designed for Every Space */}
      <SpacesGrid />

      {/* Section G: Featured Projects */}
      <ProjectGallery />

      {/* Section H: Our Approach */}
      <OurApproach />

      {/* Section I: Inspiration / Journal Preview */}
      <JournalPreview />

      {/* Section J: Final Call to Action */}
      <FinalCTA />
    </>
  );
}
