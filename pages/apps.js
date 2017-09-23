import FadeIn from 'react-fade-in'
import Link from 'next/link'
import Layout from '../components/layout'

const mainColor = '#457fca'
const linkColor = '#fd746c'

const Apps = ({ apps }) => (
  <Layout>
    <div className='main-container'>
      <ul className='apps-list'>
        <FadeIn>
          {
            apps.map((app, i) => (
              <li key={i}>
                <img src={app.img} />
                <a target='_blank' href={app.url}>{app.name}</a>
                <span>{app.description}</span>
              </li>
            ))
          }
        </FadeIn>
      </ul>
      <div className='go-back'>
        <Link href='/' prefetch>
          <a>
            <span>back</span>
            <img className='back-button' src='../static/images/back.svg' />
          </a>
        </Link>
      </div>
    </div>
    <style jsx>{`
      .apps-list {
        min-width: 650px;
        max-width: 700px;
        margin: 0 auto;
      }
      .apps-list li {
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        vertical-align: middle;
        margin-bottom: 2em;
      }
      .apps-list li img {
        width: 50px;
        heigth: 50px;
        filter: drop-shadow(2px 2px 5px #bbb);
      }
      .apps-list li a, .apps-list li span {
        width: 45%;
      }
      .apps-list li a {
        padding-left: 2em;
        text-align: left;
        transition: font-size .2s ease-in;
      }
      .apps-list li span {
        text-align: right;
      }
      .go-back {
        display: flex;
        justify-content: center;
      }
      .go-back span {
        color: ${mainColor};
      }
      .back-button {
        width: 20px;
        height: 20px;
        background-color: whitesmoke;
        padding: 1em;
        border-radius: 50%;
        display: none;
        transition: padding .2s ease-in;
      }
      .back-button:hover {
        background-color: #ccc;
        padding: 1.2em;
      }
      @media (max-width: 768px) {
        .apps-list {
          min-width: 0;
        }
        .apps-list li {
          justify-content: center;
        }
        .apps-list li a {
          font-size: 1.3em;
        }
        .apps-list li span {
          display: none;
        }
        .go-back span {
          visibility: hidden;
        }
        .back-button {
          display: block;
        }
      }
    `}</style>
  </Layout>
)

Apps.getInitialProps = () => ({
  'apps': [
    { name: 'Chronocube', url: 'http://chronocube.live', img: '../static/images/chronocube.png', description: 'A minimal Rubik\'s cube timer' },
    { name: 'Healthi', url: 'http://pablopunk.com/healthi-app', img: '../static/images/healthi.png', description: 'Track your macbook\'s battery health' },
    { name: 'Serve bar', url: 'http://pablopunk.com/serve-bar', img: '../static/images/serve-bar.png', description: 'Share files/folders in your network' }
  ]
})

export default Apps
