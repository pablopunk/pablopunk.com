import { NextSeo } from 'next-seo'
import CenterFlex from '../components/layout/CenterFlex'
import { serverSideProps } from '../components/data/withCMS'

export default ({ content }) => (
  <CenterFlex>
    <NextSeo
      title="Pablo Varela | Contact me if you want to work with me"
      description="Ways to contact me if you want to work with me or just follow me on social media."
    />
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </CenterFlex>
)

export const getServerSideProps = async (ctx) => serverSideProps(ctx, 'contact')
