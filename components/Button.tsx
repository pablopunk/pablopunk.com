import { FunctionComponent } from 'react'
import { ButtonType } from 'cms/storyblok/types'
import Link from 'next/link'
import { Icon } from './Icon'
import classNames from 'classnames'

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
  type,
  rounded,
  onClick,
  className,
  disabled,
  title,
  href,
  children,
}) => {
  const LinkOrButton = ({ children, ...props }) => {
    const url = link?.url || href

    if (url) {
      return (
        <Link href={url}>
          <a {...props}>{children}</a>
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
    <LinkOrButton
      title={title}
      className={classNames(
        'flex items-center justify-center p-2 md:py-1 font-semibold transition-all border shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none hover:scale-110',
        {
          'text-sm': size === 'sm',
          'text-md': size === 'md',
          'text-lg': size === 'lg',
          'text-bg': type !== 'outline',
          'bg-accent hover:bg-accent3 hover:text-bg':
            type === 'primary' || !type || type.length === 0,
          'bg-accent-alt hover:bg-accent2 hover:text-bg': type === 'secondary',
          'bg-bg2 hover:bg-accent hover:text-bg text-accent border-accent':
            type === 'outline',
          'rounded-md': rounded !== true,
          'rounded-full min-h-[38px] min-w-[38px]': rounded === true,
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
