import React from 'react'
import Nav from 'components/skeleton/Nav'
import Meta from 'components/skeleton/Meta'
import styled from 'styled-components'
import { smallMediaQuery } from 'components/utils/media-queries'
import Link from 'next/link'
import { _, locales } from 'lib/locales.js'
import { light, dark } from 'components/utils/themes'

interface IPageProps {
  children
  nav: {
    changeThemeButtonDark: string
    changeThemeButtonLight: string
    donateText: string
  }
  metaTags
  locale: string
}

export default function withLayout(PageComponent, path?: string) {
  return function Layout({
    children,
    nav,
    metaTags,
    locale,
    ...props
  }: IPageProps) {
    return (
      <>
        <Meta {...metaTags} />
        <Nav {...nav} path={path} />
        <div>
          <main className="container px-5 mx-auto max-w-screen-lg">
            <PageComponent {...props} />
          </main>
          <footer>
            <div>
              <p>
                {locales.map((l) => {
                  return locale === l ? (
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
                  {_('Source code', locale)}
                </a>
              </p>
            </div>
          </footer>
        </div>
      </>
    )
  }
}
