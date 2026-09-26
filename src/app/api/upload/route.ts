import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getCloudinary } from "@/lib/cloudinary";

const MAX_BYTES = 6 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudinary = getCloudinary();
  if (!cloudinary) {
    return NextResponse.json(
      {
        error:
          "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local.",
      },
      { status: 503 },
    );
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { error: "Use a JPG, PNG, WebP, or GIF image." },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image must be under 6MB." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploaded = await cloudinary.uploader.upload(dataUri, {
      folder: "imtiaztamim-portfolio",
      resource_type: "image",
    });

    return NextResponse.json({ url: uploaded.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Check Cloudinary credentials and try again." },
      { status: 502 },
    );
  }
}