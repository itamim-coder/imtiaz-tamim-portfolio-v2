import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Experience } from "@/models/Experience";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

const experienceSchema = z.object({
  role: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  location: z.string().optional(),
  websiteUrl: z.string().optional(),
  logoUrl: z.string().optional(),
  startDate: z.string().min(1).optional(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  order: z.number().optional(),
  published: z.boolean().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await context.params;
    const body = experienceSchema.parse(await request.json());
    const item = await Experience.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await context.params;
  const item = await Experience.findByIdAndDelete(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
