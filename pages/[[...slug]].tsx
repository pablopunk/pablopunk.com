import { getPageStaticPaths, getPageStaticProps } from 'storyblok/middleware'
import Page from 'storyblok/components/BasicPage'

export const getStaticProps = getPageStaticProps
export const getStaticPaths = getPageStaticPaths
export default Page
