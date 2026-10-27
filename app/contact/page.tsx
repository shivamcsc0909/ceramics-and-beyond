import React from "react";
import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Calendar, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/ui/ContactForm";
import { BRAND_INFO } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Contact Us | Schedule Factory Floor Walkthrough",
  description:
    "Connect with Ceramics & Beyond. Request architectural surface swatches, inquire about bespoke kitchens, or book your live factory floor visit.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#F5F2EC] text-[#292824]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />

        <div className="mt-8 mb-16 max-w-3xl">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-3">
            Atelier Dialogue
          </span>
          <h1 className="font-serif text-display-hero font-light text-[#292824] leading-tight">
            Consult Our Atelier &amp;<br />
            <span className="italic font-normal">Factory Floor.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#525049] font-light leading-relaxed">
            Whether you are commissioning a bespoke live-crafted kitchen or specifying continuous porcelain slabs for an estate, our team is at your disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Atelier Details & Factory Visit Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Contact Card */}
            <div className="bg-[#FAF9F6] p-8 border border-[#C9BDAA]/40 shadow-sm">
              <span className="text-[10px] tracking-architectural uppercase text-[#A76F55] font-semibold block mb-4">
                Direct Communication
              </span>

              <div className="space-y-5 text-sm text-[#525049]">
                <div className="flex items-start space-x-3.5">
                  <Mail className="w-4 h-4 text-[#A76F55] mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#77786B] block">Email</span>
                    <a
                      href={`mailto:${BRAND_INFO.contact.email}`}
                      className="font-medium text-[#292824] hover:text-[#A76F55] transition-colors"
                    >
                      {BRAND_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Phone className="w-4 h-4 text-[#A76F55] mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#77786B] block">Telephone</span>
                    <a
                      href={`tel:${BRAND_INFO.contact.phone.replace(/\s+/g, "")}`}
                      className="font-medium text-[#292824] hover:text-[#A76F55] transition-colors"
                    >
                      {BRAND_INFO.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-4 h-4 text-[#A76F55] mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#77786B] block">Address</span>
                    <p className="font-medium text-[#292824]">{BRAND_INFO.contact.address}</p>
                    <p className="text-xs text-[#77786B] mt-0.5">Development Placeholder</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-4 h-4 text-[#A76F55] mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#77786B] block">Atelier Hours</span>
                    <p className="font-medium text-[#292824]">{BRAND_INFO.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Factory Floor Walkthrough Card */}
            <div className="bg-[#292824] text-[#FAF9F6] p-8 border border-[#33312C] shadow-lg">
              <div className="flex items-center space-x-2 text-[#A76F55] mb-3">
                <Calendar className="w-4 h-4" />
                <span className="text-[10px] tracking-architectural uppercase font-mono font-semibold">
                  Factory Floor Experience
                </span>
              </div>

              <h3 className="font-serif text-2xl font-light text-white mb-2">
                Tour Our Live Production
              </h3>

              <p className="text-xs sm:text-sm text-[#C9BDAA] font-light leading-relaxed mb-6">
                Appointments are held Monday through Friday. Walk through our stone gallery, inspect 5-axis CNC routing, and see kitchens being dry-run assembled.
              </p>

              <div className="p-3 bg-[#1A1916] border border-[#C9BDAA]/20 text-[11px] text-[#C9BDAA] flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Private, one-on-one architectural consultation provided.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
