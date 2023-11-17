"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { posts } from "~/data/posts";
import { H1 } from "~/components/Post/Title";
import { PostFeatureImage } from "~/components/Post/PostFeatureImage";
import classNames from "classnames";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    console.error(`Post not found: ${slug}`);
    return null;
  }

  const relatedPosts = (post.related || [])
    .map((related) => posts.find((p) => p.slug === related))
    .filter(Boolean);

  return (
    <>
      <nav className="p-2 mb-5">
        <Link
          href="/blog"
          className="text-xl text-indigo-600 dark:text-indigo-400"
        >
          {"<-"} back to blog
        </Link>
      </nav>
      <section className="flex flex-col md:flex-row">
        <article className="p-2 max-w-screen-md flex flex-col gap-4">
          <H1>{post.title}</H1>
          <i className="text-xs text-neutral-8 text-center">
            by {post.author} at {post.date.toLocaleDateString()}
          </i>
          <PostFeatureImage post={post} />
          {children}
        </article>
        {relatedPosts.length > 0 && (
          <nav className="p-2 border-t-2 border-neutral-2 md:border-none mt-6 md:mt-0">
            <>
              <h2 className="text-2xl font-serif pb-1 mb-2 border-b border-neutral-2">
                Related content
              </h2>
              <ul className="flex flex-col gap-2">
                {relatedPosts.map(
                  (relatedPost, relatedIndex) =>
                    relatedPost && (
                      <Link
                        key={relatedPost.slug}
                        className="border border-neutral-2 p-2 rounded-md hover:no-underline hover:scale-105 transition-transform"
                        href={`/posts/${relatedPost.slug}`}
                      >
                        <li
                          className={classNames({
                            "text-indigo-600 dark:text-indigo-400":
                              relatedIndex === 0,
                          })}
                        >
                          <span>
                            {"->"} {relatedPost.title}{" "}
                          </span>
                          <span className="text-xs ml-1 opacity-50">
                            {relatedPost.date.toLocaleDateString()}
                          </span>
                        </li>
                      </Link>
                    ),
                )}
              </ul>
            </>
          </nav>
        )}
      </section>
    </>
  );
}
