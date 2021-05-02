import Article from 'components/pure/Article'
import { getPageStaticProps } from 'storyblok/middleware'

function Stack() {
  return (
    <>
      <Article>stack (blog post)</Article>
    </>
  )
}

export const getStaticProps = (ctx) => getPageStaticProps('stack', ctx)

export default Stack
