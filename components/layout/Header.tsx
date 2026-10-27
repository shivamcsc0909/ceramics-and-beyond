"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenMenu: () => void;
  isMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, isMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#292824]/90 backdrop-blur-md py-4 border-b border-[#C9BDAA]/20 shadow-sm text-[#FAF9F6]"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="group inline-flex flex-col text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9BDAA]"
          aria-label="Ceramics & Beyond Home"
        >
          <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.22em] uppercase font-light leading-none">
            Ceramics & Beyond
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[#C9BDAA] uppercase mt-1 transition-opacity group-hover:text-white">
            Surfaces · Kitchens · Architecture
          </span>
        </Link>

        {/* Minimal Navigation & Menu Toggle */}
        <div className="flex items-center space-x-6">
          <Link
            href="/experience"
            className="hidden md:inline-flex items-center text-xs tracking-architectural uppercase text-[#C9BDAA] hover:text-white transition-colors duration-300 border border-[#C9BDAA]/30 px-3.5 py-1.5 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#A76F55] animate-pulse mr-2" />
            Live Experience
          </Link>

          <button
            type="button"
            onClick={onOpenMenu}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            className="group inline-flex items-center space-x-2.5 text-xs sm:text-sm tracking-architectural uppercase py-2 px-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9BDAA] transition-colors"
          >
            <span className="font-sans font-medium text-xs tracking-[0.2em] group-hover:text-[#C9BDAA] transition-colors">
              {isMenuOpen ? "CLOSE" : "MENU"}
            </span>
            <div className="w-8 h-8 rounded-full border border-current/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-[#C9BDAA]">
              {isMenuOpen ? (
                <X className="w-4 h-4 text-[#C9BDAA]" />
              ) : (
                <div className="flex flex-col space-y-1 w-3.5">
                  <span className="block h-[1.5px] w-full bg-current transition-all group-hover:bg-[#C9BDAA]" />
                  <span className="block h-[1.5px] w-2/3 ml-auto bg-current transition-all group-hover:w-full group-hover:bg-[#C9BDAA]" />
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
