import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/app/globals.css";
import { BrowserTitleBarColor } from "~/components/BrowserTitleBarColor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pablopunk.com",
  description: "Remote web developer. Contact me, read my blog, or check my projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#2a999d"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <BrowserTitleBarColor />
        <meta
          name="google-site-verification"
          content="y-TnXGhfG_A0b-ttLIV076wjdtFdEMZw6d04iwfR2Xw"
        />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen max-w-screen-lg p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
