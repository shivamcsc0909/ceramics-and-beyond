import React from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="mt-8 mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-2">
            Commercial &amp; Data Ethics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#292824]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-xs text-[#77786B] font-mono">
            Ceramics &amp; Beyond · Custom Furniture &amp; Modular Joinery · New Delhi, India
          </p>
        </div>

        <div className="bg-[#FAF9F6] p-8 sm:p-12 border border-[#C9BDAA]/40 space-y-8 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you submit a project enquiry, request finish swatch palettes, or consult on custom furniture through Ceramics &amp; Beyond, we collect information you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
              <li>Full Name and Company / Commercial Trading entity name</li>
              <li>Business email address, telephone, or WhatsApp contact number</li>
              <li>Country of destination, estimated order volumes, and target product categories</li>
              <li>Project scope, architectural specifications, or freight logistics requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              2. How Your Information is Used
            </h2>
            <p>
              We process your commercial details exclusively for legitimate B2B trade, product supply, and export coordination purposes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
              <li>Dispatching physical finish samples, veneer swatches, and material palettes</li>
              <li>Issuing custom joinery proposals, 3D shop drawings, and delivery schedules</li>
              <li>Coordinating batch calibrations and delivery logistics</li>
              <li>We never sell, rent, or lease your commercial data to third-party marketers.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-light text-[#292824] mb-3">
              3. Data Retention &amp; Security
            </h2>
            <p>
              Trade enquiries are stored securely within our authenticated management database with role-based access restrictions. You may request verification, correction, or deletion of your company records at any time by contacting hello@example.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
