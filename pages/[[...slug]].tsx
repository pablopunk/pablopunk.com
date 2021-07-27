import { getPageStaticPaths, getPageStaticProps } from 'cms/middleware'
import { ComponentPage } from 'components/ComponentPage'

export const getStaticProps = getPageStaticProps
export const getStaticPaths = getPageStaticPaths
export default ComponentPage
