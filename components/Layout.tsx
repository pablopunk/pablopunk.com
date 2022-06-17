import React, { FunctionComponent } from 'react'
import { Nav } from 'components/Nav'
import { Meta } from 'components/Meta'
import { PageProps } from 'types/page'
import { Button } from 'components/Button'
import { Footer } from './Footer'

export const Layout: FunctionComponent<PageProps> = ({
  page,
  nav,
  footer,
  children,
  statusCode,
}) => {
  const meta = page?.content.metadata || {}

  return (
    <>
      <Meta meta={meta} page={page} />
      <Nav {...nav} />
      <main className="z-0 max-w-screen-lg px-5 py-5 mx-auto fill-height md:py-0">
        {page ? (
          children
        ) : (
          <div className="flex flex-col items-center justify-center w-full fill-height">
            <h1 className="mb-4 text-2xl">oops! error {statusCode}</h1>
            <Button text="Go home" link={{ url: '/' }} />
          </div>
        )}
      </main>
      <Footer {...footer?.content} />
    </>
  )
}
