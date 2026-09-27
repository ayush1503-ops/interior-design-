import { useEffect, useRef, useState } from "react";
import { ArrowLeft, MapPin, Phone, X } from "lucide-react";
import type { Project } from "../data/projects";
import { business } from "../config/business";
import { lockScroll, unlockScroll } from "../lib/scrollLock";
import { cn } from "../utils/cn";

/*
  ProjectOverlay — a full-screen project detail view.
  Behaves like a page: large hero image, introduction, design
  details, image gallery and a clear call-to-action.
  Dismissed with the browser back button, the Escape key, or the
  back/close controls.
*/

interface ProjectOverlayProps {
  project: Project;
  onClose: () => void;
  onBook: () => void;
}

export function ProjectOverlay({ project, onClose, onBook }: ProjectOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement;
    const frame = requestAnimationFrame(() => setMounted(true));

    lockScroll();
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      // Don't swallow Escape while the booking dialog is open on top.
      if (e.key === "Escape" && document.body.dataset.dialogOpen !== "true") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(frame);
      unlockScroll();
      window.removeEventListener("keydown", onKey);
      const el = restoreFocusRef.current;
      if (el instanceof HTMLElement) el.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — project details`}
      className={cn(
        "fixed inset-0 z-50 overflow-y-auto bg-paper transition-[opacity,transform] duration-300 ease-out",
        mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      )}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-clay"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All Projects
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBook}
              className="hidden cursor-pointer border border-ink bg-ink px-4 py-2 text-[13px] font-medium text-paper transition-colors hover:bg-ink-deep sm:block"
            >
              Discuss Your Space
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project"
              className="cursor-pointer p-2 text-ink transition-colors hover:text-clay sm:hidden"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-[44svh] min-h-[280px] w-full md:h-[56svh]">
        <img
          src={project.cover}
          alt={project.coverAlt}
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
        />
      </div>

      {/* Introduction */}
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 md:py-16">
        <p className="label text-clay">{project.category}</p>
        <h1 className="mt-4 max-w-2xl font-serif text-3xl font-light leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 flex items-center gap-2 text-sm text-taupe">
          <MapPin size={15} aria-hidden="true" className="text-clay" />
          {project.location}
        </p>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink/80 sm:text-base">
          {project.summary}
        </p>

        {/* Design details */}
        <dl className="mt-12 grid gap-x-10 gap-y-0 border-y border-line sm:grid-cols-2 lg:grid-cols-4">
          {project.details.map((detail) => (
            <div key={detail.label} className="border-b border-line py-5 last:border-b-0 sm:border-b-0 sm:py-6">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-taupe">
                {detail.label}
              </dt>
              <dd className="mt-2 font-serif text-base leading-snug text-ink">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Image gallery */}
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {project.gallery.map((image, i) => (
            <figure
              key={image.src + i}
              className={cn(
                "overflow-hidden bg-cream",
                i === 0 && project.gallery.length > 2 ? "sm:col-span-2" : ""
              )}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className={cn(
                  "w-full object-cover",
                  i === 0 && project.gallery.length > 2 ? "aspect-[16/9]" : "aspect-[4/3]"
                )}
              />
            </figure>
          ))}
        </div>
      </div>

      {/* Call-to-action band */}
      <div className="border-t border-line bg-cream">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-7 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-light leading-snug sm:text-3xl">
              Have a similar space in mind?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-taupe sm:text-[15px]">
              Tell us about your home or workspace — we'll help you understand
              what's possible before anything is decided.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 min-[420px]:w-auto min-[420px]:flex-row">
            <button
              type="button"
              onClick={onBook}
              className="cursor-pointer border border-ink bg-ink px-7 py-4 text-sm font-medium text-paper transition-colors hover:bg-ink-deep"
            >
              Discuss Your Space
            </button>
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-2 border border-ink/30 px-7 py-4 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              <Phone size={15} aria-hidden="true" />
              {business.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
