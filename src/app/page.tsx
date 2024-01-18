import Link from "next/link";
import classNames from "classnames";
import { featuredPosts } from "~/data/posts";
import Image from "next/image";
import { FaLink } from "react-icons/fa";
import { SiNeovim, SiApple } from "react-icons/si";

const Card = ({ children }: React.PropsWithChildren) => (
  <div className="flex flex-col gap-1 p-3 max-w-md">{children}</div>
);

const Intro = () => (
  <Card>
    <h1 className="text-xl font-bold">Pablo P. Varela</h1>
    <p className="max-w-md text-neutral-7">
      I{"'"}m a web developer working at <a href="https://maze.co">Maze</a>.
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

const Projects = () => (
  <>
    <h2 className="text-xl font-bold mt-3 mb-3 md:mt-0">Author of</h2>
    <div className="flex flex-col gap-3">
      {[
        {
          name: "Swift Shift",
          href: "https://swiftshift.app",
          description: "Sweet window manager for macOS",
          image:
            "https://ik.imagekit.io/pablopunk/icons/swiftshift/128-mac.png?updatedAt=1705520877452",
          icon: SiApple,
          tag: "macOS",
        },
        {
          name: "unclutter.nvim",
          href: "https://github.com/pablopunk/unclutter.nvim",
          description: "A smart tabline that helps you focus",
          image:
            "https://ik.imagekit.io/pablopunk/icons/unclutter%20icon.png?updatedAt=1705521973312",
          icon: SiNeovim,
          tag: "neovim",
        },
        {
          name: "vimcolors.org",
          href: "https://vimcolors.org",
          description: "Generate your own vim colorschemes",
          image: "/favicon/apple-touch-icon.png",
          icon: FaLink,
          tag: "website",
        },
      ].map((project) => (
        <a
          href={project.href}
          key={project.name}
          className="relative flex items-center gap-1 p-3 max-w-md border border-neutral-3 rounded-lg hover:border-accent-7 hover:bg-neutral-1 transition-all hover:scale-105 shadow-md"
        >
          <Image
            src={project.image}
            alt={project.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="text-lg">{project.name}</h3>
            <p className="max-w-md text-neutral-7 font-normal text-sm">
              {project.description}
            </p>
          </div>
          <div className="absolute right-2 top-2 text-neutral-7 flex gap-2">
            <span className="text-xs font-normal">{project.tag}</span>
            <project.icon />
          </div>
        </a>
      ))}
    </div>
  </>
);

export default function Home() {
  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row justify-between max-w-md mx-auto md:max-w-none">
        <div className="max-w-md md:max-w-none">
          <Intro />
          <Contact />
          <Posts />
        </div>
        <div className="pr-0 pt-3 md:pr-2">
          <Projects />
        </div>
      </div>
    </section>
  );
}
