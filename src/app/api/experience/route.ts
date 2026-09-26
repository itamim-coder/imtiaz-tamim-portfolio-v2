import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Experience } from "@/models/Experience";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

const experienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  location: z.string().default("Remote"),
  websiteUrl: z.string().optional(),
  logoUrl: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().min(1),
  tags: z.array(z.string()).default([]),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const publishedOnly = searchParams.get("published") !== "false";

  const filter: Record<string, unknown> = {};
  if (publishedOnly) filter.published = true;

  const items = await Experience.find(filter).sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = experienceSchema.parse(await request.json());
    const item = await Experience.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
