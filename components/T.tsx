import { useTranslation } from '@hooks/useTranslation'
import { ComponentProps } from 'react'
import React from 'react'

type Props = ComponentProps<'div'>

export const T = ({ children }: Props) => {
  const { _ } = useTranslation()

  if (typeof children === 'string') {
    return <>{_(children)}</>
  }

  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child) => (
          <React.Fragment key={child.toString()}>
            <T>{child}</T>
          </React.Fragment>
        ))}
      </>
    )
  }

  return <>{children}</>
}
