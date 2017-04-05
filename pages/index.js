import Head from 'next/head'

export default () => (
  <div id="main">
    <Head>
        <title>Pablo Varela</title>
        <meta name="viewport" content="width=device-width, user-scalable=no"/>
    </Head>
    <div id="top-bar">
      Made with <a target="_blank" href="https://github.com/zeit/next.js">Next.js</a> and hosted in <a target="_blank" href="https://github.com/pablopunk/pablo.life/tree/gh-pages">github pages</a>
    </div>
    <div className="home">
      <div className="main">
        <h1>Pablo Varela</h1>
          <nav>
            <a target="_blank" href="https://twitter.com/pablopunk">Twitter</a>
            <a target="_blank" href="https://youtube.com/varelapol13">YouTube</a>  
            <a target="_blank" href="https://pexels.com/u/pablopunk">Photography</a>
            <a target="_blank" href="https://github.com/pablopunk">Code</a>
          </nav>
      </div>
    </div>

    <style jsx>{`
      @font-face {
        font-family: Angel;
        src: url('/static/fonts/Angelface.otf') format("opentype");
      } 
      #top-bar {
        font-family: Menlo, monospace;
        font-size: .7em;
        font-style: italic;
        color: steelblue;
      }
      #top-bar a {
        color: turquoise;
      }
      .home {
        font-family: Menlo, monospace;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: -1;
      }
      .main {
        flex: none;
        text-align: center;
      }
      h1 {
        font-family: Angel, Menlo, monospace;
        font-size: 2.5em;
        font-weight: normal;
        color: #3a7bd5;
      }
      nav a {
        display: inline-block;
        padding: .5em;
        text-decoration: none;
        font-size: .8em;
        color: #E29587;
      }
    `}</style>
  </div>
)
