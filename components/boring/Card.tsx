import classNames from 'classnames'
import { IconType } from 'react-icons'
import { ReactNode } from 'react'
import { Button, ButtonProps } from './Button'

type CTAType = Partial<ButtonProps>

type Props = {
  title: string
  children?: ReactNode | ReactNode[]
  Icon?: IconType
  CTA?: CTAType | CTAType[]
  className?: string
}

export const Card = ({
  title,
  children,
  Icon,
  CTA,
  className,
}: Props) => {
  return (
    <>
      <article
        className={classNames(
          className,
          ''
        )}
      >
        <div className="flex flex-col gap-2">
          <h2
            className={classNames('flex gap-1 items-center text-xl text-neutral-9'
            )}
          >
            {Icon && <Icon />}
            <span className="font-bold">{title}</span>
          </h2>
          <div className='text-neutral-7 text-sm'>{children}</div>
        </div>
        <div className="w-full flex justify-start mt-2 gap-2">
          {(Array.isArray(CTA) ? CTA : [CTA]).filter(Boolean).map((cta, i) => (
            <Button
              key={`cta-${cta.href || cta.text || cta.title}-${i}`}
              {...cta}
              className="text-neutral-7"
            />
          ))}
        </div>
      </article>
    </>
  )
}
