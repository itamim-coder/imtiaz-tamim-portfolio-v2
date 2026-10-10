import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getCloudinary } from "@/lib/cloudinary";

/**
 * Returns a signed payload so the browser can upload
 * images/videos straight to Cloudinary (avoids Vercel body limits).
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudinary = getCloudinary();
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudinary || !cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        error:
          "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
      },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json().catch(() => ({}))) as {
      resourceType?: string;
    };
    const resourceType =
      body.resourceType === "video" || body.resourceType === "image"
        ? body.resourceType
        : "auto";

    const folder = "imtiaztamim-portfolio";
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = { timestamp, folder };
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      apiSecret,
    );

    return NextResponse.json({
      cloudName,
      apiKey,
      timestamp,
      signature,
      folder,
      resourceType,
    });
  } catch (error) {
    console.error("Cloudinary sign error:", error);
    return NextResponse.json(
      { error: "Could not create upload signature." },
      { status: 500 },
    );
  }
}
