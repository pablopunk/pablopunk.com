import { IconType } from 'react-icons'
import classNames from 'classnames'
import { ReactNode, useMemo } from 'react'
import { Size } from 'types/styles'
import Link from 'next/link'

export type ButtonProps = {
  onClick?(): void
  href?: string
  LeftIcon?: IconType
  RightIcon?: IconType
  text?: string
  children?: ReactNode | ReactNode[]
  title?: string
  secondary?: boolean
  disabled?: boolean
  className?: string
  size?: Size
}

export const Button = ({
  onClick,
  LeftIcon,
  RightIcon,
  text,
  children,
  secondary,
  title,
  href,
  disabled,
  className,
  size,
  ...rest
}: ButtonProps) => {
  const type = useMemo(() => (secondary ? 'secondary' : 'primary'), [secondary])
  const iconOnly = useMemo(() => !text && !children, [text, children])
  const ButtonOrA = (props) => {
    if (typeof href === 'string') {
      return <Link href={href}><a {...props} {...rest} /></Link>
    }
    return <button {...props} {...rest} />
  }

  return (
    <>
      <ButtonOrA
        className={classNames(
          className,
          'neon-button group transition-all border-2 rounded-full py-1 px-2 cursor-pointer inline-flex items-center justify-center text-gray-100 font-bold overflow-hidden',
          {
            'text-xs': size === 'sm',
            'gap-1': !iconOnly,
            'hover:scale-105 hover:gap-2': !iconOnly && !disabled,
            'min-w-[36px] min-h-[36px]': iconOnly,
            'opacity-50 cursor-not-allowed': disabled,
          }
        )}
        onClick={onClick}
        href={href}
        disabled={disabled}
        title={title || text}
      >
        {LeftIcon && <LeftIcon />}
        {text && <span className='capitalize'>{text}</span>}
        {children}
        {title && (
          <span className={classNames(
            'transition-all delay-[0] whitespace-nowrap',
            'max-w-0 opacity-0',
            'group-hover:max-w-[600px] group-hover:opacity-100 group-hover:mx-1',
          )}>
            {title}
          </span>
        )}
        {RightIcon && <RightIcon />}
      </ButtonOrA>
      <style jsx>{`
        a:hover {
          text-decoration: none
        }
        .neon-button {
          --neon-bright: var(--color-${type}-1);
          --neon-background: var(--color-${type}-9);
          --neon-shadow: var(--color-${type}-6);
        }
        :global(body.dark) .neon-button {
          --neon-bright: var(--color-${type}-9);
          --neon-background: var(--color-${type}-2);
          --neon-shadow: var(--color-${type}-4);
        }
        .neon-button {
          color: var(--neon-bright);
          background: var(--neon-background);
          border: 2px solid var(--neon-bright);
          box-shadow: 0px 0px 16px 2px var(--neon-shadow),
            inset 2px 2px 12px 2px var(--neon-shadow);
          border-radius: 999px;
        }
        .neon-button:hover {
          background: var(--neon-shadow);
          box-shadow: 0px 0px 32px 2px var(--neon-shadow),
            inset 2px 2px 12px 2px var(--neon-shadow);
        }
      `}</style>
    </>
  )
}
