import React from 'react'
import Link from 'next/link'
import themeColors from '../components/styles/colors'
import SwitchThemeButton from '../components/switchThemeButton.js'
import Title from '../components/title'
import FundMe from '../components/fund-me'

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
        <SwitchThemeButton {...this.props} />
        <FundMe theme={this.props.query.theme} />
        <div className="container">
          <header className="row">
            <div className="col-3">
              <div className="video-container">
                <video
                  src="/static/square-memoji.mp4"
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
                <li>
                  <a target="_blank" href="https://twitter.com/pablopunk">
                    thoughts
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a target="_blank" href="https://ghuser.io/pablopunk">
                    projects
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  {' '}
                  <a
                    target="_blank"
                    href="https://www.instagram.com/stories/pablopunk/"
                  >
                    daily
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a target="_blank" href="https://unsplash.com/@pablopunk">
                    pics
                  </a>
                </li>
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
              margin-top: 20vh;
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
            font-size: 1.5em;
          }
          li a {
            color: ${colors.primary};
          }
          li a:hover {
            color: ${colors.link};
          }
        `}</style>
      </div>
    )
  }
}
