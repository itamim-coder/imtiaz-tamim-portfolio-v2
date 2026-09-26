import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";

export type PublicBlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage: string;
  publishedAt: string | null;
};

export async function getPublishedPosts(limit?: number) {
  await connectDB();
  const query = BlogPost.find({ published: true }).sort({
    publishedAt: -1,
    createdAt: -1,
  });
  if (limit) query.limit(limit);
  const posts = await query.lean();

  return posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    tags: post.tags ?? [],
    coverImage: post.coverImage ?? "",
    publishedAt: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : null,
  })) satisfies PublicBlogPost[];
}

export async function getPublishedPost(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export function formatBlogDate(value: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}