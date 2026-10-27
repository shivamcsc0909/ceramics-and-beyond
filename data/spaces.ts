export interface SpaceApplication {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  imageAlt: string;
  recommendedMaterials: string[];
  keyBenefits: string[];
}

export const SPACES_DATA: SpaceApplication[] = [
  {
    id: "living-spaces",
    title: "Living Salons & Lounges",
    tag: "Residential Architecture",
    description:
      "Expansive floor-to-ceiling surfaces, continuous porcelain floors, and sculptural fluted fireplace mantels that cultivate serenity, acoustic calm, and grandeur.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Minimalist open-plan architectural living room with natural stone surfaces",
    recommendedMaterials: ["Large Format Porcelain Slabs", "Honed Travertine", "Sculptural Wall Reliefs"],
    keyBenefits: ["Underfloor heating compatibility", "Seamless 3m continuous slab format", "Natural light reflection"],
  },
  {
    id: "kitchens-dining",
    title: "Culinary & Dining Ateliers",
    tag: "Epicurean Design",
    description:
      "Where culinary theatre meets precision joinery. Monolithic waterfall stone islands, stain-proof porcelain worktops, and custom cabinetry crafted on our live factory floor.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Luxury designer kitchen with large stone island and architectural lighting",
    recommendedMaterials: ["Sintered Stone Countertops", "Smoked Oak Cabinetry", "Reactive Glazed Backsplashes"],
    keyBenefits: ["Heat & acid impervious", "Concealed appliance integration", "Custom knife & spice drawer inserts"],
  },
  {
    id: "bathrooms-wellness",
    title: "Sanctuaries & Master Baths",
    tag: "Private Wellness",
    description:
      "Monolithic stone bathtubs, zero-grout porcelain walk-in rain showers, and carved stone vanities designed to create an immersive sanctuary of calm.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "High-end bathroom sanctuary with freestanding tub and continuous stone walls",
    recommendedMaterials: ["Bookmatched Marble", "Seamless Porcelain Panels", "Textured Basalt"],
    keyBenefits: ["Zero mildew & water resistance", "Integrated linear slot drainage", "Silky velvet foot-feel"],
  },
  {
    id: "hospitality-resorts",
    title: "Boutique Hospitality & Lounges",
    tag: "Commercial Luxury",
    description:
      "Signature hotel lobbies, concierge desks, and Michelin-star restaurant bars engineered to withstand heavy footfall while delivering unforgettable first impressions.",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Luxury hotel interior with textured ceramic wall tiles and ambient lighting",
    recommendedMaterials: ["Heavy Traffic PEI V Porcelain", "Fluted Terrazzo", "Backlit Onyx"],
    keyBenefits: ["Extreme abrasion tolerance", "Fire Class A1 certified", "Effortless commercial cleaning"],
  },
  {
    id: "commercial-flagships",
    title: "Retail Flagships & Executive Suites",
    tag: "Brand Architecture",
    description:
      "Refined architectural surfaces that articulate brand stature. Clean lines, monolithic stone pedestals, and precision joinery for luxury retail and headquarters.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Architectural commercial pavilion with continuous stone walls",
    recommendedMaterials: ["Large Format Facade Slabs", "Architectural Micro-Cement", "Custom Sintered Display Blocks"],
    keyBenefits: ["Modular accessibility", "Pristine aesthetic longevity", "Minimal joint visual cadence"],
  },
  {
    id: "architectural-facades",
    title: "Exterior Facades & Terraces",
    tag: "Exterior Surfaces",
    description:
      "Ventilated porcelain rain-screen facades and anti-slip terrace pavers that withstand freezing winters, scorching summers, and intense UV exposure without fading.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern architectural facade with seamless stone cladding and garden terrace",
    recommendedMaterials: ["20mm Outdoor Pavers", "Ventilated Facade Slabs", "UV-Stabilized Porcelain"],
    keyBenefits: ["R11 Slip Resistance", "Zero UV thermal discoloration", "Freeze-thaw fracture immunity"],
  },
];
