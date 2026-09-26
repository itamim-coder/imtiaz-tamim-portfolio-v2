import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { formatBlogDate, getPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Imtiaz Tamim",
  description:
    "Notes on shipping production SaaS — APIs, payments, realtime, and VPS work.",
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:py-20">
      <SectionHeading id="blog-page-heading" title="Blog" />
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Proof notes for clients and recruiters — what shipped, what broke, and
        how it stayed up.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted">No posts yet.</p>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="blog-card-media blog-card-media--tall">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt="" />
                  ) : (
                    <div className="blog-card-fallback" />
                  )}
                </div>
                <div className="p-6">
                  {post.publishedAt ? (
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-muted">
                      {formatBlogDate(post.publishedAt)}
                    </p>
                  ) : null}
                  <h2 className="mt-2 font-sans text-xl font-semibold tracking-tight text-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {post.excerpt}
                  </p>
                  {post.tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li key={tag} className="experience-tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}