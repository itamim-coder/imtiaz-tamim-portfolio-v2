import { SectionHeading } from "@/components/SectionHeading";
import { connectDB } from "@/lib/mongodb";
import { Skill } from "@/models/Skill";
import { SkillIcon } from "@/components/SkillIcon";

type SkillPill = {
  name: string;
  icon: string;
};

type SkillCategory = {
  title: string;
  skills: SkillPill[];
};

function groupSkills(
  items: { name: string; icon?: string | null; category: string; categoryOrder: number }[],
): SkillCategory[] {
  const map = new Map<string, SkillCategory & { categoryOrder: number }>();

  for (const item of items) {
    const existing = map.get(item.category);
    const pill = { name: item.name, icon: item.icon?.trim() || "" };
    if (existing) {
      existing.skills.push(pill);
    } else {
      map.set(item.category, {
        title: item.category,
        categoryOrder: item.categoryOrder,
        skills: [pill],
      });
    }
  }

  return [...map.values()]
    .sort((a, b) => a.categoryOrder - b.categoryOrder)
    .map(({ title, skills }) => ({ title, skills }));
}


export async function SkillsSection() {
  await connectDB();
  const items = await Skill.find({ published: true })
    .sort({ categoryOrder: 1, order: 1, name: 1 })
    .lean();
  const categories = groupSkills(items);

  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-24"
      aria-labelledby="skills-heading"
    >
      <SectionHeading
        id="skills-heading"
        title="Stack"
        end={
          <div
            className="w-fit -rotate-2 rounded-md border border-accent/40 bg-background px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent shadow-sm"
            aria-hidden
          >
            {"// PRODUCTION-TESTED"}
          </div>
        }
      />

      {categories.length === 0 ? (
        <p className="mt-12 font-mono text-sm text-muted">Skills coming soon.</p>
      ) : (
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.title}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {category.title}
              </h3>
              <ul className="mt-3.5 flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-background px-3.5 py-2 font-mono text-sm font-medium text-foreground transition-colors hover:border-accent/35 hover:bg-accent/5">
                      <SkillIcon icon={skill.icon} name={skill.name} />
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
