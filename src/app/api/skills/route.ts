import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Skill } from "@/models/Skill";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

const skillSchema = z.object({
  name: z.string().min(1),
  icon: z.string().default(""),
  category: z.string().min(1),
  categoryOrder: z.number().default(0),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const publishedOnly = searchParams.get("published") !== "false";

  const filter: Record<string, unknown> = {};
  if (publishedOnly) filter.published = true;

  const items = await Skill.find(filter)
    .sort({ categoryOrder: 1, order: 1, name: 1 })
    .lean();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = skillSchema.parse(await request.json());
    const item = await Skill.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
