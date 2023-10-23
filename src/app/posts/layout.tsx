import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <section className="p-2 max-w-screen-md w-full flex flex-col gap-4 mx-auto">
        {children}
      </section>
    </>
  );
}
