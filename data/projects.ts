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
      "A 6,500 sq.ft triplex penthouse overlooking the Arabian Sea, featuring a dramatic 4.2-meter bookmatched Calacatta island and live-fabricated smoked oak cabinetry.",
    brief:
      "The client sought a fluid architectural dialogue between expansive panoramic sea views and tactile, organic surfaces. We engineered a seamless transition from the open salon into a culinary theatre featuring custom pocket-door cabinetry and monolithic stone islands.",
    materialsUsed: [
      "Calacatta Oro Natural Marble (Bookmatched)",
      "Smoked Rift Oak Cabinetry with German Soft-Motion",
      "Large-Format Silk Honed Porcelain Flooring (3200 × 1600mm)",
      "Fluted Bisque Ceramic Feature Wall",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "The Zenith Penthouse open-concept kitchen and living salon",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
        alt: "Monolithic kitchen island and cabinetry",
        caption: "Live factory-crafted kitchen cabinetry with integrated LED channels",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        alt: "Calacatta stone island detail",
        caption: "Bookmatched Calacatta marble waterfall edge with 45° mitre",
      },
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        alt: "Master ensuite bath",
        caption: "Continuous Statuario porcelain slab shower enclosure",
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
      "A tropical modernist residence built around a courtyard, utilizing earthy fluted terracotta, textured slate, and weather-impervious outdoor sintered stone.",
    brief:
      "Designed to blur indoor living with lush tropical gardens. The challenge was selecting materials capable of withstanding coastal monsoon humidity and salt-laden air while maintaining understated artisanal beauty.",
    materialsUsed: [
      "Fluted Ochre Terracotta Ceramic Wall Tiles",
      "Charcoal Basalt Ultra-Compact Sintered Worktops",
      "R11 Textured Outdoor Porcelain Pavers",
      "Handcrafted Reactive Glaze Splashbacks",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Alila Coastal Villa courtyard and indoor-outdoor living pavilion",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        alt: "Villa interior stone floor",
        caption: "Continuous porcelain floor extending from living room out to terrace",
      },
      {
        url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
        alt: "Fluted terracotta detail",
        caption: "Artisanal terracotta tiles catching golden afternoon sunlight",
      },
    ],
  },
  {
    slug: "atelier-m-flagship",
    title: "Atelier M Flagship",
    category: "Retail Architecture",
    location: "Chanakyapuri, New Delhi",
    year: "2024",
    description:
      "A premier luxury couture boutique featuring monolithic travertine display plinths, acoustic bas-relief 3D ceramic walls, and bronze shadow-gap detailing.",
    brief:
      "The client requested a gallery-like backdrop where high-fashion garments are treated like museum artifacts. We designed custom travertine blocks and floor-to-ceiling sculptural wall modules.",
    materialsUsed: [
      "Travertine Romano Filled & Satin Honed",
      "Designer 3D Extruded Ceramic Bas-Relief Panels",
      "Satin Black Sintered Countertops",
      "Custom Bronze Architectural Trim",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Atelier M Flagship retail gallery interior",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        alt: "Sculptural wall relief",
        caption: "3D architectural ceramic panels creating acoustic warmth and visual texture",
      },
    ],
  },
  {
    slug: "soma-wellness-pavilion",
    title: "Soma Wellness Pavilion",
    category: "Hospitality & Spa",
    location: "Whitefield, Bengaluru",
    year: "2024",
    description:
      "An urban wellness refuge utilizing silky velvet matte porcelain, monolithic carved stone pools, and steam-resistant mineral finishes.",
    brief:
      "Crafting an environment of absolute sensorial tranquility. Every stone surface was chosen for its tactile warmth under bare feet and natural resistance to organic oils and steam.",
    materialsUsed: [
      "Velvet Honed Basaltina Porcelain Slabs",
      "Slip-Resistant R11 Satin Stone Pavers",
      "Silver-Ion Antibacterial Wet Wall Liners",
      "Carved Natural Granite Water Basins",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Soma Wellness Pavilion indoor mineral bath and stone sanctuary",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
        alt: "Stone basin detail",
        caption: "Carved stone water feature with gentle laminar flow",
      },
    ],
  },
];
