import React from 'react'
import Router from 'next/router'
import { localeFromRequest, localeFromBrowser } from '../lib/locales'

export default () => <div />

export async function getServerSideProps({ req, res }) {
  if (res) {
    const locale = localeFromRequest(req)
    const redirectUrl = '/' + locale

    res.writeHead(302, { Location: redirectUrl })
    res.end()
  } else {
    const locale = localeFromBrowser()
    const redirectUrl = '/' + locale

    Router.push(redirectUrl)
  }

  return {
    props: {},
  }
}
