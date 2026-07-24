import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SiteSettings } from "@/models/SiteSettings";
import { isAuthenticated } from "@/lib/auth";
import { z } from "zod";

const settingsSchema = z.object({
  heroLine1: z.string().optional(),
  heroLine2: z.string().optional(),
  heroSubline: z.string().optional(),
  email: z.string().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne({ singleton: "main" });
  if (!settings) {
    settings = await SiteSettings.create({ singleton: "main" });
  }
  return settings;
}

export async function GET() {
  await connectDB();
  const settings = await getOrCreateSettings();
  return NextResponse.json(settings);
}

export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = settingsSchema.parse(await request.json());
    const settings = await SiteSettings.findOneAndUpdate(
      { singleton: "main" },
      body,
      { new: true, upsert: true, runValidators: true },
    ).lean();
    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
