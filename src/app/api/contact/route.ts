import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getSiteSettings } from "@/lib/site-settings";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Valid email is required").max(254),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(5000),
  /** Honeypot — must stay empty */
  _hp: z.string().optional(),
});

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const body = contactSchema.parse(await request.json());

    if (body._hp?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        { error: "Contact form is not configured yet." },
        { status: 503 },
      );
    }

    const settings = await getSiteSettings();
    const to = process.env.CONTACT_TO_EMAIL || settings.email;
    const from =
      process.env.CONTACT_FROM_EMAIL ||
      "Imtiaz Tamim Portfolio <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: body.email,
      subject: `[Portfolio] ${body.subject}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Subject: ${body.subject}`,
        "",
        body.message,
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></p>
        <p><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(body.message)}</p>
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);

      const resendMessage =
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : "";

      if (resendMessage.includes("testing emails to your own email")) {
        return NextResponse.json(
          {
            error:
              "Email is in Resend test mode. Set CONTACT_TO_EMAIL in .env.local to your Resend signup address until imtiaztamim.com is verified.",
          },
          { status: 502 },
        );
      }

      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const first = error.issues[0]?.message ?? "Invalid form data";
      return NextResponse.json({ error: first }, { status: 400 });
    }

    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
