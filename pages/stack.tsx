import withLayout from 'components/skeleton/withLayout'
import { staticProps } from 'components/data-fetch/withCMS'
import Article from 'components/pure/Article'

interface IProps {
  content: string
}

function Stack({ content }: IProps) {
  return (
    <>
      <Article dangerouslySetInnerHTML={{ __html: content }}></Article>
    </>
  )
}
export const getStaticProps = (ctx) => staticProps('stack', ctx)
export default withLayout(Stack, 'stack')
