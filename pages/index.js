import Head from 'next/head'

export default () => (
  <div id="main">
    <Head>
        <title>Pablo Varela</title>
        <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
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
            <a href="/apps" className='Link'>Apps</a>
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
        transition: .5s;
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
        transition: .3s;
      }
      nav a {
        display: inline-block;
        padding: .5em;
        text-decoration: none;
        font-size: .7em;
        color: #F62459;
        cursor: pointer;
        transition: .3s;
      }
      @media (max-width: 768px) {
        nav a {
          display: block;
          transition: .3s;
          font-size: 1em;
        }
        #top-bar {
          opacity: 0;
          transition: .5s;
        }
        h1 {
          font-size: 2.8em;
          transition: .3s;
        }
      }
      @media screen and (orientation:landscape) {
        nav a {
          display: inline-block;
        }
      }
      @media only screen /* Retina iPad landscape */
        and (min-device-width : 768px) 
        and (max-device-width : 1024px) 
        and (-webkit-min-device-pixel-ratio: 1) {
          nav a {
            font-size: 1em;
            transition: .3s;
          }
        }
    `}</style>
  </div>
)
