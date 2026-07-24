import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const experienceSchema = new Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, default: "Remote" },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "" },
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type ExperienceDocument = InferSchemaType<typeof experienceSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Experience: Model<ExperienceDocument> =
  mongoose.models.Experience ??
  mongoose.model<ExperienceDocument>("Experience", experienceSchema);
