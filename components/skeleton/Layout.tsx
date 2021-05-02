import React, { FunctionComponent } from 'react'
import Nav from 'components/skeleton/Nav'
import Meta from 'components/skeleton/Meta'
import Link from 'next/link'
import { _, locales } from 'lib/locales'
import { PageProps } from 'types/page'

const Layout: FunctionComponent<PageProps> = ({ page, nav, children }) => {
  return (
    <>
      <Meta {...page.content.metadata} locale={page.lang} />
      <Nav main={nav.content.main} path={page.path} />
      <main className="container px-5 mx-auto max-w-screen-lg fill-height">
        {children}
      </main>
      <footer
        className="items-center justify-around hidden w-full p-4 mx-auto md:flex bg-bg2 opacity-80"
        style={{ height: 'var(--footer-height)' }}
      >
        <p>
          {locales.map((l) => {
            return page.lang === l ? (
              <span key={l}> {l} </span>
            ) : (
              <Link href={'/' + l} locale={l} key={l}>
                {l}
              </Link>
            )
          })}
        </p>
        <p>© Pablo Varela {new Date().getFullYear()}</p>
        <p>
          <a href="https://github.com/pablopunk/pablopunk.com">
            {_('Source code', page.lang)}
          </a>
        </p>
      </footer>
    </>
  )
}

export default Layout
