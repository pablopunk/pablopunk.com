import Link from "next/link";
import classNames from "classnames";
import { featuredPosts } from "~/data/posts";

const Card = ({ children }: React.PropsWithChildren) => (
  <div className="flex flex-col gap-1 p-3 max-w-md">{children}</div>
);

const Intro = () => (
  <Card>
    <h1 className="text-xl font-bold">Pablo P. Varela</h1>
    <p className="max-w-md text-neutral-7">
      I{"''"}m a web developer working at <a href="https://maze.co">Maze</a>.
    </p>
    <p className="max-w-md text-neutral-7">
      I also contribute to open-source projects on{" "}
      <a href="https://github.com/pablopunk">Github</a>.
    </p>
  </Card>
);

const Contact = () => (
  <Card>
    <h1 className="text-xl font-bold">Contact me</h1>
    <p className="max-w-md text-neutral-7">
      You can find me on <i>almost</i> every social network as <b>@pablopunk</b>
      . Or{" "}
      <a className="font-bold" href="mailto:pablo@pablopunk.com">
        send me an email.
      </a>
    </p>
  </Card>
);

const Posts = () => (
  <Card>
    <Link href="/blog" className="text-xl transition">
      Blog {"->"}
    </Link>
    <div className="max-w-md text-neutral-7 flex flex-col gap-1">
      {featuredPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/posts/${post.slug}`}
          className={classNames({ "text-accent-7": post.cta })}
        >
          {post.title} {"->"}
        </Link>
      ))}
    </div>
  </Card>
);

export default function Home() {
  return (
    <section className="w-full">
      <div className="max-w-md md:max-w-none mx-auto">
        <Intro />
        <Contact />
        <Posts />
      </div>
    </section>
  );
}
