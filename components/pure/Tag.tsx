import React from 'react'
import smartForeground from 'smart-foreground'
import { light, dark } from 'components/utils/themes'

export default function Tag({ text, color = 'transparent' }) {
  return (
    <span className="p-1">
      {text}
      <style jsx>{`
        span {
          background-color: ${color};
          color: ${smartForeground(color, [dark.fg, light.fg])};
        }
      `}</style>
    </span>
  )
}
