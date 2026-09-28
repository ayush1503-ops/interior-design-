import { CalendarCheck, MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "../config/business";
import { EnquiryForm } from "./EnquiryForm";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

interface ContactSectionProps {
  onBook: () => void;
}

export function ContactSection({ onBook }: ContactSectionProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t border-line bg-cream/70 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-5 lg:gap-16">
          {/* Studio information */}
          <Reveal className="lg:col-span-2">
            <SectionLabel>Contact</SectionLabel>
            <h2
              id="contact-heading"
              className="mt-4 font-serif text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl"
            >
              Start with a conversation.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-taupe">
              Call, WhatsApp or send an enquiry — or visit the studio. We'll
              understand your space and tell you honestly how we can help.
            </p>

            <div className="mt-9 border-t border-line">
              <div className="flex items-start gap-4 border-b border-line py-5">
                <MapPin size={18} strokeWidth={1.6} aria-hidden="true" className="mt-0.5 shrink-0 text-clay" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-taupe">
                    {business.name} · Studio
                  </p>
                  <address className="mt-2 text-[15px] not-italic leading-relaxed text-ink">
                    {business.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              <div className="flex items-center gap-4 py-5">
                <Phone size={18} strokeWidth={1.6} aria-hidden="true" className="shrink-0 text-clay" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-taupe">
                    Phone / WhatsApp
                  </p>
                  <a
                    href={business.phoneHref}
                    className="mt-1.5 block font-serif text-2xl font-light text-ink transition-colors hover:text-clay"
                  >
                    {business.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-ink bg-ink px-6 py-4 text-sm font-medium text-paper transition-colors hover:bg-ink-deep"
              >
                <Phone size={15} aria-hidden="true" /> Call Now
              </a>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onBook}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 border border-ink/30 px-4 py-4 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  <CalendarCheck size={15} aria-hidden="true" /> Book a Consultation
                </button>
                <a
                  href={business.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-ink/30 px-4 py-4 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  <MapPin size={15} aria-hidden="true" /> Get Directions
                </a>
              </div>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-ink transition-colors hover:text-clay"
              >
                <MessageCircle size={15} aria-hidden="true" /> Message on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Enquiry form */}
          <Reveal delay={120} className="lg:col-span-3">
            <div className="border border-line bg-paper p-6 sm:p-9">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Map */}
      <div className="mx-auto mt-16 w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="border border-line">
            <iframe
              title={`Map showing the location of ${business.name}, ${business.locality}, ${business.city}`}
              src={business.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[340px] w-full [filter:saturate(0.85)_sepia(0.08)] md:h-[420px]"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper px-5 py-4 sm:px-6">
              <p className="text-sm text-taupe">
                {business.name} — {business.locality}, {business.city} 110001
              </p>
              <a
                href={business.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink underline-offset-2 transition-colors hover:text-clay hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
