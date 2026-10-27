export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "modular-manufacturing",
    number: "01",
    title: "In-House Modular Manufacturing",
    tagline: "Kitchens, Wardrobes & Doors Tailored to the Last Inch",
    description:
      "Precision-engineered modular systems manufactured in our dedicated facility. We combine computer-controlled CNC routing with German hardware to create kitchens, wardrobes, and doors that fit your lifestyle flawlessly.",
    deliverables: [
      "Custom kitchen carcasses with intelligent pull-out storage",
      "Floor-to-ceiling walk-in and sliding wardrobe systems",
      "Architectural flush, grooved, and louvered internal doors",
      "Soft-close German Blum and Hettich hardware motion integration",
    ],
    image: "/images/fluted-island-kitchen.jpeg",
    imageAlt: "Bespoke modular kitchen manufacturing and assembly",
  },
  {
    id: "bespoke-furniture-making",
    number: "02",
    title: "Bespoke Furniture & Statement Pieces",
    tagline: "Custom Tables, Beds, Mandirs, Vanities & Bar Units",
    description:
      "Turning unique ideas into tangible creations. We craft handcrafted dining tables, upholstered beds with hydraulic storage, sacred pooja mandirs, entertainment bars, consoles, and TV feature panels.",
    deliverables: [
      "Handcrafted solid wood and veneer dining tables (6 to 12 seaters)",
      "Beds with hydraulic lift mechanisms and custom headboard upholstery",
      "Sacred handcrafted pooja mandirs with brass inlays and diya drawers",
      "Moisture-impermeable bathroom vanities with integrated quartz tops",
    ],
    image: "/images/designer-wooden-chair.jpeg",
    imageAlt: "Bespoke furniture crafting and handcrafted joinery",
  },
  {
    id: "specialty-finishes",
    number: "03",
    title: "Specialty PU Paint & Surface Mastery",
    tagline: "Automated Spray Booths & Custom Colour Matching",
    description:
      "We specialise in PU paint finishes and offer an expansive palette of materials from understated elegance to bold contemporary statements. Hand-sanded between coats for a flawless silk touch.",
    deliverables: [
      "Dust-free automated spray booth PU paint in matte, satin, or gloss",
      "Natural wood veneers with open-pore and closed-pore clear coats",
      "Fluted timber louvers, natural rattan cane, and wallpaper inlays",
      "Contemporary fluted and tinted glass shutter integration",
    ],
    image: "/images/matte-pu-paint.jpeg",
    imageAlt: "Flawless PU paint finish application on cabinet shutters",
  },
  {
    id: "experience-centre-transparency",
    number: "04",
    title: "Factory & Experience Centre Under One Roof",
    tagline: "Transparency You Can See & One-Stop Coordination",
    description:
      "Witness your furniture taking shape in real time. We bring design consultation, manufacturing, finishing booths, and quality audits together in one integrated space in New Delhi.",
    deliverables: [
      "Live counter factory visits to see your furniture being manufactured",
      "Comprehensive site measurements and 3D space planning",
      "Complete pre-assembly inspection before factory dispatch",
      "Professional white-glove site installation by trained technicians",
    ],
    image: "/images/experience-centre.jpeg",
    imageAlt: "Factory and experience centre under one roof",
  },
];
