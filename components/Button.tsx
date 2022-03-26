import { FunctionComponent } from 'react'
import { ButtonType } from 'cms/storyblok/types'
import { Icon } from './Icon'
import classNames from 'classnames'
import { normalizeHref } from 'lib/utils'

interface Props extends ButtonType {
  onClick?(): void
  className?: string
  disabled?: boolean
  title?: string
  href?: string
}

export const Button: FunctionComponent<Props> = ({
  text,
  link,
  icon,
  size,
  outline,
  color,
  rounded,
  onClick,
  className,
  disabled,
  title,
  href,
  children,
}) => {
  const LinkOrButton = ({ children, ...props }) => {
    let url = link?.url || link?.cached_url || href

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
    <LinkOrButton
      title={title}
      className={classNames(
        'flex items-center justify-center p-2 md:py-1 font-semibold transition-all border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none hover:scale-110',
        {
          'text-sm': size === 'sm',
          'text-md': size === 'md',
          'text-xl': size === 'lg',
          'text-bg': !outline,
          'bg-accent hover:bg-accent3 hover:text-bg':
            color === 'accent' || !outline,
          'bg-accent-alt hover:bg-accent2 hover:text-bg':
            color === 'accent-alt',
          'bg-bg2 hover:bg-accent hover:text-bg text-accent border-accent':
            !!outline,
          'rounded-md': rounded !== true,
          'rounded-full min-h-[50px] min-w-[50px] md:min-h-[38px] md:min-w-[38px]':
            rounded === true,
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
  )
}
