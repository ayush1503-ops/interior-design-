import { MapPin, Phone } from "lucide-react";
import { business } from "../config/business";
import { Reveal } from "./Reveal";

interface HeroProps {
  onBook: () => void;
}

export function Hero({ onBook }: HeroProps) {
  return (
    <section id="home" aria-label="Introduction" className="scroll-mt-20">
      <div className="relative flex min-h-[88svh] items-end">
        {/* Large editorial photograph — the first impression */}
        <img
          src="/images/hero.jpg"
          alt={`Warm contemporary living room designed by ${business.name}, with a cream linen sofa, walnut panelling and soft afternoon light`}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        {/* Soft scrim for legibility — warm, not neon */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/5"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-40 sm:px-8 md:pb-24">
          <Reveal>
            <p className="label text-paper/75">
              Interior Design Studio — {business.locality}, {business.city}
            </p>

            <h1 className="mt-5 max-w-3xl font-serif text-[2.65rem] font-light leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-[4.4rem]">
              Spaces designed around the way you live.
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper/85 sm:text-base">
              Thoughtful interiors for homes and workspaces across Delhi —
              designed with attention to comfort, detail and everyday living.
            </p>

            <div className="mt-9 flex flex-col gap-3.5 min-[420px]:flex-row min-[420px]:items-center">
              <button
                type="button"
                onClick={onBook}
                className="cursor-pointer border border-paper bg-paper px-7 py-4 text-sm font-medium tracking-wide text-ink transition-colors hover:bg-white hover:border-white"
              >
                Book a Consultation
              </button>
              <a
                href="#projects"
                className="border border-paper/60 bg-transparent px-7 py-4 text-center text-sm font-medium tracking-wide text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                Explore Our Work
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Quiet studio meta strip beneath the photograph */}
      <div className="border-b border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 text-[13px] sm:px-8">
          <p className="flex items-center gap-2 text-taupe">
            <MapPin size={14} aria-hidden="true" className="text-clay" />
            {business.locality}, {business.city} — 110001
          </p>
          <a
            href={business.phoneHref}
            className="flex items-center gap-2 font-medium text-ink transition-colors hover:text-clay"
          >
            <Phone size={14} aria-hidden="true" className="text-clay" />
            {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
