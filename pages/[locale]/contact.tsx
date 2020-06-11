import FixedCenter from 'components/layout/FixedCenter'
import withLayout from 'components/layout/withLayout'
import { staticProps, staticPaths } from 'components/data/withCMS'

interface IProps {
  content
}

const Page = ({ content, ...props }: IProps) => (
  <>
    <FixedCenter>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </FixedCenter>
    <style jsx>{`
      div {
        text-align: center;
      }
    `}</style>
  </>
)

export const getStaticProps = (ctx) => staticProps('contact', ctx)
export const getStaticPaths = staticPaths
export default withLayout(Page, 'contact')
