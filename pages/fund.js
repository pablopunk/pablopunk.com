import React from 'react'
import Router from 'next/router'

export default class extends React.Component {
  static async getInitialProps({ res }) {
    const redirectUrl = 'https://paypal.me/pablopunk/5'
    if (res) {
      res.writeHead(302, {
        Location: redirectUrl
      })
      res.end()
    } else {
      Router.push(redirectUrl)
    }

    return {}
  }
}
