import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ceramics & Beyond",
  description: "Terms and conditions for specifying materials and commissioning bespoke joinery with Ceramics & Beyond.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

        <div className="mt-8 mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-2">
            Contractual Guidelines
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#292824]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-xs text-[#77786B] font-mono">
            Last updated: October 2025 · Editable Template
          </p>
        </div>

        <div className="bg-[#FAF9F6] p-8 sm:p-12 border border-[#C9BDAA]/40 space-y-8 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              1. Natural Stone &amp; Ceramic Characteristics
            </h2>
            <p>
              Natural marble, quartzite, and travertine are geological materials with inherent variations in veining, crystalline inclusions, and tonal fissures. These characteristics are hallmarks of authentic natural origin and are not deemed defects. Slabs are presented for client inspection prior to cutting.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              2. Live Manufacturing &amp; Factory Floor Walkthroughs
            </h2>
            <p>
              Factory floor visits must be scheduled in advance with our atelier coordinator to maintain safety standards. Attendees must follow all safety protocols, including wearing protective eyewear and footwear provided by our staff within designated machinery corridors.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              3. Custom Cabinetry Dry-Run Approvals
            </h2>
            <p>
              For bespoke kitchens, clients are invited to inspect the dry-run pre-assembled structure on our workshop floor. Written sign-off on the layout and drawer action signifies authorization for final packing and white-glove site dispatch.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              4. Warranties &amp; Guarantees
            </h2>
            <p>
              Our cabinetry carcasses carry a 10-year structural warranty against manufacturing defects when installed by our certified team. Sintered porcelain surfaces are backed by manufacturer guarantees against UV degradation and thermal shock.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
