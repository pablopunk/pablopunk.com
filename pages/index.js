import React from 'react'
import FadeIn from 'react-fade-in'
import Link from 'next/link'
import History from 'react-simple-timeline'
import Layout from '../components/layout'
import Center from '../components/layout/center'
import Fade from '../components/fade'
import colors from '../components/styles/colors'
import fonts from '../components/styles/fonts'
import { get } from '../utils/api'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = { stories: [] }
  }

  componentDidMount () {
    get('stories').then(stories => {
      this.setState({ stories })
    })
  }

  render () {
    return (
      <Layout>
        <div>
          <section>
            <Center height={70}>
              <FadeIn>
                <div className='image-wrapper'>
                  <img src='/static/images/me.png' alt='Me' />
                </div>
                <h1>Pablo Varela</h1>
                <nav>
                  <li>
                    <a target='_blank' href='https://twitter.com/pablopunk'>
                      Twitter
                    </a>
                  </li>
                  <li>
                    <Link href='./posts' prefetch>
                      <a>Blog</a>
                    </Link>
                  </li>
                  <li>
                    <a target='_blank' href='https://youtube.com/varelapol13'>
                      YouTube
                    </a>
                  </li>
                  <li>
                    <Link href='./photos' prefetch>
                      <a>Photos</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      target='_blank'
                      href='https://open.spotify.com/user/pablovarela12'>
                      Music
                    </a>
                  </li>
                  <li>
                    <Link href='./gear' prefetch>
                      <a>Gear</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='./projects' prefetch>
                      <a>Projects</a>
                    </Link>
                  </li>
                </nav>
              </FadeIn>
            </Center>
          </section>
          {
            this.state.stories.length > 0 &&
            <section className='history'>
              <Center cropTop height={0}>
                <Fade delay={1}>
                  <h2>My Story</h2>
                  <History className='history' fade stories={this.state.stories} />
                </Fade>
              </Center>
            </section>
          }
        </div>
        <style jsx>{`
          .image-wrapper {
            width: 130px;
            height: 130px;
            margin: 0 auto;
          }
          .image-wrapper img {
            width: 100%;
            height: 100%;
          }
          h1 {
            color: ${colors.main};
            font-family: ${fonts.title};
            font-size: 3em;
            text-align: center;
            font-weight: lighter;
          }
          h1::after {
            content: '1993';
            color: #777;
            font-size: 13px;
            font-family: ${fonts.mono};
            font-weight: lighter;
            position: absolute;
            margin-top: 1em;
            margin-left: 0.3em;
            opacity: 0;
            animation: fadeIn 0.4s ease-in forwards;
            animation-delay: 2s;
          }
          nav {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            transition: font-size 0.2s ease-in;
            text-align: center;
          }
          nav li {
            padding: 0.5em 1.5em;
            cursor: pointer;
            list-style: none;
          }
          h2 {
            font-family: ${fonts.title};
            font-size: 1.6em;
            color: ${colors.main};
            text-align: center;
          }
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          @media (max-width: 768px) {
            nav {
              flex-direction: column;
              justify-content: flex-start;
              font-size: 1.3em;
            }
            .history {
              margin-top: 50px;
              font-size: 20px;
            }
          }
          @media screen and (orientation: landscape) {
            nav {
              flex-direction: row;
              font-size: 1em;
              justify-content: center;
              flex-wrap: wrap;
            }
          }
        `}</style>
      </Layout>
    )
  }
}
