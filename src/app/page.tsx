import Link from "next/link";
import { featuredPosts } from "./blog/posts";
import classNames from "classnames";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-1 min-w-full p-3">
        <h1 className="text-xl font-bold">Pablo P. Varela</h1>
        <h2 className="max-w-md text-neutral-7">
          I{"'"}m a web developer working at <a href="https://maze.co">Maze</a>.
        </h2>
        <p className="max-w-md text-neutral-7">
          I also contribute to open-source projects on{" "}
          <a href="https://github.com/pablopunk">Github</a>.
        </p>
      </div>
      <div className="flex flex-col gap-1 min-w-full p-3">
        <div className="text-xl font-bold">Contact me</div>
        <p className="max-w-md text-neutral-7">
          You can find me on <i>almost</i> every social network as{" "}
          <b>@pablopunk</b>. Or{" "}
          <a className="font-bold" href="mailto:pablo@pablopunk.com">
            send me an email.
          </a>
        </p>
      </div>
      <div className="flex flex-col gap-1 min-w-full p-3">
        <Link className="text-xl transition" href="/blog">
          Blog {"->"}
        </Link>
        <div className="max-w-md text-neutral-7 flex flex-col gap-1">
          {featuredPosts.map((post) => (
            <Link
              href={`/posts/${post.slug}`}
              key={post.slug}
              className={classNames({
                "text-indigo-600 dark:text-indigo-400": post.cta,
              })}
            >
              {"->"} {post.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
