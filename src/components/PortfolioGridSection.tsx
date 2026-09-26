import Link from "next/link";
import { Globe, ArrowUpRight, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { techIconSlug } from "@/lib/techIcons";

type PortfolioProject = {
  title: string;
  slug: string;
  shortDescription: string;
  tags: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  imageUrl?: string | null;
};

function PortfolioProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="work-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line/60 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-accent/4">
      {/* Decorative Brand Underglow (Teal) */}
      <div className="pointer-events-none absolute -inset-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 blur-3xl bg-accent/[0.04]" />

      {/* Whole Card Clickable Link Layer */}
      <Link
        href={`/work/${project.slug}`}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={`View ${project.title} case study`}
      />

      <div className="relative z-20 flex flex-col h-full justify-between pointer-events-none">
        <div>
          {/* Header Row: Action Links right (no top left icon badge) */}
          <div className="flex items-center justify-end">
            {/* Interactive Link Actions - need pointer-events-auto and higher z-index to break card mask */}
            <div className="flex items-center gap-2.5 text-muted pointer-events-auto relative z-30">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:text-accent transition-colors"
                  title="View Source on GitHub"
                >
                  <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:text-accent transition-colors"
                  title="Visit Live Site"
                >
                  <Globe className="h-4.5 w-4.5" />
                </a>
              )}
            </div>
          </div>

          {/* Project Image Thumbnail */}
          <div className="mt-2 overflow-hidden rounded-2xl border border-line/45 aspect-[16/10] bg-line/10 relative">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/15 via-background to-accent/5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                  {project.title}
                </span>
              </div>
            )}
          </div>

          {/* Project Title */}
          <h3 className="mt-4 font-sans text-lg font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300 flex items-center gap-1.5 leading-none">
            {project.title}
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </h3>

          {/* Slogan blurb */}
          <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Footer: Tech Stack Brand Logos only, no text */}
        <div className="mt-4 pt-4 border-t border-line/30 flex items-center">
          <ul className="flex items-center gap-3">
            {project.tags.map((tag) => {
              const slug = techIconSlug(tag);
              return (
                <li key={tag} className="flex items-center" title={tag}>
                  {slug ? (
                    <img
                      src={`https://cdn.simpleicons.org/${slug}`}
                      alt={tag}
                      width={14}
                      height={14}
                      className="h-3.5 w-3.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  ) : (
                    <span className="p-0.5 rounded border border-line bg-accent/5 text-[9px] font-mono text-accent leading-none font-semibold">
                      {tag.substring(0, 2)}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}

export async function PortfolioGridSection() {
  await connectDB();
  const projects = (await Project.find({ published: true, featured: false })
    .sort({ order: 1, createdAt: -1 })
    .lean()) as unknown as PortfolioProject[];

  if (projects.length === 0) return null;

  return (
    <section
      id="portfolio"
      className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-24"
      aria-labelledby="portfolio-heading"
    >
      {/* Background visual spotlight wash */}
      <div className="pointer-events-none absolute bottom-10 left-12 z-0 h-[300px] w-[300px] select-none rounded-full bg-accent/[0.02] blur-[80px]" />

      <div className="relative z-10 space-y-10">
        <SectionHeading id="portfolio-heading" title="Portfolio" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <PortfolioProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
