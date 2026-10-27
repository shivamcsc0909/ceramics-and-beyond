export interface CollectionItem {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  heroImage: string;
  imageAlt: string;
  aspectRatio?: string;
  characteristics: { label: string; value: string }[];
  finishes: string[];
  applications: string[];
  features: string[];
  gallery: { url: string; alt: string; caption: string }[];
}

export const COLLECTIONS: CollectionItem[] = [
  {
    slug: "modular-furniture",
    title: "Modular Furniture",
    subtitle: "Kitchens, Wardrobes & Doors Tailored to the Last Inch",
    category: "Modular Solutions",
    description:
      "Precision-engineered modular kitchens, custom walk-in wardrobes, and architectural doors. Manufactured in-house with intelligent space configurations, German hardware, and seamless shutter profiles customized to your lifestyle.",
    heroImage:
      "/images/fluted-island-kitchen.jpeg",
    imageAlt: "Contemporary bespoke modular kitchen with PU paint finish and integrated lighting",
    characteristics: [
      { label: "Core Products", value: "Modular kitchens, floor-to-ceiling wardrobes, bespoke doors" },
      { label: "Specialty Finishes", value: "High-grade PU paint, natural wood veneers, fluted louvers" },
      { label: "Internal Carcass", value: "Action TESA HDHMR / BWP Marine Grade Plywood" },
      { label: "Hardware Motion", value: "Soft-close German Blum / Hettich precision systems" },
    ],
    finishes: ["PU Paint (Any RAL/Pantone)", "Natural Wood Veneer", "Duco Smooth", "Fluted Glass", "Textured Laminate"],
    applications: ["Chef's Kitchens & Island Counters", "Master Bedroom Wardrobe Suites", "Main Entrance & Internal Doors", "Walk-in Dressing Rooms"],
    features: [
      "Witness your kitchen taking shape at our factory & experience centre",
      "Customised down to the exact millimeter for zero dead space",
      "Moisture, termite, and borer-resistant engineered core",
      "Ergonomic pull-outs, concealed spice racks, and corner carousels",
    ],
    gallery: [
      {
        url: "/images/luxury-kitchen.jpeg",
        alt: "Modular kitchen with seamless cabinetry",
        caption: "Bespoke modular kitchen crafted with satin PU paint and integrated handles",
      },
      {
        url: "/images/translucent-glass-wardrobe.jpeg",
        alt: "Walk-in wardrobe with glass and veneer shutters",
        caption: "Floor-to-ceiling wardrobe with fluted glass and ambient sensor lighting",
      },
    ],
  },
  {
    slug: "functional-statement",
    title: "Functional & Statement Pieces",
    subtitle: "TV Panels, Vanities, Mandirs, Bars, Consoles & Bookshelves",
    category: "Statement Pieces",
    description:
      "Turning essential everyday storage into unforgettable architectural focal points. From acoustic fluted TV units and moisture-sealed bathroom vanities to serene pooja mandirs, entertainment bars, consoles, shoe racks, and bookshelves.",
    heroImage:
      "/images/floating-tv-console.jpeg",
    imageAlt: "Luxury living room TV unit with veneer paneling and concealed storage",
    characteristics: [
      { label: "Piece Selection", value: "TV panels, bathroom vanities, bars, mandirs, consoles, shoe racks, bookshelves" },
      { label: "Accent Inlays", value: "Natural rattan cane, wallpaper inlays, brass trims, acoustic louvers" },
      { label: "Vanity Seal", value: "Multi-coat water-impermeable PU sealer for wet environments" },
      { label: "Cable Design", value: "100% concealed conduit routing and magnetic service hatches" },
    ],
    finishes: ["PU Paint", "Bookmatched Veneer", "Duco Paint", "Rattan Inlays", "Tinted Glass"],
    applications: ["Living Room TV Walls", "Master Bathroom Vanities", "Pooja Sanctuaries & Mandirs", "Foyer Consoles & Shoe Suites"],
    features: [
      "Designed with a purpose: beautiful to eye and effortless to use",
      "Handcrafted sacred mandirs with brass detailing and storage drawers",
      "Ventilated shoe storage cabinets preventing moisture accumulation",
      "Integrated bar counters with stemware racks and illuminated display glass",
    ],
    gallery: [
      {
        url: "/images/organic-modern-floating-tv-console-for-living-room.jpeg",
        alt: "Contemporary TV wall unit with fluted louvers",
        caption: "Bespoke media console combining warm oak veneer with dark PU paint accents",
      },
      {
        url: "/images/luxury-bathroom-vanity.jpeg",
        alt: "Designer bathroom vanity with stone and wood",
        caption: "Moisture-sealed master vanity with floating drawers and under-counter glow",
      },
    ],
  },
  {
    slug: "bespoke-furniture",
    title: "Bespoke Furniture",
    subtitle: "Beds, Dining Tables, Coffee & Accent Pieces",
    category: "Bespoke Furniture",
    description:
      "Custom handcrafted furniture made to order. Master beds with upholstered headboards, statement 6-to-10 seater dining tables, centre tables, coffee tables, and side tables that express your distinctive personality.",
    heroImage:
      "/images/dining-hall.jpeg",
    imageAlt: "Bespoke solid wood dining table with organic grain and brass accents",
    characteristics: [
      { label: "Custom Scope", value: "Beds with hydraulic storage, dining tables, centre & side tables" },
      { label: "Wood Selection", value: "Natural Teak, American Walnut, White Oak, Ash Wood" },
      { label: "Tabletop Options", value: "Solid timber, bookmatched veneer, sintered stone, glass inlays" },
      { label: "Ergonomics", value: "Customised height, seat clearances, and proportions" },
    ],
    finishes: ["Raw Wood Natural Oils", "High-Gloss & Matte PU", "Duco Accents", "Smoked Veneer", "Metallic Highlights"],
    applications: ["Formal Dining Halls", "Master & Guest Bedroom Suites", "Drawing Rooms & Lounges", "Alfresco Covered Patios"],
    features: [
      "Customisation without compromise: tailored dimensions and silhouettes",
      "Heavy-duty German hydraulic storage mechanisms for upholstered beds",
      "Stain and heat-resistant tabletop coatings for daily family dining",
      "Carefully coordinated fabric and leather upholstery selections",
    ],
    gallery: [
      {
        url: "/images/bedroom.jpeg",
        alt: "Handcrafted master bed with upholstered headboard",
        caption: "Bespoke bed with integrated floating side ledges and hydraulic storage",
      },
      {
        url: "/images/designer-wooden-chair.jpeg",
        alt: "Sculptural designer wooden chair",
        caption: "Designer wooden chair with ergonomic joinery and hand-applied satin finish",
      },
    ],
  },
  {
    slug: "finishes-palette",
    title: "Finishes That Define Your Space",
    subtitle: "PU Paint, Veneers, Duco, Glass, Laminate & Louvers",
    category: "Finishes & Materials",
    description:
      "We specialise in PU paint finishes and offer a versatile palette of materials from understated elegance to bold, contemporary statements. Plus distinctive combinations featuring rattan, wallpaper inlays, premium louvers and mixed-material detailing.",
    heroImage:
      "/images/finishes-palette.jpeg",
    imageAlt: "Material swatch palette featuring PU paint, natural wood veneers, and rattan",
    characteristics: [
      { label: "Core Specialty", value: "Automated spray booth PU Paint (Matte, Satin, High-Gloss)" },
      { label: "Natural Woods", value: "Natural Wood Veneer & Organic Raw Wood textures" },
      { label: "Painted Surfaces", value: "Smooth Duco paint finishes in custom colour palettes" },
      { label: "Modern Accents", value: "Fluted Glass, Acrylics, Rattan Inlays, Premium Louvers" },
    ],
    finishes: ["PU Paint (Any Hue)", "Natural Veneer", "Duco Paint", "Fluted Glass", "Laminate", "Acrylic", "Raw Wood"],
    applications: ["Kitchen & Wardrobe Shutters", "Door Paneling", "Dining Tabletops", "Accent Wall Cladding"],
    features: [
      "In-house automated dust-free paint booth ensuring mirror-smooth coats",
      "Multi-stage hand-sanding between every primer and topcoat layer",
      "Custom shade formulations matching any architectural mood board",
      "Durable UV inhibitors and scratch-resistant top protective layers",
    ],
    gallery: [
      {
        url: "/images/matte-pu-paint.jpeg",
        alt: "Veneer and PU paint panel sample",
        caption: "Fluted timber louver detail juxtaposed against matte charcoal PU paint",
      },
      {
        url: "/images/cane-rattan-weave.jpeg",
        alt: "Natural rattan and wood finish sample",
        caption: "Artisanal woven rattan inserts framed in solid natural wood",
      },
    ],
  },
];
