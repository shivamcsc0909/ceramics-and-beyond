export interface NavItem {
  title: string;
  href: string;
  number: string;
  description?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { title: "Home", href: "/", number: "01", description: "Thoughtfully made. Entirely yours." },
  { title: "What We Make", href: "/products", number: "02", description: "Modular, functional & bespoke furniture" },
  { title: "Finishes & Materials", href: "/experience", number: "03", description: "PU paint, veneer, duco, glass & tiles" },
  { title: "Factory & Experience Centre", href: "/craftsmanship", number: "04", description: "Live making transparency under one roof" },
  { title: "Our Story", href: "/about", number: "05", description: "A creative instinct, a passion for making" },
  { title: "Contact Us", href: "/contact", number: "06", description: "Visit our Delhi experience centre" },
];

export const BRAND_INFO = {
  name: "Ceramics & Beyond",
  tagline: "Thoughtfully Made. Entirely Yours.",
  description:
    "Bespoke furniture and in-house modular manufacturing. From modular kitchens and wardrobes to vanities, mandirs, and customised creations, tailored to the last inch.",
  contact: {
    email: "info@ceramicsandbeyond.com",
    phone: "+91 98765 43210",
    address: "New Delhi, Delhi, India",
    hours: "Monday – Saturday: 10:00 AM – 7:00 PM IST",
  },
  social: [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Pinterest", href: "https://pinterest.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
  ],
};
