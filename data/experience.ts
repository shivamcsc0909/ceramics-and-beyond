export interface ExperienceStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  detail: string;
}

export const EXPERIENCE_STORY = {
  sectionTag: "CERAMICS & BEYOND · THE EXPERIENCE",
  mainHeadline: "Ever watched your paneer tikka being made live? Now imagine the same experience with your kitchen!",
  supportingCopy:
    "At Ceramics & Beyond, you don’t just choose your kitchen — you get to watch it come to life, right here on our factory floor. Complete transparency, from the first cut to the final finish.",
  
  conceptA: {
    badge: "Brand Philosophy",
    headline: "No secret ingredients. Just your dream kitchen.",
    subtext: "Complete honesty in our raw timber cores, German hardware, and laser-guided mitring. Nothing concealed behind veneer.",
  },
  
  conceptB: {
    badge: "Creative Campaign",
    headline: "Like teppanyaki, but for your interiors.",
    subtext: "Dynamic, precision-driven, and mesmerizing to behold. Witness your cabinetry crafted live by master artisans.",
  },

  signatureCard: {
    sectionLabel: "CERAMICS & BEYOND · THE EXPERIENCE",
    headline: "Your kitchen, made in front of your eyes.",
    supportingParagraph:
      "From the factory floor to your future favourite room, see your kitchen take shape in real time. No middlemen, no mystery — just craftsmanship you can witness for yourself.",
    closingPunchline: "Come for the kitchen. Stay for the show.",
    ctaText: "EXPERIENCE OUR PROCESS",
    ctaHref: "/experience",
    workshopImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=85",
    workshopImageAlt:
      "Master craftspeople and precision machinery assembling bespoke kitchen cabinetry on our factory floor",
  },

  stages: [
    {
      step: "01",
      title: "Slab & Core Selection",
      subtitle: "The Raw Ingredients",
      description:
        "Walk our stone gallery and timber stores. Touch raw porcelain slabs, inspect high-density waterproof cores, and handpick the exact vein patterns for your waterfall island.",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Natural marble and porcelain slab selection gallery",
      detail: "Zero batch variation; you reserve the exact slab cut for your home.",
    },
    {
      step: "02",
      title: "Precision CNC Sizing",
      subtitle: "Surgical Accuracy",
      description:
        "Witness our high-precision computer-numerical routers cut every millimeter to exact CAD specifications, ensuring flawless 45-degree mitred joints and seamless edge bonding.",
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Computer-guided precision cutting equipment in workshop",
      detail: "Tolerances down to 0.1mm for German-grade flush cabinet alignment.",
    },
    {
      step: "03",
      title: "Artisanal Hand Assembly",
      subtitle: "Master Joinery",
      description:
        "Watch our master joiners clamp, align, and hand-fit soft-close runners, concealed pocket doors, and seamless drawer organizers in front of your eyes.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Craftsman hand-fitting cabinetry joints and hinges",
      detail: "Every drawer box undergoes a 50,000-cycle stress test before dispatch.",
    },
    {
      step: "04",
      title: "Dry-Run Mockup Assembly",
      subtitle: "The Dress Rehearsal",
      description:
        "Before anything enters your residence, the entire kitchen is fully dry-assembled on our factory floor. Stand in your finished kitchen layout, test the drawers, and approve every detail.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Fully assembled architectural kitchen mockup on workshop floor",
      detail: "Complete peace of mind — zero unpleasant surprises during home installation.",
    },
    {
      step: "05",
      title: "White-Glove Installation",
      subtitle: "Homecoming",
      description:
        "Our in-house certified installation team delivers, installs, and calibrates your bespoke kitchen within 48 to 72 hours, leaving your home spotless and ready for memories.",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Pristine installed kitchen ready for daily life",
      detail: "Includes a handover orientation and a 10-year structural warranty pack.",
    },
  ] as ExperienceStage[],
};
