import FadeIn from 'react-fade-in'
import Link from 'next/link'
import Layout from '../components/layout'
import Center from '../components/center'
import History from '../components/history'
import Fade from '../components/fade'
import colors from '../components/colors'

export default () =>
  <Layout>
    <div>
      <Center height={70}>
        <FadeIn>
          <div>
            <div className='title'>Pablo Varela</div>
          </div>
          <ul className='link-list'>
            <li><a target='_blank' href='https://twitter.com/pablopunk'>Twitter</a></li>
            <li><a target='_blank' href='https://youtube.com/varelapol13'>YouTube</a></li>
            <li><Link href='./photos' prefetch><a>Photos</a></Link></li>
            <li><a target='_blank' href='https://open.spotify.com/user/pablovarela12'>Music</a></li>
            <li><a target='_blank' href='https://github.com/pablopunk'>Code</a></li>
            <li><Link href='./projects' prefetch><a>Projects</a></Link></li>
          </ul>
        </FadeIn>
      </Center>
      <Center cropTop height={0} className='history'>
        <Fade delay={0.75}>
          <h1>My story</h1>
          <History className='history' stories={[
            {
              title: 'Sourcefabric',
              subtitle: 'Senior Web Developer',
              date: 'since 2018',
              link: 'https://www.sourcefabric.org/'
            },
            {
              title: 'LadJS',
              subtitle: 'Core team member',
              date: 'since 2017',
              link: 'https://github.com/ladjs/lad'
            },
            {
              title: 'Keepcoding',
              subtitle: 'Master in Full Stack Javascript',
              date: '2017-2018',
              link: 'https://keepcoding.io/es/keepcoding-web-development-master-bootcamp/'
            },
            {
              title: 'Stang Decision Systems',
              subtitle: 'Full Stack Web Developer',
              date: '2016-2017',
              link: 'http://stangds.com/'
            },
            {
              title: 'USC',
              subtitle: 'Degree in Computer Science',
              date: '2011-2015',
              link: 'http://www.usc.es/etse/'
            }
          ]} />
        </Fade>
      </Center>
    </div>
    <style jsx>{`
      .title {
        color: ${colors.main};
        font-family: 'Amatic SC';
        font-size: 3em;
        text-align: center;
      }
      .title::after {
        content: '1993';
        color: #777;
        font-size: 13px;
        font-family: 'SF Mono', Menlo, monospace;
        font-weight: lighter;
        position: absolute;
        margin-top: 1em;
        margin-left: .3em;
        opacity: 0;
        animation: fadeIn .4s ease-in forwards;
        animation-delay: 1s;
      }
      .link-list {
        margin-top: 20px;
        display:flex;
        justify-content: center;
        transition: font-size .2s ease-in;
        text-align: center;
      }
      .link-list li {
        padding: .5em 1.5em;
        cursor: pointer;
      }
      h1 {
        font-family: 'Amatic SC';
        font-size: 1.4em;
        color: ${colors.main};
        text-align: center;
      }
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      @media (max-width: 768px) {
        .link-list {
          flex-direction: column;
          justify-content: flex-start;
          font-size: 1.3em;
        }
        .history {
          font-size: 20px;
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
