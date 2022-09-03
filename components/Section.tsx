import classnames from 'classnames'

interface Props extends React.ComponentProps<'section'> {
  alt?: boolean
}

export const Section = ({ children, alt, className }: Props) => {
  return (
    <div
      className={classnames('py-3', {
        'bg-primary-7': alt === true,
      })}
    >
      <section className={className}>{children}</section>
    </div>
  )
}
