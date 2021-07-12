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
  onClick,
  className,
  disabled,
  children,
}) => {
  const styles = classNames(
    'flex items-center justify-center px-2 py-1 text-xl font-semibold transition-all border rounded-md shadow-md cursor-pointer md:text-md text-fg hover:text-fg hover:shadow-lg bg-bg2 disabled:opacity-50 disabled:cursor-not-allowed',
    className,
  )

  children = (
    <>
      {icon && (
        <span className="mr-1">
          <Icon name={icon} />
        </span>
      )}
      {text && <span>{text}</span>}
      {children && children}
    </>
  )

  if (onClick) {
    return (
      <button onClick={onClick} className={styles} disabled={disabled}>
        {children}
      </button>
    )
  }

  return (
    <Link href={link?.url || ''}>
      <a className={styles}>{children}</a>
    </Link>
  )
}
