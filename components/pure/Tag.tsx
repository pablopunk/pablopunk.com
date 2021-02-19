import React from 'react'
import smartForeground from 'smart-foreground'
import colors from 'tailwindcss/colors'

export default function Tag({ text, color = 'transparent', className = '' }) {
  return (
    <span className={'p-1 ' + className}>
      {text}
      <style jsx>{`
        span {
          background-color: ${color};
          color: ${color === 'transparent'
            ? 'var(--color-fg)'
            : smartForeground(color, [
                colors.blueGray['50'],
                colors.blueGray['800'],
              ])};
        }
      `}</style>
    </span>
  )
}
