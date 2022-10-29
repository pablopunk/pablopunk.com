import classNames from 'classnames'
import { IconType } from 'react-icons'
import { ReactNode, useMemo, useRef } from 'react'
import { Button, ButtonProps } from './Button'
import { useMouse } from 'react-use'

type CTAType = Partial<ButtonProps>

type Props = {
  title: string
  children?: ReactNode | ReactNode[]
  Icon?: IconType
  secondary?: boolean
  CTA?: CTAType | CTAType[]
  className?: string
}

const shadowOffset = 64

export const Card = ({
  title,
  children,
  Icon,
  CTA,
  secondary,
  className,
}: Props) => {
  const type = useMemo(() => (secondary ? 'secondary' : 'primary'), [secondary])
  const ref = useRef(null)
  const { elX, elY } = useMouse(ref)
  const boxShadow = useMemo(() => {
    let x = 0,
      y = 0
    if (elX < 0) {
      x = Math.floor(Math.abs(elX) / shadowOffset)
    }
    if (elX > 0) {
      x = Math.floor(-elX / shadowOffset)
    }
    if (elY < 0) {
      y = Math.floor(Math.abs(elY) / shadowOffset)
    }
    if (elY > 0) {
      y = Math.floor(-elY / shadowOffset)
    }
    return { x, y }
  }, [elX, elY])

  return (
    <>
      <article
        ref={ref}
        className={classNames(
          className,
          'neon-card border-2 border-primary-8 md:max-w-[400px] p-5 bg-neutral-2 rounded-lg z-auto relative flex flex-col justify-between gap-2',
        )}
      >
        <div className="flex flex-col gap-2">
          <h2
            className={classNames('flex gap-1 items-center text-2xl', {
              'text-primary-8': secondary !== true,
              'text-secondary-8': secondary === true,
            })}
          >
            {Icon && <Icon />}
            <span className="font-bold">{title}</span>
          </h2>
          <div>{children}</div>
        </div>
        <div className="w-full flex justify-end mt-2 gap-2">
          {(Array.isArray(CTA) ? CTA : [CTA]).filter(Boolean).map((cta, i) => (
            <Button
              key={`cta-${cta.href || cta.text || cta.title}-${i}`}
              secondary={secondary}
              {...cta}
            />
          ))}
        </div>
      </article>
      <style jsx>{`
        article {
          --neon-shadow: var(--color-${type}-3);
          border-color: var(--color-${type}-3);
        }
        :global(body.dark) article {
          --neon-shadow: var(--color-${type}-3);
          border-color: var(--color-${type}-9);
        }
        article:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: -1;
          box-shadow: ${boxShadow.x}px ${boxShadow.y}px 48px 16px
            var(--neon-shadow);
          border-radius: 8px;
        }
      `}</style>
    </>
  )
}
