import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

const projectFeatureSchema = z.object({
  title: z.string().min(1),
  summary: z.string().optional(),
  details: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  order: z.number().optional(),
});

const projectSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  type: z.enum(["web", "mobile", "both"]).optional(),
  featured: z.boolean().optional(),
  shortDescription: z.string().min(1).optional(),
  longDescription: z.string().optional(),
  problem: z.string().optional(),
  outcome: z.string().optional(),
  role: z.string().optional(),
  highlight: z.string().optional(),
  year: z.string().optional(),
  category: z.string().optional(),
  statusLabel: z.string().optional(),
  tags: z.array(z.string()).optional(),
  features: z.array(projectFeatureSchema).optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  order: z.number().optional(),
  published: z.boolean().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  await connectDB();
  const { id } = await context.params;
  const project = await Project.findById(id).lean();
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await context.params;
    const body = projectSchema.parse(await request.json());
    const project = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await context.params;
  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
