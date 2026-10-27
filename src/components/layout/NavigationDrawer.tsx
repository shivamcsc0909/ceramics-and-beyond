import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight, Globe, Mail, Phone, MapPin } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { title: 'Home', href: '/', number: '01' },
  { title: 'All Creations (Sofas, Wood & Tiles)', href: '/products', number: '02' },
  { title: 'Modular Kitchens & Wardrobes', href: '/category/modular-furniture', number: '03' },
  { title: 'TV Panels, Vanities & Mandirs', href: '/category/functional-statement', number: '04' },
  { title: 'Bespoke Wooden Furniture & Beds', href: '/category/bespoke-furniture', number: '05' },
  { title: 'Finishes, PU Paint & Tiles Palette', href: '/category/finishes-palette', number: '06' },
  { title: 'Factory & Experience Centre', href: '/craftsmanship', number: '07' },
  { title: 'Our Story (Founder Narrative)', href: '/about', number: '08' },
  { title: 'Contact & Studio Visit', href: '/contact', number: '09' },
];

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 sm:p-8 flex items-center justify-between border-b border-[#33312C]">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9BDAA]">Thoughtfully Made. Entirely Yours.</span>
            <p className="font-serif text-lg tracking-widest text-[#FAF9F6]">CERAMICS &amp; BEYOND</p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="group flex items-center space-x-2 text-xs tracking-architectural uppercase text-[#C9BDAA] hover:text-[#FAF9F6] p-2"
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
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="group flex items-baseline justify-between py-2 sm:py-2.5 border-b border-[#33312C]/60 hover:border-[#C9BDAA]/40 transition-colors"
              >
                <div className="flex items-baseline space-x-3 sm:space-x-4">
                  <span className="font-mono text-[10px] sm:text-xs text-[#77786B] group-hover:text-[#A76F55] transition-colors">
                    {item.number}
                  </span>
                  <span className="font-serif text-base sm:text-lg text-[#FAF9F6]/90 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    {item.title}
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#77786B] opacity-0 group-hover:opacity-100 group-hover:text-[#A76F55] transition-all" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 sm:p-8 bg-[#141311] border-t border-[#33312C] text-xs text-[#C9BDAA]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#77786B] block mb-1">Experience Centre</span>
              <p className="text-white">New Delhi, Delhi, India</p>
              <p className="text-[11px] text-[#77786B] mt-1">Factory &amp; Experience Centre Under One Roof</p>
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#77786B] block mb-1">Direct Contact</span>
              <p className="text-white">hello@example.com</p>
              <p className="text-[11px] text-[#77786B] mt-1">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
