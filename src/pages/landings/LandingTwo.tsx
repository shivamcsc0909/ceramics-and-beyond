import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, CheckCircle2 } from 'lucide-react';

const TAB_DATA = [
  {
    title: 'Custom Sofas & Living Seating',
    desc: 'Handcrafted solid teak frames, high-density comfort cushioning, and stain-resistant designer fabrics tailored to the exact proportions of your home.',
    img: '/images/sofa.jpeg'
  },
  {
    title: 'Wooden Furniture & Modular Kitchens',
    desc: 'German soft-close modular kitchens, glass wardrobes, and hydraulic platform beds built with millimeter precision in our New Delhi workshop.',
    img: '/images/contemporary-walnut-island-kitchen.jpeg'
  },
  {
    title: 'Designer Tiles & Surface Finishes',
    desc: 'Curated architectural wall & floor tiles, smooth PU spray finishes in infinite Pantone shades, and natural veneer paneling.',
    img: '/images/tiles.jpeg'
  }
];

export const LandingTwo: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#1F1C19] text-[#F5F2EC] min-h-screen selection:bg-[#C88D66] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#161412]/95 backdrop-blur-md border-b border-[#3D3833] py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl uppercase tracking-[0.2em] font-light text-[#F5F2EC]">
              Ceramics &amp; Beyond
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C88D66] mt-0.5">
              Variation 02 · Craft &amp; Materiality
            </span>
          </Link>
          <div className="flex items-center space-x-5">
            <a href="tel:+919876543210" className="hidden md:inline-flex items-center text-xs tracking-wider text-[#B5ACA1] hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 mr-2 text-[#C88D66]" />
              New Delhi: +91 98765 43210
            </a>
            <a href="#quote" className="bg-[#C88D66] text-white px-5 py-2.5 text-xs uppercase tracking-widest font-medium hover:bg-[#B27650] transition-colors shadow-lg">
              Request Quote
            </a>
          </div>
        </div>
      </header>

      {/* Interactive Material-Switching Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 z-0">
          <img
            src={TAB_DATA[activeTab].img}
            alt="Hero Craft Showcase"
            className="w-full h-full object-cover transition-all duration-700 filter brightness-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-[#1F1C19]/70 to-[#161412]/60"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-[#C88D66] font-medium mb-4 bg-black/40 backdrop-blur-md px-4 py-1.5 border border-white/10">
            In-House Factory &amp; Experience Centre · New Delhi
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-tight mb-6">
            {TAB_DATA[activeTab].title}
          </h1>

          <p className="text-sm sm:text-lg text-[#B5ACA1] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            {TAB_DATA[activeTab].desc}
          </p>

          {/* Switcher Tabs */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-black/60 backdrop-blur-md border border-white/15 rounded-full mb-10">
            <button
              onClick={() => setActiveTab(0)}
              className={`px-4 sm:px-6 py-2 text-xs uppercase tracking-wider rounded-full transition-all ${
                activeTab === 0 ? 'bg-[#C88D66] text-white font-medium' : 'text-[#B5ACA1] hover:text-white'
              }`}
            >
              01 Sofas &amp; Seating
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`px-4 sm:px-6 py-2 text-xs uppercase tracking-wider rounded-full transition-all ${
                activeTab === 1 ? 'bg-[#C88D66] text-white font-medium' : 'text-[#B5ACA1] hover:text-white'
              }`}
            >
              02 Wooden Kitchens &amp; Wardrobes
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`px-4 sm:px-6 py-2 text-xs uppercase tracking-wider rounded-full transition-all ${
                activeTab === 2 ? 'bg-[#C88D66] text-white font-medium' : 'text-[#B5ACA1] hover:text-white'
              }`}
            >
              03 Designer Tiles &amp; Finishes
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#quote" className="w-full sm:w-auto inline-flex items-center justify-center bg-[#C88D66] text-white px-8 py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-[#B27650] transition-colors shadow-xl">
              <span>Book Live Factory Walkthrough</span>
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </a>
            <a href="#materials" className="w-full sm:w-auto inline-flex items-center justify-center border border-white/30 text-white px-8 py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-white/10 transition-colors">
              <span>Explore Finishes Palette</span>
            </a>
          </div>
        </div>
      </section>

      {/* The Live Counter Story */}
      <section className="py-20 sm:py-28 bg-[#161412] border-t border-[#3D3833]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C88D66] font-mono block">
                Authentic Transparency
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC] leading-tight">
                The Live Counter Concept
              </h2>
              <p className="text-sm text-[#B5ACA1] font-light leading-relaxed">
                Think of it like watching your paneer tikka being prepared fresh at a live counter — except this time, it's your kitchen and living space taking shape.
              </p>
              <div className="p-5 bg-[#292521] border-l-2 border-[#C88D66] text-xs text-[#B5ACA1] italic leading-relaxed">
                "Because making a house look good is one thing. Making it feel like home? That’s our job." — NIFT Graduate Founder
              </div>
              <div className="grid grid-cols-2 gap-6 pt-4 text-xs">
                <div>
                  <h4 className="font-serif text-xl text-[#F5F2EC] mb-1">Zero Mystery Vendors</h4>
                  <p className="text-[#B5ACA1] font-light text-[11px]">We never outsource to third-party workshops. Everything is built right here.</p>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-[#F5F2EC] mb-1">German Hardware</h4>
                  <p className="text-[#B5ACA1] font-light text-[11px]">Tested for 200,000+ silent soft-close cycles with Blum, Hettich &amp; Hafele.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/5] bg-neutral-800 overflow-hidden border border-[#3D3833]">
                  <img src="/images/in-house-cnc.jpeg" alt="Precision automated CNC cutting" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[4/5] bg-neutral-800 overflow-hidden border border-[#3D3833] mt-8">
                  <img src="/images/wooden-furniture-working-process.jpeg" alt="Bespoke furniture joinery and hand finishing" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finishes Explorer */}
      <section id="materials" className="py-20 sm:py-28 bg-[#1F1C19] border-t border-[#3D3833]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C88D66] block mb-2 font-medium">
              Surfaces &amp; Tactile Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F2EC]">
              Finishes &amp; Materials Palette
            </h2>
            <p className="text-xs sm:text-sm text-[#B5ACA1] font-light mt-3">
              Touch real wood veneers, examine dust-free PU lacquer coatings, and feel designer architectural tiles in person at our Delhi studio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#292521] border border-[#3D3833] p-5 group hover:border-[#C88D66] transition-all">
              <div className="aspect-square bg-neutral-800 overflow-hidden mb-4">
                <img src="/images/matte-pu-paint.jpeg" alt="Specialty matte PU paint finishes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <span className="text-[10px] font-mono text-[#C88D66] uppercase tracking-wider block mb-1">01 / COATINGS</span>
              <h3 className="font-serif text-xl text-[#F5F2EC] mb-1">Specialty PU Paint</h3>
              <p className="text-xs text-[#B5ACA1] font-light">Dust-free pressurized spray booths with unlimited RAL &amp; Pantone custom color matching.</p>
            </div>

            <div className="bg-[#292521] border border-[#3D3833] p-5 group hover:border-[#C88D66] transition-all">
              <div className="aspect-square bg-neutral-800 overflow-hidden mb-4">
                <img src="/images/natural-oak-walnut-veneer.jpeg" alt="Natural oak and walnut wood veneer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <span className="text-[10px] font-mono text-[#C88D66] uppercase tracking-wider block mb-1">02 / TIMBER</span>
              <h3 className="font-serif text-xl text-[#F5F2EC] mb-1">Natural Wood Veneers</h3>
              <p className="text-xs text-[#B5ACA1] font-light">Hand-matched open-pore walnut, white oak, and smoked teak with protective natural clear coats.</p>
            </div>

            <div className="bg-[#292521] border border-[#3D3833] p-5 group hover:border-[#C88D66] transition-all">
              <div className="aspect-square bg-neutral-800 overflow-hidden mb-4">
                <img src="/images/tiles.jpeg" alt="Designer architectural wall and floor tiles" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <span className="text-[10px] font-mono text-[#C88D66] uppercase tracking-wider block mb-1">03 / SURFACES</span>
              <h3 className="font-serif text-xl text-[#F5F2EC] mb-1">Architectural Tiles</h3>
              <p className="text-xs text-[#B5ACA1] font-light">Curated designer ceramic and porcelain tiles for backsplashes, feature walls, and moisture-prone spaces.</p>
            </div>

            <div className="bg-[#292521] border border-[#3D3833] p-5 group hover:border-[#C88D66] transition-all">
              <div className="aspect-square bg-neutral-800 overflow-hidden mb-4">
                <img src="/images/precision-hardware.jpeg" alt="Precision German hardware fittings" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <span className="text-[10px] font-mono text-[#C88D66] uppercase tracking-wider block mb-1">04 / HARDWARE</span>
              <h3 className="font-serif text-xl text-[#F5F2EC] mb-1">German Hardware</h3>
              <p className="text-xs text-[#B5ACA1] font-light">Genuine Blum, Hettich &amp; Hafele concealed soft-close hinges, servo lift-ups, and heavy-duty pantry units.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="py-20 sm:py-28 bg-[#161412] border-t border-[#3D3833]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="p-8 sm:p-12 bg-[#292521] border border-[#3D3833] shadow-2xl">
            <div className="text-center mb-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C88D66] block mb-2">Schedule An Appointment</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC] font-light">
                Discuss Your Custom Furniture Project
              </h2>
              <p className="text-xs sm:text-sm text-[#B5ACA1] font-light mt-2">
                Visit our factory and design lounge in New Delhi to touch sample mockups and get an itemized quote.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B5ACA1] mb-2">Name *</label>
                  <input type="text" required placeholder="Enter full name" className="w-full bg-[#161412] border border-[#3D3833] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C88D66]" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B5ACA1] mb-2">Phone *</label>
                  <input type="tel" required placeholder="+91 Mobile number" className="w-full bg-[#161412] border border-[#3D3833] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C88D66]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B5ACA1] mb-2">Email</label>
                  <input type="email" placeholder="name@example.com" className="w-full bg-[#161412] border border-[#3D3833] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C88D66]" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B5ACA1] mb-2">Project Scope *</label>
                  <select required className="w-full bg-[#161412] border border-[#3D3833] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C88D66]">
                    <option value="">Select Project Scope</option>
                    <option value="sofa">Living Room Sofa / Seating</option>
                    <option value="kitchen">Modular Kitchen</option>
                    <option value="wardrobe">Wardrobes &amp; Vanity Units</option>
                    <option value="tiles">Designer Tiles &amp; Wall Finishes</option>
                    <option value="full">Complete Home Interior Joinery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B5ACA1] mb-2">Estimated Timeline &amp; Notes</label>
                <textarea rows={3} placeholder="When do you plan to start, or any specific layout requirements..." className="w-full bg-[#161412] border border-[#3D3833] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C88D66]"></textarea>
              </div>

              <button type="submit" className="w-full bg-[#C88D66] text-white py-4 text-xs uppercase tracking-widest font-medium hover:bg-[#B27650] transition-colors shadow-lg">
                Request Design Consultation &amp; Factory Tour
              </button>

              {submitted && (
                <div className="p-4 bg-[#233820] text-[#A6E39D] text-xs border border-[#3E6539] text-center">
                  Thank you! Your inquiry has been submitted. Our team will contact you within 2 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#161412] border-t border-[#3D3833] text-center text-xs text-[#B5ACA1]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Ceramics & Beyond · Variation 02 (Craft & Materiality). All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
            <Link to="/" className="hover:text-white">Main Site</Link>
            <Link to="/products" className="hover:text-white">Creations</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
