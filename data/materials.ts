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
    id: "mat-1",
    name: "Bookmatched Calacatta Oro",
    category: "Natural Italian Marble",
    finish: "Silky Antique Honed",
    tactileNote: "Subtle warm gold veining across a cool milky-white crystalline matrix.",
    bestFor: "Monolithic Kitchen Islands & Master Bath Retreats",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Close-up of bookmatched Calacatta Oro marble slab with warm veins",
  },
  {
    id: "mat-2",
    name: "Charcoal Basalt Sintered Slab",
    category: "Ultra-Compact Porcelain",
    finish: "Deep Matte Velvet",
    tactileNote: "Tactile micro-texture with zero reflectivity, absorbing glare softly.",
    bestFor: "Chef Worktops, Fireplace Plinths & Outdoor Kitchens",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Textured dark charcoal architectural stone finish",
  },
  {
    id: "mat-3",
    name: "Fluted Ochre Terracotta",
    category: "Artisanal Ceramic 3D",
    finish: "Bisque Matte Glaze",
    tactileNote: "Rhythmic 25mm extruded flutes creating dramatic raking shadows.",
    bestFor: "Curved Bar Fronts & Feature Wall Backdrops",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Tactile fluted ceramic tile surface close-up",
  },
  {
    id: "mat-4",
    name: "Smoked Rift-Cut Oak",
    category: "Architectural Timber Veneer",
    finish: "Open-Pore Natural Wax Oil",
    tactileNote: "Subtle grain relief with deep organic undertones and zero artificial sheen.",
    bestFor: "Cabinet Fronts & Hidden Pocket Doors",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Rich architectural timber grain and cabinet joinery",
  },
  {
    id: "mat-5",
    name: "Travertine Romano Vein-Cut",
    category: "Natural Sedimentary Stone",
    finish: "Filled & Satin Honed",
    tactileNote: "Linear mineral stratification formed over millennia by thermal springs.",
    bestFor: "Expansive Living Floors & Spa Enclosures",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Linear honed natural travertine stone detail",
  },
  {
    id: "mat-6",
    name: "Nero Marquina Porcelain",
    category: "Monolithic Slabs",
    finish: "Mirror Satin Polish",
    tactileNote: "Deep obsidian ground striated with lightning-sharp calciferous white veins.",
    bestFor: "Sculptural Bathroom Vanities & Statement Columns",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Dark porcelain slab with striking white marble veining",
  },
];
