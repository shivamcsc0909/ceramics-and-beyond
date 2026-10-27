export interface JournalArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  heroImage: string;
  imageAlt: string;
  content: {
    heading: string;
    paragraphs: string[];
    quote?: string;
  }[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "choosing-ceramic-surfaces",
    title: "Choosing the Right Ceramic Surfaces: The Architect's Material Guide",
    category: "Material Selection",
    date: "October 12, 2025",
    readTime: "6 min read",
    author: "Editorial Studio",
    excerpt:
      "A comprehensive architectural analysis on balancing slip resistance, thermal conductivity, light reflectance, and aesthetic character when specifying large-format porcelain vs ceramic.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Architect reviewing large ceramic and porcelain material samples",
    content: [
      {
        heading: "The Intersection of Engineering and Emotion",
        paragraphs: [
          "Specifying surfaces for contemporary architecture requires looking far beyond superficial color cards. A surface is the only architectural plane that human occupants touch with every step, every lean against an island, and every resting hand on a vanity.",
          "Porcelain and ceramic differ profoundly in their crystalline structures. Ultra-compact sintered porcelain is pressed under 25,000 tons and fired at upwards of 1,200°C, rendering its absorption rate effectively negligible (<0.05%).",
        ],
        quote: "A true architectural surface does not merely decorate a space; it anchors human movement within it.",
      },
      {
        heading: "Understanding R-Ratings and Tactile Friction",
        paragraphs: [
          "For wet rooms and outdoor transitions, surface micro-topography determines safety without needing to compromise tactile luxury. Modern satin-honed finishes achieve R10 and R11 ratings through micro-texturing that remains velvety under bare feet while providing sure grip when wet.",
          "When selecting finishes for open-plan living rooms connecting to outdoor terraces, continuing the identical surface finish across the threshold creates a breathtaking illusion of infinite space.",
        ],
      },
    ],
  },
  {
    slug: "the-live-kitchen-revolution",
    title: "The Live Kitchen Revolution: Why Transparency Changes Everything",
    category: "Design Philosophy",
    date: "September 28, 2025",
    readTime: "5 min read",
    author: "Editorial Studio",
    excerpt:
      "No secret ingredients, no mystery middlemen. How inviting homeowners directly onto the factory floor to watch their kitchens being manufactured has redefined luxury joinery.",
    heroImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Master joiners working on high precision kitchen components in factory",
    content: [
      {
        heading: "The Food Analogy: Seeing Your Recipe Cooked Live",
        paragraphs: [
          "Ever watched your favourite culinary dish being prepared live right in front of you? There is a primal trust and tactile delight in witnessing skilled hands orchestrate raw ingredients into a masterpiece.",
          "For decades, the luxury kitchen industry kept manufacturing cloaked in opaque delays and overseas mystery. At Ceramics & Beyond, we reversed that model: welcoming architects and clients onto the factory floor to watch precision CNC routers and master craftsmen fit every drawer runner live.",
        ],
        quote: "No secret ingredients. Just your dream kitchen brought to life with complete transparency.",
      },
      {
        heading: "The Rehearsal: The Factory Floor Dry-Assembly",
        paragraphs: [
          "The highlight of the live experience is the full factory dry-run. Before a single component travels to your residence, your complete kitchen is fully assembled in our atelier. Clients walk through their future kitchen, test drawer damping, inspect mitre alignment, and sign off with complete confidence.",
        ],
      },
    ],
  },
  {
    slug: "art-of-bookmatching",
    title: "The Art of Bookmatching: Turning Natural Marble Into Living Murals",
    category: "Craftsmanship",
    date: "September 14, 2025",
    readTime: "7 min read",
    author: "Editorial Studio",
    excerpt:
      "How geological memory and artisan stonemasonry align consecutive quarry slabs to produce symmetrical, butterfly-wing masterpieces on monolithic islands.",
    heroImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Striking bookmatched marble island in luxury residence",
    content: [
      {
        heading: "Geological Symmetry",
        paragraphs: [
          "Bookmatching is an ancient stonemasonry technique where adjacent slabs cut from the same quarry block are opened like the pages of a book, creating a mesmerizing mirrored pattern along the central axis.",
          "When executed with high-character marbles such as Calacatta Oro or Arabescato, the natural veins create organic symmetry resembling butterfly wings or flowing rivers of mineral deposits.",
        ],
        quote: "Nature creates the marble over millions of years; our master stonemasons simply arrange its conversation.",
      },
    ],
  },
  {
    slug: "tactile-acoustics-fluted-tiles",
    title: "Tactile Acoustics: How 3D Fluted Wall Tiles Transform Spatial Sound",
    category: "Architecture & Sound",
    date: "August 30, 2025",
    readTime: "4 min read",
    author: "Editorial Studio",
    excerpt:
      "Modern minimalist interiors often suffer from reverberation. Discover how architectural three-dimensional ceramic wall panels diffuse sound waves while creating sculptural depth.",
    heroImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Fluted 3D ceramic feature wall diffusing ambient light and sound",
    content: [
      {
        heading: "Breaking Hard Reflections",
        paragraphs: [
          "Expansive glazing, polished floors, and concrete ceilings can turn an otherwise serene contemporary home into an echo chamber. While fabric acoustic panels often look utilitarian, extruded ceramic relief panels solve the physics of sound elegantly.",
          "The undulating ridges scatter and diffuse high-frequency flutter echoes, softening room reverberation while interacting with natural daylight to create ever-shifting shadows.",
        ],
      },
    ],
  },
];
