import React from 'react'
import Link from 'next/link'
import themeColors from '../components/styles/colors'
import SwitchThemeButton from '../components/switchThemeButton.js'
import Title from '../components/title'
import FundMe from '../components/fund-me'

const LINKS = [
  { label: 'tweets', url: 'https://twitter.com/pablopunk' },
  { label: 'stories', url: 'https://instagram.com/stories/pablopunk/' },
  { label: 'apps', url: 'https://ghuser.io/pablopunk' },
  { label: 'pics', url: 'https://unsplash.com/@pablopunk' }
]

export default class extends React.Component {
  playVideo(event) {
    if (event.target.paused) {
      event.target.play()
    }
  }
  render() {
    const colors = themeColors(this.props.query.theme)

    return (
      <div>
        <SwitchThemeButton {...this.props} width="18px" />
        <FundMe theme={this.props.query.theme} />
        <div className="container">
          <header className="row">
            <div className="col-3">
              <div className="video-container">
                <video
                  src="/static/videos/square-memoji.mp4"
                  muted // don't delete this. Some browsers won't autoplay audio
                  playsInline
                  controls={false}
                  poster="/static/images/square-memoji.png"
                  onMouseOver={ev => this.playVideo(ev)}
                  onClick={ev => this.playVideo(ev)}
                />
              </div>
            </div>
            <div className="col-4" id="title">
              <Title theme={this.props.query.theme} />
            </div>
          </header>
          <div className="row">
            <div className="col-2">
              <ul>
                {LINKS.map(({ label, url }) => (
                  <li key={url}>
                    <a target="_blank" href={url}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-5">
              <p>Hi there!</p>
              <p>
                I'm a web developer working remotely from{' '}
                <a target="_blank" href="https://goo.gl/maps/Z2uQtbEaDrR2">
                  Pontevedra, Spain.
                </a>
              </p>
              <p>
                I'm currently helping building the best open source tool for
                journalists:{' '}
                <a
                  target="_blank"
                  href="https://github.com/superdesk/superdesk"
                >
                  Superdesk
                </a>
                !
              </p>
              <p>
                I also contribute regularly to other projects and even my own,
                check them out on{' '}
                <a target="_blank" href="https://github.com/pablopunk">
                  GitHub.
                </a>
              </p>
            </div>
          </div>
          <div className="row">
            <p>
              <Link
                href={{ pathname: '/more', query: this.props.query }}
                prefetch
              >
                <a>More...</a>
              </Link>
            </p>
          </div>
        </div>
        <style jsx>{`
          .container {
            margin-top: 20px;
            margin-bottom: 10vh;
          }
          @media screen and (min-width: 900px) {
            .container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 80vh;
            }
          }
          section {
            padding: 1em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          video {
            width: 140px;
            height: 140px;
            border-radius: 50%;
          }
          .video-container {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            border: 3px solid ${colors.primary};
          }
          #title {
            margin-top: 1em;
          }
          #title::before {
            content: '1993';
            font-family: 'Avenir Next', Verdana, Helvetica, sanserif;
            font-size: 1rem;
            margin-left: -3rem;
            opacity: 0;
            animation: 1s fade ease-in forwards 4s;
          }
          @keyframes fade {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          li {
            margin: 1em;
            font-size: 2em;
          }
          li a {
            color: ${colors.primary};
            background: linear-gradient(
              to left,
              ${colors.link},
              ${colors.primary}
            );
            background-clip: text;
            -webkit-background-clip: text;
            text-fill-color: transparent;
            -webkit-text-fill-color: transparent;
            background-size: 400%, 100%;
            animation: slideBg 0.4s ease forwards 1s;
            padding: 2px;
          }
          li a:hover {
            color: ${colors.bodyFont};
            background: linear-gradient(
              to left,
              ${colors.primary},
              ${colors.link}
            );
            -webkit-background-clip: none;
            -webkit-text-fill-color: ${colors.bodyBg};
          }
          @keyframes slideBg {
            0% {
              background-size: 400% 100%;
            }
            100% {
              background-size: 100% 100%;
            }
          }
        `}</style>
      </div>
    )
  }
}
