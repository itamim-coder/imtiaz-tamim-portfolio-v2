import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogContent } from "@/lib/blog-content";
import {
  formatBlogDate,
  getPublishedPost,
  getPublishedPosts,
} from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Post — Imtiaz Tamim" };
  return {
    title: `${post.title} — Imtiaz Tamim`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const more = (await getPublishedPosts(4)).filter((item) => item.slug !== slug);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-20">
      <Link
        href="/blog"
        className="font-sans text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-accent"
      >
        ← All posts
      </Link>

      <p className="mt-8 font-sans text-[11px] font-semibold uppercase tracking-widest text-muted">
        {formatBlogDate(post.publishedAt)}
      </p>
      <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
        {post.excerpt}
      </p>

      {post.coverImage ? (
        <div className="blog-hero-image mt-8">
          <img src={post.coverImage} alt="" />
        </div>
      ) : null}

      {post.tags.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag} className="experience-tag">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-10">
        <BlogContent content={post.content} />
      </div>

      {more.length > 0 ? (
        <aside className="mt-16 border-t border-line pt-10">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted">
            More writing
          </p>
          <ul className="mt-4 space-y-3">
            {more.slice(0, 3).map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="font-sans text-sm font-semibold text-foreground transition-colors hover:text-accent"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </main>
  );
}