import FixedCenter from 'components/layout/FixedCenter'
import Layout, { IPageProps } from 'components/layout'
import { staticProps, staticPaths } from 'components/data/withCMS'

interface IProps extends IPageProps {
  content
}

const Page = ({ content, ...props }: IProps) => (
  <Layout {...props} path="contact">
    <FixedCenter>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </FixedCenter>
    <style jsx>{`
      div {
        text-align: center;
      }
    `}</style>
  </Layout>
)

export const getStaticProps = (ctx) => staticProps('contact', ctx)
export const getStaticPaths = staticPaths
export default Page
