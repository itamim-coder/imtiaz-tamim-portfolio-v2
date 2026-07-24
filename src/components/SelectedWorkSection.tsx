import { SectionHeading } from "@/components/SectionHeading";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { FeaturedProjectsList } from "./FeaturedProjectsList";

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

export async function SelectedWorkSection() {
  await connectDB();
  const projects = (await Project.find({ published: true, featured: true })
    .sort({ order: 1, createdAt: -1 })
    .lean()) as unknown as FeaturedProject[];

  // Convert mongoose lean objects to plain objects to ensure safe serializability to client component
  const plainProjects = JSON.parse(JSON.stringify(projects));

  return (
    <section
      id="work"
      className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-24"
      aria-labelledby="work-heading"
    >
      {/* Background spotlights specific to selected work area */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 -translate-y-1/2 z-0 h-[380px] w-[380px] select-none rounded-full bg-accent/[0.03] blur-[90px]" />

      <div className="relative z-10 space-y-10">
        <SectionHeading id="work-heading" title="Work" />

        <FeaturedProjectsList projects={plainProjects} />
      </div>
    </section>
  );
}
