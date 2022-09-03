import fs from 'fs'
import { NextApiResponse } from 'next'
import path from 'path'

const getColorFromCssString = (css: string, color: 'primary' | 'secondary') =>
  css.match(`${color}-1\: var\\(--colors-([^\\d]+)`)[1]

export default async function ThemeColors(req, res: NextApiResponse) {
  const css = fs
    .readFileSync(
      path.resolve(__dirname, '../../../../../styles/global.css'),
      'utf-8',
    )
    .replace(/\n/g, '')
  const primary = getColorFromCssString(css, 'primary')
  const secondary = getColorFromCssString(css, 'secondary')

  return res.status(200).json({ primary, secondary })
}
