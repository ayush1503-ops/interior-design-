/*
  ─────────────────────────────────────────────────────────────
  PREET INTERIORS — central business configuration
  Edit everything about the business here. Components read from
  this file, so contact details only ever need changing once.
  ─────────────────────────────────────────────────────────────
*/

export const business = {
  name: "Preet Interiors",
  tagline: "Interior Design Studio",
  city: "Delhi",
  locality: "Krishna Nagar",

  phoneDisplay: "098111 81116",
  phoneHref: "tel:+91981118116",
  whatsappHref:
    "https://wa.me/919811181116?text=" +
    encodeURIComponent(
      "Hello Preet Interiors, I would like to discuss an interior design project."
    ),

  addressLines: [
    "H-22 East, Street No. 6,",
    "Opp. Reliance Fresh,",
    "Gyan Park, Chander Nagar,",
    "Krishna Nagar, Delhi - 110051",
  ],
  addressOneLine:
    "H-22 East, Street No. 6, Opp. Reliance Fresh, Gyan Park, Chander Nagar, Krishna Nagar, Delhi - 110051",

  /*
    Google Maps: embedded map uses a plain query URL (no API key needed).
    Once the Google Business profile exact share/review links are available,
    replace `mapsLink` / `reviewsLink` with them.
  */
  mapsEmbed:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Preet Interiors, Krishna Nagar, Delhi 110051") +
    "&z=16&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Preet Interiors, H-22 East Street No. 6, Chander Nagar, Krishna Nagar, Delhi 110051"
    ),
  reviewsLink:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Preet Interiors Krishna Nagar Delhi reviews"),
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
