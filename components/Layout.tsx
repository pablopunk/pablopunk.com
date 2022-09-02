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
      <main className="fill-height">{children}</main>
      <Footer />
    </>
  )
}
