/*
  ─────────────────────────────────────────────────────────────
  VANTARA INTERIORS — central business configuration
  All business and contact details are fictitious placeholders.
  ─────────────────────────────────────────────────────────────
*/

export const business = {
  name: "Vantara Interiors",
  tagline: "Interior Design Studio",
  city: "New Delhi",
  locality: "Greenview Enclave",

  phoneDisplay: "+91 98000 00000",
  phoneHref: "tel:+919800000000",
  whatsappHref:
    "https://wa.me/919800000000?text=" +
    encodeURIComponent(
      "Hello Vantara Interiors, I would like to discuss an interior design project."
    ),

  addressLines: [
    "Plot No. 42, Block C,",
    "Near Lotus Boulevard,",
    "Greenview Enclave, Sector 21,",
    "New Delhi - 110001",
  ],
  addressOneLine:
    "Plot No. 42, Block C, Near Lotus Boulevard, Greenview Enclave, Sector 21, New Delhi - 110001",

  mapsEmbed:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Connaught Place, New Delhi, Delhi 110001") +
    "&z=15&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Connaught Place, New Delhi, Delhi 110001"),
  reviewsLink:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Interior Design Studio New Delhi"),
} as const;

export const navigation: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];
