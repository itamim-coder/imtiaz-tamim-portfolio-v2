import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Globe, Play } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { techIconSlug } from "@/lib/techIcons";
import { Project } from "@/models/Project";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type Feature = {
  title: string;
  summary?: string;
  details?: string;
  highlights?: string[];
  videoUrl?: string;
  order?: number;
};

// Accent glows tailored specifically to the project's brand/theme identity
const BRAND_ACCENT_MAP: Record<string, { glow: string; text: string; bg: string }> = {
  jetixia: {
    glow: "bg-indigo-500/10",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "rgba(99, 102, 241, 0.12)",
  },
  kornest: {
    glow: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "rgba(16, 185, 129, 0.12)",
  },
  cutco: {
    glow: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    bg: "rgba(245, 158, 11, 0.12)",
  },
  echovoice: {
    glow: "bg-cyan-500/10",
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "rgba(6, 182, 212, 0.12)",
  },
};

function TechPill({ tag }: { tag: string }) {
  const slug = techIconSlug(tag);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-2.5 py-1 font-mono text-[10px] font-medium text-foreground">
      {slug ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt=""
          width={12}
          height={12}
          className="h-3 w-3 shrink-0"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <Code2 className="h-3 w-3 shrink-0 text-accent" aria-hidden />
      )}
      {tag}
    </span>
  );
}

function Code2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  );
}

