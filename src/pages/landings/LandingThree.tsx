import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, MessageSquare, Check, Sparkles } from 'lucide-react';

const ITEMS = [
  { id: 1, type: 'sofa', title: 'Bespoke Living Room Sofas', tag: 'Custom Seating', desc: 'Custom sizes (3-seater, L-shape, corner sectionals) with solid hardwood structure.', img: '/images/sofa.jpeg' },
  { id: 2, type: 'kitchen', title: 'Contemporary Walnut Kitchen', tag: 'Modular Joinery', desc: 'Seamless cabinets, German Blum soft-close drawers, and scratch-resistant finishes.', img: '/images/contemporary-walnut-island-kitchen.jpeg' },
  { id: 3, type: 'tiles', title: 'Designer Wall & Floor Tiles', tag: 'Surfaces', desc: 'Curated architectural tile textures, marble effect coatings, and custom backsplash formats.', img: '/images/tiles.jpeg' },
  { id: 4, type: 'kitchen', title: 'Tinted Glass Wardrobe Suite', tag: 'Wardrobes', desc: 'Floor-to-ceiling sliding & openable doors with internal profile lighting.', img: '/images/translucent-glass-wardrobe.jpeg' },
  { id: 5, type: 'kitchen', title: 'Floating TV Wall Panel', tag: 'Living Units', desc: 'Fluted architectural panels with 100% hidden wires and push-to-open drawers.', img: '/images/floating-tv-console.jpeg' },
  { id: 6, type: 'tiles', title: 'Tile Textures & PU Swatches', tag: 'Finishes', desc: 'Extensive texture library, matte PU paints, and natural timber samples.', img: '/images/multiple-tiles-varir-eities-sample.jpeg' }
];

