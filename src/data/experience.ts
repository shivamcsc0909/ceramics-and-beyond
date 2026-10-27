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
  sectionTag: "CERAMICS & BEYOND · THE FACTORY & EXPERIENCE CENTRE",
  mainHeadline: "Thoughtfully Made. Entirely Yours.",
  supportingCopy:
    "We believe you should be able to see the magic happen. Our factory and experience centre come together under one roof, allowing you to witness your furniture being made, understand the process and experience the transparency behind every creation.",

  conceptA: {
    badge: "The Live Counter Concept",
    headline: "Watching Your Kitchen Take Shape in Real Time.",
    subtext: "Think of it as watching your paneer tikka being prepared fresh at a live counter — except this time, it’s your kitchen and bespoke furniture taking shape.",
  },

  conceptB: {
    badge: "In-House Precision",
    headline: "Complete Machine-Led Control From Board to Finish.",
    subtext: "From CNC cutting and multi-stage edge-banding to automated dust-free PU paint spray booths, every detail is crafted under our watchful eye.",
  },

  signatureCard: {
    sectionLabel: "CERAMICS & BEYOND · FOUNDER-LED CRAFT",
    headline: "Making a house look good is one thing. Making it feel like home? That’s our job.",
    supportingParagraph:
      "As a NIFT graduate and woman entrepreneur in a traditionally male-dominated, manufacturing-intensive industry, I wanted to build something that reflected thoughtful design, practical solutions, complete customisation and personal involvement in every detail.",
    closingPunchline: "Simple yet seen. Practical yet personal. Made for the way you live.",
    ctaText: "SCHEDULE AN EXPERIENCE VISIT",
    ctaHref: "/contact",
    workshopImage:
      "/images/founder-story.jpeg",
    workshopImageAlt:
      "Modern furniture manufacturing and experience centre in New Delhi",
  },

  stages: [
    {
      step: "01",
      title: "Design with a Purpose",
      subtitle: "The Personal Discovery",
      description:
        "We believe a home should be designed around the people living in it, not the other way around. Every corner should have a purpose, every detail should feel intentional, and every piece should make everyday living effortless.",
      image: "/images/living-hall.jpeg",
      imageAlt: "Architectural space planning and custom furniture blueprint",
      detail: "Exact site measurements and 3D walkthroughs ensuring zero dead space.",
    },
    {
      step: "02",
      title: "Customisation Without Compromise",
      subtitle: "Tailored to the Last Inch",
      description:
        "Your home should never have to adjust to standard furniture. We tailor dimensions, layouts, storage, materials and finishes to suit your exact requirements, making every creation distinctly yours.",
      image: "/images/finishes-palette.jpeg",
      imageAlt: "Material selection and custom finish sampling",
      detail: "Shutter profiles, internal drawer organizers, and finish matching.",
    },
    {
      step: "03",
      title: "Machine-Led Production In-House",
      subtitle: "Precision Engineering",
      description:
        "Our own manufacturing setup and computer-controlled panel processing help us maintain uncompromised control over dimensions, joints, and structural stability.",
      image: "/images/in-house-cnc.jpeg",
      imageAlt: "Precision woodworking machinery in furniture factory",
      detail: "Micron-tolerance cutting and zero-joint hot melt edge banding.",
    },
    {
      step: "04",
      title: "Finishes That Define Your Space",
      subtitle: "PU Paint Mastery",
      description:
        "We specialise in PU paint finishes in automated dust-free spray booths, complemented by natural wood veneers, smooth duco, glass, laminates, and artisanal rattan inserts.",
      image: "/images/matte-pu-paint.jpeg",
      imageAlt: "Hand-sanded PU paint finish application",
      detail: "Multi-stage wet sanding and non-yellowing protective topcoats.",
    },
    {
      step: "05",
      title: "Transparency You Can See",
      subtitle: "Under One Roof",
      description:
        "We open our factory doors so you can witness your furniture taking shape. No mystery behind the making — just materials, machines, craftsmanship and a process you can see and understand.",
      image: "/images/experience-centre.jpeg",
      imageAlt: "Clients experiencing furniture finishing at experience centre",
      detail: "Full pre-assembly and quality audit before final white-glove site installation.",
    },
  ],
};
