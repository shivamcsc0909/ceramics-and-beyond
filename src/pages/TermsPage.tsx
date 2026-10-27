import React from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

        <div className="mt-8 mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-2">
            Commercial Guidelines
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#292824]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-xs text-[#77786B] font-mono">
            Ceramics &amp; Beyond · Atelier &amp; Studio Terms
          </p>
        </div>

        <div className="bg-[#FAF9F6] p-8 sm:p-12 border border-[#C9BDAA]/40 space-y-8 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              1. Bespoke Joinery Specifications &amp; Natural Material Variation
            </h2>
            <p>
              Custom handcrafted furniture, natural timber veneers, PU paint, and rattan inlays possess subtle organic variations in grain, tone, and texture. These natural characteristics are genuine hallmarks of authentic craftsmanship and bespoke furniture making.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              2. Custom Orders, Site Measurements &amp; In-House Manufacturing
            </h2>
            <p>
              All joinery dimensions, modular cabinet configurations, finishes, and production schedules are verified upon on-site measurement approval or architectural drawings with our New Delhi factory and studio.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              3. Intellectual Property
            </h2>
            <p>
              All bespoke furniture designs, modular layout concepts, technical drawings, and photography hosted on this website remain the exclusive intellectual property of Ceramics &amp; Beyond.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
