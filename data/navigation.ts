export interface NavItem {
  title: string;
  href: string;
  number: string;
  description?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { title: "Home", href: "/", number: "01", description: "The architectural gateway" },
  { title: "The Experience", href: "/experience", number: "02", description: "Live kitchen manufacturing" },
  { title: "Collections", href: "/collections", number: "03", description: "Curated surfaces & porcelain" },
  { title: "Applications", href: "/applications", number: "04", description: "Spaces transformed by stone" },
  { title: "Projects", href: "/projects", number: "05", description: "Architectural case studies" },
  { title: "Journal / Inspiration", href: "/journal", number: "06", description: "Editorial stories & insights" },
  { title: "Our Services", href: "/services", number: "07", description: "Bespoke craft & fabrication" },
  { title: "About Us", href: "/about", number: "08", description: "Our heritage & philosophy" },
  { title: "Contact Us", href: "/contact", number: "09", description: "Consult our atelier" },
];

export const BRAND_INFO = {
  name: "Ceramics & Beyond",
  tagline: "Beyond Surfaces. Beyond Ordinary.",
  description:
    "An architectural destination for thoughtfully curated ceramics, continuous porcelain surfaces, natural marble, and a signature live kitchen manufacturing experience.",
  contact: {
    email: "hello@example.com",
    phone: "+91 98765 43210",
    address: "Your Business Address, India",
    hours: "Monday – Saturday: 10:00 AM – 7:30 PM",
  },
  social: [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Pinterest", href: "https://pinterest.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Architectural Digest", href: "#" },
  ],
};
