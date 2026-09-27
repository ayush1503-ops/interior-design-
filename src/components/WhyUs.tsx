import { reasons } from "../data/process";
import { Reveal } from "./Reveal";

interface WhyUsProps {
  onBook: () => void;
}

export function WhyUs({ onBook }: WhyUsProps) {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="scroll-mt-20 bg-ink py-20 text-paper md:py-28 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <Reveal>
          <p className="label text-clay" style={{ color: "#cf9a72" }}>
            <span aria-hidden="true" className="mr-3 inline-block h-px w-8 bg-[#cf9a72]/60 align-middle" />
            Why Preet Interiors
          </p>
          <h2
            id="why-heading"
            className="mt-4 font-serif text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.8rem]"
          >
            Designed around you — not around a template.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-paper/70 sm:text-base">
            Clients usually come to us with a space and a rough idea. Our work
            is to turn that into a place that feels resolved, practical and
            personal — without the process feeling complicated.
          </p>
          <button
            type="button"
            onClick={onBook}
            className="mt-9 cursor-pointer border border-paper bg-paper px-7 py-4 text-sm font-medium tracking-wide text-ink transition-colors hover:bg-transparent hover:text-paper"
          >
            Book a Consultation
          </button>
        </Reveal>

        <ul className="divide-y divide-paper/15 border-y border-paper/15">
          {reasons.map((reason, i) => (
            <Reveal as="li" key={reason.title} delay={i * 60} className="py-6 first:pt-7 last:pb-7">
              <h3 className="font-serif text-lg font-normal text-paper sm:text-xl">
                {reason.title}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-paper/65">
                {reason.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
