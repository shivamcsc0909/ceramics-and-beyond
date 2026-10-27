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
    id: "modular-kitchens",
    title: "Modular Kitchens & Pantries",
    tag: "Culinary Centrepiece",
    description:
      "Where design meets everyday practicality. Ergonomic pull-out pantries, quartz and sintered stone islands, soft-close Blum hardware, and seamless PU paint cabinetry tailored to your cooking style.",
    image: "/images/contemporary-walnut-island-kitchen.jpeg",
    imageAlt: "Contemporary bespoke modular kitchen with island and warm ambient lighting",
    recommendedMaterials: ["Specialty PU Paint", "HDHMR Core", "Natural Wood Veneer", "Quartz Worktops"],
    keyBenefits: ["Zero dead corner space", "Moisture & heat resistance", "Soft-close German motion hardware"],
  },
  {
    id: "wardrobes-dressing",
    title: "Wardrobes & Dressing Suites",
    tag: "Personal Sanctuaries",
    description:
      "Floor-to-ceiling walk-in and sliding wardrobes with integrated sensor LED lighting, fluted glass shutters, dedicated jewelry drawers, and velvet-lined compartments.",
    image: "/images/translucent-glass-wardrobe.jpeg",
    imageAlt: "Luxury walk-in wardrobe with glass doors and customized shelving",
    recommendedMaterials: ["PU Paint", "Fluted Glass", "Warm Oak Veneer", "Soft Velvet Inlays"],
    keyBenefits: ["Tailored to your wardrobe collection", "Integrated sensor lighting", "Dust-sealed brush profiles"],
  },
  {
    id: "living-tv-units",
    title: "Living Lounges & TV Panels",
    tag: "Everyday Living",
    description:
      "Statement TV feature walls with acoustic louvers, concealed wiring raceways, floating credenzas, and integrated display shelving that elevate the heart of the home.",
    image: "/images/floating-tv-console.jpeg",
    imageAlt: "Minimalist living room with bespoke TV wall unit and warm timber tones",
    recommendedMaterials: ["Veneer Panels", "Matte PU Paint", "Concealed Conduit Systems", "Brass Trims"],
    keyBenefits: ["100% hidden wires & equipment", "Acoustic damping louvers", "Ambient floating underglow"],
  },
  {
    id: "pooja-mandirs",
    title: "Sacred Mandirs & Sanctuaries",
    tag: "Spiritual Reflection",
    description:
      "Bespoke handcrafted pooja mandirs designed with reverence. Featuring carved jaali motifs, brass inlays, pull-out bhog trays, and dedicated brass bell accents.",
    image: "/images/sanctum-mandir.jpeg",
    imageAlt: "Serene handcrafted mandir with warm lighting and brass detailing",
    recommendedMaterials: ["Smooth Duco Finish", "Solid Teak Accents", "Translucent Backlit Onyx", "Brass Fittings"],
    keyBenefits: ["Custom sacred iconography", "Smoke-vented diya drawers", "Sacred proportion geometry"],
  },
  {
    id: "bathroom-vanities",
    title: "Designer Bathroom Vanities",
    tag: "Wellness & Bath",
    description:
      "Moisture-impermeable floating and freestanding vanities with integrated quartz sinks, fluted drawer fronts, and anti-fog LED mirror cabinets.",
    image: "/images/luxury-bathroom-vanity.jpeg",
    imageAlt: "Modern floating bathroom vanity with stone top and fluted wood drawers",
    recommendedMaterials: ["Water-Impermeable PU", "Marine BWP Plywood", "Solid Surface Sinks"],
    keyBenefits: ["100% moisture-sealed edges", "Concealed plumbing drawers", "Integrated LED mirror cabinets"],
  },
  {
    id: "dining-bars",
    title: "Bespoke Dining & Home Bars",
    tag: "Entertainment & Gathering",
    description:
      "Handcrafted solid timber and veneer dining tables paired with illuminated bar cabinets, stemware display racks, and wine storage designed for memorable hosting.",
    image: "/images/dining-hall.jpeg",
    imageAlt: "Bespoke dining table and elegant home bar cabinet",
    recommendedMaterials: ["Solid Raw Wood", "High-Gloss PU", "Tinted Glass", "Natural Veneer"],
    keyBenefits: ["Heat & wine stain resistant", "Stemware & bottle organization", "Custom seating capacity"],
  },
];
