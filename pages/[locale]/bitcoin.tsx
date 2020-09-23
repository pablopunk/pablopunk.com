import React from 'react'
import {staticProps, staticPaths} from 'components/data-fetch/withCMS'
import withLayout from 'components/skeleton/withLayout'
import Index from './index'

const Page = withLayout(Index, '')
const Bitcoin = (...props) => {
  return <Page {...props} init
}

export const getStaticProps = (ctx) => staticProps('home', ctx)
export const getStaticPaths = staticPaths
export default Bitcoin
