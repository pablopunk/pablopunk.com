import { IconType } from 'react-icons'
import classNames from 'classnames'
import { ReactNode, useMemo } from 'react'
import Link from 'next/link'
import React from 'react'
import { Tooltip } from 'react-tippy'

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
  primary?: boolean
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
  primary,
  ...rest
}: ButtonProps) => {
  const iconOnly = useMemo(() => !text && !children, [text, children])
  const ButtonOrA = (props: any) => {
    if (typeof href === 'string') {
      return <Link href={href} {...props} {...rest} />
    }
    return <button {...props} {...rest} />
  }

  return (
    <>
      <Tooltip
        title={title}
        position="bottom"
        trigger="mouseenter"
        duration={100}
      >
        <ButtonOrA
          className={classNames(
            'group hover:no-underline hover:text-neutral-5 transition inline-flex items-center justify-center font-bold overflow-hidden',
            {
              'gap-1': !iconOnly,
              'h-[32px] md:h-auto text-2xl md:text-xl': iconOnly,
              'opacity-60 cursor-not-allowed': disabled,
              'cursor-pointer': !disabled,
              'text-primary-7': !!primary,
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
          {RightIcon && <RightIcon />}
        </ButtonOrA>
      </Tooltip>
    </>
  )
}

export const Button = React.memo(ButtonComponent)
