import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "~/app/globals.css";
import { BrowserTitleBarColor } from "~/components/BrowserTitleBarColor";
import { NavigationEvents } from "~/components/NavigationEvents";
import { RightClickMenu } from "~/components/RightClickMenu";
import site from "~/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.SITE_URL),
  title: site.SITE_NAME,
  description: site.SITE_DESC,
  openGraph: {
    type: "website",
    title: site.SITE_NAME,
    siteName: site.SITE_NAME,
    description: site.SITE_DESC,
    url: site.SITE_URL,
    locale: "en_US",
    images: [
      {
        url: site.SITE_IMAGE,
      },
    ],
  },
  twitter: {
    title: site.SITE_NAME,
    description: site.SITE_DESC,
    card: "summary_large_image",
    site: site.SITE_URL,
    images: [
      {
        url: site.SITE_IMAGE,
      },
    ],
  },
  alternates: {
    canonical: site.SITE_URL,
  },
};

const htmlHello = `
console.log(\`%c
<>
Hi! I'm Pablo, the owner of this website.
What are you doing here? Is there something wrong?
You can contact me at pablo@pablopunk.com
Or open an issue/PR at github.com/pablopunk/pablopunk.com
</>\n
\`, "color:royalblue");
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script data-goatcounter="/goat" async src="/count.js"></script>
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
        <div className="min-h-screen p-6 flex flex-col justify-between">
          <main>{children}</main>
          <footer className="text-sm text-neutral-5 font-bold pt-6">
            © {site.SITE_COPYRIGHT} {new Date().getFullYear()}
          </footer>
        </div>
        <Suspense fallback={null}>
          <RightClickMenu />
          <Toaster
            toastOptions={{
              className: "border-2 border-neutral-2 rounded-md",
              style: {
                background: "var(--color-neutral-1)",
                color: "var(--color-neutral-9)",
              },
            }}
          />
        </Suspense>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <Analytics />
        <script dangerouslySetInnerHTML={{ __html: htmlHello }} async />
      </body>
    </html>
  );
}
