import { getPageStaticProps } from 'storyblok/middleware'

const Blog = () => {
  return (
    <section className="flex flex-col items-center fill-height">blog</section>
  )
}

export const getStaticProps = (ctx) => getPageStaticProps('blog', ctx)

export default Blog
