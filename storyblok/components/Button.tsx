import { FunctionComponent } from 'react'
import { ButtonType } from 'storyblok/types'
import Link from 'next/link'
import { Icon } from './Icon'
import classNames from 'classnames'

interface Props extends ButtonType {
  onClick?(): void
  className?: string
  disabled?: boolean
}

export const Button: FunctionComponent<Props> = ({
  text,
  link,
  icon,
  size,
  onClick,
  className,
  disabled,
  children,
}) => {
  const LinkOrButton = ({ children, ...props }) => {
    if (link) {
      return (
        <Link href={link?.url || ''}>
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
      className={classNames(
        'flex items-center justify-center px-3 py-2 md:py-1 text-xl font-semibold transition-all border rounded-md shadow-md cursor-pointer md:text-md text-bg hover:shadow-lg bg-accent disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent3 hover:text-bg outline-none hover:scale-x-110',
        {
          'text-sm': size === 'sm',
          'text-md': size === 'md',
          'text-lg': size === 'lg',
        },
        className,
      )}
    >
      {icon && (
        <span className={classNames({ 'mr-1': text!! })}>
          <Icon name={icon} />
        </span>
      )}
      {text && <span>{text}</span>}
      {children && children}
    </LinkOrButton>
  )
}
