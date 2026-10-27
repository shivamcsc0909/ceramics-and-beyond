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
    slug: "bespoke-kitchens",
    title: "Bespoke Kitchens & Cabinetry",
    subtitle: "Architectural Precision & Live Factory Craft",
    category: "Kitchen Architecture",
    description:
      "Engineered with German precision hardware and handcrafted by master joiners. Designed from monolithic stone islands to tactile fluted timber cabinetry, crafted transparently on our live factory floor.",
    heroImage:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Bespoke architectural kitchen with precision cabinetry and stone waterfall island",
    characteristics: [
      { label: "Hardware", value: "German Blum & Grass concealed soft-motion systems" },
      { label: "Carcass Core", value: "Marine-grade high density moisture resistant substrate" },
      { label: "Front Finishes", value: "Bookmatched veneer, sintered stone, matte lacquer" },
      { label: "Warranty", value: "10-Year Comprehensive Atelier Guarantee" },
    ],
    finishes: ["Sintered Stone Fronts", "Smoked Oak Veneer", "Super-Matte Anti-Fingerprint", "Brushed Metallic Bronze"],
    applications: ["Open-Plan Living Kitchens", "Chef Pantries", "Breakfast Bars", "Entertaining Islands"],
    features: [
      "Live factory-floor fabrication walkthrough",
      "Concealed pocket doors and seamless appliance integration",
      "Integrated architectural LED under-glow channels",
      "Ergonomic dual-height worktop zoning",
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        alt: "Detail of minimalist modern kitchen cabinets",
        caption: "Seamless push-to-open fluted timber cabinetry",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        alt: "Monolithic stone kitchen island",
        caption: "Continuous Calacatta waterfall island with mitred edge details",
      },
      {
        url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
        alt: "Warm ambient kitchen lighting and textured surfaces",
        caption: "Warm architectural lighting highlighting natural stone backsplashes",
      },
    ],
  },
  {
    slug: "porcelain-surfaces",
    title: "Continuous Porcelain Surfaces",
    subtitle: "Ultra-Compact Monolithic Slabs",
    category: "Large-Format Slabs",
    description:
      "Seamless large-format porcelain slabs up to 3200 × 1600mm. Virtually zero porosity, UV-resistant, scratch-proof, and heat-impervious, bridging indoor living with architectural exterior facades.",
    heroImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Large format porcelain surface in a contemporary open-concept pavilion",
    characteristics: [
      { label: "Slab Dimensions", value: "Up to 3200mm × 1600mm" },
      { label: "Thickness Range", value: "6mm (facades/walls), 12mm (countertops), 20mm (heavy traffic)" },
      { label: "Absorption Rate", value: "< 0.05% (near total impermeability)" },
      { label: "Fire Rating", value: "Class A1 Non-combustible" },
    ],
    finishes: ["Silk Matte", "Polished Glass Reflective", "Structured Slate", "Honed Velvet"],
    applications: ["Countertops & Islands", "Continuous Flooring", "Fireplace Surrounds", "Ventilated Facades"],
    features: [
      "Stain, wine, and acid resistant without periodic sealing",
      "Direct pan-to-surface heat resistance up to 300°C",
      "Seamless vein matching across multiple consecutive slabs",
      "Zero harmful chemical off-gassing (LEED certified)",
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        alt: "Architectural porcelain wall panels",
        caption: "Floor-to-ceiling slab installation with 1mm micro-grout joints",
      },
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        alt: "Continuous porcelain flooring in modern living room",
        caption: "Indoor-to-outdoor continuous slab flooring",
      },
    ],
  },
  {
    slug: "marble-natural-stone",
    title: "Marble & Natural Stone",
    subtitle: "Earth's Rare Geological Formations",
    category: "Natural Quarried Stone",
    description:
      "Individually hand-selected blocks quarried from premier European and Mediterranean deposits. Every slab is an unrepeatable work of natural art, meticulously bookmatched and finished by artisan stonemasons.",
    heroImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Calacatta Gold marble slab installed in luxury residence",
    characteristics: [
      { label: "Origins", value: "Carrara, Tuscany, Greece, and Portugal" },
      { label: "Matching", value: "Mirror bookmatch & quad-match available" },
      { label: "Edge Finishing", value: "Shark-nose, double mitre, bullnose, chiseled" },
      { label: "Sealing", value: "Nano-molecular protective impregnating barrier" },
    ],
    finishes: ["Antique Honed", "High-Gloss Mirror Polish", "Leathered Patina", "Brushed Flamed"],
    applications: ["Feature Statement Walls", "Custom Bath Vanities", "Staircases & Landings", "Sculptural Islands"],
    features: [
      "Hand-inspected slab curation directly from historic quarries",
      "Custom precision water-jet and CNC fabrication",
      "Bespoke bookmatching visualization prior to cutting",
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        alt: "Marble bathroom sanctuary",
        caption: "Bookmatched Statuario marble lining a master bath retreat",
      },
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        alt: "Sculptural stone texture details",
        caption: "Deep tactile veining illuminated by raking architectural light",
      },
    ],
  },
  {
    slug: "ceramic-tiles",
    title: "Artisanal Ceramic Tiles",
    subtitle: "Tactile Textures & Refined Geometry",
    category: "Ceramic Architecture",
    description:
      "A tribute to ancient ceramic craftsmanship infused with contemporary architectural geometry. Characterized by subtle undulating surfaces, organic glazes, and rich earthy pigmentation.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Warm minimalist space clad in artisanal earthy ceramic tiles",
    characteristics: [
      { label: "Firing Process", value: "Double-fired high temperature Italian kiln" },
      { label: "Glaze Finish", value: "Mineral pigment reactive matte & crackle" },
      { label: "Rectification", value: "Precision ground square edges" },
      { label: "Eco-Rating", value: "100% natural clay & recycled mineral body" },
    ],
    finishes: ["Zellige Hand-Crafted Glaze", "Matte Biscuit", "Craquelure Glaze", "Ribbed Terracotta"],
    applications: ["Kitchen Backsplashes", "Shower Enclosures", "Artisan Feature Columns", "Powder Rooms"],
    features: [
      "Subtle organic variations between tiles for authentic depth",
      "High chemical resistance to everyday domestic agents",
      "Suitable for dry and high-moisture interior environments",
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
        alt: "Handcrafted ceramic backsplash tiles",
        caption: "Subtle tone variations creating warmth in an artisanal kitchen",
      },
    ],
  },
  {
    slug: "designer-wall-tiles",
    title: "Designer 3D & Wall Surfaces",
    subtitle: "Acoustic Depth & Bas-Relief Murals",
    category: "Sculptural Surfaces",
    description:
      "Elevate vertical architecture with sculptural three-dimensional surfaces, fluted stone reliefs, and geometric ceramic forms designed to interact dynamically with daylight and shadow.",
    heroImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Fluted 3D ceramic feature wall in luxury living room",
    characteristics: [
      { label: "Relief Depth", value: "12mm to 45mm dimensional extrusion" },
      { label: "Acoustics", value: "Sound diffusion and dampening profile" },
      { label: "Installation", value: "Interlocking modular system with concealed anchoring" },
      { label: "Material Composition", value: "Cast ceramic composite and fluted limestone" },
    ],
    finishes: ["Fluted Pillar Relief", "Micro-Ribbed Ridge", "Wave Texture", "Geometric Hexagonal Bas-Relief"],
    applications: ["Living Room Accent Walls", "Hotel Reception Portals", "Dining Backdrops", "Stairwell Atriums"],
    features: [
      "Creates striking shadows under directional grazing light",
      "Improves room acoustic comfort while maintaining stone durability",
      "Seamless interlock eliminates visible seams across expansive walls",
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        alt: "Sculptural wall detail",
        caption: "Fluted architectural tiles grazing light along a corridor",
      },
    ],
  },
  {
    slug: "flooring-solutions",
    title: "Architectural Flooring Solutions",
    subtitle: "Continuous Underfoot Grandeur",
    category: "Flooring Systems",
    description:
      "Curated large-format porcelain, engineered natural stone, and micro-terrazzo engineered for high foot traffic, underfloor heating compatibility, and slip resistance.",
    heroImage:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Seamless expansive stone floor in high-ceiling modern home",
    characteristics: [
      { label: "Slip Rating", value: "R10 / R11 PTV 36+ (Wet & Dry Certified)" },
      { label: "Thermal Transfer", value: "Optimized for radiant hydronic floor heating" },
      { label: "Wear Rating", value: "PEI V (Maximum heavy commercial traffic)" },
      { label: "Maintenance", value: "Zero wax, zero stripping required" },
    ],
    finishes: ["Soft-Touch Satin", "Brushed Anti-Slip", "Honed Limestone", "Fine Terrazzo Aggregate"],
    applications: ["Open Living Salons", "Boutique Lobbies", "Terraces & Pool Surrounds", "Retail Galleries"],
    features: [
      "Uniform calibration allows for 1.5mm minimal joint widths",
      "High thermal mass retains ambient room temperature efficiently",
      "Immune to heavy pet claws, furniture dragging, and high heels",
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        alt: "Sunlit stone flooring",
        caption: "Satin honed floor slabs reflecting soft daylight",
      },
    ],
  },
  {
    slug: "bathroom-surfaces",
    title: "Sanctuary Bathroom Surfaces",
    subtitle: "Monolithic Moisture Impervious Stone",
    category: "Wellness & Bath",
    description:
      "Transforming wet spaces into spa retreats. Seamless slab shower surrounds, integrated stone basins, and antibacterial non-porous porcelain surfaces engineered for wet-room luxury.",
    heroImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Minimalist master bathroom with freestanding stone tub and continuous porcelain walls",
    characteristics: [
      { label: "Hygiene", value: "Silver-ion antibacterial surface treatment" },
      { label: "Water Absorption", value: "< 0.02% (Impervious to mold & mildew)" },
      { label: "Customization", value: "Bespoke carved basins & shower trays" },
      { label: "Drainage", value: "Concealed linear slot drain compatibility" },
    ],
    finishes: ["Velvet Matte Honed", "Micro-Grit Textured Anti-Slip", "Polished Marble Glow", "Silky Travertine"],
    applications: ["Walk-in Wet Rooms", "Custom Vanity Tops", "Floating Sinks", "Sauna & Steam Enclosures"],
    features: [
      "Zero grout lines inside showers with our 3-meter continuous slabs",
      "Resistant to bath salts, essential oils, and limescale buildup",
      "Integrated matching niches and floating shelves available",
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        alt: "Integrated stone vanity",
        caption: "Carved stone vanity with invisible water drainage",
      },
    ],
  },
];
