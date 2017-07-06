import Layout from '../components/layout'

export default () => (
  <Layout>
    <div className='main-container'>
      <div className='title'>
        <h2>Pablo Varela</h2>
      </div>
      <ul className='link-list'>
        <li><a target='_blank' href='https://twitter.com/pablopunk'>Twitter</a></li>
        <li><a target='_blank' href='https://youtube.com/varelapol13'>YouTube</a></li>
        <li><a target='_blank' href='https://pexels.com/u/pablopunk'>Photography</a></li>
        <li><a target='_blank' href='https://github.com/pablopunk'>Code</a></li>
        <li><a href='./apps' className='Link'>Apps</a></li>
      </ul>
    </div>
  </Layout>
)
