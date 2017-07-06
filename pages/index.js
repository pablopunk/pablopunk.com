import Layout from '../components/layout'
import Link from 'next/link'

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
        <li><Link href='./apps' prefetch><a>Apps</a></Link></li>
      </ul>
    </div>
  </Layout>
)
