import { FunctionComponent } from 'react'
import { Icon } from './Icon'
import classNames from 'classnames'
import { normalizeHref } from 'lib/utils'
import { Tooltip } from './Tooltip'
import { Size } from 'types/styles'

interface Props {
  text?: string
  link?: string
  icon?: string
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
  icon,
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
        <a href={url} {...props}>
          {children}
        </a>
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
          'flex items-center justify-center p-2 md:py-1 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none',
          'font-semibold',
          {
            'text-sm': size === 'sm',
            'text-md': size === 'md',
            'text-xl': size === 'lg',
            'min-h-[50px] min-w-[50px] md:min-h-[38px] md:min-w-[38px]':
              rounded === true,
            'bg-primary-5 text-primary-11 hover:text-primary-11 hover:bg-primary-7 rounded-full':
              !!primary || !secondary,
            'bg-secondary-5 text-secondary-11 hover:text-secondary-11 hover:bg-secondary-7 rounded-full':
              !!secondary,
            'hover:scale-110': !disabled,
          },
          className,
        )}
      >
        {icon && (
          <span className={classNames({ 'mr-1': text || children != null })}>
            <Icon name={icon} />
          </span>
        )}
        {text && <span>{text}</span>}
        {children && children}
      </LinkOrButton>
    </TooltipComponent>
  )
}
