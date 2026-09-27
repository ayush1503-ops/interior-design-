import { processSteps } from "../data/process";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-20 bg-cream py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>How we work</SectionLabel>
            <h2
              id="process-heading"
              className="mt-4 font-serif text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.8rem]"
            >
              A clear process, from first conversation to finished space.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-taupe sm:text-base">
              Interior projects involve many small decisions. A simple,
              well-understood process keeps everything — and everyone — on the
              same page.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.index} delay={i * 80} className="border-t border-ink/15 pt-7">
              <p aria-hidden="true" className="font-serif text-[2rem] font-light italic leading-none text-clay">
                {step.index}
              </p>
              <h3 className="mt-5 font-serif text-xl font-normal text-ink">
                {step.title}
                <span className="sr-only"> — step {step.index}</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-taupe">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
