import Head from 'next/head'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import { DEFAULT_LOCALE } from 'locales'
import { useRouter } from 'next/router'
import { SITE_DESC, SITE_IMAGE, SITE_NAME, SITE_URL } from 'config'
import { useCssVar } from 'hooks/useCssVar'
import { useMeta } from 'hooks/useMeta'

export function Meta() {
  const { title, description, imageUrl } = useMeta()
  const { locale } = useRouter()
  const siteUrl = `${SITE_URL}/${locale !== DEFAULT_LOCALE ? locale : ''}`
  const titleBarColor = useCssVar('--color-bg')

  return (
    <>
      <NextSeo
        title={title}
        description={description || SITE_DESC}
        canonical={siteUrl}
        openGraph={{
          url: siteUrl,
          title: title,
          description: description,
          images: [
            {
              url: imageUrl || SITE_IMAGE,
              width: 150,
              height: 150,
              alt: "Pablo Varela's profile picture",
            },
          ],
          site_name: SITE_NAME,
        }}
        twitter={{
          handle: '@pablopunk',
          site: '@pablopunk',
          cardType: 'summary_large_image',
        }}
      />
      <SocialProfileJsonLd
        type="Person"
        name="Pablo Varela"
        url={siteUrl}
        sameAs={[
          'https://twitter.com/pablopunk',
          'https://linkedin.com/in/pablopunk',
          'https://instagram.com/in/pablopunk',
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
        <meta name="theme-color" content={titleBarColor} />
        <meta
          name="google-site-verification"
          content="y-TnXGhfG_A0b-ttLIV076wjdtFdEMZw6d04iwfR2Xw"
        />
      </Head>
    </>
  )
}
