export interface MaterialFocus {
  id: string;
  name: string;
  category: string;
  finish: string;
  tactileNote: string;
  bestFor: string;
  image: string;
  imageAlt: string;
}

export const MATERIALS_IN_FOCUS: MaterialFocus[] = [
  {
    id: "mat-pu-paint",
    name: "Specialty PU Paint",
    category: "Specialty Painted Finishes",
    finish: "Matte, Satin & High-Gloss",
    tactileNote: "Silky-smooth, non-porous polyurethane finish with unlimited custom RAL and Pantone colour matching.",
    bestFor: "Modular Kitchens, Wardrobe Shutters & Fluted Vanities",
    image: "/images/matte-pu-paint.jpeg",
    imageAlt: "Smooth matte PU paint kitchen cabinet finish",
  },
  {
    id: "mat-veneer",
    name: "Architectural Wood Veneer",
    category: "Natural Wood Surfaces",
    finish: "Open-Pore Natural Matte & Satin",
    tactileNote: "Authentic natural wood grain, organic warmth, and timeless architectural character.",
    bestFor: "Living Room TV Panels, Master Headboards & Executive Tables",
    image: "/images/natural-oak-walnut-veneer.jpeg",
    imageAlt: "Rich architectural timber veneer panel detail",
  },
  {
    id: "mat-duco",
    name: "Refined Duco Finish",
    category: "Precision Lacquer Finishes",
    finish: "Ultra-Smooth Hand-Polished",
    tactileNote: "Flawless, sophisticated painted surface with rich colour saturation and subtle luster.",
    bestFor: "Statement Consoles, Pooja Mandirs & Accent Doors",
    image: "/images/category-finishes-palette.jpeg",
    imageAlt: "Flawless duco painted surface detail",
  },
  {
    id: "mat-glass",
    name: "Architectural Glass & Fluting",
    category: "Contemporary Glass",
    finish: "Fluted, Tinted, Frosted & Clear",
    tactileNote: "Brings lightness, diffused reflections, and contemporary elegance to vertical cabinetry.",
    bestFor: "Display Bar Units, Wardrobe Shutters & Crockery Cabinets",
    image: "/images/fluted-architectural-glass.jpeg",
    imageAlt: "Fluted architectural glass cabinet shutter",
  },
  {
    id: "mat-laminate-acrylic",
    name: "Textured Laminate & Acrylic",
    category: "Engineered High-Durability",
    finish: "Textured Grain & Mirror Acrylic",
    tactileNote: "Versatile colours, anti-fingerprint textures, and high impact and scratch resistance.",
    bestFor: "Utility Kitchen Areas, Shoe Racks & Daily Use Wardrobes",
    image: "/images/wood-n-glass-design-samples.jpeg",
    imageAlt: "High-pressure engineered laminate and glass texture",
  },
  {
    id: "mat-raw-wood",
    name: "Natural Raw Wood & Timber",
    category: "Solid Hardwoods",
    finish: "Hand-Rubbed Organic Oil",
    tactileNote: "Deep tactile grain patterns with knots and natural wood contours, grounding spaces in nature.",
    bestFor: "Bespoke Dining Tables, Coffee Tables & Centre Tables",
    image: "/images/wood.jpeg",
    imageAlt: "Solid natural raw wood tabletop edge",
  },
  {
    id: "mat-combinations",
    name: "Rattan Inlays & Fluted Louvers",
    category: "Mixed-Material Detailing",
    finish: "Artisanal Woven & Precision Extruded",
    tactileNote: "Distinctive textural contrast combining woven rattan cane, wallpaper inlays, and vertical louvers.",
    bestFor: "Shoe Cabinets, Bed Headboards & Statement Credenzas",
    image: "/images/cane-rattan-weave.jpeg",
    imageAlt: "Natural rattan and louvered wood cabinet detail",
  },
  {
    id: "mat-hardware",
    name: "German Engineered Hardware",
    category: "Precision Movements",
    finish: "Blum, Hettich & Hafele",
    tactileNote: "Lifetime tested silent soft-close runners, concealed hinges, and push-to-open servo systems.",
    bestFor: "All Modular Drawers, Flap Fittings & Pantries",
    image: "/images/precision-hardware.jpeg",
    imageAlt: "Genuine German soft close hardware fittings",
  },
];

export const MATERIALS = MATERIALS_IN_FOCUS;

