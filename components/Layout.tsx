import React, { FunctionComponent } from 'react'
import { Nav } from 'components/Nav'
import { Meta } from 'components/Meta'
import { PageProps } from 'types/page'
// import { Button } from 'components/Button'
import { Footer } from './Footer'

export const Layout: FunctionComponent<PageProps> = ({
  children,
  // statusCode,
}) => {
  // const isError = parseInt(statusCode) > 202

  return (
    <>
      <Meta />
      <Nav />
      <main className="z-0 max-w-screen-lg px-5 py-5 mx-auto fill-height md:py-0">
        {children}
      </main>
      <Footer />
    </>
  )
}
