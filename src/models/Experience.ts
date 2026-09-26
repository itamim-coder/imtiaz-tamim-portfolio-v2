import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const experienceSchema = new Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, default: "Remote" },
    websiteUrl: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
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

if (mongoose.models.Experience) {
  mongoose.deleteModel("Experience");
}

export const Experience: Model<ExperienceDocument> =
  mongoose.model<ExperienceDocument>("Experience", experienceSchema);
