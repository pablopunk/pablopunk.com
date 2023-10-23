"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { posts } from "../blog/posts";
import { H1 } from "~/components/Post/Title";
import { PostFeatureImage } from "~/components/Post/PostFeatureImage";

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
      <article className="p-2 max-w-screen-lg w-full flex flex-col gap-4 mx-auto">
        <H1>{post.title}</H1>
        <i className="text-xs text-neutral-8 text-center">
          by {post.author} at {post.date.toLocaleDateString()}
        </i>
        <PostFeatureImage post={post} />
        {children}
      </article>
    </>
  );
}
