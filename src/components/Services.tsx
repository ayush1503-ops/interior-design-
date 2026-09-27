import { ArrowRight } from "lucide-react";
import { services } from "../data/services";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

export function Services({ onBook }: { onBook: () => void }) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-20 border-t border-line py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionLabel>Services</SectionLabel>
            <h2
              id="services-heading"
              className="mt-4 font-serif text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.8rem]"
            >
              What we design
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-md text-[15px] leading-relaxed text-taupe lg:ml-auto">
              From a single room to a complete home, every project is planned
              around the space, the budget and the people using it.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 60} className="border-t border-line pt-7">
              <div className="flex items-center justify-between">
                <service.icon
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="text-ink"
                />
                <span aria-hidden="true" className="font-serif text-sm italic text-clay">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-xl font-normal text-ink">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-taupe">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex justify-start sm:justify-end">
          <button
            type="button"
            onClick={onBook}
            className="group inline-flex cursor-pointer items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
          >
            Not sure where to begin? Book a consultation
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
