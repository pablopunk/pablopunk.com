import Layout from '../components/layout'
import Link from 'next/link'

export default () => (
  <Layout>
    <div className='main-container'>
      <div>
        <div className='title'>Pablo Varela</div>
      </div>
      <ul className='link-list'>
        <li><a target='_blank' href='https://twitter.com/pablopunk'>Twitter</a></li>
        <li><a target='_blank' href='https://youtube.com/varelapol13'>YouTube</a></li>
        <li><a target='_blank' href='https://pexels.com/u/pablopunk'>Photos</a></li>
        <li><a target='_blank' href='https://open.spotify.com/user/pablovarela12'>Music</a></li>
        <li><a target='_blank' href='https://github.com/pablopunk'>Code</a></li>
        <li><Link href='./apps' prefetch><a>Apps</a></Link></li>
      </ul>
    </div>
  </Layout>
)
