import { ArrowUpRight, Star } from "lucide-react";
import { business } from "../config/business";
import { reviews } from "../data/reviews";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

/*
  Reviews — links to the studio's genuine Google Business profile.
  Real client quotes are rendered here only when they are added to
  src/data/reviews.ts. Nothing is invented.
*/
export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-20 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel className="justify-center">Reviews</SectionLabel>
            <h2
              id="reviews-heading"
              className="mt-4 font-serif text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.8rem]"
            >
              What clients are saying
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-taupe sm:text-base">
              The most honest picture of our work comes from the people we've
              worked with. Read genuine reviews from clients on our Google
              Business profile — unfiltered and unedited by us.
            </p>

            <div className="mt-8 flex items-center justify-center gap-1.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-clay/15 text-clay/50" strokeWidth={1.5} />
              ))}
            </div>
            <p className="mt-3 text-[13px] text-taupe">
              Rated by clients on Google
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 min-[420px]:flex-row">
              <a
                href={business.reviewsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-ink bg-ink px-7 py-4 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-ink-deep"
              >
                View Google Reviews
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a
                href={business.reviewsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-transparent px-2 py-2 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
              >
                Leave a review
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Real client quotes render here once added to src/data/reviews.ts */}
        {reviews.length > 0 && (
          <ul className="mt-16 grid gap-10 border-t border-line pt-14 md:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal as="li" key={i} delay={i * 80}>
                <blockquote>
                  <p className="font-serif text-lg font-light italic leading-relaxed text-ink/90">
                    “{review.quote}”
                  </p>
                  <footer className="mt-4 text-sm">
                    <span className="font-medium text-ink">{review.author}</span>
                    {review.projectType && (
                      <span className="text-taupe"> — {review.projectType}</span>
                    )}
                    <span className="mt-0.5 block text-[12px] uppercase tracking-[0.14em] text-taupe">
                      Google review
                    </span>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
