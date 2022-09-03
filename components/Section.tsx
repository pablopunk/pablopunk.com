import classnames from 'classnames'

interface Props extends React.ComponentProps<'section'> {
  alt?: boolean
}

export const Section = ({ children, alt, className }: Props) => {
  return (
    <div
      className={classnames('p-3', {
        'bg-primary-4': alt === true,
      })}
    >
      <section className={className}>{children}</section>
    </div>
  )
}
