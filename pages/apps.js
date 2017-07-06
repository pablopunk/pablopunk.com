import Layout from '../components/layout'

export default () => (
  <Layout>
    <div className='main-container'>
      <ul className='apps-list'>
        <li>
          <img src='../static/images/chronocube.png' />
          <a target='_blank' href='http://chronocube.live'>Chronocube</a>
          <span>A minimal Rubik's cube timer</span>
        </li>
        <li>
          <img src='../static/images/healthi.png' />
          <a target='_blank' href='http://pablopunk.com/healthi-app'>Healthi</a>
          <span>Track your macbook's battery health</span>
        </li>
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
