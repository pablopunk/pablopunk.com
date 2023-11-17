"use client";

import { useState } from "react";
import classNames from "classnames";
import { posts } from "~/data/posts";
import { DateLocale } from "~/components/Post/DateLocale";

const keywords = ["vim", "neovim", "nextjs", "supabase", "macbook", "camera"];

type Keywords = (typeof keywords)[number];

export default function BlogPage() {
  const [filters, setFilters] = useState<Keywords[]>([]);
  const filteredPosts = posts.filter((post) => {
    if (filters.length === 0) return true;

    for (const keyword of keywords) {
      const isKeywordActive = filters.includes(keyword);
      if (!isKeywordActive) continue;

      if (
        post.title.toLowerCase().includes(keyword) ||
        post.description.toLowerCase().includes(keyword)
      ) {
        return true;
      }
    }

    return false;
  });

  return (
    <>
      <div className="flex gap-2 mb-1">
        {keywords.map((keyword) => (
          <button
            key={keyword}
            className={classNames(
              "p-2 rounded-sm text-xs transition-colors hover:bg-accent-2 hover:text-white ",
              {
                "bg-accent-2 text-white": filters.includes(keyword),
                "bg-neutral-2 text-neutral-8": !filters.includes(keyword),
              },
            )}
            onClick={() => {
              if (filters.includes(keyword)) {
                setFilters(filters.filter((f) => f !== keyword));
              } else {
                setFilters([...filters, keyword]);
              }
            }}
          >
            #{keyword}
          </button>
        ))}
      </div>
      {filteredPosts.map((post) => (
        <article key={post.slug} className="py-3">
          <h2 className="text-xl font-bold flex gap-2 justify-between items-start">
            <a href={`/posts/${post.slug}`}>
              {"->"} {post.title}
            </a>
            <p className="text-neutral-6 text-xs">
              <DateLocale date={post.date} />
            </p>
          </h2>
          <p className="text-neutral-7 mt-2">{post.description}</p>
        </article>
      ))}
    </>
  );
}
