import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { BlogPost } from "@/models/BlogPost";
import { Experience } from "@/models/Experience";
import { Skill } from "@/models/Skill";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage() {
  await connectDB();

  const [projectCount, featuredCount, skillCount, blogCount, experienceCount] =
    await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      Skill.countDocuments(),
      BlogPost.countDocuments(),
      Experience.countDocuments(),
    ]);

  const stats = [
    { label: "Projects", value: projectCount },
    { label: "Featured (Selected Work)", value: featuredCount },
    { label: "Skills", value: skillCount },
    { label: "Blog posts", value: blogCount },
    { label: "Experience entries", value: experienceCount },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Manage portfolio content stored in MongoDB.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
