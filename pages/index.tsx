import { pageStaticProps } from 'middleware'

export default function Home() {
  return <h1>hello</h1>
}

export const getStaticProps = pageStaticProps
