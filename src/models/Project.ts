import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const projectFeatureSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, default: "" },
    details: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    /** Optional cut-by-cut feature demo video (filled later) */
    videoUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false },
);

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    company: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["web", "mobile", "both"],
      default: "web",
    },
    featured: { type: Boolean, default: false },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, default: "" },
    /** Problem / context for case study */
    problem: { type: String, default: "" },
    /** Outcome / results for case study */
    outcome: { type: String, default: "" },
    /** Your role on the product */
    role: { type: String, default: "" },
    /** Italic callout under description (FlawlessNitin-style) */
    highlight: { type: String, default: "" },
    year: { type: String, default: "" },
    category: { type: String, default: "" },
    statusLabel: { type: String, default: "Live" },
    tags: { type: [String], default: [] },
    features: { type: [projectFeatureSchema], default: [] },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type ProjectDocument = InferSchemaType<typeof projectSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Project: Model<ProjectDocument> =
  mongoose.models.Project ??
  mongoose.model<ProjectDocument>("Project", projectSchema);
