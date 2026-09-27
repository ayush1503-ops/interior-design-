/*
  Services offered by Preet Interiors.
  Add, remove or edit entries here — the Services section renders
  directly from this list.
*/

import type { LucideIcon } from "lucide-react";
import {
  Home,
  Sofa,
  BedDouble,
  ChefHat,
  Archive,
  Building2,
} from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: "residential",
    icon: Home,
    title: "Residential Interiors",
    description:
      "Complete interior planning for homes and apartments — from layout and storage to materials, lighting and finishing.",
  },
  {
    id: "living",
    icon: Sofa,
    title: "Living Spaces",
    description:
      "Living rooms designed around comfort, proportion, lighting and everyday use — spaces made to be lived in.",
  },
  {
    id: "bedrooms",
    icon: BedDouble,
    title: "Bedrooms",
    description:
      "Personal, comfortable bedroom interiors with thoughtful storage, calm palettes and materials that age well.",
  },
  {
    id: "kitchens",
    icon: ChefHat,
    title: "Modular Kitchens",
    description:
      "Functional kitchen layouts with practical storage, durable surfaces and clean, precise detailing.",
  },
  {
    id: "storage",
    icon: Archive,
    title: "Wardrobes & Storage",
    description:
      "Custom wardrobes and storage solutions designed around the available space and what you actually need to keep.",
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Interiors",
    description:
      "Interior planning for offices, studios, retail and other working environments — practical and presentable.",
  },
];
