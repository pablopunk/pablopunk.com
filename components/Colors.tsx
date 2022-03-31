import * as tailwindConfig from 'tailwind.config'
import { Title } from './Title'

const ColorRow = ({
  colors,
  short,
}: {
  colors: Array<Array<any>>
  short?: boolean
}) => (
  <div className="flex w-full justify-start">
    {colors.map(([name, color]) => (
      <div
        key={name}
        className="p-1 flex-1 text-sm flex items-center justify-center"
        style={{
          backgroundColor: color,
          color:
            name === 'fg' || name.includes('-12')
              ? 'var(--color-bg)'
              : undefined,
        }}
      >
        {short ? name.split('-')[1] : name}
      </div>
    ))}
  </div>
)

export function Colors() {
  const colors = Object.entries(tailwindConfig.theme.extend.colors)
  const basic = colors.slice(0, 3)
  const primary = colors.slice(3, 15)
  const secondary = colors.slice(15)

  return (
    <div className="py-1">
      <Title size="sm" text="Basic" />
      <ColorRow colors={basic} />
      <Title size="sm" text="Primary" />
      <ColorRow colors={primary} short />
      <Title size="sm" text="Secondary" />
      <ColorRow colors={secondary} short />
    </div>
  )
}
