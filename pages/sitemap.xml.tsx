import React from 'react'

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>https://pablo.pink/</loc>
    <lastmod>2019-12-17T23:59:30+00:00</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://pablo.pink/portfolio</loc>
    <lastmod>2019-12-17T23:59:30+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://pablo.pink/me</loc>
    <lastmod>2019-12-17T23:59:30+00:00</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://pablo.pink/contact</loc>
    <lastmod>2019-12-17T23:59:30+00:00</lastmod>
    <priority>0.80</priority>
  </url>
</urlset>
`

export default class extends React.Component {
  static getInitialProps({ res }) {
    if (res) {
      res.setHeader('Content-Type', 'text/xml')
      res.write(sitemap)
      res.end()
    }

    return {}
  }
}
