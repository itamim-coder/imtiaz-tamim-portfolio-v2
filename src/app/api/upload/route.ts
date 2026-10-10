import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getCloudinary } from "@/lib/cloudinary";

/** Fallback small-file upload through the server (images ≤ 4MB). Prefer /api/upload/sign for video. */
const MAX_BYTES = 4 * 1024 * 1024;
const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

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

    if (!IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error:
            "Server upload accepts images only. Use the media uploader for video.",
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image must be under 4MB." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploaded = await cloudinary.uploader.upload(dataUri, {
      folder: "imtiaztamim-portfolio",
      resource_type: "image",
      unique_filename: true,
      use_filename: true,
    });

    if (
      !uploaded.secure_url ||
      !uploaded.public_id ||
      uploaded.public_id === "imtiaztamim-portfolio"
    ) {
      console.error("Unexpected Cloudinary upload payload:", uploaded);
      return NextResponse.json(
        { error: "Upload returned an incomplete image URL. Try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
      resourceType: "image",
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Check Cloudinary credentials and try again." },
      { status: 502 },
    );
  }
}
