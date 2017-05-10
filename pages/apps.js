import Head from 'next/head'

export default () => (
  <div>
    <Head>
        <title>Pablo Varela</title>
        <meta name="viewport" content="width=device-width, user-scalable=no"/>
    </Head>
		<div id='top-bar'>
			<a href='/'><img src='/static/home.svg'></img></a>
		</div>
    <div className='home'>
      <div className='main'>
        <nav>
          <ul>
            <li>
              <img src='/static/chronocube.png' />
              <a href='http://chronocube.live' className='app-name'>Chronocube</a>
              <div className='description'>A minimal Rubik's cube timer</div>
            </li>
            <li>
              <img src='/static/healthi.png' />
              <a href='http://pablopunk.com/healthi-app' className='app-name'>Healthi</a>
              <div className='description'>Track your macbook's battery health</div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <style jsx>{`
			#top-bar {
				margin: 1.5em 0 0 1.5em;
        transition: .5s;
			}
			#top-bar img {
				width: 25px;
				background-color: whitesmoke;
				padding: .9em;
				border-radius: 50%;
        transition: .3s;
			}
			#top-bar img:hover {
				background-color: #ddd;
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
      }
			ul {
				padding: 0;
			}
      ul li {
        list-style: none;
				height: 4em;
				line-height: 4em;
				vertical-align: middle;
				font-size: .8em;
				margin-top: 2em;
        transition: .3s;
      }
			ul li img {
				vertical-align: middle;
				width: 40px;
			}
      ul a {
        display: inline-block;
        padding: .5em;
        text-decoration: none;
        color: #F62459;
				cursor: pointer;
      }
      ul a:hover {
        text-decoration: underline;
      }
      ul li .app-name {
        min-width: 80px;
        margin-left: 1em;
      }
      ul li .description {
        float: right;
        padding: .5em;
      }
      @media (max-width: 768px) {
        #top-bar {
          margin: 1.5em 0 0 0;
          transition: .5s;
        }
        #top-bar img {
          background-color: transparent;
          transition: .3s;
        }
        #top-bar:after {
          content: 'home';
          color: #F62459;
          font-family: Menlo, monospace;
          padding: .9em 0 .9em 0;
          position: absolute;
          line-height: 25px;
          height: 25px;
          transition: .5s;
        }
        ul li .description {
          display: none;
        }
        ul li {
          font-size: 1em;
          transition: .3s;
        }
      }
      @media only screen /* Retina iPad landscape */
        and (min-device-width : 768px) 
        and (max-device-width : 1024px) 
        and (-webkit-min-device-pixel-ratio: 1) {
          ul li {
            font-size: 1em;
            transition: .3s;
          }
        }
    `}</style>
  </div>
)
