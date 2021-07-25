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
  type,
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
        'flex items-center justify-center px-3 py-2 md:py-1 text-xl font-semibold transition-all border rounded-md shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none hover:scale-110',
        {
          'text-sm': size === 'sm',
          'text-md': size === 'md',
          'text-lg': size === 'lg',
          'text-bg': type !== 'outline',
          'bg-accent hover:bg-accent3 hover:text-bg':
            type === 'primary' || !type || type.length === 0,
          'bg-accent-alt hover:bg-accent2 hover:text-bg': type === 'secondary',
          'bg-bg2 hover:bg-accent hover:text-bg': type === 'outline',
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
