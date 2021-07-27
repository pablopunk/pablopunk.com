import { getPageStaticPaths, getPageStaticProps } from 'cms/middleware'
import { CMSPage } from 'components/CMSPage'

export const getStaticProps = getPageStaticProps
export const getStaticPaths = getPageStaticPaths
export default CMSPage
