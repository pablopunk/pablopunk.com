import { pageStaticProps } from 'static-props'
import React from 'react'
import { PageProps } from 'types/page'

interface Props extends PageProps { }

export default function Me({ }: Props) {
  return <h1>Me</h1>
}

export const getStaticProps = pageStaticProps
