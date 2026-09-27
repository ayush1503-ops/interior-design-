import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { business, navigation } from "../config/business";
import { lockScroll, unlockScroll } from "../lib/scrollLock";
import { cn } from "../utils/cn";

interface HeaderProps {
  onBook: () => void;
}

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      className="flex items-center gap-3"
      aria-label="Preet Interiors — home"
    >
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 place-items-center bg-clay font-serif text-lg text-paper"
      >
        P
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-[19px] font-medium tracking-tight text-ink">
          Preet Interiors
        </span>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe sm:block">
          Interior Design · Delhi
        </span>
      </span>
    </a>
  );
}

export function Header({ onBook }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile menu: lock scroll, close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      lockScroll();
      window.addEventListener("keydown", onKey);
      return () => {
        unlockScroll();
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [menuOpen]);

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-sm transition-colors duration-300",
          scrolled ? "border-line" : "border-transparent"
        )}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Wordmark />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[13.5px] font-medium text-ink/80 transition-colors hover:text-clay"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={business.phoneHref}
              className="hidden items-center gap-2 text-[13.5px] font-medium text-ink transition-colors hover:text-clay xl:flex"
            >
              <Phone size={15} aria-hidden="true" />
              {business.phoneDisplay}
            </a>

            <button
              type="button"
              onClick={onBook}
              className="hidden cursor-pointer border border-ink bg-ink px-5 py-2.5 text-[13px] font-medium tracking-wide text-paper transition-colors hover:bg-ink-deep sm:block"
            >
              Book a Consultation
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="cursor-pointer p-2 text-ink lg:hidden"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-paper transition-[opacity,transform] duration-300 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-line px-5 sm:px-8">
          <Wordmark onClick={() => setMenuOpen(false)} />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="cursor-pointer p-2 text-ink"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-8 sm:px-8">
          <ul className="space-y-1">
            {navigation.map((item, i) => (
              <li key={item.href} className="border-b border-line/70">
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span aria-hidden="true" className="text-xs font-medium text-clay">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-2xl font-light text-ink">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-line px-5 py-6 sm:px-8">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onBook();
            }}
            className="w-full cursor-pointer border border-ink bg-ink px-5 py-4 text-sm font-medium text-paper transition-colors hover:bg-ink-deep"
          >
            Book a Consultation
          </button>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={business.phoneHref}
              className="flex items-center justify-center gap-2 border border-ink/30 px-5 py-4 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              <Phone size={15} aria-hidden="true" /> Call
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-ink/30 px-5 py-4 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              <MessageCircle size={15} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
