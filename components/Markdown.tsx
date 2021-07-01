import { FunctionComponent } from 'react'
import snarkdown from 'snarkdown'

type Props = {
  className?: string
}

const Markdown: FunctionComponent<Props> = ({ className, children }) => {
  if (typeof children !== 'string') {
    return <div>Markdown children must be a string</div>
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: snarkdown(children) }}
    />
  )
}

export default Markdown
