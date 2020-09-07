import Head from "next/head";
import { NextSeo, SocialProfileJsonLd } from "next-seo";

const siteUrl = "https://pablo.pink";

export default function Meta({ title, description, locale }) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={siteUrl}
        openGraph={{
          url: siteUrl,
          title,
          description,
          images: [
            {
              url: siteUrl + "/images/wide.jpg",
              width: 150,
              height: 150,
              alt: "Pablo Varela's profile picture"
            }
          ],
          site_name: "pablo.pink"
        }}
        twitter={{
          handle: "@pablopunk",
          site: "@pablopunk",
          cardType: "summary_large_image"
        }}
      />
      <SocialProfileJsonLd
        type="Person"
        name="Pablo Varela"
        url={siteUrl}
        sameAs={[
          "https://twitter.com/pablopunk",
          "https://linkedin.com/in/pablopunk",
          "https://instagram.com/in/pablopunk"
        ]}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="web,developer,freelance,pontevedra,galicia,españa,pablopunk,performance,hire,contratar,computer,science,pc,mac,vim,terminal,fast,modern,ui,flat,style,portfolio,work"
        />
        <meta httpEquiv="content-language" content={locale} />
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
        <link rel="canonical" href={siteUrl} />
        <link rel="sitemap" href={siteUrl + "/sitemap.xml"} />
        <meta
          name="google-site-verification"
          content="y-TnXGhfG_A0b-ttLIV076wjdtFdEMZw6d04iwfR2Xw"
        />
      </Head>
    </>
  );
}
