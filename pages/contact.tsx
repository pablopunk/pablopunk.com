import CenterFlex from '../components/layout/CenterFlex'
import { serverSideProps } from '../components/data/withCMS'
import Page, { IPageProps } from '../components/layout/Page'

interface IProps extends IPageProps {
  content
}

export default ({ content, ...props }: IProps) => (
  <Page {...props}>
    <CenterFlex>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </CenterFlex>
  </Page>
)

export const getServerSideProps = async (ctx) => serverSideProps(ctx, 'contact')
