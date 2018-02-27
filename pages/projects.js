import fetch from 'isomorphic-fetch'
import FadeList from 'react-fade-in'
import Layout from '../components/layout'
import Center from '../components/center'
import Fade from '../components/fade'
import Back from '../components/back'
import colors from '../components/colors'
import fonts from '../components/fonts'

const maxPopular = 7

const Projects = ({ popular = [] }) => (
  <Layout title='Projects'>
    <Center height={70}>
      <FadeList>
        <h1>Popular Projects</h1>
        {popular.map(project => (
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
    </Center>
    <Fade delay={1}>
      <br />
      <Back text='home' />
    </Fade>
    <style jsx>{`
      h1 {
        color: ${colors.main}
        font-family: ${fonts.title};
        font-weight: lighter;
        padding: .5em;
        text-align: center;
        width: 100%;
      }
      .repo {
        margin: 1em;
        width: 100%;
        font-size: 1.2em;
      }
      .stars {
        float: right;
        color: orange;
        margin-right: 1em;
      }
      `}</style>
  </Layout>
)

Projects.getInitialProps = async () => {
  const res = await fetch(`https://pablopunk-repos.now.sh/?max=${maxPopular}`)
  const popular = await res.json()
  return { popular }
}

export default Projects
