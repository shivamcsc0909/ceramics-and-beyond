import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Phone, ShieldCheck, Award, Layers } from 'lucide-react';

const SLIDES = [
  { url: '/images/sofa.jpeg', tag: 'Craft 01', title: 'Bespoke Living Room Sofas' },
  { url: '/images/wooden-furniture-of-luxury-kitchens.jpeg', tag: 'Craft 02', title: 'Solid Wood & Modular Kitchens' },
  { url: '/images/tiles.jpeg', tag: 'Craft 03', title: 'Designer Architectural Tiles' }
];

export const LandingOne: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#FAF9F6] text-[#1A1916] min-h-screen selection:bg-[#1A1916] selection:text-[#FAF9F6]">
      {/* Editorial Header */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E5DFD5] py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link to="/" className="flex flex-col group">
            <span className="font-serif text-xl sm:text-2xl uppercase tracking-[0.22em] font-light leading-none group-hover:text-[#A76F55] transition-colors">
              Ceramics & Beyond
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#737067] mt-1 font-sans">
              Variation 01 · Atelier Minimal
            </span>
          </Link>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <a href="tel:+919876543210" className="hidden sm:inline-flex items-center text-xs tracking-wider text-[#1A1916] font-medium hover:text-[#A76F55] transition-colors">
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#A76F55]" />
              +91 98765 43210
            </a>
            <a href="#consultation" className="inline-flex items-center bg-[#1A1916] text-[#FAF9F6] px-4 sm:px-5 py-2.5 text-xs uppercase tracking-[0.22em] hover:bg-[#A76F55] transition-colors font-medium">
              <span>Book Consultation</span>
            </a>
          </div>
        </div>
      </header>

      {/* Split Asymmetric Hero */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2">
                <span className="w-8 h-[1px] bg-[#A76F55]"></span>
                <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#A76F55] font-semibold">
                  Factory & Experience Centre · New Delhi
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-[#1A1916]">
                We manufacture Furniture.<br />
                <span className="italic text-[#C9BDAA] font-normal">Thoughtfully Made. Entirely Yours.</span>
              </h1>
              <p className="text-sm sm:text-base text-[#737067] font-light leading-relaxed max-w-xl">
                Custom Sofas, Solid Wooden Furniture, Modular Kitchens, Wardrobes, and Designer Architectural Tiles. Built to your exact measurements in our own New Delhi workshop.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a href="#consultation" className="inline-flex items-center bg-[#A76F55] text-white px-6 sm:px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#8E5B43] transition-colors shadow-sm">
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
                </a>
                <a href="#pillars" className="inline-flex items-center border border-[#E5DFD5] text-[#1A1916] px-6 py-3.5 text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#F4EFEA] transition-colors">
                  <span>Explore What We Make</span>
                </a>
              </div>
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E5DFD5]">
                <div>
                  <span className="block font-serif text-2xl text-[#1A1916]">100%</span>
                  <span className="text-[10px] text-[#737067] uppercase tracking-wider">In-House Made</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl text-[#1A1916]">NIFT</span>
                  <span className="text-[10px] text-[#737067] uppercase tracking-wider">Design Pedigree</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl text-[#1A1916]">Blum</span>
                  <span className="text-[10px] text-[#737067] uppercase tracking-wider">German Hardware</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] bg-[#F4EFEA] overflow-hidden shadow-2xl border border-[#E5DFD5]">
                {SLIDES.map((slide, idx) => (
                  <div
                    key={slide.url}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                    }`}
                  >
                    <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 right-4 bg-[#1A1916]/85 backdrop-blur-md text-white p-3 text-xs border border-white/10">
                      <span className="text-[10px] uppercase tracking-widest text-[#C9BDAA] block">{slide.tag}</span>
                      <span className="font-serif text-sm">{slide.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section id="pillars" className="py-16 sm:py-24 bg-[#F4EFEA]/50 border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-5 border-b border-[#E5DFD5]">
            <div>
              <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#A76F55] font-semibold block mb-2">
                Signature Capabilities
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1916]">
                Sofas, Wooden Furniture &amp; Architectural Tiles
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#737067] font-light max-w-md mt-3 md:mt-0">
              Everything built under one roof in New Delhi. No middlemen, no compromise on dimensions or materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E5DFD5] p-6 flex flex-col justify-between group hover:border-[#A76F55] transition-all shadow-sm">
              <div>
                <div className="aspect-[16/10] overflow-hidden mb-5 bg-[#F4EFEA]">
                  <img src="/images/sofa.jpeg" alt="Custom comfortable sofa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A76F55] block mb-1">01 / SEATING</span>
                <h3 className="font-serif text-2xl font-light mb-2 text-[#1A1916]">Custom Sofas &amp; Seating</h3>
                <p className="text-xs text-[#737067] font-light leading-relaxed mb-4">
                  Handcrafted solid teak frames, high-density comfort foam, and stain-resistant fabric tailored to your living room size.
                </p>
              </div>
              <ul className="text-[11px] text-[#737067] space-y-1.5 pt-4 border-t border-[#E5DFD5]">
                <li className="flex items-center">✓ 3-Seater, L-Shape &amp; Sectionals</li>
                <li className="flex items-center">✓ Solid seasoned hardwood frame</li>
                <li className="flex items-center">✓ Unlimited fabric &amp; leatherette options</li>
              </ul>
            </div>

            <div className="bg-white border border-[#E5DFD5] p-6 flex flex-col justify-between group hover:border-[#A76F55] transition-all shadow-sm">
              <div>
                <div className="aspect-[16/10] overflow-hidden mb-5 bg-[#F4EFEA]">
                  <img src="/images/contemporary-walnut-island-kitchen.jpeg" alt="Modular island kitchen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A76F55] block mb-1">02 / JOINERY</span>
                <h3 className="font-serif text-2xl font-light mb-2 text-[#1A1916]">Wooden Furniture &amp; Kitchens</h3>
                <p className="text-xs text-[#737067] font-light leading-relaxed mb-4">
                  German soft-close modular kitchens, glass wardrobes, floating TV consoles, and hydraulic storage platform beds.
                </p>
              </div>
              <ul className="text-[11px] text-[#737067] space-y-1.5 pt-4 border-t border-[#E5DFD5]">
                <li className="flex items-center">✓ Genuine Blum &amp; Hettich hardware</li>
                <li className="flex items-center">✓ Zero-gap edge-banding for waterproof boards</li>
                <li className="flex items-center">✓ Tailored to the last millimeter</li>
              </ul>
            </div>

            <div className="bg-white border border-[#E5DFD5] p-6 flex flex-col justify-between group hover:border-[#A76F55] transition-all shadow-sm">
              <div>
                <div className="aspect-[16/10] overflow-hidden mb-5 bg-[#F4EFEA]">
                  <img src="/images/tiles.jpeg" alt="Designer architectural tiles" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A76F55] block mb-1">03 / SURFACES</span>
                <h3 className="font-serif text-2xl font-light mb-2 text-[#1A1916]">Designer Tiles &amp; Finishes</h3>
                <p className="text-xs text-[#737067] font-light leading-relaxed mb-4">
                  Hand-picked architectural tiles, marble coating, fluted panels, and enclosed dust-free PU paint in any RAL/Pantone color.
                </p>
              </div>
              <ul className="text-[11px] text-[#737067] space-y-1.5 pt-4 border-t border-[#E5DFD5]">
                <li className="flex items-center">✓ Wall &amp; floor designer tiles</li>
                <li className="flex items-center">✓ Custom PU paint color matching</li>
                <li className="flex items-center">✓ Natural veneer &amp; rattan inlays</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Live Counter */}
      <section className="py-16 sm:py-24 bg-[#1A1916] text-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C9BDAA] block">
                The Live Counter Concept
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
                Factory &amp; Experience Centre Under One Roof.
              </h2>
              <p className="text-sm text-[#C9BDAA]/90 font-light leading-relaxed">
                Think of it like watching your paneer tikka being prepared fresh at a live counter — except this time, it's your kitchen and custom sofa taking shape.
              </p>
              <div className="space-y-3 pt-2 text-xs text-[#C9BDAA]">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A76F55]"></span>
                  <span>Watch your timber, panels, and frames cut on precision CNC machines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A76F55]"></span>
                  <span>Inspect PU paint spray booths and sample swatches in person</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A76F55]"></span>
                  <span>Zero third-party middlemen markups or mystery subcontractors</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/in-house-cnc.jpeg" alt="Precision machinery at workshop" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation" className="py-16 sm:py-24 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#A76F55] font-semibold block mb-2">
              Direct Inquiry
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1916]">
              Book Your Design Consultation
            </h2>
            <p className="text-xs sm:text-sm text-[#737067] font-light mt-2 max-w-md mx-auto">
              Share your room requirements or layout drawings. Our team will connect with you within 2 hours.
            </p>
          </div>

          <div className="bg-white border border-[#E5DFD5] p-6 sm:p-10 shadow-lg">
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#737067] mb-2 font-medium">Your Name *</label>
                  <input type="text" required placeholder="Enter full name" className="w-full bg-[#F4EFEA] border border-[#E5DFD5] px-4 py-3 text-xs text-[#1A1916] focus:outline-none focus:border-[#A76F55]" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#737067] mb-2 font-medium">Phone Number *</label>
                  <input type="tel" required placeholder="+91 Mobile number" className="w-full bg-[#F4EFEA] border border-[#E5DFD5] px-4 py-3 text-xs text-[#1A1916] focus:outline-none focus:border-[#A76F55]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#737067] mb-2 font-medium">Email Address</label>
                  <input type="email" placeholder="name@example.com" className="w-full bg-[#F4EFEA] border border-[#E5DFD5] px-4 py-3 text-xs text-[#1A1916] focus:outline-none focus:border-[#A76F55]" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#737067] mb-2 font-medium">I Am Interested In *</label>
                  <select required className="w-full bg-[#F4EFEA] border border-[#E5DFD5] px-4 py-3 text-xs text-[#1A1916] focus:outline-none focus:border-[#A76F55]">
                    <option value="">Select Category</option>
                    <option value="sofa">Custom Living Room Sofa</option>
                    <option value="kitchen">Modular Kitchen & Dining Table</option>
                    <option value="wardrobe">Wardrobes & Bedroom Furniture</option>
                    <option value="tiles">Designer Tiles & PU Finishes</option>
                    <option value="full-home">Complete Full-Home Furniture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#737067] mb-2 font-medium">Message / Room Dimensions (Optional)</label>
                <textarea rows={3} placeholder="Tell us about your room size, required style, or preferred visit date..." className="w-full bg-[#F4EFEA] border border-[#E5DFD5] px-4 py-3 text-xs text-[#1A1916] focus:outline-none focus:border-[#A76F55]"></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1A1916] text-[#FAF9F6] px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#A76F55] transition-colors">
                  <span>Send Consultation Request</span>
                </button>
                <span className="hidden sm:inline-block text-[11px] text-[#737067] font-light">
                  📍 Experience Centre in New Delhi
                </span>
              </div>

              {submitted && (
                <div className="p-4 bg-[#E8F0E6] text-[#2D5A27] text-xs border border-[#C5DEC0]">
                  Thank you! Your consultation request has been received. Our team will contact you shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#F4EFEA] border-t border-[#E5DFD5] text-center text-xs text-[#737067]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Ceramics & Beyond · Variation 01 (Atelier Minimal). All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
            <Link to="/" className="hover:text-[#1A1916]">Main Site</Link>
            <Link to="/products" className="hover:text-[#1A1916]">Creations</Link>
            <Link to="/contact" className="hover:text-[#1A1916]">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
