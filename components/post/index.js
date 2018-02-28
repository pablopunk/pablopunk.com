import FadeIn from 'react-fade-in'
import Layout from '../layout'
import Back from '../back'

export default ({ children, title }) =>
  <Layout title={title}>
    <FadeIn>
      <Back link='/' text='home' />
      <article>
        { children }
      </article>
    </FadeIn>
    <style jsx>{`
      article {
        padding: 1em;
        margin-top: 6%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `}</style>
  </Layout>
