import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND_INFO, MAIN_NAV_ITEMS } from "@/data/navigation";
import { COLLECTIONS } from "@/data/collections";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1916] text-[#FAF9F6] border-t border-[#33312C] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Section with Brand Wordmark & Experience Teaser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#33312C]">
          <div className="lg:col-span-5">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#A76F55] block mb-3 font-semibold">
              The Architectural Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide uppercase leading-tight">
              Ceramics &amp; Beyond
            </h2>
            <p className="mt-4 text-sm text-[#C9BDAA] font-light leading-relaxed max-w-md">
              Bridging earth’s geological marvels and German joinery precision. From curated continuous porcelain slabs to kitchens crafted live in front of your eyes.
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <Link
                href="/experience"
                className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase px-5 py-3 border border-[#C9BDAA]/40 text-[#FAF9F6] hover:bg-[#FAF9F6] hover:text-[#1A1916] transition-all duration-300"
              >
                <span>Live Factory Experience</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase px-5 py-3 bg-[#A76F55] text-white hover:bg-[#8E5B43] transition-all duration-300"
              >
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Navigation links */}
            <div>
              <span className="text-[10px] tracking-architectural uppercase text-[#C9BDAA] block mb-4">
                Explore
              </span>
              <ul className="space-y-2.5 text-xs text-[#FAF9F6]/80 font-light">
                {MAIN_NAV_ITEMS.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white hover:translate-x-1 inline-block transition-transform">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collections */}
            <div>
              <span className="text-[10px] tracking-architectural uppercase text-[#C9BDAA] block mb-4">
                Collections
              </span>
              <ul className="space-y-2.5 text-xs text-[#FAF9F6]/80 font-light">
                {COLLECTIONS.slice(0, 6).map((col) => (
                  <li key={col.slug}>
                    <Link
                      href={`/collections/${col.slug}`}
                      className="hover:text-white hover:translate-x-1 inline-block transition-transform line-clamp-1"
                    >
                      {col.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Atelier Contact */}
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] tracking-architectural uppercase text-[#C9BDAA] block mb-4">
                Atelier
              </span>
              <div className="space-y-3 text-xs text-[#C9BDAA] font-light">
                <p className="text-white">{BRAND_INFO.contact.address}</p>
                <p>
                  <a
                    href={`mailto:${BRAND_INFO.contact.email}`}
                    className="hover:text-white transition-colors block font-mono text-xs text-white"
                  >
                    {BRAND_INFO.contact.email}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${BRAND_INFO.contact.phone.replace(/\s+/g, "")}`}
                    className="hover:text-white transition-colors block text-white"
                  >
                    {BRAND_INFO.contact.phone}
                  </a>
                </p>
                <p className="text-[11px] text-[#77786B] pt-1">{BRAND_INFO.contact.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#77786B] gap-4">
          <p>© {new Date().getFullYear()} Ceramics &amp; Beyond. All rights reserved.</p>
          
          <div className="flex items-center space-x-6 text-[11px] tracking-wider uppercase">
            <Link href="/privacy-policy" className="hover:text-[#C9BDAA] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-[#C9BDAA] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-[#C9BDAA] transition-colors">
              Direct Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
