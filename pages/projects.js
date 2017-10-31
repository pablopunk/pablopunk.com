import fetch from 'isomorphic-fetch'
import FadeList from 'react-fade-in'
import Layout from '../components/layout'
import Fade from '../components/fade'
import Back from '../components/back'
import colors from '../components/colors'

const Projects = ({ recent = [], pinned = [] }) => (
  <Layout>
    <div>
      <FadeList>
        <h1>Recent Projects</h1>
        {recent.map(project => <a key={project.name} href={project.url}>/{project.name}</a>)}
      </FadeList>
    </div>
    <div>
      <FadeList>
        <h1>Pinned Projects</h1>
        {pinned.map(project => <a key={project.name} href={project.url}>/{project.name}</a>)}
      </FadeList>
    </div>
    <Fade delay={1}>
      <br />
      <Back text='go home' />
    </Fade>
    <style jsx>{`
      h1 {
      color: ${colors.main}
      font-size: 1.3em;
      padding: .5em;
      }
      div {
      margin: 1em;
      }
      `}</style>
  </Layout>
)

const pinned = [
  {
    name: 'lad',
    url: 'https://github.com/ladjs/lad'
  },
  {
    name: 'lass',
    url: 'https://github.com/lassjs/lass'
  },
  {
    name: 'chronocube',
    url: 'https://github.com/pablopunk/chronocube'
  },
  {
    name: 'healthi',
    url: 'https://github.com/pablopunk/healthi-app'
  },
  {
    name: 'bashy',
    url: 'https://github.com/pablopunk/bashy'
  },
  {
    name: 'miny',
    url: 'https://github.com/pablopunk/miny'
  }
]

// const getUserAndRepo = url => url.split('/').slice(3, 5)

Projects.getInitialProps = async () => {
  const res = await fetch('https://pablopunk-repos.now.sh/')
  const recent = await res.json()
  return { recent, pinned }
}

export default Projects
