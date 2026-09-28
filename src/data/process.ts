/*
  The studio's working process and reasons to choose Vantara Interiors.
  Edit copy here — section components render from these lists.
*/

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Consultation",
    description:
      "We begin by understanding your space, requirements, lifestyle and expectations — usually over a call or a site visit.",
  },
  {
    index: "02",
    title: "Planning",
    description:
      "We develop the design direction: layout, space planning and the practical requirements of your household or workplace.",
  },
  {
    index: "03",
    title: "Design Development",
    description:
      "Materials, finishes, furniture, lighting and details are refined together until the design feels resolved and right.",
  },
  {
    index: "04",
    title: "Execution",
    description:
      "Once the design is approved, we move steadily from drawing to site — towards a finished, well-made space.",
  },
];

export interface Reason {
  title: string;
  description: string;
}

export const reasons: Reason[] = [
  {
    title: "Personalised design",
    description:
      "Every design begins with the people who will use the space — your routines, preferences and the way you live.",
  },
  {
    title: "Practical planning",
    description:
      "Layouts are worked out for daily use first: movement, storage, light and maintenance come before decoration.",
  },
  {
    title: "Attention to detail",
    description:
      "From shutter gaps to light temperature, the small decisions are made carefully — they are what you live with.",
  },
  {
    title: "Space-conscious solutions",
    description:
      "Homes in Delhi ask a lot of every square foot. We plan storage and furniture to make the most of the space you have.",
  },
  {
    title: "Clear communication",
    description:
      "You know what is happening at each stage — what has been decided, what comes next, and what it involves.",
  },
  {
    title: "Designed around your requirements",
    description:
      "We work to your brief, your budget and your timeline — not to a fixed house style imposed on you.",
  },
];
