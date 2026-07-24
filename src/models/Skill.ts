import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const skillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "" },
    category: { type: String, required: true, trim: true },
    categoryOrder: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type SkillDocument = InferSchemaType<typeof skillSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Skill: Model<SkillDocument> =
  mongoose.models.Skill ?? mongoose.model<SkillDocument>("Skill", skillSchema);
