import { ArrowRight } from "lucide-react";
import { business } from "../config/business";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

export function AboutPreview() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 py-20 md:py-28 lg:py-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Editorial image pairing */}
        <Reveal className="relative pb-10 pr-8 sm:pr-12">
          <div className="img-zoom overflow-hidden">
            <img
              src="/images/about.jpg"
              alt={`Reading corner styled by ${business.name} with a bouclé armchair, oak side table and warm lamplight`}
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[46%] border-8 border-paper">
            <img
              src="/images/detail-1.jpg"
              alt="Material palette of travertine, walnut, brass and natural linen"
              className="aspect-square w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SectionLabel>{business.name}</SectionLabel>

          <h2
            id="about-heading"
            className="mt-4 font-serif text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.8rem]"
          >
            Interior design that feels personal.
          </h2>

          <p className="mt-6 text-[15px] leading-relaxed text-taupe sm:text-base">
            {business.name} is an interior design studio based in {business.locality}, {business.city}, working on homes and boutique commercial spaces across the city.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-taupe sm:text-base">
            We believe good design starts with listening. Every project begins
            with how you live — your routines, your storage, the light your
            rooms get — and ends with a space that feels considered, comfortable
            and genuinely yours.
          </p>

          <a
            href="#why"
            className="group mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
          >
            About {business.name}
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
