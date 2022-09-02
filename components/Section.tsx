import classnames from 'classnames'

interface Props extends React.ComponentProps<'section'> {
  alt?: boolean
}

export const Section = ({ children, alt }: Props) => {
  return (
    <div
      className={classnames('py-3', {
        'bg-bg-2': alt === true,
      })}
    >
      <section>{children}</section>
    </div>
  )
}
