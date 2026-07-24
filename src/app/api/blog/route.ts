import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
  publishedAt: z.string().datetime().nullable().optional(),
});

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const publishedOnly = searchParams.get("published") !== "false";

  const filter: Record<string, unknown> = {};
  if (publishedOnly) filter.published = true;

  const posts = await BlogPost.find(filter)
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = blogSchema.parse(await request.json());
    const post = await BlogPost.create({
      ...body,
      publishedAt: body.published ? body.publishedAt ?? new Date() : null,
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