function FeatureMedia({
  title,
  videoUrl,
  slug,
}: {
  title: string;
  videoUrl?: string;
  slug: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-line/20 aspect-[16/10] sm:aspect-[5/3] border border-line/45 shadow-inner w-full h-full">
      {/* Premium Browser Mockup Address Bar */}
      <div className="flex items-center gap-1.5 bg-line/10 px-4 py-2 border-b border-line/45 pointer-events-none select-none">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
        <span className="h-2 w-2 rounded-full bg-green-400/80" />
        <div className="mx-auto w-3/5 rounded bg-background/50 py-0.5 text-center text-[9px] font-mono font-medium text-muted tracking-tight truncate border border-line/25">
          {slug}.com/features
        </div>
      </div>

      <div className="relative w-full h-[calc(100%-24px)] overflow-hidden">
        {videoUrl ? (
          <video
            className="h-full w-full object-cover"
            src={videoUrl}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-accent/10 via-background to-accent/5 px-6 text-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/25 bg-background/80 text-accent shadow-sm">
              <Play className="h-4.5 w-4.5" aria-hidden />
            </span>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
              Feature video coming soon
            </p>
            <p className="max-w-xs text-xs text-muted leading-tight">{title}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  await connectDB();
  const project = await Project.findOne({ slug, published: true }).lean();

  if (!project) notFound();

  const features = ([...(project.features ?? [])] as Feature[]).sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  const brand = BRAND_ACCENT_MAP[slug] || {
    glow: "bg-accent/4",
    text: "text-accent",
    bg: "rgba(15, 110, 86, 0.08)",
  };

  return (
    <main className="relative mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:py-20 overflow-hidden">
      {/* Brand Accent Spotlights */}
      <div
        className={`pointer-events-none absolute top-10 right-10 z-0 h-[400px] w-[400px] select-none rounded-full blur-[100px] ${brand.glow}`}
      />
      <div
        className={`pointer-events-none absolute bottom-1/3 left-0 z-0 h-[450px] w-[450px] -translate-x-1/3 select-none rounded-full blur-[120px] ${brand.glow}`}
      />

      <div className="relative z-10">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back to work
        </Link>

        {/* Dynamic Splits Editorial Hero Layout */}
        <header className="mt-8 grid grid-cols-1 gap-10 items-start lg:grid-cols-12 lg:gap-12">
          {/* Metadata & Description Info Panel - Left (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Case Study
              </p>
              <h1 className="mt-3 font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {project.title}
              </h1>

              <div className="mt-6 border-y border-line/45 py-5 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted leading-none">
                    Timeline
                  </span>
                  <span className="col-span-2 text-xs font-medium text-foreground leading-none">
                    {project.year || "2026"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-line/25 pt-4">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted leading-none">
                    Category
                  </span>
                  <span className="col-span-2 text-xs font-medium text-foreground leading-none">
                    {project.category || "Full-Stack Software"}
                  </span>
                </div>
                {project.company ? (
                  <div className="grid grid-cols-3 gap-2 border-t border-line/25 pt-4">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted leading-none">
                      Company
                    </span>
                    <span className="col-span-2 text-xs font-medium text-foreground leading-none">
                      {project.company}
                    </span>
                  </div>
                ) : null}
                {project.statusLabel ? (
                  <div className="grid grid-cols-3 gap-2 border-t border-line/25 pt-4">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted leading-none">
                      Status
                    </span>
                    <span className="col-span-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-foreground">
                        <span className="h-1 w-1 rounded-full bg-accent animate-pulse" aria-hidden />
                        {project.statusLabel}
                      </span>
                    </span>
                  </div>
                ) : null}
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base sm:leading-relaxed">
                {project.shortDescription}
              </p>

              {project.highlight ? (
                <p className="mt-5 border-l-2 border-accent/50 pl-4 text-sm italic leading-relaxed text-foreground/80">
                  {project.highlight}
                </p>
              ) : null}
            </div>

            <div className="mt-8">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 shadow-sm"
                >
                  <Globe className="h-4 w-4" aria-hidden />
                  Visit live site
                </a>
              ) : null}
            </div>
          </div>

          {/* Visual Showcase Device Mockup Panel - Right (7 cols) */}
          <div className="lg:col-span-7 select-none">
            <div className="relative overflow-hidden rounded-2xl bg-line/20 aspect-[16/10] border border-line/45 shadow-lg">
              {/* Browser Mockup Top Address Bar */}
              <div className="flex items-center gap-1.5 bg-line/10 px-4 py-2 border-b border-line/45 pointer-events-none select-none">
                <span className="h-2 w-2 rounded-full bg-red-400/80" />
                <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                <span className="h-2 w-2 rounded-full bg-green-400/80" />
                <div className="mx-auto w-3/5 rounded bg-background/50 py-0.5 text-center text-[9px] font-mono font-medium text-muted tracking-tight truncate border border-line/25">
                  {slug}.com/demo
                </div>
              </div>

              {/* Media Content */}
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
              </div>
            </div>
          </div>
        </header>

        {/* Roles, Problems & Outcomes Bento Cards */}
        {(project.role || project.problem || project.outcome) && (
          <section className="mt-16 grid gap-6 sm:grid-cols-3">
            {project.role ? (
              <div
                className="about-principle-card relative overflow-hidden bg-white/70 border border-line/60 p-6 backdrop-blur-sm shadow-[0_1px_0_rgba(15,110,86,0.04)]"
                style={
                  {
                    "--brand-color": brand.bg,
                  } as React.CSSProperties
                }
              >
                <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted leading-none">
                  Role
                </h2>
                <p className="mt-4 text-xs leading-relaxed text-foreground/90 font-medium">
                  {project.role}
                </p>
              </div>
            ) : null}
            {project.problem ? (
              <div
                className="about-principle-card relative overflow-hidden bg-white/70 border border-line/60 p-6 backdrop-blur-sm shadow-[0_1px_0_rgba(15,110,86,0.04)]"
                style={
                  {
                    "--brand-color": brand.bg,
                  } as React.CSSProperties
                }
              >
                <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted leading-none">
                  Problem
                </h2>
                <p className="mt-4 text-xs leading-relaxed text-foreground/90 font-medium">
                  {project.problem}
                </p>
              </div>
            ) : null}
            {project.outcome ? (
              <div
                className="about-principle-card relative overflow-hidden bg-white/70 border border-line/60 p-6 backdrop-blur-sm shadow-[0_1px_0_rgba(15,110,86,0.04)]"
                style={
                  {
                    "--brand-color": brand.bg,
                  } as React.CSSProperties
                }
              >
                <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted leading-none">
                  Outcome
                </h2>
                <p className="mt-4 text-xs leading-relaxed text-foreground/90 font-medium">
                  {project.outcome}
                </p>
              </div>
            ) : null}
          </section>
        )}

        {/* Overview Row */}
        {project.longDescription ? (
          <section className="mt-16 max-w-3xl">
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted leading-none">
              Overview
            </h2>
            <div className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-foreground/85 sm:text-base sm:leading-relaxed">
              {project.longDescription}
            </div>
          </section>
        ) : null}

        {/* Technical stack pills with simpleicons */}
        {project.tags?.length ? (
          <div className="mt-12 pt-6 border-t border-line/45">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted leading-none mb-4">
              Technologies Used
            </h4>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <li key={tag}>
                  <TechPill tag={tag} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Case Study Details Features Panel */}
        {features.length > 0 ? (
          <section className="mt-20 border-t border-line/45 pt-16 animate-fade-in" aria-labelledby="features-heading">
            <div className="max-w-3xl">
              <h2
                id="features-heading"
                className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              >
                Key Features
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Engineering deep dive of modular systems shipped during this project engagement.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-10">
              {features.map((feature, index) => {
                const reversed = index % 2 === 1;
                return (
                  <article
                    key={`${feature.title}-${index}`}
                    className="about-principle-card relative overflow-hidden rounded-3xl border border-line/60 bg-white/70 shadow-[0_1px_0_rgba(15,110,86,0.04)] backdrop-blur-sm p-0 sm:p-0 lg:p-0"
                    style={
                      {
                        "--brand-color": brand.bg,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className={`grid items-stretch lg:grid-cols-2 ${
                        reversed ? "lg:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      {/* Feature browser media frame */}
                      <div className="p-4 sm:p-5 lg:p-6 overflow-hidden">
                        <FeatureMedia
                          title={feature.title}
                          videoUrl={feature.videoUrl}
                          slug={slug}
                        />
                      </div>

                      <div className="flex flex-col justify-center px-6 py-6 pb-8 sm:px-8 lg:py-8 lg:pr-10 lg:pl-4">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-accent leading-none">
                          Feature {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-3 font-sans text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                          {feature.title}
                        </h3>
                        {feature.summary ? (
                          <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                            {feature.summary}
                          </p>
                        ) : null}
                        {feature.details ? (
                          <p className="mt-4 whitespace-pre-wrap text-xs leading-relaxed text-foreground/85">
                            {feature.details}
                          </p>
                        ) : null}
                        {feature.highlights && feature.highlights.length > 0 ? (
                          <ul className="mt-5 space-y-2.5">
                            {feature.highlights.map((item) => (
                              <li
                                key={item}
                                className="flex gap-2.5 text-xs leading-snug text-foreground/90 font-medium align-middle"
                              >
                                <Check
                                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                                  aria-hidden
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
