import classNames from 'classnames'
import { BorderGradient } from './BorderGradient'

type Props = {
  title: string
  subtitle: string
  description: string
  link: string
}

export const Card = ({ title, subtitle, description, link }: Props) => {
  const hasLink = typeof link === 'string'
  const LinkOrNot = ({ children, className = '' }) =>
    hasLink ? (
      <a href={link} className={classNames(className, 'inline-block')}>
        {children}
      </a>
    ) : (
      <div className={className}>{children}</div>
    )

  return (
    <LinkOrNot className="w-full">
      <BorderGradient>
        <div
          className={classNames(
            'py-2 px-3 w-full rounded-lg transition-colors',
            {
              'hover:bg-primary-2': hasLink,
            },
          )}
        >
          <div className="flex gap-2 items-center justify-between">
            <h3>{title}</h3>
            <h4 className="italic text-fg opacity-75 text-sm">{subtitle}</h4>
          </div>
          <p className="text-fg opacity-90">{description}</p>
        </div>
      </BorderGradient>
    </LinkOrNot>
  )
}
