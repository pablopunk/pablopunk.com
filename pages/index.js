import FadeIn from 'react-fade-in'
import Link from 'next/link'
import Layout from '../components/layout'

const mainColor = '#457fca'
const linkColor = '#fd746c'

export default () => (
  <Layout>
    <div className='main-container'>
      <FadeIn>
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
      </FadeIn>
    </div>
    <style jsx>{`
      .title {
        color: ${mainColor};
        font-family: 'Amatic SC';
        font-size: 3em;
      }
      .title::after {
        content: '1993';
        color: #777;
        font-size: 13px;
        font-family: 'Operator Mono', Inconsolata, Menlo, monospace;
        font-weight: lighter;
        position: absolute;
        margin-top: 1em;
        margin-left: .3em;
        opacity: 0;
        animation: fadeIn .4s ease-in forwards;
        animation-delay: 1s;
      }
      @keyframes fadeIn {
        0% { opacity: 0 }
        100% { opacity: 1 }
      }
      .link-list {
        margin-top: 20px;
        display:flex;
        justify-content: center;
        transition: font-size .2s ease-in;
      }
      .link-list li {
        padding: .5em 1.5em;
        cursor: pointer;
      }
      @media (max-width: 768px) {
        .link-list {
          flex-direction: column;
          justify-content: flex-start;
          font-size: 1.3em;
        }
      }
      @media screen and (orientation:landscape) {
        .link-list {
          flex-direction: row;
          font-size: 1em;
          justify-content: center;
          flex-wrap: wrap;
        }
      }
    `}</style>
  </Layout>
)
