import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const siteSettingsSchema = new Schema(
  {
    singleton: { type: String, default: "main", unique: true },
    heroLine1: {
      type: String,
      default: "I build products that handle real traffic",
    },
    heroLine2: { type: String, default: "and real money." },
    heroSubline: {
      type: String,
      default: "Hello I'm Imtiaz | Full-Stack Product Engineer",
    },
    email: { type: String, default: "itamim12202@gmail.com" },
    githubUrl: { type: String, default: "https://github.com/imtiaztamim" },
    linkedinUrl: {
      type: String,
      default: "https://linkedin.com/in/imtiaztamim",
    },
    twitterUrl: { type: String, default: "https://x.com/imtiaztamim" },
    metaTitle: {
      type: String,
      default: "Imtiaz Tamim — Full-Stack Product Engineer",
    },
    metaDescription: {
      type: String,
      default:
        "Portfolio of Imtiaz Tamim — Full-Stack Product Engineer building SaaS products across travel, payments, and collaboration.",
    },
  },
  { timestamps: true },
);

export type SiteSettingsDocument = InferSchemaType<
  typeof siteSettingsSchema
> & {
  _id: mongoose.Types.ObjectId;
};

export const SiteSettings: Model<SiteSettingsDocument> =
  mongoose.models.SiteSettings ??
  mongoose.model<SiteSettingsDocument>("SiteSettings", siteSettingsSchema);
