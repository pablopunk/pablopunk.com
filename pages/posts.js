import FadeIn from 'react-fade-in'
import Link from 'next/link'
import Layout from '../components/layout'
import Back from '../components/back'

const { posts } = require('../posts')

export default () => (
  <Layout title='Blog'>
    <section>
      <FadeIn>
        <Back link='/' text='home' />
        {posts.map(p => (
          <article>
            <Link href={`/posts/${p.id}`}>
              <a>
                <h1>{p.title}</h1>
              </a>
            </Link>
            <h2>{p.date}</h2>
          </article>
        ))}
      </FadeIn>
    </section>
    <style jsx>{`
      section {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      article {
        margin: 4em 0;
      }
      h2 {
        font-size: 1em;
        color: gray;
      }
    `}</style>
  </Layout>
)
