/*
  ─────────────────────────────────────────────────────────────
  PROJECTS
  This is the portfolio data for the studio. Entries below are
  realistic placeholder projects — replace titles, locations,
  summaries, details and image paths with the studio's actual
  completed work. To add a project, copy an entry and give it a
  unique `slug`. Images live in `public/images/projects/`.
  ─────────────────────────────────────────────────────────────
*/

export type ProjectCategory =
  | "Residential"
  | "Living Room"
  | "Bedroom"
  | "Kitchen"
  | "Commercial";

export const projectCategories: ReadonlyArray<ProjectCategory | "All"> = [
  "All",
  "Residential",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Commercial",
];

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string; // localities shown are placeholders — replace with real ones
  summary: string;
  cover: string;
  coverAlt: string;
  /** Aspect ratio class used for the portfolio grid (varied for an editorial feel) */
  aspect: "vertical" | "horizontal";
  gallery: GalleryImage[];
  details: ReadonlyArray<{ label: string; value: string }>;
}

export const projects: Project[] = [
  {
    slug: "family-apartment-east-delhi",
    title: "Family Apartment",
    category: "Residential",
    location: "Greenview Enclave, Delhi",
    summary:
      "A complete home interior planned as one connected story — open living and dining, warm wood finishes, layered lighting, and storage worked into every room.",
    cover: "/images/projects/residence-1.jpg",
    coverAlt:
      "Open-plan living and dining area of a family apartment with a wooden dining table, brass pendants and warm lighting",
    aspect: "vertical",
    gallery: [
      {
        src: "/images/projects/residence-1.jpg",
        alt: "Dining area opening into the living room beyond, in warm woods and cream tones",
      },
      {
        src: "/images/projects/living-1.jpg",
        alt: "Living room with walnut slat TV wall and warm concealed lighting",
      },
      {
        src: "/images/detail-1.jpg",
        alt: "Material palette of travertine, walnut veneer, brass and linen used across the home",
      },
    ],
    details: [
      { label: "Scope", value: "Living, dining, kitchen and bedrooms" },
      { label: "Focus", value: "Open planning, storage, layered lighting" },
      { label: "Materials", value: "Walnut veneer, travertine, linen, brass" },
      { label: "Palette", value: "Warm neutrals with terracotta accents" },
    ],
  },
  {
    slug: "warm-contemporary-living-room",
    title: "Warm Contemporary Living Room",
    category: "Living Room",
    location: "Sector 21, New Delhi",
    summary:
      "A living room reworked around comfort and evening use — a walnut slat media wall, deep soft seating and lighting that can shift from bright to warm.",
    cover: "/images/projects/living-1.jpg",
    coverAlt:
      "Living room with a walnut wood slat TV wall, cream sofa and travertine coffee table in warm light",
    aspect: "horizontal",
    gallery: [
      {
        src: "/images/projects/living-1.jpg",
        alt: "Wide view of the living room showing the media wall and seating arrangement",
      },
      {
        src: "/images/detail-1.jpg",
        alt: "Close detail of the wood, stone and fabric finishes chosen for the room",
      },
    ],
    details: [
      { label: "Scope", value: "Living room and entry" },
      { label: "Focus", value: "Media wall, seating comfort, lighting scenes" },
      { label: "Materials", value: "Walnut slats, travertine, bouclé, wool rug" },
      { label: "Palette", value: "Cream, walnut, olive, brass" },
    ],
  },
  {
    slug: "calm-master-bedroom",
    title: "Calm Master Bedroom",
    category: "Bedroom",
    location: "Delhi",
    summary:
      "A bedroom designed for rest — a tall upholstered headboard, warm lamps at both bedsides, and a quiet palette of ivory, linen and rust.",
    cover: "/images/projects/bedroom-1.jpg",
    coverAlt:
      "Master bedroom with an upholstered beige headboard, walnut bedside tables and warm lit lamps",
    aspect: "vertical",
    gallery: [
      {
        src: "/images/projects/bedroom-1.jpg",
        alt: "View across the master bed towards warm bedside lighting and sheer curtains",
      },
      {
        src: "/images/projects/wardrobe-1.jpg",
        alt: "Full-height wardrobe wall with fluted walnut shutters and brass handles",
      },
    ],
    details: [
      { label: "Scope", value: "Master bedroom and wardrobe wall" },
      { label: "Focus", value: "Sleep comfort, soft lighting, calm surfaces" },
      { label: "Materials", value: "Upholstery, walnut, linen, fluted panels" },
      { label: "Palette", value: "Ivory, oatmeal, walnut, rust" },
    ],
  },
  {
    slug: "compact-modular-kitchen",
    title: "Compact Modular Kitchen",
    category: "Kitchen",
    location: "Vasant Vihar, Delhi",
    summary:
      "A practical modular kitchen in a compact footprint — handleless matte cabinets below, warm walnut above, and drawers planned for real daily cooking.",
    cover: "/images/projects/kitchen-1.jpg",
    coverAlt:
      "Modular kitchen with matte taupe lower cabinets, walnut upper cabinets and a white quartz counter",
    aspect: "horizontal",
    gallery: [
      {
        src: "/images/projects/kitchen-1.jpg",
        alt: "Counter run of the kitchen showing under-cabinet lighting and brass fittings",
      },
      {
        src: "/images/detail-1.jpg",
        alt: "Worktop and finish samples chosen for the kitchen",
      },
    ],
    details: [
      { label: "Scope", value: "Kitchen layout and cabinetry" },
      { label: "Focus", value: "Workflow, drawer storage, easy maintenance" },
      { label: "Materials", value: "Matte laminate, walnut, quartz, brass" },
      { label: "Palette", value: "Taupe, walnut, white" },
    ],
  },
  {
    slug: "guest-bedroom-with-storage",
    title: "Guest Bedroom with Storage",
    category: "Bedroom",
    location: "Delhi",
    summary:
      "A compact guest room that works hard — a warm cane-and-wood bed, and a full-height wardrobe wall with fluted shutters that keeps the room calm.",
    cover: "/images/projects/bedroom-2.jpg",
    coverAlt:
      "Guest bedroom with a cane headboard bed beside a fluted walnut and beige wardrobe wall",
    aspect: "vertical",
    gallery: [
      {
        src: "/images/projects/bedroom-2.jpg",
        alt: "Bed with cane headboard detail in soft morning light",
      },
      {
        src: "/images/projects/wardrobe-1.jpg",
        alt: "Detail of the fluted shutter wardrobe with cove lighting above",
      },
    ],
    details: [
      { label: "Scope", value: "Guest bedroom and storage" },
      { label: "Focus", value: "Full-height wardrobes, breathing room" },
      { label: "Materials", value: "Fluted walnut, matte laminate, cane, linen" },
      { label: "Palette", value: "Beige, walnut, soft white" },
    ],
  },
  {
    slug: "studio-office-interior",
    title: "Studio Office Interior",
    category: "Commercial",
    location: "Delhi",
    summary:
      "A compact working studio planned for focus and materiality — a long shared desk, shelving for samples, and a warm clay accent wall.",
    cover: "/images/projects/commercial-1.jpg",
    coverAlt:
      "Office studio with an oak work desk, shelving of material samples and a warm clay accent wall",
    aspect: "horizontal",
    gallery: [
      {
        src: "/images/projects/commercial-1.jpg",
        alt: "View of the working desk and sample shelving in the studio office",
      },
      {
        src: "/images/detail-1.jpg",
        alt: "Stone, wood, brass and linen samples used in the studio's material library",
      },
    ],
    details: [
      { label: "Scope", value: "Workspace planning and finishes" },
      { label: "Focus", value: "Focused work, sample storage, durability" },
      { label: "Materials", value: "Oak, clay-toned paint, steel track lighting" },
      { label: "Palette", value: "Oak, clay, warm white" },
    ],
  },
];
