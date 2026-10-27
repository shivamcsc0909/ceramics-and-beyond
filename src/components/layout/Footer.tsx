import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Mail, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1916] text-[#FAF9F6] border-t border-[#33312C] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#33312C]">
          <div className="lg:col-span-5">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#A76F55] block mb-3 font-semibold">
              Thoughtfully Made. Entirely Yours.
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide uppercase leading-tight">
              Ceramics &amp; Beyond
            </h2>
            <p className="mt-4 text-sm text-[#C9BDAA] font-light leading-relaxed max-w-md">
              Founded by a NIFT graduate and woman entrepreneur. Crafting bespoke modular kitchens, wardrobes, and living furniture with factory &amp; experience centre under one roof. Simple yet seen. Practical yet personal. Made for the way you live.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase px-5 py-3 border border-[#C9BDAA]/40 text-[#FAF9F6] hover:bg-[#FAF9F6] hover:text-[#1A1916] transition-all duration-300"
              >
                <span>Explore Creations</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 text-xs tracking-architectural uppercase px-5 py-3 bg-[#A76F55] text-white hover:bg-[#8E5B43] transition-all duration-300"
              >
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <span className="text-[10px] tracking-architectural uppercase text-[#C9BDAA] block mb-4">
                Explore
              </span>
              <ul className="space-y-2.5 text-xs text-[#FAF9F6]/80 font-light">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">All Furniture &amp; Finishes</Link></li>
                <li><Link to="/craftsmanship" className="hover:text-white transition-colors">Factory &amp; Experience Centre</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Our Story (Founder Narrative)</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact &amp; Visit Studio</Link></li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] tracking-architectural uppercase text-[#C9BDAA] block mb-4">
                What We Make
              </span>
              <ul className="space-y-2.5 text-xs text-[#FAF9F6]/80 font-light">
                <li><Link to="/category/modular-furniture" className="hover:text-white transition-colors">Modular Kitchens &amp; Wardrobes</Link></li>
                <li><Link to="/category/functional-statement" className="hover:text-white transition-colors">TV Panels, Vanities &amp; Mandirs</Link></li>
                <li><Link to="/category/bespoke-furniture" className="hover:text-white transition-colors">Bespoke Wooden Furniture &amp; Beds</Link></li>
                <li><Link to="/category/finishes-palette" className="hover:text-white transition-colors">Finishes, PU Paint &amp; Tiles</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] tracking-architectural uppercase text-[#C9BDAA] block mb-4">
                Experience Centre &amp; Factory
              </span>
              <div className="space-y-3 text-xs text-[#C9BDAA] font-light">
                <p className="text-white flex items-start">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#A76F55] shrink-0 mt-0.5" />
                  <span>New Delhi, Delhi, India</span>
                </p>
                <p className="flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-[#A76F55] shrink-0" />
                  <a href="mailto:hello@example.com" className="hover:text-white transition-colors font-mono">hello@example.com</a>
                </p>
                <p className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-[#A76F55] shrink-0" />
                  <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
                </p>
                <p className="text-[11px] text-[#77786B] pt-1">Mon – Sat: 10:00 AM – 7:00 PM IST</p>
                <p className="text-[10px] text-[#A76F55] pt-1 font-mono uppercase tracking-widest">The "Live Counter" of Cabinetry</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#77786B] gap-4">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} Ceramics &amp; Beyond. Thoughtfully Made. Entirely Yours. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-[11px] tracking-wider uppercase">
            <Link to="/privacy-policy" className="hover:text-[#C9BDAA] transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-[#C9BDAA] transition-colors">Terms &amp; Conditions</Link>
            <Link to="/contact" className="hover:text-[#C9BDAA] transition-colors">Book Consultation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
