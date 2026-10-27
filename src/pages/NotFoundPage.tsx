import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F5F2EC] px-6 py-24 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#A76F55]/10 text-[#A76F55] flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-[10px] tracking-[0.3em] uppercase text-[#A76F55] font-semibold block mb-2 font-mono">
          404 · Uncharted Space
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#292824] mb-4">
          Surface Not Found
        </h1>

        <p className="text-sm text-[#525049] font-light leading-relaxed mb-8">
          The architectural volume or material specification you are seeking cannot be located or has moved to an archived collection.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase bg-[#292824] text-[#FAF9F6] px-6 py-3.5 font-medium hover:bg-[#A76F55] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Atelier Home</span>
          </Link>

          <Link
            to="/collections"
            className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase border border-[#292824]/40 text-[#292824] px-6 py-3.5 font-medium hover:bg-white transition-colors"
          >
            <span>Explore Collections</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
