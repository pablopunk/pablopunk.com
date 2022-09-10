import React, { FunctionComponent } from 'react'
import { Nav } from 'components/Nav'
import { Meta } from 'components/Meta'
import { PageProps } from 'types/page'
import { Button } from 'components/Button'
import { Footer } from './Footer'
import { T } from 'components/T'
import { RiHome2Line } from 'react-icons/ri'

export const Layout: FunctionComponent<PageProps> = ({
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
          <div className="flex flex-col items-center justify-center mt-[30%]">
            <h1 className="text-danger text-2xl font-bold mb-2">
              <T>Oops! Error {statusCode}</T>
            </h1>
            <Button href="/" Icon={RiHome2Line}>
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
