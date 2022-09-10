import { FunctionComponent } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { normalizeHref } from 'lib/utils'
import { Tooltip } from './Tooltip'
import { Size } from 'types/styles'

interface Props {
  text?: string
  link?: string
  Icon?: any
  size?: Size
  primary?: boolean
  secondary?: boolean
  rounded?: boolean
  title?: string
  onClick?(): void
  className?: string
  disabled?: boolean
  href?: string
}

export const Button: FunctionComponent<Props> = ({
  text,
  link,
  Icon,
  size,
  primary,
  secondary,
  rounded,
  onClick,
  className,
  disabled,
  title,
  href,
  children,
}) => {
  const TooltipComponent = ({ children }) =>
    title ? <Tooltip text={title}>{children}</Tooltip> : <>{children}</>
  const LinkOrButton = ({ children, ...props }) => {
    let url = link || href

    url = normalizeHref(url)

    if (url) {
      return (
        <Link href={url}>
          <button {...props}>{children}</button>
        </Link>
      )
    }

    return (
      <button onClick={onClick} disabled={disabled} {...props}>
        {children}
      </button>
    )
  }

  return (
    <TooltipComponent>
      <LinkOrButton
        title={title}
        className={classNames(
          'flex items-center justify-center px-2 py-1 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none gap-1',
          'font-semibold',
          {
            'text-sm': size === 'sm',
            'text-md': size === 'md',
            'text-xl': size === 'lg',
            'min-h-[38px] min-w-[38px]': rounded === true,
            'bg-primary-5 text-primary-11 hover:text-primary-11 hover:bg-primary-7 rounded-full':
              !!primary || !secondary,
            'bg-secondary-5 text-secondary-11 hover:text-secondary-11 hover:bg-secondary-7 rounded-full':
              !!secondary,
            'hover:scale-110': !disabled,
          },
          className,
        )}
      >
        {Icon && <Icon />}
        {text && <span>{text}</span>}
        {children && children}
      </LinkOrButton>
    </TooltipComponent>
  )
}
