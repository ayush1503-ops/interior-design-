import { ArrowUpRight, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { business } from "../config/business";

const footerNav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const externalLinks = [
  { label: "Google Maps", href: business.mapsLink, icon: MapPin },
  { label: "Google Reviews", href: business.reviewsLink, icon: Star },
  { label: "WhatsApp", href: business.whatsappHref, icon: MessageCircle },
  { label: "Phone", href: business.phoneHref, icon: Phone },
];

export function Footer() {
  return (
    <footer className="bg-ink-deep text-paper">
      <div className="mx-auto w-full max-w-6xl px-5 pb-10 pt-16 sm:px-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-20">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-3" aria-label={`${business.name} — back to top`}>
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center bg-clay font-serif text-lg text-paper"
              >
                V
              </span>
              <span className="font-serif text-xl font-medium tracking-tight">
                {business.name}
              </span>
            </a>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/50">
              {business.tagline}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/65">
              Thoughtful interiors for homes and workspaces across Delhi —
              designed with attention to comfort, detail and everyday living.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/50">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-paper/80 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/50">
              Contact
            </h2>
            <p className="mt-5 text-sm text-paper/80">{business.city}, India</p>
            <a
              href={business.phoneHref}
              className="mt-1.5 block font-serif text-xl font-light text-paper transition-colors hover:text-clay"
            >
              {business.phoneDisplay}
            </a>

            <ul className="mt-7 space-y-3 border-t border-paper/15 pt-6">
              {externalLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-2.5 text-sm text-paper/75 transition-colors hover:text-paper"
                  >
                    <Icon size={15} strokeWidth={1.7} aria-hidden="true" className="text-paper/50" />
                    {label}
                    {href.startsWith("http") && (
                      <ArrowUpRight size={13} aria-hidden="true" className="text-paper/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-paper/15 pt-7 text-[13px] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p>{business.locality}, {business.city} — 110001</p>
        </div>
      </div>
    </footer>
  );
}
