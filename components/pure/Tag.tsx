import React from 'react'
import smartForeground from 'smart-foreground'
import { light, dark } from 'components/utils/themes'

export default function Tag({ text, color = 'transparent' }) {
  return (
    <span>
      {text}
      <style jsx>{`
        span {
          padding: 2px var(--space-1);
          background-color: ${color};
          color: ${smartForeground(color, [dark.fg, light.fg])};
        }
      `}</style>
    </span>
  )
}
