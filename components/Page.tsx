import React, { FunctionComponent } from 'react'
import { Nav } from 'components/Nav'
import { Meta } from 'components/Meta'
import { PageProps } from 'types/page'
import { Button } from 'components/neon/Button'
import { Footer } from './Footer'
import { T } from 'components/T'
import { MdHome } from 'react-icons/md'

export const Page: FunctionComponent<PageProps> = ({
  children,
  statusCode,
}) => {
  const isError = parseInt(statusCode) > 202

  return (
    <>
      <Meta />
      <Nav />
      <main className="fill-height">
        {isError ? (
          <div className="flex flex-col items-center justify-center fill-height">
            <h1 className="text-danger text-2xl font-bold mb-2">
              <T>Oops! Error {statusCode}</T>
            </h1>
            <Button href="/" LeftIcon={MdHome}>
              <T>Go home</T>
            </Button>
          </div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </>
  )
}
