import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  projects,
  projectCategories,
  type ProjectCategory,
} from "../data/projects";
import { ProjectOverlay } from "./ProjectOverlay";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";
import { cn } from "../utils/cn";

/* Lightweight hash routes: "#/project/<slug>" opens the project view. */
function slugFromHash(): string | null {
  const match = window.location.hash.match(/^#\/project\/([a-z0-9-]+)$/);
  return match ? match[1] : null;
}

type CategoryFilter = ProjectCategory | "All";

interface ProjectsProps {
  onBook: () => void;
}

export function Projects({ onBook }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(() =>
    typeof window !== "undefined" ? slugFromHash() : null
  );

  useEffect(() => {
    const onHashChange = () => setOpenSlug(slugFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 border-t border-line py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionLabel>Projects</SectionLabel>
            <h2
              id="projects-heading"
              className="mt-4 font-serif text-3xl font-light leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.8rem]"
            >
              A look at how we design.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-md text-[15px] leading-relaxed text-taupe lg:ml-auto">
              Interiors are better experienced than described. Browse a few of
              the studio's projects — each one shaped around the people who use
              it.
            </p>
          </Reveal>
        </div>

        {/* Category filter */}
        <Reveal className="mt-10">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-x-7 gap-y-3 border-y border-line py-4"
          >
            {projectCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={cn(
                    "cursor-pointer pb-0.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-b-2 border-clay text-ink"
                      : "text-taupe hover:text-ink"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Masonry gallery — varied aspect ratios for an editorial rhythm */}
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {filtered.map((project) => (
            <Reveal key={project.slug} className="mb-8 break-inside-avoid">
              <button
                type="button"
                onClick={() => {
                  window.location.hash = `/project/${project.slug}`;
                }}
                aria-label={`View project — ${project.title}, ${project.category}, ${project.location}`}
                className="group block w-full cursor-pointer text-left"
              >
                <span
                  className={cn(
                    "img-zoom relative block overflow-hidden bg-cream",
                    project.aspect === "vertical" ? "aspect-[4/5]" : "aspect-[4/3]"
                  )}
                >
                  <img
                    src={project.cover}
                    alt={project.coverAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 grid h-10 w-10 translate-y-1 place-items-center bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <ArrowUpRight size={17} />
                  </span>
                </span>
                <span className="mt-4 flex items-start justify-between gap-4">
                  <span>
                    <span className="block font-serif text-lg leading-snug text-ink transition-colors group-hover:text-clay">
                      {project.title}
                    </span>
                    <span className="mt-1 block text-[12px] font-medium uppercase tracking-[0.14em] text-taupe">
                      {project.category} · {project.location}
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-taupe">
            No projects in this category yet.
          </p>
        )}
      </div>

      {openProject && (
        <ProjectOverlay
          project={openProject}
          onClose={() => {
            window.location.hash = "projects";
          }}
          onBook={onBook}
        />
      )}
    </section>
  );
}
