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
    id: "bespoke-kitchen-craft",
    number: "01",
    title: "Bespoke Kitchen Architecture & Live Manufacturing",
    tagline: "From First Cut to Final Assembly, Witnessed by You",
    description:
      "A complete turnkey culinary design service. We engineer custom modular carcasses, integrate premium German motion hardware, carve monolithic stone waterfall islands, and assemble your complete kitchen live on our factory floor for your personal preview.",
    deliverables: [
      "Custom 3D CAD engineering & ergonomic spatial planning",
      "Live factory-floor fabrication walkthrough & preview",
      "Integration with luxury appliances (Miele, Gaggenau, Sub-Zero)",
      "Full factory dry-run assembly sign-off prior to dispatch",
    ],
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bespoke kitchen architecture and stone cabinetry",
  },
  {
    id: "surface-curation",
    number: "02",
    title: "Architectural Surface Specification & Curation",
    tagline: "Rare European Quarries & Sintered Innovations",
    description:
      "We partner with leading architects, interior designers, and estate builders to curate cohesive surface palettes across natural stone, continuous porcelain, and artisanal ceramics.",
    deliverables: [
      "Direct quarry block reservation & vein selection",
      "Slip-resistance (R-rating) and technical compliance audits",
      "Full physical sample palettes delivered to your studio",
      "Digital slab bookmatch renderings before cutting",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Architectural surface curation and stone slabs",
  },
  {
    id: "precision-fabrication",
    number: "03",
    title: "CNC Precision Sizing & Water-Jet Fabrication",
    tagline: "Tolerances Down to 0.1 Millimeter",
    description:
      "Our state-of-the-art facility features 5-axis CNC routers and high-pressure abrasive water-jet cutters. We carve monolithic sinks, shark-nose counter edges, 45-degree bookmatched mitres, and custom bas-relief wall panels.",
    deliverables: [
      "Mitred waterfall island corners with continuous vein wrap",
      "Seamless flush cooktop and undermount sink cut-outs",
      "Integrated stone drainer grooves & sloped shower bases",
      "Architectural 3D stone profiling & acoustic fluting",
    ],
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Precision stone cutting and CNC router fabrication",
  },
  {
    id: "white-glove-installation",
    number: "04",
    title: "White-Glove Installation & On-Site Supervision",
    tagline: "Flawless Execution from Factory to Finished Space",
    description:
      "Materials and joinery are only as pristine as their installation. Our certified in-house master installers manage structural anchoring, sub-floor levelling, laser alignment, and seamless jointing.",
    deliverables: [
      "Pre-installation sub-floor laser levelling & moisture testing",
      "In-house certified installers equipped with suction rigs",
      "1mm micro-joint colour-matched epoxy finishing",
      "Post-handover care regimen & 10-year structural warranty pack",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "White glove installation and master craftsmanship",
  },
];
