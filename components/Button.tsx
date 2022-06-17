import { FunctionComponent, useEffect, useState } from 'react'
import { ButtonType } from 'cms/storyblok/types'
import { Icon } from './Icon'
import classNames from 'classnames'
import { normalizeHref } from 'lib/utils'
import Tooltip from 'react-simple-tooltip'

interface Props extends ButtonType {
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
    title ? (
      <Tooltip
        content={title}
        placement="left"
        background="var(--color-primary-3)"
        border="1px solid var(--color-primary-6)"
        fadeDuration={200}
        padding={8}
        radius={99999}
        customCss="white-space:nowrap;"
        fontSize="16px"
      >
        {children}
      </Tooltip>
    ) : (
      <>{children}</>
    )
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
