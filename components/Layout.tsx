import React, { FunctionComponent } from 'react'
import Nav from 'components/Nav'
import Meta from 'components/Meta'
import { PageProps } from 'types/page'
import { Button } from 'components/Button'
import Footer from './Footer'

const Layout: FunctionComponent<PageProps> = ({
  page,
  nav,
  children,
  statusCode,
}) => {
  const meta = page?.content.metadata || {}
  const mainNav = nav?.content?.main || []

  return (
    <>
      <Meta meta={meta} page={page} />
      <Nav main={mainNav} />
      <main className="z-0 max-w-screen-lg px-5 py-3 mx-auto fill-height">
        {page ? (
          children
        ) : (
          <div className="flex flex-col items-center justify-center w-full fill-height">
            <h1 className="mb-4 text-2xl">oops! error {statusCode}</h1>
            <Button text="Go home" link={{ url: '/' }} />
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

export default Layout
