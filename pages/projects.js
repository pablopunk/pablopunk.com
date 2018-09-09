import React from 'react'
import fetch from 'isomorphic-fetch'
import { ThreeBounce as Spinner } from 'better-react-spinkit'
import Layout from '../components/layout'
import Center from '../components/layout/center'
import colors from '../components/styles/colors'
import fonts from '../components/styles/fonts'

const maxPopular = 7
const title = 'Projects'

class Projects extends React.Component {
  constructor (props) {
    super(props)

    this.state = { popular: [] }
  }

  componentDidMount () {
    fetch(`https://pablopunk-repos.now.sh/?max=${maxPopular}`)
      .then(async res => {
        const json = await res.json()
        const repos = [
          ...json,
          {
            name: 'superdesk-client-core',
            url: 'https://github.com/superdesk/superdesk-client-core',
            stars: 14
          }
        ]
        const reposByStar = repos.sort((a, b) => a.stars < b.stars)

        this.setState({ popular: reposByStar })
      })
  }

  render () {
    const { popular } = this.state

    return (
      <Layout title={title} navLinks={[ { title } ]}>
        <Center height={70}>
          <section>
            <h1>Popular Projects</h1>
            {popular.length === 0 &&
              <Center>
                <Spinner color={colors.secondary} />
              </Center>
            }
            {popular.map(project => (
              <div className='repo' key={project.name}>
                <a href={project.url}>/{project.name}</a>
                <span className='stars'>{project.stars} ★</span>
              </div>
            ))}
            <div style={{ textAlign: 'center', margin: '1.2em' }}>
              <a href='https://github.com/pablopunk'>more...</a>
            </div>
          </section>
        </Center>
        <style jsx>{`
          h1 {
            color: ${colors.main};
            font-family: ${fonts.title};
            font-size: 2em;
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
  }
}

export default Projects
