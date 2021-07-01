import { FunctionComponent, HTMLAttributes } from 'react'
import snarkdown from 'snarkdown'

const Markdown: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  if (typeof children !== 'string') {
    return <div {...rest}>Markdown children must be a string</div>
  }

  return (
    <div {...rest} dangerouslySetInnerHTML={{ __html: snarkdown(children) }} />
  )
}

export default Markdown