export const LandingThree: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [submitted, setSubmitted] = useState(false);

  const filteredItems = filter === 'all' ? ITEMS : ITEMS.filter(item => item.type === filter);

  return (
    <div className="bg-[#F8F9FA] text-[#111215] min-h-screen selection:bg-[#C46849] selection:text-white pb-16 sm:pb-0">
      {/* Top Banner */}
      <div className="bg-[#111215] text-white text-[11px] py-2 px-4 text-center font-medium border-b border-white/10 flex items-center justify-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Live Workshop Open in New Delhi · Schedule your in-person factory tour today:</span>
        <a href="tel:+919876543210" className="text-[#C46849] font-semibold underline ml-1">+91 98765 43210</a>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <span className="font-serif text-2xl font-semibold tracking-wide text-[#111215]">
              Ceramics &amp; Beyond
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#C46849] font-bold">
              Variation 03 · Contemporary Showcase
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20custom%20furniture%20and%20tiles"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
              WhatsApp Us
            </a>
            <a href="#quick-form" className="bg-[#111215] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#C46849] transition-colors shadow-sm">
              Get Instant Quote
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-[#181A1F] text-white py-16 sm:py-24 overflow-hidden border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs text-[#C46849] font-semibold border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#C46849]" />
                <span>100% In-House Factory &amp; Experience Centre</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
                We Manufacture Furniture &amp; Designer Tiles.
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-xl">
                Custom Sofas, Solid Wood Joinery, Modular Kitchens, and Architectural Tiles. Built to your exact dimensions in our New Delhi workshop with zero middlemen.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a href="#quick-form" className="inline-flex items-center bg-[#C46849] text-white px-7 py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold hover:bg-[#AC573A] transition-colors shadow-lg">
                  <span>Book Factory Consultation</span>
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
                <a href="#gallery" className="inline-flex items-center border border-white/30 text-white px-6 py-3.5 rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-white/10 transition-colors">
                  <span>View Creations</span>
                </a>
              </div>
              <div className="pt-6 grid grid-cols-3 gap-3 border-t border-white/10">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="block text-lg font-bold text-white">0%</span>
                  <span className="text-[11px] text-neutral-400">Middleman Markup</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="block text-lg font-bold text-white">200k</span>
                  <span className="text-[11px] text-neutral-400">Blum Cycle Test</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="block text-lg font-bold text-white">NIFT</span>
                  <span className="text-[11px] text-neutral-400">Design Founder</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden aspect-[4/5] bg-neutral-800 shadow-md">
                    <img src="/images/sofa.jpeg" alt="Custom living room sofa" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-video bg-neutral-800 shadow-md">
                    <img src="/images/tiles.jpeg" alt="Designer tiles" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-3 pt-6">
                  <div className="rounded-xl overflow-hidden aspect-video bg-neutral-800 shadow-md">
                    <img src="/images/designer-wooden-chair.jpeg" alt="Handcrafted wooden chair" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-[4/5] bg-neutral-800 shadow-md">
                    <img src="/images/contemporary-walnut-island-kitchen.jpeg" alt="Modular island kitchen" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Gallery */}
      <section id="gallery" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-200">
            <div>
              <span className="text-xs font-bold text-[#C46849] uppercase tracking-widest block mb-2">Portfolio</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#111215]">Our Core Capabilities</h2>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === 'all' ? 'bg-[#111215] text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('sofa')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === 'sofa' ? 'bg-[#111215] text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Sofas
              </button>
              <button
                onClick={() => setFilter('kitchen')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === 'kitchen' ? 'bg-[#111215] text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Kitchens &amp; Woodwork
              </button>
              <button
                onClick={() => setFilter('tiles')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === 'tiles' ? 'bg-[#111215] text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Tiles &amp; Finishes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-neutral-50 rounded-xl overflow-hidden border border-neutral-200 flex flex-col justify-between p-4 group">
                <div className="aspect-[16/11] rounded-lg overflow-hidden mb-4 bg-neutral-200">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C46849]">{item.tag}</span>
                  <h3 className="font-serif text-xl font-bold text-[#111215] mb-1">{item.title}</h3>
                  <p className="text-xs text-neutral-500 mb-3 font-normal">{item.desc}</p>
                </div>
                <a href="#quick-form" className="inline-flex items-center text-xs font-bold text-[#C46849] hover:underline">
                  Inquire for Specifications &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-24 bg-neutral-100 border-y border-neutral-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111215] mb-3">
              Why Choose Ceramics &amp; Beyond?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-normal">
              Compare our integrated in-house workshop model against typical local carpenters and showroom resellers.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-neutral-200">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="p-4 font-bold text-neutral-600">Feature</th>
                  <th className="p-4 font-bold text-[#C46849] bg-[#C46849]/5">Ceramics &amp; Beyond</th>
                  <th className="p-4 font-bold text-neutral-500">Local Carpenters / Resellers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="p-4 font-semibold text-[#111215]">Manufacturing</td>
                  <td className="p-4 font-bold text-emerald-700 bg-[#C46849]/5">✓ 100% In-House Factory (CNC + Edgeband)</td>
                  <td className="p-4 text-neutral-500">Outsourced / On-site dusty manual work</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#111215]">Live Inspection</td>
                  <td className="p-4 font-bold text-emerald-700 bg-[#C46849]/5">✓ The Live Counter (Inspect anytime)</td>
                  <td className="p-4 text-neutral-500">Hidden workshops or distant vendors</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#111215]">Hardware Quality</td>
                  <td className="p-4 font-bold text-emerald-700 bg-[#C46849]/5">✓ Genuine German Blum, Hettich &amp; Hafele</td>
                  <td className="p-4 text-neutral-500">Often unbranded / mixed copies</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#111215]">Sofa &amp; Seating</td>
                  <td className="p-4 font-bold text-emerald-700 bg-[#C46849]/5">✓ Handcrafted teak frames &amp; custom sizing</td>
                  <td className="p-4 text-neutral-500">Fixed catalog showroom dimensions</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#111215]">Tiles &amp; Finishes</td>
                  <td className="p-4 font-bold text-emerald-700 bg-[#C46849]/5">✓ Designer tiles + PU spray booth matching</td>
                  <td className="p-4 text-neutral-500">Limited standard dealer stock</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quick Inquiry Form */}
      <section id="quick-form" className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-neutral-900 text-white shadow-xl">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C46849] block mb-1">Fast Response Guaranteed</span>
              <h2 className="font-serif text-3xl sm:text-4xl">Get Your Free Estimate</h2>
              <p className="text-xs text-neutral-400 mt-2">Fill this quick 1-minute form or chat with us instantly on WhatsApp.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" required placeholder="Your Name *" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C46849]" />
                <input type="tel" required placeholder="Mobile / WhatsApp Number *" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C46849]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="email" placeholder="Email Address (Optional)" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C46849]" />
                <select required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C46849]">
                  <option value="">What do you need?</option>
                  <option value="sofa">Custom Sofa / Living Seating</option>
                  <option value="kitchen">Modular Kitchen</option>
                  <option value="wardrobe">Wardrobes &amp; Storage</option>
                  <option value="tiles">Designer Tiles &amp; Surfaces</option>
                  <option value="full">Full Home Furniture</option>
                </select>
              </div>

              <textarea rows={3} placeholder="Tell us room dimensions or specific preferences..." className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C46849]"></textarea>

              <button type="submit" className="w-full bg-[#C46849] text-white py-3.5 rounded-lg text-xs uppercase tracking-wider font-bold hover:bg-[#AC573A] transition-colors shadow-lg">
                Submit Estimate Request
              </button>

              {submitted && (
                <div className="p-3 bg-emerald-950 text-emerald-300 text-xs rounded border border-emerald-800 text-center">
                  Thank you! Your estimate request has been received. Our team will contact you within 2 hours.
                </div>
              )}
            </form>

            <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
              <p className="text-xs text-neutral-400 mb-3">Prefer immediate chat?</p>
              <a href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20a%20quote%20for%20custom%20furniture" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-emerald-500 transition-colors">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat Directly on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-neutral-900 text-neutral-400 text-xs border-t border-neutral-800 text-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Ceramics & Beyond · Variation 03 (Contemporary Showcase). All rights reserved.</p>
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
