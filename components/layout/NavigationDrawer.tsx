"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { MAIN_NAV_ITEMS, BRAND_INFO } from "@/data/navigation";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape & Lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        className={`fixed top-0 right-0 h-full w-full sm:w-[540px] md:w-[620px] bg-[#1A1916] text-[#FAF9F6] z-50 shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] border-l border-[#C9BDAA]/20 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 sm:p-8 flex items-center justify-between border-b border-[#33312C]">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9BDAA]">Navigation</span>
            <p className="font-serif text-lg tracking-widest text-[#FAF9F6]">CERAMICS & BEYOND</p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="group flex items-center space-x-2 text-xs tracking-architectural uppercase text-[#C9BDAA] hover:text-[#FAF9F6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9BDAA] p-2"
          >
            <span>Close</span>
            <div className="w-8 h-8 rounded-full border border-[#C9BDAA]/30 flex items-center justify-center group-hover:border-[#FAF9F6] transition-colors">
              <X className="w-4 h-4 text-[#C9BDAA] group-hover:text-white" />
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-6 sm:p-8 sm:py-6 flex-1">
          <nav className="flex flex-col space-y-1 sm:space-y-2">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline justify-between py-2 sm:py-3 border-b border-[#33312C]/60 hover:border-[#C9BDAA]/40 transition-colors"
              >
                <div className="flex items-baseline space-x-4">
                  <span className="text-[11px] font-mono text-[#A76F55] tracking-widest group-hover:text-[#FAF9F6] transition-colors">
                    {item.number}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-[#FAF9F6] group-hover:text-[#C9BDAA] group-hover:translate-x-2 transition-all duration-300">
                    {item.title}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#77786B] opacity-0 group-hover:opacity-100 group-hover:text-[#C9BDAA] -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Quick Experience Highlight */}
          <div className="mt-8 p-4 rounded-sm bg-[#22211D] border border-[#C9BDAA]/20">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#A76F55] animate-ping" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76F55] font-semibold">
                Live Manufacturing
              </span>
            </div>
            <p className="mt-1 text-xs text-[#C9BDAA] font-light leading-relaxed">
              Witness your kitchen crafted live on our factory floor. Transparency from first cut to final polish.
            </p>
            <Link
              href="/experience"
              onClick={onClose}
              className="inline-flex items-center mt-3 text-xs tracking-architectural uppercase text-white hover:text-[#C9BDAA] transition-colors font-medium"
            >
              Tour The Experience →
            </Link>
          </div>
        </div>

        {/* Drawer Footer Contact Information */}
        <div className="p-6 sm:p-8 bg-[#151412] border-t border-[#33312C] text-xs text-[#77786B]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] tracking-architectural uppercase text-[#C9BDAA] block mb-1">
                Atelier Inquiries
              </span>
              <a
                href={`mailto:${BRAND_INFO.contact.email}`}
                className="hover:text-white transition-colors block text-sm text-[#FAF9F6]"
              >
                {BRAND_INFO.contact.email}
              </a>
              <a
                href={`tel:${BRAND_INFO.contact.phone.replace(/\s+/g, "")}`}
                className="hover:text-white transition-colors block mt-1"
              >
                {BRAND_INFO.contact.phone}
              </a>
            </div>
            <div>
              <span className="text-[10px] tracking-architectural uppercase text-[#C9BDAA] block mb-1">
                Location
              </span>
              <p className="text-xs text-[#C9BDAA]">{BRAND_INFO.contact.address}</p>
              <p className="text-[11px] text-[#77786B] mt-1">{BRAND_INFO.contact.hours}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#33312C] flex items-center justify-between text-[11px]">
            <span className="text-[#77786B]">© {new Date().getFullYear()} Ceramics & Beyond</span>
            <div className="flex space-x-4">
              <Link href="/privacy-policy" onClick={onClose} className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms-and-conditions" onClick={onClose} className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
