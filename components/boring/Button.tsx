import { IconType } from 'react-icons'
import classNames from 'classnames'
import { ReactNode, useMemo } from 'react'
import Link from 'next/link'
import React from 'react'

export type ButtonProps = {
  onClick?(): void
  href?: string
  LeftIcon?: IconType
  RightIcon?: IconType
  text?: string
  children?: ReactNode | ReactNode[]
  title?: string
  disabled?: boolean
  className?: string
}

const ButtonComponent = ({
  onClick,
  LeftIcon,
  RightIcon,
  text,
  children,
  title,
  href,
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  const iconOnly = useMemo(() => !text && !children, [text, children])
  const ButtonOrA = (props) => {
    if (typeof href === 'string') {
      return (
        <Link href={href} {...props} {...rest} />
      )
    }
    return <button {...props} {...rest} />
  }

  return (
    <>
      <ButtonOrA
        className={classNames(
          'group hover:no-underline hover:text-neutral-5 transition inline-flex items-center justify-center font-bold overflow-hidden',
          {
            'gap-1': !iconOnly,
            'opacity-50 cursor-not-allowed': disabled,
            'cursor-pointer': !disabled,
          },
          className,
        )}
        onClick={onClick}
        href={href}
        disabled={disabled}
        title={title || text}
      >
        {LeftIcon && <LeftIcon />}
        {text && <span className="capitalize whitespace-nowrap">{text}</span>}
        {children}
        {title && (
          <span
            className={classNames(
              'transition-all delay-[0] whitespace-nowrap',
              'max-w-0 opacity-0 text-sm',
              'group-hover:max-w-[600px] group-hover:opacity-100',
              {
                'group-hover:mx-1': !text && children == null
              }
            )}
          >
            {title}
          </span>
        )}
        {RightIcon && <RightIcon />}
      </ButtonOrA>
    </>
  )
}

export const Button = React.memo(ButtonComponent)
