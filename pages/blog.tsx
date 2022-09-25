import { pageStaticProps } from 'middleware'
import React from 'react'
import { PageProps } from 'types/page'

interface Props extends PageProps { }

export default function Blog({ }: Props) {
  return <h1>Blog</h1>
}

export const getStaticProps = pageStaticProps
