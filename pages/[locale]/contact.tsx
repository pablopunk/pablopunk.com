import FixedCenter from 'components/layout/FixedCenter'
import Page, { IPageProps } from 'components/layout/Page'
import { staticProps, staticPaths } from 'components/data/withCMS'

interface IProps extends IPageProps {
  content
}

export default ({ content, ...props }: IProps) => (
  <Page {...props} path="contact">
    <FixedCenter>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </FixedCenter>
    <style jsx>{`
      div {
        text-align: center;
      }
    `}</style>
  </Page>
)

export const getStaticProps = (ctx) => staticProps('contact', ctx)
export const getStaticPaths = staticPaths
