import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | Ceramics & Beyond",
  description: "Privacy policy and client data handling practices for Ceramics & Beyond architectural inquiries.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="mt-8 mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-2">
            Legal &amp; Data Ethics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#292824]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-xs text-[#77786B] font-mono">
            Last updated: October 2025 · Editable Template
          </p>
        </div>

        <div className="bg-[#FAF9F6] p-8 sm:p-12 border border-[#C9BDAA]/40 space-y-8 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you interact with Ceramics &amp; Beyond through our website, request surface swatches, or book an appointment for our Live Kitchen Manufacturing Experience, we collect information you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
              <li>Full Name and architectural firm affiliation (if applicable)</li>
              <li>Email address and phone number</li>
              <li>Project location, spatial measurements, and material preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              2. How Your Information is Used
            </h2>
            <p>
              We process your details exclusively for legitimate architectural consultation purposes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
              <li>Coordinating sample swatch deliveries and material specifications</li>
              <li>Scheduling private walkthroughs of our live manufacturing floor</li>
              <li>Providing technical CAD drawings and estimates</li>
              <li>We never sell, rent, or lease your personal information to third-party marketers.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              3. Data Retention &amp; Security
            </h2>
            <p>
              Your inquiries are retained only for as long as necessary to fulfill your design commission or project relationship. We employ industry-standard encryption and operational safeguards to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              4. Contact Our Data Representative
            </h2>
            <p>
              To request the modification or deletion of your information, please contact our atelier at <span className="font-mono text-xs text-[#292824]">hello@example.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
