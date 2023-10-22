import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "pablopunk.com | blog",
  description: "web development, open-source, and more.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="p-2">
        <Link href="/" className="text-xl text-indigo-600 dark:text-indigo-400">
          {'<-'} back to home
        </Link>
      </nav>
      <section className="mx-auto max-w-screen-md p-2">{children}</section>
    </>
  );
}
