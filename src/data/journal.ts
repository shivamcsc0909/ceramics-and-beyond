export interface JournalItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  heroImage: string;
  imageAlt: string;
  author: string;
}

export const JOURNAL_ARTICLES: JournalItem[] = [
  {
    slug: "live-counter-furniture-making",
    title: "The Live Counter Concept: Why Transparency in Furniture Making Matters",
    category: "Philosophy",
    date: "October 2026",
    readTime: "5 min read",
    author: "Founder, Ceramics & Beyond",
    excerpt:
      "Think of it as watching your paneer tikka being prepared fresh at a live counter — except this time, it’s your kitchen taking shape under our roof.",
    content: `
      <p>I have always believed that when you invest in your home, you shouldn't have to guess what goes on behind closed factory doors. At Ceramics & Beyond, we bring our factory and experience centre together under one roof.</p>
      <p>Watching raw boards transform through computer-controlled cutting, multi-stage edge-banding, and automated PU paint booths gives our clients total confidence. There is no mystery behind the making — just materials, machines, craftsmanship and a process you can understand.</p>
      <p>Because making a house look good is one thing. Making it feel like home? That’s our job.</p>
    `,
    heroImage: "/images/experience-centre.jpeg",
    imageAlt: "Live furniture making and finishing in experience centre",
  },
  {
    slug: "art-of-pu-paint-finishes",
    title: "The Art of PU Paint Finishes: Why It Defines Modern Interiors",
    category: "Materials & Finishes",
    date: "September 2026",
    readTime: "6 min read",
    author: "Finishing Atelier Lead",
    excerpt:
      "From ultra-matte velvet to radiant high-gloss, explore why specialty PU paint is the premier choice for luxury modular kitchens and bespoke wardrobes.",
    content: `
      <p>Polyurethane (PU) paint represents the pinnacle of modern furniture finishes. Unlike conventional laminates with visible edge seams, PU paint coats every profile, j-pull groove, and bevel seamlessly.</p>
      <p>In our dust-free automated spray booths, each panel receives multiple coats of polyurethane primer, wet hand-sanding, and non-yellowing topcoats. The result is a silky, water-impermeable surface that resists heat, moisture, and daily household wear.</p>
    `,
    heroImage: "/images/matte-pu-paint.jpeg",
    imageAlt: "PU paint finish application on custom cabinetry",
  },
  {
    slug: "designing-around-people",
    title: "Designing Around You: Why Your Home Shouldn't Adjust to Standard Furniture",
    category: "Design Thinking",
    date: "August 2026",
    readTime: "4 min read",
    author: "Founder, Ceramics & Beyond",
    excerpt:
      "A home should be designed around the people living in it, not the other way around. Every corner should have a purpose, every detail should feel intentional.",
    content: `
      <p>Standard modular units from retail catalogues force your room to compromise with odd filler panels and dead corners. At Ceramics & Beyond, we customize every inch around your needs.</p>
      <p>Whether it is custom counter heights for ergonomic cooking, dedicated jewelry drawers in walk-in wardrobes, or a peaceful mandir tucked perfectly into a niche, we tailor dimensions, storage, and finishes to make everyday living effortless.</p>
    `,
    heroImage: "/images/translucent-glass-wardrobe.jpeg",
    imageAlt: "Thoughtfully crafted bedroom and walk-in wardrobe interior",
  },
];
