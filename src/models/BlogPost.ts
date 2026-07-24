import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    coverImage: { type: String, default: "" },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export type BlogPostDocument = InferSchemaType<typeof blogPostSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const BlogPost: Model<BlogPostDocument> =
  mongoose.models.BlogPost ??
  mongoose.model<BlogPostDocument>("BlogPost", blogPostSchema);
