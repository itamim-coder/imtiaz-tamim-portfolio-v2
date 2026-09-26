import { connectDB } from "@/lib/mongodb";
import { SiteSettings } from "@/models/SiteSettings";

export type PublicSiteSettings = {
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
};

const defaults: PublicSiteSettings = {
  email: "itamim12202@gmail.com",
  githubUrl: "https://github.com/imtiaztamim",
  linkedinUrl: "https://linkedin.com/in/imtiaztamim",
  twitterUrl: "https://x.com/imtiaztamim",
};

export async function getSiteSettings(): Promise<PublicSiteSettings> {
  await connectDB();

  const settings = await SiteSettings.findOne({ singleton: "main" }).lean();

  if (!settings) {
    return defaults;
  }

  return {
    email: settings.email || defaults.email,
    githubUrl: settings.githubUrl || defaults.githubUrl,
    linkedinUrl: settings.linkedinUrl || defaults.linkedinUrl,
    twitterUrl: settings.twitterUrl || defaults.twitterUrl,
  };
}
