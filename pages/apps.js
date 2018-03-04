import React from 'react'
import Router from 'next/router'

export default class extends React.Component {
  static async getInitialProps ({ res }) {
    if (res) {
      res.writeHead(301, {
        Location: '/projects'
      })
      res.end()
      res.finished = true
    } else {
      Router.replace('/projects')
    }
    return {}
  }
}
