import { useEffect, useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { business } from "../config/business";
import { cn } from "../utils/cn";

/*
  Floating contact actions —
  · Mobile: a fixed bottom bar (Call / WhatsApp / Book)
  · Desktop: a quiet WhatsApp button after scrolling
  Uses the real business number from the central config.
*/

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.247m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

export function FloatingActions({ onBook }: { onBook: () => void }) {
  const [showDesktop, setShowDesktop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowDesktop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile bottom contact bar */}
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-line bg-paper/97 backdrop-blur-sm md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href={business.phoneHref}
          className="flex flex-col items-center gap-1 py-3 text-ink transition-colors hover:text-clay"
        >
          <Phone size={18} strokeWidth={1.8} aria-hidden="true" />
          <span className="text-[11px] font-medium">Call</span>
        </a>
        <a
          href={business.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-ink transition-colors hover:text-clay"
        >
          <WhatsAppGlyph className="h-[18px] w-[18px]" />
          <span className="text-[11px] font-medium">WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={onBook}
          className="flex cursor-pointer flex-col items-center gap-1 bg-clay py-3 text-paper transition-colors hover:bg-clay-deep"
        >
          <CalendarCheck size={18} strokeWidth={1.8} aria-hidden="true" />
          <span className="text-[11px] font-medium">Book</span>
        </button>
      </nav>

      {/* Desktop floating WhatsApp */}
      <a
        href={business.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${business.name} on WhatsApp`}
        className={cn(
          "fixed bottom-6 right-6 z-30 hidden items-center gap-2.5 rounded-full bg-ink py-3 pl-4 pr-5 text-paper shadow-lg transition-all duration-500 hover:bg-clay md:inline-flex",
          showDesktop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        )}
      >
        <WhatsAppGlyph className="h-5 w-5" />
        <span className="text-[13px] font-medium">Chat with us</span>
      </a>
    </>
  );
}
