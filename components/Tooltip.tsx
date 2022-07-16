import React from 'react'
import RawTooltip from 'react-simple-tooltip'

type Props = {
  text: string
}

export const Tooltip: React.FC<Props> = (props) => (
  <RawTooltip
    content={props.text}
    placement="left"
    background="var(--color-primary-5)"
    color="var(--color-primary-11)"
    border="1px solid var(--color-primary-7)"
    fadeDuration={200}
    padding={8}
    radius={99999}
    customCss="white-space:nowrap;"
    fontSize="16px"
  >
    {props.children}
  </RawTooltip>
)
