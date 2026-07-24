"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, Globe } from "lucide-react";
import { techIconSlug } from "@/lib/techIcons";

const VISIBLE_TAGS = 5;

type FeaturedProject = {
  title: string;
  slug: string;
  company: string;
  shortDescription: string;
  highlight?: string | null;
  year?: string | null;
  category?: string | null;
  statusLabel?: string | null;
  tags: string[];
  liveUrl?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
};

// Accent glows and highlights tailored specifically to the project's brand/theme identity
const BRAND_ACCENT_MAP: Record<string, { shadow: string; border: string; glow: string }> = {
  jetixia: {
    shadow: "rgba(99, 102, 241, 0.15)", // Indigo
    border: "border-indigo-500/25",
    glow: "bg-indigo-500/10",
  },
  kornest: {
    shadow: "rgba(16, 185, 129, 0.15)", // Emerald
    border: "border-emerald-500/25",
    glow: "bg-emerald-500/10",
  },
  cutco: {
    shadow: "rgba(245, 158, 11, 0.15)", // Amber
    border: "border-amber-500/25",
    glow: "bg-amber-500/10",
  },
  echovoice: {
    shadow: "rgba(6, 182, 212, 0.15)", // Cyan
    border: "border-cyan-500/25",
    glow: "bg-cyan-500/10",
  },
};

function TechPill({ tag }: { tag: string }) {
  const slug = techIconSlug(tag);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-2.5 py-1 font-mono text-[11px] font-medium text-foreground transition-colors hover:border-accent/35 hover:bg-accent/5">
      {slug ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt=""
          width={14}
          height={14}
          className="h-3.5 w-3.5 shrink-0"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <Code2 className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
      )}
      {tag}
    </span>
  );
}

function ProjectMedia({ project }: { project: FeaturedProject }) {
  const badge = project.statusLabel?.trim() || (project.liveUrl ? "Live" : "");

  return (
    <div className="relative overflow-hidden rounded-2xl bg-line/20 aspect-[16/10] sm:aspect-[5/3] border border-line/45 shadow-inner">
      {/* Premium Browser Mockup Address Bar */}
      <div className="flex items-center gap-1.5 bg-line/10 px-4 py-2 border-b border-line/45 pointer-events-none select-none">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
        <span className="h-2 w-2 rounded-full bg-green-400/80" />
        <div className="mx-auto w-3/5 rounded bg-background/50 py-0.5 text-center text-[9px] font-mono font-medium text-muted tracking-tight truncate border border-line/25">
          {project.slug}.com
        </div>
      </div>

      {/* Frame Visual content */}
      <div className="relative w-full h-[calc(100%-24px)] overflow-hidden">
        {project.videoUrl ? (
          <video
            className="h-full w-full object-cover"
            src={project.videoUrl}
            poster={project.imageUrl || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/15 via-background to-accent/5">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {project.title}
            </span>
          </div>
        )}

        {badge ? (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-background/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden />
            {badge}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function FeaturedProjectCard({
  project,
  reversed,
}: {
  project: FeaturedProject;
  reversed: boolean;
}) {
  const meta = [project.year, project.category || project.company]
    .filter(Boolean)
    .join(" · ");
  const visibleTags = project.tags.slice(0, VISIBLE_TAGS);
  const extra = Math.max(0, project.tags.length - VISIBLE_TAGS);

  const brand = BRAND_ACCENT_MAP[project.slug] || {
    shadow: "rgba(15, 110, 86, 0.08)",
    border: "hover:border-accent/25",
    glow: "bg-accent/4",
  };

  return (
    <article
      className="work-card group relative overflow-hidden rounded-3xl border border-line/60 bg-white/70 shadow-[0_1px_0_rgba(15,110,86,0.04)] backdrop-blur-sm transition-all duration-500 hover:shadow-2xl"
      style={
        {
          "--brand-color": brand.shadow,
        } as React.CSSProperties
      }
    >
      {/* Brand Accent Ambient Backdrop Spotlight */}
      <div
        className={`pointer-events-none absolute -inset-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 blur-3xl scale-95 group-hover:scale-100 ${brand.glow}`}
      />

      <div
        className={`relative z-10 grid items-stretch gap-0 lg:grid-cols-2 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="p-4 sm:p-5 lg:p-6">
          <ProjectMedia project={project} />
        </div>

        <div className="flex flex-col justify-center px-6 pb-7 pt-2 sm:px-8 sm:pb-8 lg:py-8 lg:pr-10">
          {meta ? (
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              {meta}
            </p>
          ) : null}

          <h3 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            {project.shortDescription}
          </p>

          {project.highlight ? (
            <p className="mt-4 border-l-2 border-accent/50 pl-3 text-sm italic leading-relaxed text-foreground/75">
              {project.highlight}
            </p>
          ) : null}

          {project.tags.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {visibleTags.map((tag) => (
                <li key={tag}>
                  <TechPill tag={tag} />
                </li>
              ))}
              {extra > 0 ? (
                <li>
                  <span className="inline-flex items-center rounded-full border border-line bg-background px-2.5 py-1 font-mono text-[11px] font-medium text-muted">
                    +{extra}
                  </span>
                </li>
              ) : null}
            </ul>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-background px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-foreground transition-all duration-300 hover:border-accent/40 hover:bg-accent/5"
            >
              Case study
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent transition-all duration-300 hover:border-accent/50 hover:bg-accent/10"
              >
                <Globe className="h-3.5 w-3.5" aria-hidden />
                Live
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProjectsList({ projects }: { projects: FeaturedProject[] }) {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {projects.map((project, index) => (
        <FeaturedProjectCard
          key={project.slug}
          project={project}
          reversed={index % 2 === 1}
        />
      ))}
    </div>
  );
}
