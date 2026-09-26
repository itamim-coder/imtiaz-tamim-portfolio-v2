import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { formatBlogDate, getPublishedPosts } from "@/lib/blog";

export async function BlogSection() {
  const posts = await getPublishedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-24"
      aria-labelledby="blog-heading"
    >
      <SectionHeading
        id="blog-heading"
        title="Blog"
        end={
          <Link
            href="/blog"
            className="font-sans text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            All posts →
          </Link>
        }
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="blog-card">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="blog-card-media">
                {post.coverImage ? (
                  <img src={post.coverImage} alt="" />
                ) : (
                  <div className="blog-card-fallback" />
                )}
              </div>
              <div className="p-5">
                {post.publishedAt ? (
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-muted">
                    {formatBlogDate(post.publishedAt)}
                  </p>
                ) : null}
                <h3 className="mt-2 font-sans text-lg font-semibold tracking-tight text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                {post.tags.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
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
    </section>
  );
}