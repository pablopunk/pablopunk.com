import FadeIn from 'react-fade-in'
import Layout from '../layout'

export default (title) => ({ children }) =>
  <Layout
    title='Work from home as a web developer'
    navLinks={[{ title: 'Blog', href: '/posts' }, { title }]}
  >
    <FadeIn>
      <article>{children}</article>
    </FadeIn>
    <style jsx>{`
      article {
        padding: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}</style>
  </Layout>
