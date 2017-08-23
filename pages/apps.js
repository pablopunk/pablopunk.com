import Layout from '../components/layout'

const Apps = ({ apps }) => (
  <Layout>
    <div className='main-container'>
      <ul className='apps-list'>
        {
          apps.map((app, i) => (
            <li key={i}>
              <img src={app.img} />
              <a target='_blank' href={app.link}>{app.name}</a>
              <span>{app.description}</span>
            </li>
          ))
        }
      </ul>
      <div className='go-back'>
        <a href='../'>
          <span>back</span>
          <img className='back-button' src='../static/images/back.svg' />
        </a>
      </div>
    </div>
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
