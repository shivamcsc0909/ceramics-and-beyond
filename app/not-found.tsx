import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 px-6 sm:px-8 bg-[#F5F2EC] text-[#292824]">
      <div className="max-w-xl text-center">
        <span className="font-mono text-sm tracking-widest text-[#A76F55] uppercase block mb-3 font-semibold">
          Error 404 · Uncharted Surface
        </span>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-[#292824] leading-tight mb-6">
          Space Not Found
        </h1>

        <p className="text-sm sm:text-base text-[#525049] font-light leading-relaxed mb-8 max-w-md mx-auto">
          The architectural route you are seeking may have been renamed or relocated. Return to our curated collections or visit our factory floor.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-[#292824] text-[#FAF9F6] px-6 py-3.5 text-xs tracking-architectural uppercase font-medium hover:bg-[#A76F55] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/collections"
            className="inline-flex items-center space-x-2 border border-[#292824]/40 text-[#292824] px-6 py-3.5 text-xs tracking-architectural uppercase font-medium hover:bg-white transition-colors"
          >
            <span>Browse Collections</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
