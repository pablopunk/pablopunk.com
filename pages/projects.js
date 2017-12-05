import fetch from 'isomorphic-fetch'
import FadeList from 'react-fade-in'
import Layout from '../components/layout'
import Fade from '../components/fade'
import Back from '../components/back'
import colors from '../components/colors'

const maxFeatured = 6

const Projects = ({ featured = [] }) => (
  <Layout>
    <div>
      <FadeList>
        <h1>Featured Projects</h1>
        {featured.map(project => (
          <div className='repo' key={project.name}>
            <a href={project.url}>
              /{project.name}
            </a>
            <span className='stars'>{project.stars} ★</span>
          </div>
        ))}
        <div style={{ textAlign: 'center', margin: '1.2em' }}>
          <a href='https://github.com/pablopunk'>more...</a>
        </div>
      </FadeList>
    </div>
    <Fade delay={1}>
      <br />
      <Back text='home' />
    </Fade>
    <style jsx>{`
      h1 {
        color: ${colors.main}
        font-size: 1.3em;
        padding: .5em;
        text-align: center;
        width: 100%;
      }
      .repo {
        margin: 1em;
        width: 100%;
      }
      .stars {
        float: right;
        color: orange;
      }
      `}</style>
  </Layout>
)

Projects.getInitialProps = async () => {
  const res = await fetch('https://pablopunk-repos.now.sh/')
  let featured = await res.json()
  featured = featured.slice(0, maxFeatured)
  return { featured }
}

export default Projects
