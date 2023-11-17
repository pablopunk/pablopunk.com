import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `pablopunk's blog`,
  description: "Web development blog, open-source, and more.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="p-2">
        <Link href="/" className="text-xl">
          {"<-"} back to home
        </Link>
      </nav>
      <section className="mx-auto max-w-screen-md p-2">{children}</section>
    </>
  );
}
