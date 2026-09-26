import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

const projectFeatureSchema = z.object({
  title: z.string().min(1),
  summary: z.string().optional().default(""),
  details: z.string().optional().default(""),
  highlights: z.array(z.string()).optional().default([]),
  videoUrl: z.string().optional().default(""),
  order: z.number().optional().default(0),
});

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  company: z.string().min(1),
  type: z.enum(["web", "mobile", "both"]).default("web"),
  featured: z.boolean().default(false),
  shortDescription: z.string().min(1),
  longDescription: z.string().optional(),
  problem: z.string().optional(),
  outcome: z.string().optional(),
  role: z.string().optional(),
  highlight: z.string().optional(),
  year: z.string().optional(),
  category: z.string().optional(),
  statusLabel: z.string().optional(),
  tags: z.array(z.string()).default([]),
  features: z.array(projectFeatureSchema).optional().default([]),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");
  const publishedOnly = searchParams.get("published") !== "false";

  const filter: Record<string, unknown> = {};
  if (publishedOnly) filter.published = true;
  if (featured === "true") filter.featured = true;

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = projectSchema.parse(await request.json());
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const { projects } = body;

    if (!Array.isArray(projects)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const bulkOps = projects.map((item: { _id: string; order: number }) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { order: Number(item.order) || 0 } },
      },
    }));

    await Project.bulkWrite(bulkOps);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reorder projects" }, { status: 500 });
  }
}

