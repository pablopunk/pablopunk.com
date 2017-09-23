import FadeIn from 'react-fade-in'
import Link from 'next/link'
import Layout from '../components/layout'
import Back from '../components/back.js'

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
                <a target='_blank' href={app.url}>{app.name}</a>
                <span>{app.description}</span>
              </li>
            ))
          }
        </FadeIn>
      </ul>
      <Back />
    </div>
    <style jsx>{`
      .apps-list {
        min-width: 500px;
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
      .apps-list li a {
        padding-left: 2em;
        text-align: left;
        transition: font-size .2s ease-in;
      }
      .apps-list li span {
        text-align: right;
      }
      @media (max-width: 768px) {
        .apps-list {
          min-width: 0;
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
    { name: '/chronocube', url: 'http://chronocube.live', description: 'A minimal Rubik\'s cube timer' },
    { name: '/healthi', url: 'http://pablopunk.com/healthi-app', description: 'Track your macbook\'s battery health' },
    { name: '/serve-bar', url: 'http://pablopunk.com/serve-bar', description: 'Share files/folders in your network' }
  ]
})

export default Apps
