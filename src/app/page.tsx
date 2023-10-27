import Link from "next/link";

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
          <Link href="/posts/i-told-chatgpt-to-create-a-passive-store-and-now-i-don-t-code-anymore">
            {"->"} I told ChatGPT to create a passive store and now I don{"'"}t
            code anymore
          </Link>
          <Link href="/posts/how-buying-an-m1-macbook-air-saved-me-money">
            {"->"} How buying an M1 Macbook Air saved me money
          </Link>
          <Link
            href="/posts/how-to-create-a-real-time-ui-with-nextjs-and-supabase"
            className="text-indigo-600 dark:text-indigo-400"
          >
            {"->"} How to create a real-time UI with NextJS and Supabase
          </Link>
        </div>
      </div>
    </section>
  );
}
