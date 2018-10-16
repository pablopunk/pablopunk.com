import React from 'react'
import Layout from '../components/layout'
import colors from '../components/styles/colors'
import fonts from '../components/styles/fonts'
import { get } from '../utils/api'

const title = 'Projects'

const repoName = (url: string): string => {
  const parts = url.split('/')
  const n = parts.length

  return n ? parts[n - 1] : ''
}

interface Project {
  url: string;
  name?: string;
}

interface Category {
  name: string;
  repos: Array<Project>;
}

interface IState {
  projects: Array<Category>;
}

export default class Projects extends React.Component<{}, IState> {
  constructor (props) {
    super(props)

    this.state = { projects: [] }
  }

  componentDidMount () {
    get('projects').then((categories: Array<Category>) => {
      const projectsWithoutFullUrl = categories.map(category => ({
        ...category,
        repos: category.repos.map(project => ({
          ...project,
          name: repoName(project.url),
        }))
      }))

      this.setState({ projects: projectsWithoutFullUrl })
    })
  }

  render () {
    return (
      <Layout title={title} navLinks={[ { title } ]}>
        <h1>My Projects</h1>
        <section>
          {
            this.state.projects.map(category => (
              <article>
                <h2>{ category.name }</h2>
                <ul>
                {
                  category.repos.map(project => (
                    <a target='_blank' href={project.url}><li>/{ project.name }</li></a>
                  ))
                }
                </ul>
              </article>
            ))
          }
        </section>
        <footer><a href="https://ghuser.io/pablopunk">More...</a></footer>
        <style jsx>{`
          section {
            margin-top: 7%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          article {
            font-size: 1.3em;
            margin: 1em;
            padding: .3em;
            min-width: 300px;
          }
          h1 {
            margin-top: 5%;
            text-align: center;
            color: ${colors.main};
            font-family: ${fonts.title}
          }
          h2 {
            color: ${colors.main};
            font-size: 1em;
            border-bottom: 1px dashed ${colors.main};
            padding-bottom: .2em;
            margin-bottom: .5em;
          }
          footer {
            text-align: center;
            margin: 30px 0 100px 0;
          }
        `}</style>
      </Layout>
    )
  }
}
