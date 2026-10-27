export interface ProjectItem {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  brief: string;
  materialsUsed: string[];
  heroImage: string;
  imageAlt: string;
  gallery: { url: string; alt: string; caption: string }[];
}

export const PROJECTS: ProjectItem[] = [
  {
    slug: "the-zenith-penthouse",
    title: "The Zenith Penthouse",
    category: "Residential Architecture",
    location: "Worli, Mumbai",
    year: "2025",
    description:
      "A 6,500 sq.ft triplex penthouse featuring a bespoke modular kitchen in matte charcoal PU paint, custom walk-in wardrobe suites, and an acoustic louvered TV feature wall.",
    brief:
      "The client sought complete customisation tailored around their family lifestyle. We manufactured the entire modular kitchen with integrated appliance garages, floor-to-ceiling wardrobes, and living room statement pieces in our New Delhi factory.",
    materialsUsed: [
      "Specialty Matte Charcoal PU Paint",
      "Smoked American Walnut Natural Veneer",
      "Soft-Close German Blum Motion Systems",
      "Fluted Architectural Glass Shutters",
    ],
    heroImage: "/images/contemporary-walnut-island-kitchen.jpeg",
    imageAlt: "The Zenith Penthouse bespoke modular kitchen and dining space",
    gallery: [
      {
        url: "/images/luxury-walnut-kitchen-cabinets-with-fluted-island-and-champagne-metal-accents.jpeg",
        alt: "Modular kitchen with seamless cabinetry and fluted island",
        caption: "Bespoke kitchen island with integrated induction hob and PU painted cabinetry",
      },
      {
        url: "/images/organic-modern-floating-tv-console-for-living-room.jpeg",
        alt: "Living room TV panel and storage console",
        caption: "Acoustic louvered TV panel with concealed magnetic cable raceway",
      },
      {
        url: "/images/translucent-glass-wardrobe.jpeg",
        alt: "Master walk-in wardrobe",
        caption: "Floor-to-ceiling wardrobe with integrated sensor lighting and glass shutters",
      },
    ],
  },
  {
    slug: "alila-coastal-villa",
    title: "Alila Coastal Villa",
    category: "Private Sanctuary",
    location: "North Goa",
    year: "2025",
    description:
      "A tropical contemporary residence featuring a handcrafted solid wood dining suite, bespoke master bed with woven rattan inserts, and a moisture-impermeable vanity collection.",
    brief:
      "Designed to withstand high coastal humidity without sacrificing elegance. Every piece was built using water-impermeable PU sealers, solid teakwood, and natural rattan inlays.",
    materialsUsed: [
      "Natural Teakwood with Organic Oil Finish",
      "Hand-Woven Natural Rattan Inlays",
      "Moisture-Sealed Multi-Coat PU Vanities",
      "Brass Joinery and Hardware Accents",
    ],
    heroImage: "/images/dining-hall.jpeg",
    imageAlt: "Alila Coastal Villa open-concept living and custom furniture",
    gallery: [
      {
        url: "/images/bedroom.jpeg",
        alt: "Bespoke bed with headboard detailing",
        caption: "Custom bed frame with organic rattan detailing and integrated floating side tables",
      },
      {
        url: "/images/wooden-closet.jpeg",
        alt: "Solid wood wardrobe and storage joinery",
        caption: "Handcrafted master wardrobe finished with moisture-resistant satin sealer",
      },
      {
        url: "/images/luxury-bathroom-vanity.jpeg",
        alt: "Moisture-sealed bathroom vanity",
        caption: "Floating vanity unit with anti-fog LED mirror cabinet",
      },
    ],
  },
  {
    slug: "the-oberoi-estate",
    title: "The Oberoi Estate",
    category: "Heritage Residence",
    location: "Lutyens, New Delhi",
    year: "2024",
    description:
      "Full-home bespoke furniture commission including a handcrafted sacred mandir with brass inlays, entertainment bar unit, and bespoke flush doors.",
    brief:
      "A grand estate requiring traditional reverence paired with modern manufacturing precision. The client visited our New Delhi factory to witness their mandir and bar being crafted at our live counter.",
    materialsUsed: [
      "Smooth Ivory Duco Paint Finish",
      "Natural White Oak Veneer",
      "Cast Brass Temple Bells and Motifs",
      "Tinted Display Glass with Ambient LEDs",
    ],
    heroImage: "/images/living-hall.jpeg",
    imageAlt: "The Oberoi Estate living salon and custom handcrafted furniture",
    gallery: [
      {
        url: "/images/sanctum-mandir.jpeg",
        alt: "Handcrafted mandir sanctuary",
        caption: "Sacred mandir with brass bell inlays and pull-out prayer accessories",
      },
      {
        url: "/images/hall.jpeg",
        alt: "Bespoke hall paneling and cabinetry",
        caption: "Illuminated hall console with tinted glass and brass accents",
      },
    ],
  },
];
