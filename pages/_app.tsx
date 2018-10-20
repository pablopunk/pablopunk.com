import React from 'react'
import { MDXProvider } from '@mdx-js/tag'

import components from '../components/markdown'

interface IProps {
  Component: any;
  pageProps: any;
}

export default class extends React.Component<IProps, {}> {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    )
  }
}
